import createActionType from '../utils/action';
import api from '../utils/api';
import _ from 'lodash';
import { generateBasicAuthToken } from '../utils/util';

export const STORE_DEVICE_LOCATION_DETAILS = createActionType('STORE_DEVICE_LOCATION_DETAILS')

export const storeDeviceLocationDetails = (data) => ({
    type: STORE_DEVICE_LOCATION_DETAILS,
    data: data
});
