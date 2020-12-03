import axios from 'axios';
import JSOG from 'jsog';
import _ from 'lodash';
import { retrieveSubjectDeviceToken } from './secureStorageUtils';


const axiosConfig = axios.create({
  baseURL: 'http://192.168.2.67:8082/api/app',
  headers: { 'Access-Control-Allow-Origin': '*' },
  // auth: {
  //   username: '+19999996116',
  //   password: '1234',
  // },
  transformResponse: [].concat(
    axios.defaults.transformResponse,
    data => JSOG.decode(data),
  ),
});

axiosConfig.interceptors.request.use(
  config => getConfig(config),
  error => {
    Promise.reject(error);
  },
);
// aaxios.defaults.headers.common['Authorization'] = 'Basic ZXpwcm9AYWxwaGFjbGluaWNhbHN5c3RlbXMuY29tOkFzZHgjMTIz';
// Authorization: 'Basic ZXpwcm9AYWxwaGFjbGluaWNhbHN5c3RlbXMuY29tOkFzZHgjMTIz'

const getConfig = async (config) => {
  const data = await retrieveSubjectDeviceToken();
  if(data.subjectDeviceToken != null && data.subjectDeviceTokenId != null) {
    config.headers.common['Device-Token'] = data.subjectDeviceToken;
    config.headers.common['Device-Token-Id'] = data.subjectDeviceTokenId;
  }
  return config;
}
export default axiosConfig;
