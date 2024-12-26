import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import { format, parseISO} from 'date-fns'

export async function fetchData(method, Parameters = [], responseElement, resultElement) {
    try {
      const ParameterElements = Parameters.map(
        (item) => `<${item.parameter}>${item.value}</${item.parameter}>`
      ).join("\n");
  
      console.log('method', method);
      console.log('PARAMETER', ParameterElements);
      console.log('response Element', responseElement);
      console.log('result Element', resultElement);
  
      const payload = `<?xml version="1.0" encoding="utf-8"?>
        <soap:Envelope 
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
        xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
        xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
          <soap:Body>
            <${method} xmlns="http://tempuri.org/">
              ${ParameterElements}
            </${method}>
          </soap:Body>
        </soap:Envelope>`;
  
      const headers = { "Content-Type": "text/xml" };
  
      const response = await axios.post(
        "http://182.180.121.186:4000/retailService.asmx",
        payload,
        { headers }
      );
  
      if (response.status === 200) {
        const parser = new XMLParser();
        const parsedData = parser.parse(response.data);
  
        // Extract the inventory_repResult (which contains JSON string)
        const inventoryResultString =
          parsedData?.["soap:Envelope"]?.["soap:Body"]?.[responseElement]?.[resultElement];
        //   console.log(inventoryResultString)

  
        if (inventoryResultString) {
          return inventoryResultString; // Return the parsed JSON data
        } else {
          throw new Error(`Result element '${resultElement}' not found in the response.`);
        }
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error in fetchData:", error);
      throw error;
    }
  }





  