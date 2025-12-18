import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'; 
import { FaCheckCircle, FaMapMarkedAlt, FaPhoneAlt } from 'react-icons/fa';

function MyClaims({ user }) {
  const [claims, setClaims] = useState([]);

  const fetchMyClaims = async () => {
    try {
      // 👇 FIX: Render Link Updated
      const res = await axios.get(`https://annsetu.onrender.com/api/donations/my-claims?userId=${user._id}`);
      setClaims(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    if (user && user._id) fetchMyClaims();
  }, [user]);

  const handleCollect = async (id) => {
      const result = await Swal.fire({
          title: 'Mark as Collected?',
          text: "Have you picked up the food successfully?",
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#10b981',
          cancelButtonColor: '#ef4444',
          confirmButtonText: 'Yes, Collected!',
          background: '#1e293b',
          color: '#fff'
      });

      if(result.isConfirmed) {
          try {
              // 👇 FIX: Render Link Updated
              await axios.put(`https://annsetu.onrender.com/api/donations/update/${id}`, { status: 'collected' });
              
              Swal.fire({
                  title: 'Great Job!',
                  text: 'Food saved successfully! 🌍',
                  icon: 'success',
                  background: '#1e293b',
                  color: '#fff',
                  confirmButtonColor: '#10b981'
              });
              
              fetchMyClaims();
          } catch (err) { toast.error("Error updating status"); }
      }
  };

  const openMap = (lat, lng) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.open(url, '_blank');
  };

  return (
    <div>
      <h2 style={{color: '#10b981', borderBottomColor: '#064e3b'}}>✅ My Claims</h2>
      {claims.length === 0 ? <p style={{textAlign:'center', color:'#64748b'}}>You haven't claimed any food yet.</p> : null}

      {claims.map((food) => (
        <div key={food._id} className="food-card" style={{borderLeft: '5px solid #10b981'}}>
          <div className="food-info">
            <h3>{food.foodItem}</h3>
            <p><strong>Donor:</strong> {food.donorName}</p>
            <p><FaPhoneAlt color="#10b981"/> {food.phone}</p>
            
            <p>
                {food.latitude && food.longitude ? (
                    <span className="map-link" onClick={() => openMap(food.latitude, food.longitude)} style={{color:'#10b981', borderColor:'#10b981', cursor:'pointer'}}>
                        <FaMapMarkedAlt /> Navigate to Location
                    </span>
                ) : <span>📍 {food.location}</span>}
            </p>
          </div>
          
          <div className="action-area">
             <button onClick={() => handleCollect(food._id)} style={{
                    background: '#10b981', color: 'white', border: 'none', 
                    padding: '10px 15px', borderRadius: '8px', cursor: 'pointer', display:'flex', alignItems:'center', gap:'5px'
             }}>
                 <FaCheckCircle /> Mark Collected
             </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyClaims;