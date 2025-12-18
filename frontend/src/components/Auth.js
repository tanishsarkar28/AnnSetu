import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function Auth({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '', role: 'donor' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isRegister ? 'register' : 'login';
    try {
      // Use environment-configured API base URL for flexibility
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/${endpoint}`, formData);
      
      if (!isRegister) {
        toast.success(`Welcome back, ${res.data.username}!`);
        onLogin(res.data); 
      } else {
        toast.success("Registration Successful! Please Login.");
        setIsRegister(false);
      }
    } catch (err) {
      console.error("Registration Error:", err);
      // ✅ Better Error Message Sahi Hai
      const errorMsg = err.response?.data?.message || err.message || "Registration Failed";
      toast.error("Error: " + errorMsg);
    }
  }; // 👈 Ye wala bracket missing tha tumhare code mein

  return (
    <div className="form-box" style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h2 style={{textAlign:'center', marginTop:0, border:'none'}}>{isRegister ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        
        {isRegister && (
          <select name="role" onChange={handleChange} style={{width: '100%', padding: '12px', background: 'rgba(15, 23, 42, 0.6)', color: 'white', border: '1px solid #334155', borderRadius:'8px', marginBottom:'10px'}}>
            <option value="donor">I want to Donate (Donor)</option>
            <option value="ngo">I am an NGO/Volunteer</option>
          </select>
        )}
        
        <button type="submit" className="submit-btn">{isRegister ? 'Register' : 'Login'}</button>
      </form>
      <p style={{textAlign: 'center', marginTop: '15px', cursor: 'pointer', color: '#00d4ff'}} onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "Already have an account? Login" : "New here? Register"}
      </p>
    </div>
  );
}

export default Auth;