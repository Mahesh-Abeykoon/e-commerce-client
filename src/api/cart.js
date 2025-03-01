import fetchWithAuthorization from './fetch-with-authorization';
import { END_POINTS } from './end-points';

/**
 * Fetch all items in the cart.
 */
export const getCart = () => {
  return fetchWithAuthorization({
    path: END_POINTS.CART.GET,
    method: 'GET',
  });
};

/**
 * Add an item to the cart.
 * @param {Object} params - Parameters for the request.
 * @param {string} params.productId - The ID of the product to add.
 * @param {number} params.quantity - The quantity of the product to add.
 */
export const addItemToCart = ({ productId, quantity }) => {
  return fetchWithAuthorization({
    path: END_POINTS.CART.ADD,
    method: 'POST',
    body: { productId, quantity },
  });
};

/**
 * Update the quantity of an item in the cart.
 * @param {Object} params - Parameters for the request.
 * @param {string} params.productId - The ID of the product to update.
 * @param {number} params.quantity - The new quantity of the product.
 */
export const updateCartItemQuantity = ({ productId, quantity }) => {
  return fetchWithAuthorization({
    path: END_POINTS.CART.UPDATE,
    method: 'PUT',
    body: { productId, quantity },
  });
};

/**
 * Remove an item from the cart.
 * @param {Object} params - Parameters for the request.
 * @param {string} params.productId - The ID of the product to remove.
 */
export const removeCartItem = ({ productId }) => {
  return fetchWithAuthorization({
    path: END_POINTS.CART.REMOVE.replace(':productId', productId),
    method: 'DELETE',
  });
};

/**
 * Clear all items from the cart.
 */
export const clearCart = () => {
  return fetchWithAuthorization({
    path: END_POINTS.CART.CLEAR,
    method: 'DELETE',
  });
};