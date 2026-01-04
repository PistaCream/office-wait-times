"use client";

import { useEffect, useState } from 'react';

interface WaitTime {
  officeId: string;
  officeName: string;
  date: string;
  waitTimeSeconds: number;
}

export default function WaitTimesTable() {
  const [waitTimes, setWaitTimes] = useState<WaitTime[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //err handling?
    fetch('/api/wait-times')
      .then(res => res.json())
      .then(data => {
        setWaitTimes(data.items || []);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading</div>;

  return (
    <div>
      <h1>Wait Times</h1>
      <ul>
        {waitTimes.map((item, i) => (
          <li key={i}>
            {item.officeName} ({item.officeId}): {item.date}: {item.waitTimeSeconds} seconds 
          </li>
        ))}
      </ul>
    </div>
  );
}