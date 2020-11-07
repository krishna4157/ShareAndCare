import axios from 'axios';

export const findDeviceLocationDetails = async (storeDeviceLocationDetails) => {
    let ip = await axios.get('https://api.ipify.org?format=json');
    ip = ip.data ? ip.data.ip : '';
    if(ip) {
      const url = `http://api.ipstack.com/${ip}?access_key=c98f9f846e07c6574091fc015df947ca`;
      const response = await axios.get(url);
      const data = response.data;
      // console.log(data);
      storeDeviceLocationDetails(data);
    }
}