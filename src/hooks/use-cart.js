import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import  fetchWithAuthorization  from '../api/fetch-with-authorization';
import { END_POINTS } from '../api/end-points';

// Get cart
export const useCart = () => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: () => fetchWithAuthorization({ path: END_POINTS.CART.GET }),
  });
};

// Add item to cart
export const useAddItemToCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ productId, quantity }) =>
      fetchWithAuthorization({
        path: END_POINTS.CART.ADD,
        method: 'POST',
        body: { productId, quantity },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
    },
  });
};

// Update item quantity in cart
export const useUpdateItemQuantity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ productId, quantity }) =>
      fetchWithAuthorization({
        path: END_POINTS.CART.UPDATE,
        method: 'PUT',
        body: { productId, quantity },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
    },
  });
};

// Remove item from cart
export const useRemoveItemFromCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId) =>
      fetchWithAuthorization({
        path: END_POINTS.CART.REMOVE.replace(':productId', productId),
        method: 'DELETE',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
    },
  });
};

// Clear cart
export const useClearCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () =>
      fetchWithAuthorization({
        path: END_POINTS.CART.CLEAR,
        method: 'DELETE',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
    },
  });
};