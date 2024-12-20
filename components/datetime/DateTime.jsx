import React, { useState, useEffect } from 'react';

const DateTime = () => {
  // State to store the current date and time
  const [dateTime, setDateTime] = useState(new Date());

  // Update the time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000); // Update every second (1000 ms)

    // Clean up the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
     
      <small>{dateTime.toLocaleString()}</small>
    </div>
  );
};

export default DateTime;
