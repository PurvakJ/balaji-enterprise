// Products.js
import React, { useState, useEffect, useCallback } from 'react';
import { getProducts } from '../api';
import './Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('default');
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [viewMode, setViewMode] = useState('collections');
  const [layoutView, setLayoutView] = useState('grid'); // 'grid' or 'box'

  const phoneNumber = '+917696329012';
  const whatsappNumber = '917696329012';

  const getCategoryDisplayName = useCallback((categoryValue) => {
    const displayNames = {
      'mattress': 'Premium Mattress',
      'office-chair': 'Office Chair',
      'plastic-chair': 'Plastic Chair',
      'orthopedic': 'Orthopedic Support',
      'memory-foam': 'Memory Foam',
      'executive': 'Executive Collection',
      'visitor': 'Visitor Chair',
      'reception': 'Reception Chair',
      'study': 'Study Chair',
      'dining': 'Dining Chair'
    };
    return displayNames[categoryValue] || 
           categoryValue?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }, []);

  const getCategoryIcon = useCallback((category) => {
    const icons = {
      'mattress': '🛌',
      'office-chair': '💺',
      'plastic-chair': '🪑',
      'orthopedic': '🩺',
      'memory-foam': '🌀',
      'executive': '👔',
      'visitor': '👥',
      'reception': '✨',
      'study': '📚',
      'dining': '🍽️'
    };
    return icons[category] || '🏷️';
  }, []);

  const getRandomCollectionImage = useCallback((category, categoryProducts) => {
    const categoryProductImages = categoryProducts
      .filter(p => p.category === category)
      .flatMap(p => p.images || [])
      .filter(img => img && img.length > 0);
    
    if (categoryProductImages.length > 0) {
      const randomIndex = Math.floor(Math.random() * categoryProductImages.length);
      return categoryProductImages[randomIndex];
    }
    
    const fallbackImages = {
      'mattress': 'https://images-cdn.ubuy.co.in/669eeae2e620e2469e48f254-3-inch-memory-foam-mattress-topper.jpg',
      'office-chair': 'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/660560s2.jpg?im=Resize,width=750',
      'plastic-chair': 'https://m.media-amazon.com/images/I/71bLn6bjYuL.jpg',
      'visitor': 'https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=800',
      'reception': 'https://images.pexels.com/photos/276582/pexels-photo-276582.jpeg?auto=compress&cs=tinysrgb&w=800',
      'study': 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=800',
      'dining': 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800'
    };
    return fallbackImages[category] || 'https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=800';
  }, []);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      const validProducts = data.filter(product => product && product.id);
      setProducts(validProducts);
      
      const uniqueCategories = [...new Set(validProducts.map(product => product.category))];
      const dynamicCategories = uniqueCategories.map(cat => ({
        value: cat,
        label: getCategoryDisplayName(cat),
        icon: getCategoryIcon(cat),
        productCount: validProducts.filter(p => p.category === cat).length,
        image: getRandomCollectionImage(cat, validProducts)
      }));
      
      setCategories(dynamicCategories);
    } catch (error) {
      console.error('Error loading products:', error);
      const fallbackProducts = [
        { id: 1, name: "Orthopedic Memory Foam Mattress", price: 24999, description: "Premium orthopedic mattress for back pain relief", images: ["https://images-cdn.ubuy.co.in/669eeae2e620e2469e48f254-3-inch-memory-foam-mattress-topper.jpg", "https://www.rentomojo.com/blog/wp-content/uploads/2025/08/benefits-of-orthopedic-mattress.png"], category: "mattress", featured: true },
        { id: 2, name: "High Back Mesh Office Chair", price: 12999, description: "Ergonomic office chair with lumbar support", images: ["https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/660560s2.jpg?im=Resize,width=750"], category: "office-chair", featured: true },
        { id: 3, name: "Premium Plastic Chair (Set of 4)", price: 5999, description: "Heavy-duty plastic chairs for home/office", images: ["https://m.media-amazon.com/images/I/71bLn6bjYuL.jpg"], category: "plastic-chair", featured: true },
        { id: 4, name: "Luxury Executive Office Chair", price: 24999, description: "Premium leather executive chair", images: ["https://www.duroflexworld.com/cdn/shop/files/2_2026e6ee-a9e8-4ff5-88c7-104fea9cefb8.jpg?v=1744560694&width=800"], category: "office-chair", featured: true },
        { id: 5, name: "Bone Health Orthopedic Mattress", price: 34999, description: "Doctor-approved orthopedic mattress", images: ["https://www.rentomojo.com/blog/wp-content/uploads/2025/08/benefits-of-orthopedic-mattress.png"], category: "mattress", featured: true },
        { id: 6, name: "Industrial Plastic Chair (Pack of 6)", price: 8999, description: "Extra heavy-duty plastic chairs", images: ["https://sealy.in/cdn/shop/articles/Checking_the_memory_foam_layer_of_a_mattress.png?crop=center&height=1200&v=1763952574&width=1200"], category: "plastic-chair", featured: true },
        { id: 7, name: "Mid Back Visitor Chair", price: 8999, description: "Comfortable visitor chair for office", images: ["https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=800"], category: "visitor", featured: true },
        { id: 8, name: "Reception Sofa Chair", price: 15999, description: "Premium reception chair with cushioning", images: ["https://images.pexels.com/photos/276582/pexels-photo-276582.jpeg?auto=compress&cs=tinysrgb&w=800"], category: "reception", featured: true },
        { id: 9, name: "Ergonomic Study Chair", price: 7999, description: "Comfortable study chair for students", images: ["https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=800"], category: "study", featured: true },
        { id: 10, name: "Modern Dining Chair Set", price: 12999, description: "Set of 4 modern dining chairs", images: ["https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800"], category: "dining", featured: true },
      ];
      setProducts(fallbackProducts);
      
      const uniqueCats = [...new Set(fallbackProducts.map(p => p.category))];
      const dynamicCats = uniqueCats.map(cat => ({
        value: cat,
        label: getCategoryDisplayName(cat),
        icon: getCategoryIcon(cat),
        productCount: fallbackProducts.filter(p => p.category === cat).length,
        image: getRandomCollectionImage(cat, fallbackProducts)
      }));
      setCategories(dynamicCats);
    } finally {
      setLoading(false);
    }
  }, [getCategoryDisplayName, getCategoryIcon, getRandomCollectionImage]);

  const sortAndFilterProducts = useCallback((productsToSort, searchValue) => {
    let filtered = [...productsToSort];
    
    if (searchValue.trim()) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchValue.toLowerCase()))
      );
    }
    
    switch(sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        filtered.sort((a, b) => (a.id || 0) - (b.id || 0));
    }
    
    return filtered;
  }, [sortBy]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    if (selectedCollection) {
      const categoryProducts = products.filter(product => product.category === selectedCollection);
      const filtered = sortAndFilterProducts(categoryProducts, searchTerm);
      setFilteredProducts(filtered);
    }
  }, [selectedCollection, products, sortAndFilterProducts, searchTerm]);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedProduct]);

  const getCategoryName = useCallback((category) => {
    return getCategoryDisplayName(category);
  }, [getCategoryDisplayName]);

  const nextImage = (e) => {
    e.stopPropagation();
    if (selectedProduct && selectedProduct.images && selectedProduct.images.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % selectedProduct.images.length);
    }
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (selectedProduct && selectedProduct.images && selectedProduct.images.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + selectedProduct.images.length) % selectedProduct.images.length);
    }
  };

  const openWhatsApp = (productName) => {
    const message = encodeURIComponent(`Hello Balaji Enterprises, I'm interested in the "${productName}". Could you please share more details and the best price?`);
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const handleCollectionClick = (categoryValue) => {
    setSelectedCollection(categoryValue);
    setViewMode('products');
    setSearchTerm('');
    setSortBy('default');
    setLayoutView('grid');
    setTimeout(() => {
      document.getElementById('products-view')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleBackToCollections = () => {
    setSelectedCollection(null);
    setViewMode('collections');
    setSearchTerm('');
    setSortBy('default');
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="products-page">
      {/* Hero Section */}
      <section className="products-hero">
        <div className="container">
          <div className="hero-badge">Balaji Enterprises Premium Collection</div>
          <div className="hero-icon">✨</div>
          <h1>Our <span>Collections</span></h1>
          <p>Discover premium mattresses, ergonomic office chairs, and durable plastic chairs crafted for excellence</p>
          <div className="hero-features">
            <span>✓ Premium Quality</span>
            <span>✓ 10 Year Warranty</span>
            <span>✓ Free Delivery</span>
            <span>✓ Trusted Since 1995</span>
          </div>
        </div>
      </section>

      {/* Collections View */}
      {viewMode === 'collections' && (
        <section className="collections-view">
          <div className="container">
            <div className="section-header">
              <span className="section-subtitle">Shop by Category</span>
              <h2>Browse Our <span>Collections</span></h2>
              <p>Choose from our wide range of premium furniture solutions</p>
            </div>
            
            {loading ? (
              <div className="collections-skeleton">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="collection-skeleton-card"></div>
                ))}
              </div>
            ) : (
              <div className="collections-grid">
                {categories.map((cat) => (
                  <div 
                    key={cat.value} 
                    className="collection-card"
                    onClick={() => handleCollectionClick(cat.value)}
                  >
                    <div className="collection-image">
                      <img src={cat.image} alt={cat.label} />
                      <div className="collection-overlay">
                        <div className="collection-icon-large">{cat.icon}</div>
                      </div>
                    </div>
                    <div className="collection-info">
                      <h3>{cat.label}</h3>
                      <p>{cat.productCount} Products</p>
                      <div className="collection-explore">
                        <span>Explore Collection →</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Products View */}
      {viewMode === 'products' && selectedCollection && (
        <section className="products-view" id="products-view">
          <div className="container">
            <button className="back-to-collections" onClick={handleBackToCollections}>
              ← Back to All Collections
            </button>

            <div className="collection-header">
              {categories.find(c => c.value === selectedCollection) && (
                <>
                  <div className="collection-header-icon">
                    {categories.find(c => c.value === selectedCollection).icon}
                  </div>
                  <h2>{categories.find(c => c.value === selectedCollection).label}</h2>
                  <p>{filteredProducts.length} premium products in this collection</p>
                </>
              )}
            </div>

            {/* Toolbar with Search, Sort, and Layout Toggle */}
            <div className="products-toolbar">
              <div className="search-group">
                <div className="search-wrapper">
                  <span className="search-icon">🔍</span>
                  <input
                    type="text"
                    placeholder="Search by product name..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input"
                  />
                  {searchTerm && (
                    <button className="search-clear" onClick={clearSearch}>×</button>
                  )}
                </div>
              </div>
              
              <div className="sort-group">
                <label>Sort by:</label>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="default">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>

              {/* Layout Toggle Buttons */}
              <div className="layout-toggle">
                <button 
                  className={`layout-btn ${layoutView === 'grid' ? 'active' : ''}`}
                  onClick={() => setLayoutView('grid')}
                  title="Grid View"
                >
                  ⊞
                </button>
                <button 
                  className={`layout-btn ${layoutView === 'box' ? 'active' : ''}`}
                  onClick={() => setLayoutView('box')}
                  title="Box View"
                >
                  ⊟
                </button>
              </div>
            </div>

            {searchTerm && (
              <div className="search-results-info">
                <span>🔍 Found {filteredProducts.length} results for "{searchTerm}"</span>
                <button onClick={clearSearch} className="clear-search-btn">Clear Search</button>
              </div>
            )}

            {filteredProducts.length === 0 ? (
              <div className="no-products">
                <div className="no-products-icon">🔍</div>
                <h3>No products found</h3>
                <p>{searchTerm ? `No products matching "${searchTerm}" in this collection` : "Try checking back later for new arrivals"}</p>
                {searchTerm ? (
                  <button className="btn-reset" onClick={clearSearch}>Clear Search</button>
                ) : (
                  <button className="btn-reset" onClick={handleBackToCollections}>Browse Other Collections</button>
                )}
              </div>
            ) : (
              <div className={`products-container ${layoutView === 'grid' ? 'grid-view' : 'box-view'}`}>
                {filteredProducts.map(product => (
                  <div key={product.id} className="product-card" onClick={() => setSelectedProduct(product)}>
                    <div className="product-image-container">
                      {product.images && product.images[0] ? (
                        <img 
                          src={product.images[0]} 
                          alt={product.name} 
                          className="product-image"
                          loading="lazy"
                          onError={(e) => {
                            e.target.src = 'https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=600';
                          }}
                        />
                      ) : (
                        <div className="image-placeholder">
                          <span>{getCategoryIcon(product.category)}</span>
                        </div>
                      )}
                      {product.featured && (
                        <div className="product-badge">⭐ Bestseller</div>
                      )}
                      {product.images && product.images.length > 1 && (
                        <div className="image-count-badge">
                          📸 +{product.images.length - 1}
                        </div>
                      )}
                    </div>
                    <div className="product-info">
                      <span className="product-category">
                        {getCategoryIcon(product.category)} {getCategoryName(product.category)}
                      </span>
                      <h3 className="product-title">{product.name}</h3>
                      {/*<div className="product-price">₹{product.price?.toLocaleString() || '0'}</div>*/}
                      <p className="product-description">
                        {product.description && product.description.length > 60 
                          ? `${product.description.substring(0, 60)}...` 
                          : product.description || 'Premium quality product for lasting comfort'}
                      </p>

                      <div className="product-footer">
                        <button className="view-details-btn">View Details →</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Product Modal - Same as before */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content product-detail-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedProduct(null)}>×</button>
            
            <div className="product-detail-gallery">
              {selectedProduct.images && selectedProduct.images.length > 0 ? (
                <div className="image-slider-container">
                  <div className="main-slider-image">
                    <img 
                      src={selectedProduct.images[currentImageIndex]} 
                      alt={`${selectedProduct.name} - ${currentImageIndex + 1}`}
                    />
                    {selectedProduct.images.length > 1 && (
                      <>
                        <button className="slider-nav prev-nav" onClick={prevImage}>❮</button>
                        <button className="slider-nav next-nav" onClick={nextImage}>❯</button>
                      </>
                    )}
                  </div>
                  <div className="slider-dots">
                    {selectedProduct.images.map((_, idx) => (
                      <button
                        key={idx}
                        className={`slider-dot ${currentImageIndex === idx ? 'active' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(idx);
                        }}
                      />
                    ))}
                  </div>
                  <div className="thumbnail-strip">
                    {selectedProduct.images.map((img, idx) => (
                      <div
                        key={idx}
                        className={`thumbnail ${currentImageIndex === idx ? 'active' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(idx);
                        }}
                      >
                        <img src={img} alt={`Thumbnail ${idx + 1}`} />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="gallery-placeholder">
                  <span>{getCategoryIcon(selectedProduct.category)}</span>
                </div>
              )}
            </div>
            
            <div className="product-detail-info">
              <span className="product-category-tag">
                {getCategoryIcon(selectedProduct.category)} {getCategoryName(selectedProduct.category)}
              </span>
              <h2>{selectedProduct.name}</h2>
              {/*<div className="price-tag">₹{selectedProduct.price?.toLocaleString() || '0'}</div>*/}

              <p className="full-description">{selectedProduct.description || 'Experience premium quality and lasting comfort with Balaji Enterprises. Engineered for excellence and durability.'}</p>
              <div className="contact-actions">
                <a href={`tel:${phoneNumber}`} className="call-now-btn">📞 Call for Best Price</a>
                <button onClick={() => openWhatsApp(selectedProduct.name)} className="wa-consult-btn">
                  💬 Chat on WhatsApp
                </button>
                <a href="/book-appointment" className="consult-btn">Book Free Consultation →</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;