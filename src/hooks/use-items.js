import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllItems,
  getItemById,
  createNewItem,
  updateExistingItem,
  deleteItemById,
} from '../api/item';
import { handleError } from '../utils/error-handler';

/**
 * Fetch all items.
 */
export const useItems = () => {
  return useQuery({
    queryKey: ['items'],
    queryFn: getAllItems,
    staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
    refetchOnWindowFocus: false, // Disable refetching on window focus
  });
};

/**
 * Fetch an item by its ID.
 * @param {Object} params - Parameters for the hook.
 * @param {string} params.id - The ID of the item to fetch.
 */
export const useItemById = ({ id }) => {
  return useQuery({
    queryKey: ['item', id],
    queryFn: () => getItemById({ id }),
    enabled: !!id, // Only fetch if ID is available
  });
};

/**
 * Create a new item.
 */
export const useCreateItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNewItem,
    onSuccess: () => {
      queryClient.invalidateQueries(['items']); // Refresh the item list
    },
    onError: (error) => {
      handleError(error, 'Error creating item:');
    },
  });
};

/**
 * Update an existing item.
 */
export const useUpdateItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateExistingItem,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['items']); // Refresh the item list
      queryClient.invalidateQueries(['item', variables.id]); // Refresh specific item data
    },
    onError: (error) => {
      handleError(error, 'Error updating item:');
    },
  });
};

/**
 * Delete an item by its ID.
 */
export const useDeleteItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteItemById,
    onSuccess: () => {
      queryClient.invalidateQueries(['items']); // Refresh the item list
    },
    onError: (error) => {
      handleError(error, 'Error deleting item:');
    },
  });
};
