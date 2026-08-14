import { useState } from 'react';
import './shop.scss';

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [cart, setCart] = useState([]);

  const menuItems = [
    {
      id: 1,
      name: 'Grilled Dorade',
      category: 'mains',
      price: 42,
      description: 'Fresh grilled dorade with seasonal vegetables',
      image: 'https://via.placeholder.com/300x250/8B7355/FFFFFF?text=Grilled+Dorade',
      tag: 'SIGNATURE'
    },
    {
      id: 2,
      name: 'Slow Roasted Lamb Shoulder',
      category: 'mains',
      price: 50,
      description: 'Tender lamb shoulder with aromatic herbs and spices',
      image: 'https://via.placeholder.com/300x250/A0826D/FFFFFF?text=Lamb+Shoulder',
      tag: "CHEF'S PICK"
    },
    {
      id: 3,
      name: 'Seasonal Salad',
      category: 'starters',
      price: 16,
      description: 'Fresh seasonal vegetables with house dressing',
      image: 'https://via.placeholder.com/300x250/90EE90/FFFFFF?text=Seasonal+Salad',
      tag: ''
    },
    {
      id: 4,
      name: 'Cured Ham Platter',
      category: 'starters',
      price: 22,
      description: 'Selection of premium cured meats and cheeses',
      image: 'https://via.placeholder.com/300x250/D4A574/FFFFFF?text=Ham+Platter',
      tag: ''
    },
    {
      id: 5,
      name: 'Chocolate Mousse',
      category: 'desserts',
      price: 12,
      description: 'Rich dark chocolate mousse with berries',
      image: 'https://via.placeholder.com/300x250/8B4513/FFFFFF?text=Chocolate+Mousse',
      tag: ''
    },
    {
      id: 6,
      name: 'Lemon Tart',
      category: 'desserts',
      price: 14,
      description: 'Classic lemon tart with vanilla ice cream',
      image: 'https://via.placeholder.com/300x250/FFD700/FFFFFF?text=Lemon+Tart',
      tag: ''
    },
    {
      id: 7,
      name: 'Signature Wine',
      category: 'drinks',
      price: 18,
      description: 'Selection of fine wines from local vineyards',
      image: 'https://via.placeholder.com/300x250/722F37/FFFFFF?text=Signature+Wine',
      tag: ''
    },
    {
      id: 8,
      name: 'Craft Beer',
      category: 'drinks',
      price: 8,
      description: 'Premium craft beers on tap',
      image: 'https://via.placeholder.com/300x250/D4A500/FFFFFF?text=Craft+Beer',
      tag: ''
    }
  ];

  const categories = [
    { id: 'all', label: 'ALL' },
    { id: 'starters', label: 'STARTERS' },
    { id: 'mains', label: 'MAINS' },
    { id: 'desserts', label: 'DESSERTS' },
    { id: 'drinks', label: 'DRINKS' }
  ];

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (item) => {
    setCart([...cart, item]);
    // Optional: show notification
    alert(`${item.name} added to cart!`);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <section className="shop">
      <div className="shop__header">
        <h1 className="shop__title">Our Menu</h1>
        <p className="shop__subtitle">Discover our seasonal highlights</p>
      </div>

      <div className="shop__search">
        <input
          type="text"
          placeholder="Search menu items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="shop__search-input"
        />
      </div>

      <div className="shop__categories">
        {categories.map(category => (
          <button
            key={category.id}
            className={`shop__category-btn ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="shop__grid">
        {filteredItems.map(item => (
          <div key={item.id} className="shop__card">
            <div className="shop__card-image-container">
              <img src={item.image} alt={item.name} className="shop__card-image" />
              {item.tag && <span className="shop__card-tag">{item.tag}</span>}
            </div>
            <div className="shop__card-content">
              <h3 className="shop__card-name">{item.name}</h3>
              <p className="shop__card-description">{item.description}</p>
              <div className="shop__card-footer">
                <span className="shop__card-price">${item.price}</span>
                <div className="shop__card-actions">
                  <button
                    className="shop__card-btn shop__card-btn--details"
                    onClick={() => setSelectedItem(item)}
                  >
                    Details
                  </button>
                  <button
                    className="shop__card-btn shop__card-btn--add"
                    onClick={() => handleAddToCart(item)}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="shop__empty">
          <p>No items found. Try adjusting your search or filters.</p>
        </div>
      )}

      {selectedItem && (
        <div className="shop__modal" onClick={closeModal}>
          <div className="shop__modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="shop__modal-close" onClick={closeModal}>×</button>
            <div className="shop__modal-image">
              <img src={selectedItem.image} alt={selectedItem.name} />
            </div>
            <div className="shop__modal-info">
              <h2>{selectedItem.name}</h2>
              {selectedItem.tag && <span className="shop__modal-tag">{selectedItem.tag}</span>}
              <p className="shop__modal-description">{selectedItem.description}</p>
              <p className="shop__modal-price">${selectedItem.price}</p>
              <button
                className="shop__modal-btn"
                onClick={() => {
                  handleAddToCart(selectedItem);
                  closeModal();
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {cart.length > 0 && (
        <div className="shop__cart-badge">
          🛒 {cart.length}
        </div>
      )}
    </section>
  );
};

export default Shop;
