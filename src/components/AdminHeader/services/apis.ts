import axios, {AxiosError} from 'axios';
import { BASE_URL } from './api-conf';
import AxiosMockAdapter from 'axios-mock-adapter';
const apiInstance = (baseUrl: string) => {
    const instance = axios.create({
        baseURL: baseUrl,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    });

    instance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error: AxiosError) => {
            if (error.response?.status === 401) {
                //TODO: handle unauthorized requests
            }
            return Promise.reject(error);
        },
    );
    return instance;
};

// Mock of api calls
export const mockInstance = new AxiosMockAdapter(apiInstance(BASE_URL), {delayResponse: 0});
export default apiInstance;

export const ax = axios.create({
    baseURL: BASE_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});
ax.interceptors.response.use(
    (response) => {
        return response;
    },
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            //TODO: handle unauthorized requests
        }
        return Promise.reject(error);
    },
);

export const mck = new AxiosMockAdapter(ax, {delayResponse: 0});
