import ky from 'ky';
import * as SecureStore from 'expo-secure-store';

export const getAccessToken = () => SecureStore.getItemAsync('jwt_access_token');
export const setAccessToken = token => SecureStore.setItemAsync('jwt_access_token', token);

export const logout = () => {
    SecureStore.deleteItemAsync('jwt_access_token');
}

const AuthHook = async (request) => {
    const accessToken = await getAccessToken();
    if (accessToken) {
        
        request.headers.set('token', accessToken);
    }
}

const LogoutHook = (request, options, res) => {
    const isUnauthorizedError = res.status === 401;

    if (isUnauthorizedError) logout();
}

const kyFetch = ky.extend({
    headers: {
        'content-type': 'application/json',
        'Accept': 'application/json',
    },
    prefixUrl: 'http://192.168.0.15:3001',
    credentials: 'include',
    hooks: {
        beforeRequest: [AuthHook],
        afterResponse: [LogoutHook],
    }
});

export default kyFetch;