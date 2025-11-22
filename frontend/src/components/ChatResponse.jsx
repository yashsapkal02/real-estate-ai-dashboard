import "chart.js/auto";
import { Line } from "react-chartjs-2";

export default function ChatResponse({ query, response }) {
  // If no locality found
  if (response.error) {
    return <div className="error-box">{response.error}</div>;
  }

  // MULTI CITY: response is an object with 2+ keys
  const isMulti = typeof response === "object" && !response.summary;

  if (isMulti) {
    const cities = Object.keys(response);

    return (
      <div>
        <h3 className="response-title">Comparison Results</h3>

        {cities.map((city) => {
          const data = response[city];

          return (
            <div key={city} className="response-card">
              <h3>{city}</h3>

              <p className="summary-text">{data.summary}</p>

              <div className="charts-row">
                <div className="chart-box">
                  <h5>Price Trend</h5>
                  <Line
                    data={{
                      labels: data.price_chart.years,
                      datasets: [
                        {
                          label: "Price",
                          data: data.price_chart.values,
                          borderColor: "#007bff",
                          borderWidth: 3,
                        },
                      ],
                    }}
                  />
                </div>

                <div className="chart-box">
                  <h5>Demand Trend</h5>
                  <Line
                    data={{
                      labels: data.demand_chart.years,
                      datasets: [
                        {
                          label: "Demand",
                          data: data.demand_chart.values,
                          borderColor: "#28a745",
                          borderWidth: 3,
                        },
                      ],
                    }}
                  />
                </div>
              </div>

              <h4 className="section-title">Filtered Table</h4>
              <div className="table-container">
                <table className="styled-table">
                  <thead>
                    <tr>
                      {Object.keys(data.table[0]).map((col) => (
                        <th key={col}>{col}</th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {data.table.map((row, i) => (
                      <tr key={i}>
                        {Object.values(row).map((val, j) => (
                          <td key={j}>{val}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // SINGLE CITY MODE
  return (
    <div className="response-card">
      <h3 className="response-title">Query: {query}</h3>

      <p className="summary-text">{response.summary}</p>

      <div className="charts-row">
        <div className="chart-box">
          <h5>Price Trend</h5>
          <Line
            data={{
              labels: response.price_chart.years,
              datasets: [
                {
                  label: "Price",
                  data: response.price_chart.values,
                  borderColor: "#007bff",
                  borderWidth: 3,
                },
              ],
            }}
          />
        </div>

        <div className="chart-box">
          <h5>Demand Trend</h5>
          <Line
            data={{
              labels: response.demand_chart.years,
              datasets: [
                {
                  label: "Demand",
                  data: response.demand_chart.values,
                  borderColor: "#28a745",
                  borderWidth: 3,
                },
              ],
            }}
          />
        </div>
      </div>

      <h4 className="section-title">Filtered Table</h4>

      <div className="table-container">
        <table className="styled-table">
          <thead>
            <tr>
              {Object.keys(response.table[0]).map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {response.table.map((row, i) => (
              <tr key={i}>
                {Object.values(row).map((val, j) => (
                  <td key={j}>{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
