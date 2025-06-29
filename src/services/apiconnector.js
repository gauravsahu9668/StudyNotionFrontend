
import axios from 'axios'

export const axiosintstance=axios.create({});

export const apiconnector = (method,url,bodyData,headers,params)=>{
    return axiosintstance({
        method:`${method}`,
        url:`${url}`,
        data: bodyData ? bodyData:null,
        headers: headers ? headers:null,
        params: params ? params :null,
        })
}
export function formatDate(isoString) {
  const date = new Date(isoString);

  // Options for formatting
  const options = {
    year: 'numeric',
    month: 'long',   // "July"
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true     // 12-hour format with AM/PM
  };

  // Format using Intl.DateTimeFormat
  return new Intl.DateTimeFormat('en-US', options).format(date);
}
