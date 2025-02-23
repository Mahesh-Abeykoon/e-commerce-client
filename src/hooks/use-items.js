import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import fetchWithAuthorization from '../api/fetch-with-authorization';
import { END_POINTS } from '../api/end-points';

// Fetch All Items
export const useItems = () => {
  return useQuery({
    queryKey: ['items'],
    queryFn: () => fetchWithAuthorization({ path: END_POINTS.ITEMS.GET_ALL }),
  });
};

// Fetch Item by ID
export const useItemById = (id) => {
  return useQuery({
    queryKey: ['item', id],
    queryFn: () => fetchWithAuthorization({ path: END_POINTS.ITEMS.GET_BY_ID.replace(':id', id) }),
    enabled: !!id, // Only fetch if ID is available
  });
};

// Create New Item
export const useCreateItem = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (itemData) => fetchWithAuthorization({
      path: END_POINTS.ITEMS.CREATE,
      method: 'POST',
      body: itemData,
    }),
    onSuccess: () => {
      queryClient.invalidateQueries(['items']); // Refresh item list after creation
    },
    onError: (error) => {
      console.error('Error creating item:', error.message);
    },
  });
};

// Update Item by ID
export const useUpdateItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, itemData }) => fetchWithAuthorization({
      path: END_POINTS.ITEMS.UPDATE.replace(':id', id),
      method: 'PUT',
      body: itemData,
    }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['items']);
      queryClient.invalidateQueries(['item', variables.id]); // Refresh specific item data
    },
    onError: (error) => {
      console.error('Error updating item:', error.message);
    },
  });
};

// Delete Item by ID
export const useDeleteItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => fetchWithAuthorization({
      path: END_POINTS.ITEMS.DELETE.replace(':id', id),
      method: 'DELETE',
    }),
    onSuccess: () => {
      queryClient.invalidateQueries(['items']);
    },
    onError: (error) => {
      console.error('Error deleting item:', error.message);
    },
  });
};
