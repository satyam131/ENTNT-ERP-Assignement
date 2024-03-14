import React from 'react';
import "./Orders.css";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'


const fetchOrder = async () => {
  try {
    const response = await fetch('http://localhost:8000/orders');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching order data:', error);
    throw error;
  }
};

function Orders() {
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDataAndRender = async () => {
      try {
        const fetchedData = await fetchOrder();
        setData(fetchedData);
      } catch (error) {
        console.error("Unable to Set Data")
        throw error;
      }
    };

    fetchDataAndRender();
  }, [flag]);

  const handleEdit = (order) => {
    navigate(`/orderEdit/${order.id}`);
  };

  const handleView = (order) => {
    navigate(`/readOrder/${order.id}`);
  };


  const handleDelete = (orderId) => {
    const confirm = window.confirm("Would you like to Delete?");
    if (confirm) {
      fetch("http://localhost:8000/orders/" + orderId, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then(() => {
          console.log('Deleted order successfully');
          setFlag((prevFlag) => !prevFlag);
          navigate('/orders');
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <div className="container">
      {data.map(item => (
        <div key={item.id} className="card">
          <h1>{item.customerName}</h1>
          <p>Order ID: {item.orderId}</p>
          <p>Product Name: {item.productName}</p>
          <p>Order Date: {item.orderDate}</p>
          <p>Status: {item.status}</p>
          <button onClick={() => handleEdit(item)}>Update</button>
          <button className="delete-btn" onClick={() => handleDelete(item.id)}>Delete</button>
          <button className="read-btn" onClick={() => handleView(item)}>View</button>
        </div>
      ))}
    </div>
  );
}

export default Orders;