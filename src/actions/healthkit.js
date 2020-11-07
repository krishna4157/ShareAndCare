import createActionType from '../utils/action';
import api from '../utils/api';
import _ from 'lodash';
// import { healthkitData, fetchBodyTemperature } from '../utils/healthKit/Healthkit';


export const SAVE_HEALTHKIT_DATA = createActionType('SAVE_HEALTHKIT_DATA');
export const RETRIEVE_HEALTHKIT_DATA_SUCCESS = createActionType('RETRIEVE_HEALTHKIT_DATA_SUCCESS');


const saveHealthKitSuccess = (data) => ({
    type: SAVE_HEALTHKIT_DATA,
    healthkitData: data,
});

const retrieveHealthKitDataSuccess = (data) => ({
    type: RETRIEVE_HEALTHKIT_DATA_SUCCESS,
    healthkitData: data,
});

export const saveHealthkitData = (subjectId, date) => async dispatch => {
    // console.log("Sync called");
    try {
        const hkData = {
            subjectHealthData: {
                subject: {
                    id: subjectId,
                },
                date: date,
                // bodyTemp: await healthkitData.subjectHealthData.bodyTemp(),
                // bloodGlucose: await healthkitData.subjectHealthData.bloodGlucose(),
                // systolicBp: await healthkitData.subjectHealthData.systolicBp('bloodPressureSystolicValue'),
                // diastolicBp: await healthkitData.subjectHealthData.diastolicBp('bloodPressureDiastolicValue'),
                // respiratoryRate: await healthkitData.subjectHealthData.respiratoryRate(),
                // bmi: await healthkitData.subjectHealthData.bmi(),
                // heartRate: await healthkitData.subjectHealthData.heartRate(),
                // height: await healthkitData.subjectHealthData.height(),
                // weight: await healthkitData.subjectHealthData.weight(),
                // bodyFat: await healthkitData.subjectHealthData.bodyFat(),
                // leanBodyMass: await healthkitData.subjectHealthData.leanBodyMass(),
                // sex: await healthkitData.subjectHealthData.sex(),
            },
            subjectActivity: {
                subject: {
                    id: subjectId,
                },
                date: date,
                // activeEnergyBurned: await healthkitData.subjectActivity.activeEnergyBurned(),
                // restingEnergyBurned: await healthkitData.subjectActivity.restingEnergyBurned(),
                // distance: await healthkitData.subjectActivity.distance(),
                // floors: await healthkitData.subjectActivity.floors(),
                // steps: await healthkitData.subjectActivity.steps(),
                // sleepingDuration: await healthkitData.subjectActivity.sleepDuration(),
            }
        };
        // console.log("hkData: ", hkData);
        const res = await api.post('/subject/healthData/sync', hkData );
        dispatch(saveHealthKitSuccess(res.data));
    } catch(error) {
        console.log(error);
    }
    
}

export const retrieveHealthkitData = (subjectId, date) => async dispatch => {
    try{
        const res = await api.get(`/subject/healthData/retrieve/${subjectId}/${date}`);
        dispatch(retrieveHealthKitDataSuccess(res.data));
    } catch(error) {
        console.log(error);
    }
    
}
