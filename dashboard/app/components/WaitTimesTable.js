"use client";

import { useEffect, useState } from 'react';

export default function WaitTimesTable() {
  const [waitTimes, setWaitTimes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
        {waitTimes.map((item, idx) => (
          <li key={idx}>
            {item.officeName} ({item.officeId}): {item.date}: {item.waitTimeSeconds} seconds 
          </li>
        ))}
      </ul>
    </div>
  );
}