import fetchWithAuthorization from './fetch-with-authorization';
import { END_POINTS } from './end-points';

// Login API call
export const fetchLogin = async (loginData) => {
  const response = await fetchWithAuthorization({
    path: END_POINTS.AUTH.SIGN_IN,
    method: 'POST',
    body: loginData,
  });
  return response;
};

// Logout API call
export const fetchLogout = async () => {
  const response = await fetchWithAuthorization({
    path: END_POINTS.AUTH.LOGOUT,
    method: 'POST',
  });
  return response;
};

// Fetch user profile API call
export const fetchUserProfile = async () => {
  const response = await fetchWithAuthorization({
    path: END_POINTS.AUTH.PROFILE,
    method: 'GET',
  });
  return response;
};