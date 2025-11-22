// src/components/Result.jsx
import ChartBox from "./ChartBox";

function safeKey(name) {
  return String(name || "").replace(/\s+/g, "_").replace(/[^\w\-]/g, "");
}

export default function Result({ query, data }) {
  const key = safeKey(query || "locality");

  return (
    <section className="result-section card">
      <div className="result-header">
        <div>
          <h2 className="section-title">Results for: {query}</h2>
          <p className="summary-text">{data.summary}</p>
        </div>

        {/* quick action: download this table only */}
        <div>
          {/* Buttons removed from here — top navbar handles PDF */}
        </div>
      </div>

      <div className="chart-grid">
        <ChartBox
          title="Price Trend"
          labels={data.price_chart?.years || []}
          values={data.price_chart?.values || []}
          color="#007bff"
          chartKey={`price_${key}`}
        />

        <ChartBox
          title="Demand Trend"
          labels={data.demand_chart?.years || []}
          values={data.demand_chart?.values || []}
          color="#28a745"
          chartKey={`demand_${key}`}
        />
      </div>

      <div className="table-wrapper mt-20">
        <table className="data-table">
          <thead>
            <tr>
              {Object.keys(data.table[0] || {}).map((col, idx) => (
                <th key={idx}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.table.map((row, i) => (
              <tr key={i}>
                {Object.values(row).map((val, j) => (
                  <td key={j}>{String(val)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
