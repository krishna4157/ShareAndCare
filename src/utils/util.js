import {decode as atob, encode as btoa} from 'base-64'

export const generateBasicAuthToken = (userName, password) => `Basic ${btoa(`${userName}:${password}`)}`;
export const generateBasicAuthHeader = (userName, password) => `Authorization: ${generateBasicAuthToken(userName, password)}`;

export const checkForOfflineFailureStatus = (response) => {
    return response.includes("Failed to connect") || response.includes("Software caused connection abort");
}