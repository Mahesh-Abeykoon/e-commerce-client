import fetchWithAuthorization from './fetch-with-authorization';
import { END_POINTS } from './end-points';

/**
 * Fetch all items.
 */
export const getAllItems = () => {
  return fetchWithAuthorization({ path: END_POINTS.ITEMS.GET_ALL });
};

/**
 * Fetch an item by its ID.
 * @param {Object} params - Parameters for the request.
 * @param {string} params.id - The ID of the item to fetch.
 */
export const getItemById = ({ id }) => {
  return fetchWithAuthorization({
    path: END_POINTS.ITEMS.GET_BY_ID.replace(':id', id),
  });
};

/**
 * Create a new item.
 * @param {Object} params - Parameters for the request.
 * @param {Object} params.itemData - The data for the new item.
 */
export const createNewItem = ({ itemData }) => {
  return fetchWithAuthorization({
    path: END_POINTS.ITEMS.CREATE,
    method: 'POST',
    body: itemData,
  });
};

/**
 * Update an existing item.
 * @param {Object} params - Parameters for the request.
 * @param {string} params.id - The ID of the item to update.
 * @param {Object} params.itemData - The updated data for the item.
 */
export const updateExistingItem = ({ id, itemData }) => {
  return fetchWithAuthorization({
    path: END_POINTS.ITEMS.UPDATE.replace(':id', id),
    method: 'PUT',
    body: itemData,
  });
};

/**
 * Delete an item by its ID.
 * @param {Object} params - Parameters for the request.
 * @param {string} params.id - The ID of the item to delete.
 */
export const deleteItemById = ({ id }) => {
  return fetchWithAuthorization({
    path: END_POINTS.ITEMS.DELETE.replace(':id', id),
    method: 'DELETE',
  });
};