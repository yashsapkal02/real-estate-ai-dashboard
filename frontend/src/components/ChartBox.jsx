// src/components/ChartBox.jsx
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

function safeKey(key) {
  return String(key || "").replace(/\s+/g, "_").replace(/[^\w\-]/g, "");
}

export default function ChartBox({ title, labels = [], values = [], color = "#007bff", chartKey }) {
  const chartRef = useRef(null);

  useEffect(() => {
    // delay a tick so the chart renders fully, then capture
    const timer = setTimeout(() => {
      try {
        const chartInstance = chartRef.current;
        // react-chartjs-2 v4: chartRef.current is chart instance with .canvas
        const canvas = chartInstance?.canvas || (chartInstance?.ctx && chartInstance?.ctx.canvas);
        if (canvas && canvas.toDataURL) {
          const base64 = canvas.toDataURL("image/png");
          if (chartKey) {
            window[`price_${safeKey(chartKey)}`] = base64; // keep naming consistent if caller expects price_... keys
            // Also store raw key for single charts
            window[chartKey] = base64;
          } else {
            // fallback store generic
            window.priceChart = base64;
          }
        }
      } catch (err) {
        // non-fatal; capturing chart is best-effort
        // console.warn("chart capture:", err);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [labels, values, chartKey]);

  const data = {
    labels,
    datasets: [
      {
        label: title,
        data: values,
        borderColor: color,
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 3,
        pointBackgroundColor: "#fff",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { grid: { color: "#eee" } },
      y: { grid: { color: "#eee" } },
    },
  };

  return (
    <div className="chart-card premium-chart">
      <h4>{title}</h4>
      <div style={{ height: 260 }}>
        <Line ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
}
