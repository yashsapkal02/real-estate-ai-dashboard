
export default function DataTable({ rows }) {
  if (!rows || rows.length === 0) {
    return <p>No table data found.</p>;
  }

  const columns = Object.keys(rows[0]);

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-striped table-sm">
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {columns.map((c) => (
                <td key={c}>{row[c]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
