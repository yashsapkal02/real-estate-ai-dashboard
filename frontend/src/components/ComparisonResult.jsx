// src/components/ComparisonResult.jsx
import ChartBox from "./ChartBox";

function safeKey(name) {
  return String(name || "").replace(/\s+/g, "_").replace(/[^\w\-]/g, "");
}

export default function ComparisonResult({ data }) {
  return (
    <section className="comparison-section">
      <h2 className="section-title">Comparison Results</h2>

      <div className="comparison-grid">
        {Object.entries(data).map(([city, result]) => {
          const key = safeKey(city);

          return (
            <article className="card comparison-card" key={city}>
              <div className="city-head">
                <h3 className="city-title">{city}</h3>
                <p className="summary-text small">{result.summary}</p>
              </div>

              <div className="chart-grid">
                <ChartBox
                  title="Price Trend"
                  labels={result.price_chart?.years || []}
                  values={result.price_chart?.values || []}
                  color="#0d6efd"
                  chartKey={`price_${key}`}
                />

                <ChartBox
                  title="Demand Trend"
                  labels={result.demand_chart?.years || []}
                  values={result.demand_chart?.values || []}
                  color="#28a745"
                  chartKey={`demand_${key}`}
                />
              </div>

              <div className="table-wrapper mt-10">
                <table className="data-table small-table">
                  <thead>
                    <tr>
                      {Object.keys((result.table && result.table[0]) || {}).map((c, idx) => (
                        <th key={idx}>{c}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.table?.map((row, i) => (
                      <tr key={i}>
                        {Object.values(row).map((val, j) => (
                          <td key={j}>{String(val)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
