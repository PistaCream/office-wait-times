"use client";
import { BarChart } from '@mui/x-charts/BarChart';
import { WaitTimeData } from "../types/waitTime";

const chartSetting = {
  yAxis: [
    {
      label: 'Wait Time (Minutes)',
      width: 60,
    },
  ],
  width: 800,
  height: 300,
};

export default function DayBarChart({ waitTimes }: { waitTimes: WaitTimeData[] }) {
  if (waitTimes?.length === 0) {
    //TODO: make this look better
    return (
      <div>Data not found</div>
    )
  }
  const hours = waitTimes.map(wt => wt.date);
  const waitTimesSecs = waitTimes.map(wt => wt.waitTimeSeconds / 60);
  return (
    <BarChart
      xAxis={[{ data: hours }]}
      series={[{ data: waitTimesSecs }]}
      {...chartSetting}
    />
  );
}