import React, { useState, useEffect } from 'react';
import { fetchIpIfo } from '../utills/ipaddress';

function IpAddressLocation() {
  const [data, setData] = useState(null); // State to store IP information
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    const fetchData = async () => {
      console.log('Fetching IP info...');
      const result = await fetchIpIfo();
      console.log('Fetched result:', result);
      setData(result); // Update state with fetched data
      setLoading(false); // Loading is complete
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading IP Info...</div>;
  }

  if (!data) {
    return <div>Error fetching IP information.</div>;
  }

  return (
    <div>
      <p>IP Address: {data.query}</p>
      <p>City: {data.city}</p>
      <p>Region: {data.regionName}</p>
      <p>Country: {data.country}</p>
      <p>Zip Code: {data.zip}</p>
      <p>Latitude: {data.lat}</p>
      <p>Longitude: {data.lon}</p>
    </div>
  );
}

export default IpAddressLocation;
