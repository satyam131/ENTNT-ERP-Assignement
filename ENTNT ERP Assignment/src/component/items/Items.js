import React from 'react';
import './Items.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const fetchData = async () => {
  try {
    const response = await fetch('http://localhost:8000/products');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

function Items() {
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDataAndRender = async () => {
      try {
        const fetchedData = await fetchData();
        setData(fetchedData);
      } catch (error) {
        console.error("Unable to Set Data")
        throw error;
      }
    };

    fetchDataAndRender();
  }, [flag]);


  const handleEdit = (product) => {
    navigate(`/edit/${product.id}`);
  };

  const handleView = (product) => {
    navigate(`/read/${product.id}`);
  };


  const handleDelete = (productId) => {
    const confirm = window.confirm("Would you like to Delete?");
    if (confirm) {
      fetch("http://localhost:8000/products/" + productId, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then(() => {
          console.log('Deleted successfully');
          setFlag((prevFlag) => !prevFlag);
          navigate('/items');
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <div className="container">
      <div id='create-btn'><Link to="/create" className='create-button'>Add Product</Link></div>
      <br />
      {data.map(item => (
        <div key={item.id} className="card">
          <h1>{item.name}</h1>
          <p>Category: {item.category}</p>
          <p>Price: ${item.price}</p>
          <p>Stock Quantity: {item.stockQuantity}</p>
          <button onClick={() => handleEdit(item)}>Edit</button>
          <button className="delete-btn" onClick={() => handleDelete(item.id)}>Delete</button>
          <button className="read-btn" onClick={() => handleView(item)}>View</button>
        </div>
      ))}

    </div>
  );
};


export default Items;