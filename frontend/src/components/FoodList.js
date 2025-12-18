import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'; 
import { FaMapMarkedAlt, FaUser, FaBoxOpen, FaClock } from 'react-icons/fa';

function FoodList({ donations, refreshList, userRole, user }) {

  const handleClaim = async (e, id) => {
    if (!e.target.checked) return;

    const result = await Swal.fire({
        title: 'Claim this Food?',
        text: "You are about to mark this donation as claimed!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#00d4ff',
        cancelButtonColor: '#ef4444',
        confirmButtonText: 'Yes, Claim it!',
        background: '#1e293b',
        color: '#fff'
    });

    if (result.isConfirmed) {
        try {
        // Use configured API url
        await axios.put(`${process.env.REACT_APP_API_URL}/api/donations/update/${id}`, { 
          status: 'claimed',
          claimedBy: user._id 
        });
            
            Swal.fire({
                title: 'Success!',
                text: 'Added to your "My Claims" list.',
                icon: 'success',
                background: '#1e293b',
                color: '#fff',
                confirmButtonColor: '#00d4ff'
            });

            refreshList(); 
        } catch (err) {
            console.error(err);
            toast.error("Failed to claim food.");
            e.target.checked = false;
        }
    } else {
        e.target.checked = false;
    }
  };

  const openMap = (lat, lng) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.open(url, '_blank');
  };

  return (
    <div>
      <h2>🍛 Available Food</h2>
      {donations.length === 0 ? <p style={{textAlign:'center', color:'#64748b', marginTop:'20px'}}>No food available right now.</p> : null}
      
      {donations.map((food) => (
        <div key={food._id} className="food-card">
          <div className="food-info">
            <h3><FaBoxOpen color="#00d4ff"/> {food.foodItem}</h3>
            <p><FaUser color="#94a3b8"/> <strong>Donor:</strong> {food.donorName} | <strong>Qty:</strong> {food.quantity}</p>
            
            <p>
                {food.latitude && food.longitude ? (
                    <span className="map-link" onClick={() => openMap(food.latitude, food.longitude)} style={{cursor:'pointer'}}>
                        <FaMapMarkedAlt /> View Location
                    </span>
                ) : (
                    <span>📍 {food.location}</span>
                )}
            </p>
            <p style={{color:'#ef4444', fontSize:'13px'}}><FaClock /> Expires: {new Date(food.expiryTime).toLocaleString()}</p>
          </div>
          
          <div className="action-area" style={{minWidth:'80px', textAlign:'center'}}>
            {userRole === 'ngo' ? (
              <>
                <label className="switch">
                  <input type="checkbox" onChange={(e) => handleClaim(e, food._id)} />
                  <span className="slider"></span>
                </label>
                <div className="status-label">Slide to Claim</div>
              </>
            ) : (
              <span style={{color: '#00d4ff', border: '1px solid #00d4ff', padding: '5px 10px', borderRadius: '5px', fontSize:'12px'}}>Available</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default FoodList;