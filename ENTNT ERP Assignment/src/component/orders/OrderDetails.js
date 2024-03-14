import React from 'react';
import './OrderDetails.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function OrderDetails() {

    const { id } = useParams();
    const [Data, setData] = useState({
        orderId: '',
        productId: '',
        productName: '',
        customerName: '',
        orderDate: '',
        status: '',
        id: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/orders/${id}`);
                const data = await response.json();
                setData(data);
                console.log("Read order Successfully");
                return data;
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error;
            }
        };
        fetchData();
    }, [id]);

    return (
        <div className="create-item-container">
            <h2>Order Details</h2>
            <form>
                <label>
                    Order ID:
                    <input
                        type="text"
                        name="orderId"
                        value={Data.orderId}
                        readOnly
                    />
                </label>
                <label>
                    Customer Name:
                    <input
                        type="text"
                        name="customerName"
                        value={Data.customerName}
                        readOnly
                    />
                </label>
                <label>
                    Product Name:
                    <input
                        type="text"
                        name="ProductName"
                        value={Data.productName}
                        readOnly
                    />
                </label>
                <label>
                    Product ID:
                    <input
                        type="number"
                        name="ProductID"
                        value={Data.productId}
                        readOnly
                    />
                </label>
                <label>
                    Order Date:
                    <input
                        type="date"
                        name="orderDate"
                        value={Data.orderDate}
                        readOnly
                    />
                </label>
                <label>
                    Status:
                    <input
                        type="text"
                        name="status"
                        value={Data.status}
                        readOnly
                    />
                </label>
                <Link to="/orders"><button type="back">Back</button></Link>
            </form>
        </div>
    );
};

export default OrderDetails