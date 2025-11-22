🏙️ Real Estate AI Dashboard
AI-powered locality analysis, chart visualization, and smart PDF report generation

The Real Estate AI Dashboard is a full-stack application that allows users to analyze real-estate trends using natural language queries.
Users can ask questions like:

"Give me analysis of Wakad"

"Compare Kothrud and Aundh demand trend"

"Show price growth for Akurdi over the last 3 years"

The system automatically:
✔ Extracts locality names
✔ Filters dataset
✔ Generates price & demand charts
✔ Produces summaries
✔ And exports everything into a professional PDF report (charts + table)

⭐ Features
🔍 Natural Language Query Analysis

Users can ask questions in plain English — the backend extracts locations automatically.

📊 Interactive Visual Charts

Price Trend

Demand Trend

Multi-city comparison

Built with Chart.js + React.

🗂️ Smart Filtered Dataset

Only the relevant locality data is displayed.

📄 One-click PDF Report

PDF includes:

Summary

Price chart

Demand chart

Filtered dataset table

Works for single & multiple locations.

🌙 Light/Dark Mode

Smooth theme toggle saved in localStorage.

🚀 Fully Responsive UI

Premium dashboard-style layout with modern animations and styling.

🛠️ Tech Stack
🎨 Frontend

React (Vite) – Fast UI rendering

Chart.js – For professional charts

CSS3 – Custom premium UI

Fetch API – For API communication

⚙️ Backend

Python (Django) – Stable & scalable backend

Pandas – Data filtering & analysis

ReportLab – PDF report generation

Regex – Query locality extraction

OpenAI API (Optional) – For AI summaries (mocked in your version)

🗄️ Database / Data

Excel data source (Sample_data.xlsx)

Easily extendable to PostgreSQL/MySQL later

📂 Project Structure (Simplified)
backend/
│── views.py
│── utils.py
│── views_download_full.py
│── data/Sample_data.xlsx

frontend/
│── src/
│   ├── App.jsx
│   ├── styles.css
│   ├── components/
│   │    ├── ChatInput.jsx
│   │    ├── ChartBox.jsx
│   │    ├── Result.jsx
│   │    ├── ComparisonResult.jsx
│   │
│── index.html

🚀 How to Run Locally
1️⃣ Clone the Repository
git clone https://github.com/your-username/real-estate-ai-dashboard.git
cd real-estate-ai-dashboard

2️⃣ Backend Setup (Django)
Install dependencies
cd backend
pip install -r requirements.txt

Required Environment Variables

Create a .env file inside /backend:

OPENAI_KEY=your_api_key_here   # Optional (mock mode works without it)

Run backend server

python -m venv venv
venv\Scripts\activate

python manage.py runserver


Backend runs on:
👉 http://127.0.0.1:8000

3️⃣ Frontend Setup (React + Vite)
Install dependencies
cd frontend
npm install

Run frontend
npm run dev


Frontend runs on something like:
👉 http://localhost:5173

🔗 API Endpoints
POST /api/analyze/

Input:

{ "query": "Give me analysis of Wakad" }


Output:

{
  "summary": "...",
  "table": [...],
  "price_chart": {...},
  "demand_chart": {...}
}

POST /api/download-full/

Input:

{
  "areas": [
    {
      "name": "Wakad",
      "summary": "...",
      "table": [...],
      "price_chart": "<base64>",
      "demand_chart": "<base64>"
    }
  ]
}


Returns:
📄 PDF file download

🖼️ Screenshots (Add after upload)

Place your screenshots in /assets/screenshots/ and reference them here:
<img width="1366" height="646" alt="1" src="https://github.com/user-attachments/assets/6f9121e9-3d11-4b21-8dd0-7459233d336d" />
<img width="1366" height="538" alt="2" src="https://github.com/user-attachments/assets/ee6a1a2f-b37e-4a98-9f08-12a5fe337a00" />
<img width="1364" height="336" alt="3" src="https://github.com/user-attachments/assets/8d33a92d-72a0-4b27-8d6a-805cfa3a62f5" />
<img width="1356" height="425" alt="5" src="https://github.com/user-attachments/assets/d6eed7f9-9dcb-4653-bf53-0583ecbe7533" />

