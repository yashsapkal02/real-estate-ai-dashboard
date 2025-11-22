// src/App.jsx
import { useEffect, useState } from "react";
import ChatInput from "./components/ChatInput";
import ComparisonResult from "./components/ComparisonResult";
import Result from "./components/Result";
import "./styles.css";

// Navbar component
function Navbar({ dark, toggleTheme, onDownload }) {
  return (
    <header className="topbar">
      <div className="topbar-inner page">
        <div className="brand">
          <span className="logo">🏙️</span>
          <div>
            <div className="brand-title">Real Estate AI Dashboard</div>
            <div className="brand-sub">AI-assisted locality insights</div>
          </div>
        </div>

        <div className="top-actions">
          <button className="theme-toggle" onClick={toggleTheme}>
            {dark ? "🌞 Light" : "🌙 Dark"}
          </button>

          <button className="primary download-main" onClick={onDownload}>
            ⬇ Download Report (PDF)
          </button>
        </div>
      </div>
    </header>
  );
}

function safeKey(name) {
  return String(name || "").replace(/\s+/g, "_").replace(/[^\w\-]/g, "");
}

export default function App() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      setDark(true);
      document.body.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !dark;
    setDark(newTheme);
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  const handleAnalyze = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    setResponse(null);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/analyze/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) {
        const t = await res.text();
        setError("Backend error: " + t);
        setLoading(false);
        return;
      }

      const data = await res.json();
      setResponse(data);
    } catch (e) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // helper to get base64 part
  const extractBase64 = (url) => (url ? url.split(",")[1] || "" : "");

  // build payload for download: support single or multi comparison
  const buildAreasPayload = () => {
    if (!response) return [];

    const isComparison =
      response && typeof response === "object" && !response.summary && Object.keys(response).length > 1;

    const areas = [];

    if (!isComparison) {
      const key = safeKey(query || "Locality");
      areas.push({
        name: query || "Locality",
        summary: response.summary || "",
        table: response.table || [],
        price_chart: extractBase64(window[`price_${key}`] || window.priceChart),
        demand_chart: extractBase64(window[`demand_${key}`] || window.demandChart),
      });
      return areas;
    }

    for (const [city, obj] of Object.entries(response)) {
      const key = safeKey(city);
      areas.push({
        name: city,
        summary: obj.summary || "",
        table: obj.table || [],
        price_chart: extractBase64(window[`price_${key}`] || ""),
        demand_chart: extractBase64(window[`demand_${key}`] || ""),
      });
    }

    return areas;
  };

  // Download PDF (calls backend endpoint; unchanged backend behavior)
  const handleDownloadReport = async () => {
    if (!response) {
      alert("Please run analysis first.");
      return;
    }

    const areas = buildAreasPayload();
    if (!areas.length) {
      alert("No area data available for export.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://127.0.0.1:8000/api/download-full/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ areas }),
      });

      if (!res.ok) {
        const t = await res.text();
        alert("PDF generation failed: " + t);
        setLoading(false);
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "RealEstate_Report.pdf";
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      alert("Failed to download report.");
    } finally {
      setLoading(false);
    }
  };

  const isComparison =
    response &&
    typeof response === "object" &&
    !response.summary &&
    Object.keys(response).length > 1;

  return (
    <>
      <Navbar dark={dark} toggleTheme={toggleTheme} onDownload={handleDownloadReport} />

      <main className="page">
        <h1 className="title">Real Estate Analysis Chatbot</h1>

        <ChatInput query={query} setQuery={setQuery} onSubmit={handleAnalyze} />

        {loading && <p className="loading">Analyzing... please wait</p>}
        {error && <p className="error">{error}</p>}

        {!loading && response && (
          <>
            {isComparison ? (
              <ComparisonResult data={response} />
            ) : (
              <Result query={query} data={response} />
            )}
          </>
        )}
      </main>
    </>
  );
}
