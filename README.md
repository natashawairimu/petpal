#  PetPal – Your Trusted Pet Care Companion

**PetPal** is a fullstack web application designed to help pet owners manage their pets, book appointments, track notes, and connect with service providers. Whether you're a pet parent or a vet clinic, PetPal keeps everything simple, safe, and smart.

---

##  Features

- User authentication (signup/login/logout)
- Role-based access (Admin & Regular user)
- Add, view, and manage pets
- Book and view appointments
- Track medical and care notes
- Admins can manage providers
- Responsive, clean UI with animated branding
- Secure backend API with Flask

---

##  Tech Stack

| Frontend        | Backend        | Database     |
|-----------------|----------------|--------------|
| React (Vite)    | Flask (Python) | SQLite 
| React Router    | SQLAlchemy ORM |              |
| Custom CSS      | Flask-CORS     |              |

---

##  Project Structure

petpal/
├── client/ # React frontend (Vite)
│ └── src/
│ ├── components/
│ ├── assets/
│ └── App.jsx
├── server/ # Flask backend
│ ├── models.py
│ ├── routes/
│ └── app.py
└── README.md

yaml
Copy
Edit

---

##  Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/petpal.git
cd petpal
2. Set Up the Backend
bash
Copy
Edit
cd server
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
flask db init
flask db migrate
flask db upgrade
flask run
The backend will run on http://localhost:5000

3. Set Up the Frontend
bash
Copy
Edit
cd client
npm install
npm run dev
The frontend will run on http://localhost:5173

 Make sure the frontend is fetching data from the backend (http://localhost:5000)

 Deployment
Backend (e.g., Render/Railway)
Push your Flask backend to GitHub

Create a new Render or Railway project

Add environment variables (e.g., DATABASE_URL, FLASK_ENV)

Deploy and copy the public API URL

Frontend (e.g., Netlify/Vercel)
Push your Vite frontend to GitHub

Update API URLs in src to use the deployed backend URL

Deploy from GitHub repo

 Author
Natasha Wairimu
GitHub Profile

License
This project is licensed under the MIT License.

