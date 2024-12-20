export async function fetchIpIfo() {
    try {
      const response = await fetch('http://ip-api.com/json/');
      const data = await response.json();
      console.log("IP Address:", data.query);
      console.log("City:", data.city);
      console.log("Region:", data.regionName);
      console.log("Country:", data.country);
      console.log("Latitude:", data.lat);
      console.log("Longitude:", data.lon);
  
      return data;
    } catch (error) {
      console.error('Error fetching IP Info', error);
    }
  }
  