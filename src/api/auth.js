import fetchWithAuthorization from './fetch-with-authorization';
import { END_POINTS } from './end-points';

/**
 * Logs in a user.
 * @param {Object} params - Parameters for the request.
 * @param {Object} params.loginData - The login credentials (e.g., email and password).
 * @returns {Promise<Object>} A promise that resolves to the login response.
 */
export const fetchLogin = async ({ loginData }) => {
  return fetchWithAuthorization({
    path: END_POINTS.AUTH.SIGN_IN,
    method: 'POST',
    body: loginData,
  });
};

/**
 * Logs out a user.
 * @returns {Promise<Object>} A promise that resolves to the logout response.
 */
export const fetchLogout = async () => {
  return fetchWithAuthorization({
    path: END_POINTS.AUTH.LOGOUT,
    method: 'POST',
  });
};

/**
 * Fetches the user's profile.
 * @returns {Promise<Object>} A promise that resolves to the user profile data.
 */
export const fetchUserProfile = async () => {
  return fetchWithAuthorization({
    path: END_POINTS.AUTH.PROFILE,
    method: 'GET',
  });
};