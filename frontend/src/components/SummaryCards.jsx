export default function SummaryCards({ summary, growth }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-4">
      
      <div className="bg-white p-4 rounded-xl shadow border-l-4 border-blue-500">
        <h3 className="text-sm text-gray-500">Average Price</h3>
        <p className="text-xl font-bold">{summary.avg_price}</p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow border-l-4 border-green-500">
        <h3 className="text-sm text-gray-500">Avg Units Sold</h3>
        <p className="text-xl font-bold">{summary.avg_units}</p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow border-l-4 border-purple-500">
        <h3 className="text-sm text-gray-500">Years of Data</h3>
        <p className="text-xl font-bold">{summary.years_count}</p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow border-l-4 border-red-500">
        <h3 className="text-sm text-gray-500">Growth % (2020→2024)</h3>
        <p className="text-xl font-bold">{growth}%</p>
      </div>

    </div>
  );
}
