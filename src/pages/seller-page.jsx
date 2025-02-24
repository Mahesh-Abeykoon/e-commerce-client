import { useState } from 'react';
import { useItems, useCreateItem, useUpdateItem, useDeleteItem } from '../hooks/use-items';
import ItemForm from '../components/item-form';
import Loading from '../components/loading'
import Error from '../components/error';

const SellerPage = () => {
  const { data: items, isLoading, isError } = useItems();
  const { mutate: createItem } = useCreateItem();
  const { mutate: updateItem } = useUpdateItem();
  const { mutate: deleteItem } = useDeleteItem();
  
  const [selectedItem, setSelectedItem] = useState(null);
  const [formState, setFormState] = useState({
    name: '', description: '', price: 0, stock: 0, category: '', imageUrl: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedItem) {
      updateItem({ id: selectedItem._id, itemData: formState });
    } else {
      createItem(formState);
    }
    setFormState({ name: '', description: '', price: 0, stock: 0, category: '', imageUrl: '' });
    setSelectedItem(null);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setFormState(item);
  };

  const handleDelete = (id) => {
    deleteItem(id);
  };

  return (
    <div>
      <h1>Seller Dashboard</h1>
      <ItemForm 
        item={formState} 
        setItem={setFormState} 
        handleSubmit={handleSubmit} 
        isLoading={isLoading} 
      />

      {isLoading && <Loading />}
      {isError &&  <Error />}

      <ul>
        {items?.map((item) => (
          <li key={item._id}>
            {item.name} - ${item.price}
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SellerPage;
