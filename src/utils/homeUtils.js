import api from '../utils/api';
import { generateBasicAuthToken } from './util';

export const retrieveSubjectCompliance = (subject) => {
    return new Promise(async (resolve, reject) => {
      try {
        // api.defaults.headers.common.Authorization = generateBasicAuthToken(subject.phoneNo, subject.password);
        api.defaults.headers.common['Accept-Language'] = "en-US";
        const res = await api.get(`/subject/${subject.id}`);
        return resolve({
          dayCompliance:res.data.dayCompliance,
          weekCompliance:res.data.weekCompliance,
          monthCompliance:res.data.monthCompliance,
          totalCompliance:res.data.totalCompliance,
        });
      } catch (error) {
        console.log(error);
        return reject(error);
      }
    });
  }