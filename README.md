# Ann-Setu

This repository contains the Ann-Setu frontend and backend.

Quick local run

- Backend
  - copy `backend/.env.example` to `backend/.env` and fill `MONGO_URI` (and `JWT_SECRET` if needed)
  - from the `backend` folder:

```powershell
cd backend
npm install
npm start
```

- Frontend (development)
  - create `frontend/.env` with:
```text
REACT_APP_API_URL=http://<YOUR_COMPUTER_IP>:5000
```
  - run the frontend so your phone can access it over the LAN (bind host to 0.0.0.0):

Windows PowerShell:
```powershell
# set host for react-scripts to listen on all interfaces, then start
$env:HOST = '0.0.0.0'
$env:PORT = '3000'
cd frontend
npm install
npm start
```

Or in CMD (Windows):
```cmd
set HOST=0.0.0.0
set PORT=3000
cd frontend
npm start
```

Then open on your phone's browser: `http://<YOUR_COMPUTER_IP>:3000` (replace `<YOUR_COMPUTER_IP>` with your PC's local IP, e.g. `192.168.1.42`).

Make backend accessible to the frontend on the phone
- Ensure `REACT_APP_API_URL=http://<YOUR_COMPUTER_IP>:5000` in `frontend/.env`.
- Ensure backend is started (it listens on port 5000 by default) and firewall allows incoming connections on that port.

Deploy to GitHub and hosting
- To push to GitHub:
  - Create a repository on GitHub (via website)
  - Then from this project root:
```powershell
git remote add origin https://github.com/<your-username>/<repo>.git
git branch -M main
git push -u origin main
```

- To make the app publicly accessible from mobile without using your LAN IP, deploy the backend (e.g., Render/Heroku) and the frontend (Vercel/Netlify/GitHub Pages). Set `REACT_APP_API_URL` to the deployed backend URL.

If you want, I can:
- try to create the GitHub repo for you (you'd need to provide a personal access token), or
- walk you through deploying backend to Render and frontend to Vercel step-by-step.
# 🍲 Ann-Setu (Food Waste Management System)

Ann-Setu is a Full-Stack MERN Application designed to bridge the gap between Food Donors (Restaurants, Events) and NGOs to reduce food wastage and feed the needy.

## 🚀 Features

- **Role-Based Access:** Separate Login/Dashboard for **Donors** and **NGOs**.
- **Real-Time Listings:** Donors can list food with quantity and expiry details.
- **Geolocation & Maps:** Auto-detects donor location and provides **Google Maps Navigation** links for NGOs.
- **Secure Authentication:** User registration and login system.
- **Interactive UI:** Neo-Brutalist design with Glassmorphism, Neon Theme, and Animations.
- **Status Tracking:** NGOs can claim food (Slider) and mark it as collected.

## 🛠️ Tech Stack

- **Frontend:** React.js, React Toastify (Notifications), SweetAlert2 (Popups).
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB (Atlas/Local).
- **APIs:** Browser Geolocation API, Google Maps URL Integration.

