import { merge } from "lodash";
import ReactApexChart from "react-apexcharts";
// material
import { Card, CardHeader, Box } from "@mui/material";
import BaseOptionChart from "./BaseOptionChart";
import { Fragment } from "react";
//

// ----------------------------------------------------------------------

const CHART_DATA = [
  {
    name: "Bottom 10%",
    type: "column",
    data: [23, 11, 22, 27, 13, 22, 37, 21],
  },
  {
    name: "Median salary",
    type: "area",
    data: [30, 25, 36, 30, 45, 35, 64, 52],
  },
  {
    name: "Top 10%",
    type: "line",
    data: [44, 55, 41, 67, 22, 43, 21, 41],
  },
];

export default function Graph(props) {
  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: props.strokeWidth },
    plotOptions: { bar: { columnWidth: "11%", borderRadius: 4 } },
    fill: { type: props.fill },
    labels: [
      "01/01/2015",
      "01/01/2016",
      "01/01/2017",
      "01/01/2018",
      "01/01/2019",
      "01/01/2020",
      "01/01/2021",
      "01/01/2022",
    ],
    xaxis: { type: "datetime" },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== "undefined") {
            return props.formatter(y);
          }
          return y;
        },
      },
    },
  });

  return (
    <Fragment>
      <CardHeader title={props.cardHeader} subheader={props.subHeader} />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart
          type="line"
          series={props.chartData}
          options={chartOptions}
          height={364}
        />
      </Box>
    </Fragment>
  );
}
