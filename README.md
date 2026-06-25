# Queue-Cure-26
QueueCurePro
Transparent, Real-Time Clinic Queue Management System
QueueCurePro is a full-stack healthcare queue management platform designed to eliminate uncertainty in clinic waiting experiences. Patients can track their position in the queue in real time, receptionists can generate and manage tokens efficiently, doctors can control consultation flow, and administrators gain visibility through analytics dashboards.
________________________________________
Problem Statement
In many clinics, patients wait without knowing:
•	Their current queue position
•	Expected waiting time
•	Consultation progress
•	Delays or status changes
This lack of transparency creates frustration, overcrowding, and inefficient clinic operations.
QueueCurePro addresses these challenges through real-time queue visibility and role-based workflow management.
________________________________________
Key Features
Patient Module
•	Track token status in real time
•	View queue position
•	Estimated waiting time
•	Mobile-friendly interface
•	Live status updates
Receptionist Dashboard
•	Generate tokens instantly
•	Register walk-in patients
•	Manage queue flow
•	Search patient records
•	Monitor active queue
Doctor Dashboard
•	Start consultation
•	Complete consultation
•	Call next patient
•	View patient information
•	Update consultation status
Waiting Room Display
•	Current token display
•	Upcoming tokens
•	Real-time announcements
•	Large-screen optimized layout
Admin Dashboard
•	Queue analytics
•	Daily patient statistics
•	Consultation trends
•	Peak-hour analysis
•	Staff activity monitoring
________________________________________
Tech Stack
Frontend
•	React
•	Tailwind CSS
•	React Router
•	Chart.js
Backend
•	Node.js
•	Express.js
•	MongoDB
Real-Time Communication
•	Socket.IO
Authentication
•	JWT Authentication
Deployment
•	Vercel / Netlify
•	Render
________________________________________
System Architecture
Patient Interface
 │
 ▼
Frontend (React + Tailwind)
 │
 ▼
REST APIs + Socket.IO
 │
 ▼
Node.js + Express Server
 │
 ▼
MongoDB Database
Real-Time Updates:
Receptionist → Server → Doctor Dashboard
Doctor → Server → Patient Tracker
Server → Waiting Room Display
________________________________________
Screenshots
Landing Page
<img width="1857" height="938" alt="Screenshot 2026-06-25 192715" src="https://github.com/user-attachments/assets/87717c74-16ec-458b-86a7-7bb4c58aec7c" />
Patient Tracker
 <img width="1827" height="837" alt="Screenshot 2026-06-25 192756" src="https://github.com/user-attachments/assets/92323cb6-acf9-403a-bba7-3e7d439ce1a1" />
Reception Dashboard
 <img width="1806" height="911" alt="Screenshot 2026-06-25 192941" src="https://github.com/user-attachments/assets/24b9575a-3b47-4c38-b68d-d4bd9cd0ddaa" />
Doctor Dashboard
 <img width="1818" height="912" alt="Screenshot 2026-06-25 193114" src="https://github.com/user-attachments/assets/5378721d-f53a-4008-ac1f-742487180f85" />
Waiting Room Display
 <img width="1826" height="926" alt="Screenshot 2026-06-25 195247" src="https://github.com/user-attachments/assets/cee86bc6-4b74-4105-9725-4f16771a3c0a" />
Admin Analytics
 <img width="1812" height="917" alt="Screenshot 2026-06-25 193246" src="https://github.com/user-attachments/assets/8e8a606a-441a-4115-a7fe-f6e46aeca0ee" />
________________________________________
Installation
Clone Repository
git clone https://github.com/Priyadharshini-IT-14/Queue-Cure-26.git
Install Frontend
cd frontend
npm install
Install Backend
cd backend
npm install
Start Backend
npm run dev
Start Frontend
npm run dev
________________________________________
Future Improvements
•	SMS Notifications
•	WhatsApp Alerts
•	Multi-Clinic Support
•	Appointment Scheduling
•	AI Waiting Time Prediction
•	Electronic Medical Record Integration
________________________________________
Outcomes
•	Improved queue transparency
•	Reduced patient anxiety
•	Better clinic workflow
•	Real-time communication between stakeholders
•	Actionable operational insights
________________________________________
Author
1.	Name: Priyadharshini S
2.	LinkedIn: PRIYADHARSHINI S IT	
3.	GitHub: Priyadharshini-IT-14
________________________________________
## 📎 Supporting Docs
- [Research Notes](docs/research/notes.md)
- [Architecture Overview](docs/architecture/overview.md)
- [API Endpoints](docs/api/endpoints.md)
- [Database Collections](docs/database/collections.md)
- [Screenshots](docs/screenshots/)
- [Case Study PDF](docs/QueueCure-CaseStudy.pdf)
