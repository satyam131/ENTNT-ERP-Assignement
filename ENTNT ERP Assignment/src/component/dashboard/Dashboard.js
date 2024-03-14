import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import web from "../data/product.svg";
import { NavLink } from 'react-router-dom';

function Dashboard() {

  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    fetch('http://localhost:8000/products')
      .then((response) => response.json())
      .then((data) => setProductCount(data.length))
      .catch((error) => console.error('Error fetching products:', error));

    fetch('http://localhost:8000/orders')
      .then((response) => response.json())
      .then((data) => setOrderCount(data.length))
      .catch((error) => console.error('Error fetching orders:', error));
  }, []);

  return (
    <>
      <section id="header" className='c1'>
        <div className='c2'>
          <div className='c3'>
            <div className='c4'>
              <div className='c5'>
                <div className='c6'>
                  <h1 id='header-text'>Welcome to Our <strong className='brand-name'> ENTNT ERP SYSTEM</strong></h1>
                  <h2 className='c7'> Your solution for efficient business management </h2>
                  <div className='counts-container'>
                    <div className='count-box'>
                      <span className='count'>{productCount}</span>
                      <span className='count-label'>Products</span>
                    </div>
                    <div className='count-box'>
                      <span className='count'>{orderCount}</span>
                      <span className='count-label'>Orders</span>
                    </div>
                  </div>
                  <div className='c8'>
                    <NavLink to='/items' className='c9'>Get Started</NavLink>
                    <NavLink to='/orders' className='c9'>Orders</NavLink>
                  </div>
                </div>

                <div className='c10'>
                  <img src={web} className='c11' alt='home img' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Dashboard;
