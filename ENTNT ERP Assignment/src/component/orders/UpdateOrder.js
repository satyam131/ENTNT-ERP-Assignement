import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useParams } from 'react-router-dom';
import "./UpdateOrder.css";

function UpdateOrder() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        orderId: '',
        productId: '',
        productName: '',
        customerName: '',
        orderDate: '',
        status: '',
        id: ''
    });
    const Navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/orders/${id}`);
                const data = await response.json();
                setFormData(data);
                return data;
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error;
            }
        };
        fetchData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.status || !isNaN(formData.status)) {
            alert('Status must be a string');
            return;
        }

        fetch("http://localhost:8000/orders/" + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(() => {
                console.log('Updated orders successfully');
                setFormData({
                    orderId: '',
                    productId: '',
                    productName: '',
                    customerName: '',
                    orderDate: '',
                    status: '',
                    id: uuidv4()
                });
                Navigate('/orders');
            })
            .catch((error) => console.error(error));
    };



    return (
        <div className="create-item-container">
            <h2>Edit Order</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Order ID:
                    <input
                        type="text"
                        name="orderId"
                        value={formData.orderId}
                        readOnly
                    />
                </label>
                <label>
                    Product ID:
                    <input
                        type="text"
                        name="productId"
                        value={formData.productId}
                        readOnly
                    />
                </label>
                <label>
                    Product Name:
                    <input
                        type="text"
                        name="productName"
                        value={formData.productName}
                        readOnly
                    />
                </label>
                <label>
                    Customer Name:
                    <input
                        type="text"
                        name="customerName"
                        value={formData.customerName}
                        readOnly
                    />
                </label>
                <label>
                    Order Date:
                    <input
                        type="date"
                        name="orderDate"
                        value={formData.orderDate}
                        readOnly
                    />
                </label>
                <label>
                    Status:
                    <input
                        type="text"
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                    />
                    <span style={{ color: "green" }}>Change Status of delivery (editable)</span>
                </label>
                <label>
                    ID :
                    <input
                        type="text"
                        name="id"
                        value={formData.id}
                        readOnly
                    />
                </label>
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default UpdateOrder