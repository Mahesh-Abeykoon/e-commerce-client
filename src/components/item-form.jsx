import PropTypes from 'prop-types'; 

const ItemForm = ({ item, setItem, handleSubmit, isLoading }) => {
  return (
    <form onSubmit={handleSubmit}>
        <input 
        type="text" 
        placeholder="Name" 
        value={item.name} 
        onChange={(e) => setItem({ ...item, name: e.target.value })}
        required 
      />
      <input 
        type="text" 
        placeholder="Description" 
        value={item.description} 
        onChange={(e) => setItem({ ...item, description: e.target.value })}
      />
      <input 
        type="number" 
        placeholder="Price" 
        value={item.price} 
        onChange={(e) => setItem({ ...item, price: Number(e.target.value) })}
        required 
      />
      <input 
        type="number" 
        placeholder="Stock" 
        value={item.stock} 
        onChange={(e) => setItem({ ...item, stock: Number(e.target.value) })}
      />
      <input 
        type="text" 
        placeholder="Category" 
        value={item.category} 
        onChange={(e) => setItem({ ...item, category: e.target.value })}
      />
      <input 
        type="text" 
        placeholder="Image URL" 
        value={item.imageUrl} 
        onChange={(e) => setItem({ ...item, imageUrl: e.target.value })}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Save Item'}
      </button>
    </form>
  );
};

ItemForm.propTypes = {
  item: PropTypes.object.isRequired,
  setItem: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,

};

export default ItemForm;