"use client";
import { WaitTimeData } from "../types/waitTime";
import { LineChart } from '@mui/x-charts/LineChart';

function extractHour(hourStr: string) {
  const hour = parseInt(hourStr.slice(-2))-10;
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  const period = hour < 12 ? "am" : "pm"
  return `${hour12}${period}`;
}

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

export default function DayLineChart({ waitTimes }: { waitTimes: WaitTimeData[] }) {
  if (waitTimes?.length === 0) {
    return (
      <div>Data not found</div>
    )
  }
  const hours = waitTimes.map(wt => extractHour(wt.date));
  const waitTimesMins = waitTimes.map(wt => wt.waitTimeSeconds / 60);
  return (
    //TODO: Think of better way to abstract this with DayBarChart
    <LineChart
      xAxis={[{ data: hours }]}
      series={[{ data: waitTimesMins }]}
      {...chartSetting}
    />
  );
}