import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useParams } from 'react-router-dom';
import "./UpdateItem.css";



function UpdateItem() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        productId: '',
        name: '',
        category: '',
        price: '',
        stockQuantity: '',
        id: uuidv4()
    });
    const Navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/products/${id}`);
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
        if (!formData.productId || isNaN(formData.productId)) {
            alert('Product ID must be a number');
            return;
        }

        if (!formData.name || !isNaN(formData.name)) {
            alert('Name must be a string');
            return;
        }

        if (!formData.category || !isNaN(formData.category)) {
            alert('Category must be a string');
            return;
        }

        if (!formData.price || isNaN(formData.price)) {
            alert('Price must be a number');
            return;
        }

        if (!formData.stockQuantity || isNaN(formData.stockQuantity)) {
            alert('Stock Quantity must be a number');
            return;
        }

        fetch("http://localhost:8000/products/" + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(() => {
                console.log('Updated successfully');
                setFormData({
                    productId: '',
                    name: '',
                    category: '',
                    price: '',
                    stockQuantity: '',
                    id: uuidv4()
                });
                Navigate('/items');
            })
            .catch((error) => console.error(error));
    };


    return (
        <div className="create-item-container">
            <h2>Edit Item</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Product ID:
                    <input
                        type="text"
                        name="productId"
                        value={formData.productId}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Category:
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Price:
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Stock Quantity:
                    <input
                        type="number"
                        name="stockQuantity"
                        value={formData.stockQuantity}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    ID:
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


export default UpdateItem;