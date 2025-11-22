# 🏙️ Real Estate AI Dashboard  
A full-stack AI-assisted real-estate analytics dashboard built using **React (Vite) + Django REST Framework**.  
The system generates **price trends, demand trends, filtered datasets**, and allows users to **download full PDF reports with charts**.

---

## 🚀 Features

### 🔹 AI-Based Natural Query Input  
Users can ask queries like:  
- *"Show price growth for Wakad last 3 years"*  
- *"Compare Aundh and Baner demand trend"*  

### 🔹 Interactive Charts  
- Price Trend (Line Chart)  
- Demand Trend (Line Chart)  
- Auto-exported to PDF

### 🔹 Filtered Dataset Table  
- Clean tabular view  
- Scrollable and responsive  
- Auto-included in PDF

### 🔹 PDF Report Generation  
Backend generates a **beautiful PDF** containing:  
- Summary  
- Charts (Price + Demand)  
- Filtered dataset table

### 🔹 Modern UI  
- Light/Dark mode  
- Premium dashboard layout  
- Fully responsive

---

## 🛠️ Tech Stack

### **Frontend**
- React + Vite  
- Chart.js  
- CSS (custom design system)  

### **Backend**
- Python  
- Django REST Framework  
- Pandas (data processing)  
- ReportLab (PDF generation)

---


---

## 🔧 How to Run the Project Locally

### ✅ **Backend Setup (Django)**

#### **Step 1 — Move to backend folder**
```bash
cd backend

Step 2 — Create virtual environment
bash
Copy code
python -m venv venv

Step 3 — Activate Environment
Windows
venv\Scripts\activate

Mac/Linux
source venv/bin/activate

Step 4 — Install dependencies
pip install -r requirements.txt

Step 5 — Run Django server
python manage.py runserver
Backend will start on:
http://127.0.0.1:8000/

🎨 Frontend Setup (React + Vite)

Step 1 — Move to frontend folder
cd frontend

Step 2 — Install dependencies
npm install

Step 3 — Start React dev server
npm run dev
Frontend will start on:

