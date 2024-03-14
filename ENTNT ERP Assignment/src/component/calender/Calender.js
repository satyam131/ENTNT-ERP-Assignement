import React, { useEffect, useState } from 'react';
import "./Calender.css";
import Modal from 'react-modal';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import { isSameDay } from 'date-fns';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

Modal.setAppElement('#root');

function Calender() {

  const [orderDates, setOrderDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]);

  useEffect(() => {
    const fetchOrderDates = async () => {
      try {
        const response = await axios.get('http://localhost:8000/orders');
        const orders = response.data;
        const dates = orders.map(order => ({
          title: order.orderId + "-" + order.productName,
          date: order.orderDate,
          details: {
            orderId: order.orderId,
            productName: order.productName,
            customerName: order.customerName,
            status: order.status,
            orderDate: order.orderDate,
          },
        }));
        setOrderDates(dates);
      } catch (error) {
        console.error('Error fetching order dates:', error);
      }
    };

    fetchOrderDates();
  }, []);

  const calendarPlugins = [dayGridPlugin];

  const handleDateClick = (arg) => {
    console.log("clicked");
    const clickedDate = arg.dateStr;
    const ordersForDay = orderDates.filter((order) => isSameDay(new Date(order.date), new Date(clickedDate)));
    console.log('Orders for', clickedDate, ':', ordersForDay);

    setSelectedDate(clickedDate);
    setSelectedOrders(ordersForDay);
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setModalIsOpen(false);
  }

  return (
    <div className='calender-container'>
      <FullCalendar
        defaultView="dayGridMonth"
        plugins={[...calendarPlugins, interactionPlugin]}
        weekends={false}
        dateClick={handleDateClick}
        events={orderDates}
      />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Order Details Modal"
        className="order-details-modal"
        overlayClassName="order-details-overlay"
      >
        <h2>Orders for {selectedDate}</h2>
        {selectedOrders.map((order) => (
          <div key={order.details.orderId}>
            <p><strong>Order ID : </strong> {order.details.orderId}</p>
            <p><strong>Product Name : </strong> {order.details.productName}</p>
            <p><strong>Customer Name : </strong>{order.details.customerName}</p>
            <p><strong>Order Status : </strong>{order.details.status}</p>
            <p><strong>Order date : </strong>{order.details.orderDate}</p>
          </div>
        ))}
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
}

export default Calender;