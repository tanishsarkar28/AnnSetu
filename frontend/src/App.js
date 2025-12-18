import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import DonateForm from './components/DonateForm';
import FoodList from './components/FoodList';
import Auth from './components/Auth';
import MyClaims from './components/MyClaims';

function App() {
  const [donations, setDonations] = useState([]);
  const [user, setUser] = useState(null);
  const [view, setView] = useState('home'); 

  const fetchDonations = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/donations/all`);
      setDonations(res.data);
    } catch (err) { console.log(err); }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
    fetchDonations();
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setView('home');
  };

  return (
    <div className="container">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'30px'}}>
        <h1>Ann-Setu <span style={{fontSize:'1rem', color:'#94a3b8', display:'block', letterSpacing:'2px'}}>Food Waste Management</span></h1>
        {user && <button onClick={handleLogout} style={{background:'#ef4444', color:'white', border:'none', padding:'8px 16px', borderRadius:'8px'}}>Logout</button>}
      </div>

      {!user ? (
        <Auth onLogin={handleLogin} />
      ) : (
        <>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px'}}>
              <p style={{color:'#00d4ff', fontSize:'1.1rem'}}>Welcome, <strong>{user.username}</strong> ({user.role.toUpperCase()})</p>
              
              {user.role === 'ngo' && (
                  <div style={{display:'flex', gap:'10px'}}>
                      <button 
                        onClick={() => setView('home')} 
                        style={{
                            background: view==='home'?'#00d4ff':'transparent', 
                            color: view==='home'?'#0f172a':'#94a3b8', 
                            border: '1px solid #00d4ff',
                            padding:'8px 16px', borderRadius:'20px'
                        }}
                      >
                          🏠 Available
                      </button>
                      <button 
                        onClick={() => setView('myClaims')}
                        style={{
                            background: view==='myClaims'?'#10b981':'transparent', 
                            color: view==='myClaims'?'white':'#94a3b8', 
                            border: '1px solid #10b981',
                            padding:'8px 16px', borderRadius:'20px'
                        }}
                      >
                          ✅ My Claims
                      </button>
                  </div>
              )}
          </div>
          
          {user.role === 'donor' && <DonateForm refreshList={fetchDonations} />}

          {user.role === 'ngo' && view === 'myClaims' ? (
              <MyClaims user={user} />
          ) : (
              <FoodList donations={donations} refreshList={fetchDonations} userRole={user.role} user={user} />
          )}
        </>
      )}
      
      <ToastContainer position="top-right" theme="dark" />
    </div>
  );
}

export default App;