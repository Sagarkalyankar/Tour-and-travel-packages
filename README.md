# 🌍 Tour and Travel Packages

A full-stack travel and booking website.  
The platform provides **tour packages** with details such as destination, stay, duration (days), perks, and price.  

It has **two modules**:  
- **User (Customer):** Can register, log in, explore packages, view details, and book packages by providing information like number of people and date of travel.  
- **Admin:** Can manage packages, view bookings, and handle customer queries.  

---

## ✨ Features
- 🧳 Browse and explore travel packages  
- 📄 View package details (destination, stay, days, perks, price)  
- 🔐 User authentication (register & login)  
- 📝 Book packages with travel details (people, dates, etc.)  
- 👤 User profile management  
- 🛠 Admin module for managing packages and bookings  
- 📱 Responsive design for a smooth experience  

---

## 🛠 Tech Stack
**Frontend:** Angular / HTML / CSS / JavaScript  
**Backend:** Python Django + Django REST Framework  
**Database:** SQLite (default) / MySQL / PostgreSQL (configurable)  
**Styling:** Bootstrap / Tailwind CSS  

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/Sagarkalyankar/Tour-and-travel-packages.git
cd Tour-and-travel-packages
2. Backend Setup (Django)
bash
Copy code
cd backend
# python -m venv venv
# # Activate venv
# venv\Scripts\activate      # On Windows
# source venv/bin/activate   # On Mac/Linux

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
Backend runs on http://127.0.0.1:8000/

3. Frontend Setup (Angular)
bash
Copy code
cd frontend
npm install
ng serve
Frontend runs on http://localhost:4200/

▶️ Usage
Open the frontend in your browser.

Register a new user or log in.

Browse available packages.

View package details and book by entering required travel information.

Admin can log in to manage packages and bookings.

# 📸 Screenshots
# (Add screenshots here later, e.g.)

# Home Page

# Packages Page

# Booking Form

# Admin Dashboard

🤝 Contribution
Contributions are welcome!

Fork the repository

Create a new branch (git checkout -b feature-name)

Commit your changes (git commit -m "Add feature")

Push to your branch (git push origin feature-name)

Open a Pull Request