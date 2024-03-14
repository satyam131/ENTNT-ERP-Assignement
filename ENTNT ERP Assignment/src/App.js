import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './component/navbar/Navbar';
import Dashboard from './component/dashboard/Dashboard';
import Items from './component/items/Items';
import Orders from './component/orders/Orders';
import Calender from './component/calender/Calender';
import CreateItem from './component/items/CreateItem';
import UpdateItem from './component/items/UpdateItem';
import ReadItem from './component/items/ReadItem';
import OrderDetails from './component/orders/OrderDetails';
import OrderEdit from './component/orders/UpdateOrder';


function App() {
  return (
    <Router>
      <Navbar />
      <main className='main-content'>
        <Routes>
          <Route path="/" element={<div><Dashboard /></div>} />
          <Route path="/items" element={< Items />} />
          <Route path='/create' element={<CreateItem />} />
          <Route path='/edit/:id' element={<UpdateItem />} />
          <Route path='/read/:id' element={<ReadItem />} />
          <Route path="/orders" element={< Orders />} />
          <Route path="/readOrder/:id" element={< OrderDetails />} />
          <Route path="/orderEdit/:id" element={< OrderEdit />} />
          <Route path="/calender" element={< Calender />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
