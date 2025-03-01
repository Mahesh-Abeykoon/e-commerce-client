import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getCart,
  addItemToCart,
  updateCartItemQuantity,
  removeCartItem,
  clearCart,
} from '../api/cart';
import { handleError } from '../utils/error-handler';

/**
 * Fetch all items in the cart.
 */
export const useCart = () => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
    staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
    refetchOnWindowFocus: false, // Disable refetching on window focus
  });
};

/**
 * Add an item to the cart.
 */
export const useAddItemToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addItemToCart,
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']); // Refresh the cart data
    },
    onError: (error) => {
      handleError(error, 'Error adding item to cart:');
    },
  });
};

/**
 * Update the quantity of an item in the cart.
 */
export const useUpdateCartItemQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCartItemQuantity,
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']); // Refresh the cart data
    },
    onError: (error) => {
      handleError(error, 'Error updating cart item quantity:');
    },
  });
};

/**
 * Remove an item from the cart.
 */
export const useRemoveCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']); // Refresh the cart data
    },
    onError: (error) => {
      handleError(error, 'Error removing item from cart:');
    },
  });
};

/**
 * Clear all items from the cart.
 */
export const useClearCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clearCart,
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']); // Refresh the cart data
    },
    onError: (error) => {
      handleError(error, 'Error clearing cart:');
    },
  });
};