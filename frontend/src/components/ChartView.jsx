import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function ChartView({ data, label }) {
  if (!data?.years) return <p>No chart data available.</p>;

  const chartData = {
    labels: data.years,
    datasets: [
      {
        label,
        data: data.values,
        borderColor: "#007bff",
        tension: 0.3,
      },
    ],
  };

  return <Line data={chartData} />;
}
