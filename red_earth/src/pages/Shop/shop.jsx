import { useState } from 'react';
import './shop.scss';
import grillDorade from '../../assets/dorado-grilled-dorado-with-bell-pepper-eggplant-tomato-lemonnd-pomegranate-sauce-plate.jpg';
import hamPlatter from '../../assets/close-up-meat-platter-with-ham-salami-beef-slices-sausage.jpg';
import seasonalSalad from '../../assets/front-view-delicious-vegan-salad-with-fresh-ingredients-plate.jpg';
import bakedHam from '../../assets/baked-ham-red-caviar-served-old-wooden-table.jpg';
import cupcakes from '../../assets/brown-white-cupcakes-white-ceramic-plate.jpg';
import lemonTart from '../../assets/yellow-lemon-meringue-tart-sweet-indulgence-generated-by-ai.jpg';
import wine from '../../assets/side-view-woman-hand-pouring-red-wine-into-glass-cheese-olive-walnut-grape-love-card-white-surface-black-wall.jpg';
import beer from '../../assets/pouring-fresh-beer.jpg';

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('mains');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [cart, setCart] = useState([]);

  const menuItems = [
    {
      id: 1,
      name: 'Grilled Dorade',
      category: 'mains',
      price: 42,
      description: 'Fresh grilled dorade with seasonal vegetables and pomegranate sauce',
      image: grillDorade,
      tag: 'SIGNATURE'
    },
    {
      id: 2,
      name: 'Slow Roasted Ham',
      category: 'mains',
      price: 50,
      description: 'Tender baked ham with red caviar and gourmet garnish',
      image: bakedHam,
      tag: "CHEF'S PICK"
    },
    {
      id: 3,
      name: 'Seasonal Salad',
      category: 'starters',
      price: 16,
      description: 'Fresh seasonal vegetables with house dressing and herbs',
      image: seasonalSalad,
      tag: ''
    },
    {
      id: 4,
      name: 'Cured Meat Platter',
      category: 'starters',
      price: 22,
      description: 'Selection of premium cured meats, salami, beef, and sausage',
      image: hamPlatter,
      tag: ''
    },
    {
      id: 5,
      name: 'Gourmet Cupcakes',
      category: 'desserts',
      price: 12,
      description: 'Artisan cupcakes with chocolate and vanilla frosting',
      image: cupcakes,
      tag: ''
    },
    {
      id: 6,
      name: 'Lemon Meringue Tart',
      category: 'desserts',
      price: 14,
      description: 'Classic lemon tart with sweet meringue and vanilla ice cream',
      image: lemonTart,
      tag: ''
    },
    {
      id: 7,
      name: 'Premium Red Wine',
      category: 'drinks',
      price: 18,
      description: 'Selection of fine wines from local vineyards with cheese pairing',
      image: wine,
      tag: ''
    },
    {
      id: 8,
      name: 'Craft Beer Selection',
      category: 'drinks',
      price: 8,
      description: 'Premium craft beers freshly poured on tap',
      image: beer,
      tag: ''
    }
  ];

  const categories = [
    { id: 'starters', label: 'STARTERS' },
    { id: 'mains', label: 'MAINS' },
    { id: 'desserts', label: 'DESSERTS' },
    { id: 'drinks', label: 'DRINKS' }
  ];

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = item.category === selectedCategory;
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
      <div className="shop__header-row">
        <div className="shop__header-copy">
          <div className="shop__kicker">§ 02 — THE MENU</div>
          <h1 className="shop__title">Seasonal highlights</h1>
        </div>

        <div className="shop__categories" aria-label="Menu categories">
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
      </div>

      <div className="shop__search" style={{ display: 'none' }}>
        <input
          type="text"
          placeholder="Search menu items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="shop__search-input"
        />
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
