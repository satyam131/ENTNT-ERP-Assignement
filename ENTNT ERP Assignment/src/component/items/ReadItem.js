import React from 'react';
import "./ReadItem.css";
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

function ReadItem() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [Data, setData] = useState({
        productId: '',
        name: '',
        category: '',
        price: 0,
        stockQuantity: 0,
        id: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/products/${id}`);
                const data = await response.json();
                setData(data);
                console.log("Read Successfully");
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
            <h2>Item Details</h2>
            <form>
                <label>
                    Product ID:
                    <input
                        type="text"
                        name="productId"
                        value={Data.productId}
                        readOnly
                    />
                </label>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={Data.name}
                        readOnly
                    />
                </label>
                <label>
                    Category:
                    <input
                        type="text"
                        name="category"
                        value={Data.category}
                        readOnly
                    />
                </label>
                <label>
                    Price:
                    <input
                        type="number"
                        name="price"
                        value={Data.price}
                        readOnly
                    />
                </label>
                <label>
                    Stock Quantity:
                    <input
                        type="number"
                        name="stockQuantity"
                        value={Data.stockQuantity}
                        readOnly
                    />
                </label>
                <label>
                    ID:
                    <input
                        type="text"
                        name="id"
                        value={Data.id}
                        readOnly
                    />
                </label>
                <Link to="/items"><button type="back">Back</button></Link>
            </form>
        </div>
    );
};


export default ReadItem;