/**
 * Fetches data from the server with authorization.
 * @param {Object} options - The options for the fetch request.
 * @param {string} options.path - The path of the endpoint to fetch from.
 * @param {string} [options.method='GET'] - The HTTP method for the request.
 * @param {Object} [options.body] - The request body data (if applicable).
 * @returns {Promise<Object>} A promise that resolves to the parsed JSON response.
 * @throws {Error} Throws an error if the response status is not ok.
 */

export default async function fetchWithAuthorization({ path, method = 'GET', body }) {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch(import.meta.env.VITE_SERVER_DOMAIN + path, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  
    if (response.status === 401) {
      console.error('Unauthorized');
      // Handle token refresh or redirect to login
    } else if (!response.ok) {
      const errorBody = await response.json();
      console.error(errorBody);
      throw new Error(errorBody.message || 'An error occurred');
    }
    return response.json();
  }