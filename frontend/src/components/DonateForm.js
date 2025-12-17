import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

function DonateForm({ refreshList }) {
  const [formData, setFormData] = useState({
    donorName: '', foodItem: '', quantity: '', location: '', phone: '', expiryTime: '', latitude: '', longitude: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      toast.info("⏳ Detecting Location...");
      navigator.geolocation.getCurrentPosition((position) => {
        setFormData((prev) => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          location: "📍 Current Location Detected"
        }));
        toast.success("Location Detected Successfully!");
      }, (error) => {
        console.error(error);
        toast.error("Please allow Location Access!");
      });
    } else {
      toast.error("Geolocation not supported.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.phone.length !== 10 || !/^\d+$/.test(formData.phone)) {
        toast.error("⚠️ Phone number must be exactly 10 digits!");
        return;
    }

    try {
      await axios.post('http://localhost:5000/api/donations/add', formData);
      toast.success("🎉 Food Listed Successfully!");
      setFormData({ 
        donorName: '', foodItem: '', quantity: '', location: '', 
        phone: '', expiryTime: '', latitude: '', longitude: '' 
      });
      refreshList();
    } catch (err) {
      console.error(err);
      toast.error("Error listing donation.");
    }
  };

  return (
    <div className="form-box">
      <h2>🍲 Donate Food</h2>
      <form onSubmit={handleSubmit}>
        <input name="donorName" placeholder="Your Name" onChange={handleChange} value={formData.donorName} required />
        <input name="foodItem" placeholder="Food Item (e.g. Rice)" onChange={handleChange} value={formData.foodItem} required />
        <input name="quantity" placeholder="Quantity (e.g. 5kg)" onChange={handleChange} value={formData.quantity} required />
        
        <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
            <input name="location" placeholder="Pickup Address" onChange={handleChange} value={formData.location} required style={{flex:1}} />
            <button type="button" onClick={handleGetLocation} style={{
                height: '42px', padding: '0 20px', background: '#10b981', 
                color: 'white', border: 'none', borderRadius: '8px', display:'flex', alignItems:'center', gap:'5px'
            }}>
                <FaMapMarkerAlt /> Detect
            </button>
        </div>

        <input type="text" name="phone" placeholder="Phone Number (10 digits)" onChange={handleChange} value={formData.phone} maxLength="10" required />
        <label style={{color:'#94a3b8', fontSize:'12px', marginLeft:'5px'}}>Expiry Time:</label>
        <input type="datetime-local" name="expiryTime" onChange={handleChange} value={formData.expiryTime} required />
        
        <button type="submit" className="submit-btn"><FaPaperPlane style={{marginRight:'8px'}}/> List Donation</button>
      </form>
    </div>
  );
}

export default DonateForm;