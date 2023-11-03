import { useState } from "react";

import ReactApexChart from "react-apexcharts";

function MiniChart({ sparkline, priceChange }) {
  const [chartOptions] = useState({
    series: [
      {
        data: [...sparkline.price],
      },
    ],
    chart: {
      type: "area",
      height: 150,
      sparkline: { enabled: true },
      animations: { enabled: false },
    },
    tooltip: { enabled: false },
    stroke: { width: 1 },
    colors: [chartColor()],
  });

  function chartColor() {
    if (priceChange <= 0) {
      return "#FF3A32";
    } else {
      return "#31CA5B";
    }
  }
  return (
    <ReactApexChart
      options={chartOptions}
      series={chartOptions.series}
      style={{ width: "80px", height: "50px" }}
    />
  );
}

export default MiniChart;
