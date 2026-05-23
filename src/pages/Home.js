// Home.js
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, getReviews } from '../api';
import './Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const phoneNumber = '+919872228109';
  const whatsappNumber = '919872228109';
  const whatsappMessage = encodeURIComponent("Hello Balaji Enterprises, I'm interested in your premium mattresses, office chairs, and plastic chairs. I'd like to know more about your products and consultation services.");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;


  const getCategoryDisplayName = useCallback((categoryValue) => {
    const displayNames = {
      'mattress': 'Premium Mattress',
      'office-chair': 'Ergonomic Chair',
      'plastic-chair': 'Heavy Duty Chair',
      'orthopedic': 'Orthopedic Support',
      'memory-foam': 'Memory Foam',
      'executive': 'Executive Collection'
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
      'executive': '👔'
    };
    return icons[category] || '🏷️';
  }, []);

  const openWhatsApp = (productName) => {
    const message = encodeURIComponent(`Hello Balaji Enterprises, I'm interested in the "${productName}". Could you please share more details and the best price?`);
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

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


  // Categories
  const categories = [
    { name: "Premium Mattresses", icon: "🛌", link: "/products?category=mattress", description: "Orthopedic & memory foam options", image: "https://i.pinimg.com/1200x/10/07/35/10073560c71c919c757c20ef9b64ccd1.jpg" },
    { name: "Office Chairs", icon: "💺", link: "/products?category=office-chair", description: "Ergonomic designs for professionals", image: "https://i.pinimg.com/1200x/4c/be/65/4cbe65b83a2adcef4f7788d1b3acddac.jpg" },
    { name: "Plastic Chairs", icon: "🪑", link: "/products?category=plastic-chair", description: "Durable & stylish seating solutions", image: "https://i.pinimg.com/736x/48/65/84/486584894daa9c735ac98755a933fd6b.jpg" }
  ];

  // Pillars
  const pillars = [
    { icon: "🏭", title: "Since 1995", description: "Decades of manufacturing excellence and customer trust" },
    { icon: "⭐", title: "Premium Quality", description: "Made with the finest materials and rigorous quality control" },
    { icon: "🤝", title: "Customer First", description: "Dedicated support and complete satisfaction guaranteed" }
  ];

  const loadProducts = useCallback(async () => {
    try {
      const data = await getProducts();
      const validProducts = data.filter(product => product && product.id);
      const featured = validProducts.filter(p => p.featured === true);
      let productsToShow = featured.length >= 3 ? featured.slice(0, 6) : validProducts.slice(0, 6);
      setFeaturedProducts(productsToShow);
    } catch (error) {
      console.error('Error loading products:', error);
      const fallbackProducts = [
        {
          id: 1,
          name: "Orthopedic Memory Foam Mattress",
          price: 24999,
          description: "Premium 8-inch memory foam mattress with orthopedic support for back pain relief. Breathable fabric and anti-sagging technology for years of comfort.",
          images: ["https://images-cdn.ubuy.co.in/669eeae2e620e2469e48f254-3-inch-memory-foam-mattress-topper.jpg"],
          category: "mattress",
          featured: true
        },
        {
          id: 2,
          name: "High Back Mesh Office Chair",
          price: 12999,
          description: "Ergonomic high-back office chair with lumbar support, adjustable armrests, and breathable mesh back. Perfect for long working hours.",
          images: ["https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/660560s2.jpg?im=Resize,width=750"],
          category: "office-chair",
          featured: true
        },
        {
          id: 3,
          name: "Premium Plastic Chair (Set of 4)",
          price: 5999,
          description: "Heavy-duty premium plastic chairs with modern design. Stackable, weather-resistant, and perfect for home or office use.",
          images: ["https://m.media-amazon.com/images/I/71bLn6bjYuL.jpg"],
          category: "plastic-chair",
          featured: true
        },
        {
          id: 4,
          name: "Luxury Executive Office Chair",
          price: 24999,
          description: "Premium leather executive chair with high-density foam, recline function, and polished chrome base.",
          images: ["https://www.duroflexworld.com/cdn/shop/files/2_2026e6ee-a9e8-4ff5-88c7-104fea9cefb8.jpg?v=1744560694&width=800"],
          category: "office-chair",
          featured: true
        },
        {
          id: 5,
          name: "Bone Health Orthopedic Mattress",
          price: 34999,
          description: "Doctor-approved orthopedic mattress featuring breathable fabric and advanced pressure relief technology.",
          images: ["https://www.rentomojo.com/blog/wp-content/uploads/2025/08/benefits-of-orthopedic-mattress.png"],
          category: "mattress",
          featured: true
        },
        {
          id: 6,
          name: "Industrial Plastic Chair (Pack of 6)",
          price: 8999,
          description: "Extra heavy-duty plastic chairs for commercial use. High weight capacity and UV-stabilized for outdoor use.",
          images: ["https://sealy.in/cdn/shop/articles/Checking_the_memory_foam_layer_of_a_mattress.png?crop=center&height=1200&v=1763952574&width=1200"],
          category: "plastic-chair",
          featured: true
        }
      ];
      setFeaturedProducts(fallbackProducts);
    }
  }, []);

  const loadReviews = useCallback(async () => {
    try {
      const allReviews = await getReviews();
      if (allReviews && Array.isArray(allReviews)) {
        const shuffled = [...allReviews];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        setReviews(shuffled.slice(0, 6));
      } else {
        const demoReviews = [
          { id: 1, name: "Rajesh Kumar", rating: 5, comment: "Excellent quality mattress! My back pain has reduced significantly. Balaji Enterprises delivers true value for money.", featured: true },
          { id: 2, name: "Sunita Sharma", rating: 5, comment: "The office chairs are super comfortable. My team's productivity has improved. Highly recommend!", featured: true },
          { id: 3, name: "Amit Patel", rating: 4, comment: "Very sturdy plastic chairs. Perfect for our cafeteria. Great finish and durability.", featured: false },
          { id: 4, name: "Neha Gupta", rating: 5, comment: "Bought a complete office setup. The quality and service were outstanding. Will buy again!", featured: true },
          { id: 5, name: "Vikram Singh", rating: 5, comment: "The orthopedic mattress is a game-changer. Finally found the perfect mattress after years of searching.", featured: false }
        ];
        setReviews(demoReviews);
      }
    } catch (error) {
      console.error('Error loading reviews:', error);
    }
  }, []);

  useEffect(() => {
    loadProducts();
    loadReviews();
  }, [loadProducts, loadReviews]);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedProduct]);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    reveals.forEach(reveal => observer.observe(reveal));
    return () => observer.disconnect();
  }, []);

  // Create floating elements for CTA
  useEffect(() => {
    const starsContainer = document.querySelector('.stars-bg');
    if (starsContainer) {
      for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.width = `${Math.random() * 3 + 1}px`;
        star.style.height = star.style.width;
        star.style.animationDelay = `${Math.random() * 5}s`;
        star.style.animationDuration = `${Math.random() * 3 + 2}s`;
        starsContainer.appendChild(star);
      }
    }
  }, []);

  // Slider functionality
  const sliderRef = useRef(null);
  const scrollSlider = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="home">
      {/* Hero Section - Rich & Premium */}
      <section className="hero-section">
        <div className="hero-bg-pattern"></div>
        <div className="hero-gradient-overlay"></div>
        <div className="container">
          <div className="hero-content-new">
            <div className="hero-text-new reveal-left">
              <span className="hero-badge4">✦ EST. 1995 ✦</span>
              <h1>Mittal Seating & <br /><span className="text-gradient">Sleep Solutions</span></h1>
              <p className="tagline">Balaji Enterprises</p>
              <p>India's most trusted destination for premium mattresses, ergonomic office chairs, and durable plastic chairs. Experience the perfect blend of comfort, quality, and craftsmanship.</p>
              <div className="hero-buttons">
                <Link to="/products" className="btn-primary">Explore Collection →</Link>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-outline-light">💬 WhatsApp Inquiry</a>
              </div>
              <div className="hero-stats-new">
                <div className="stat-item-new">
                  <span className="stat-number-new">25+</span>
                  <span className="stat-label-new">Years of Trust</span>
                </div>
                <div className="stat-item-new">
                  <span className="stat-number-new">50k+</span>
                  <span className="stat-label-new">Happy Customers</span>
                </div>
                <div className="stat-item-new">
                  <span className="stat-number-new">1000+</span>
                  <span className="stat-label-new">Projects Delivered</span>
                </div>
              </div>
            </div>
            <div className="hero-image-new reveal-right">
              <div className="hero-showcase-card">
                <img src="https://i.pinimg.com/1200x/ad/b3/ef/adb3ef1cf8f706ba99989669b80d728b.jpg" alt="Balaji Enterprises Showcase" />
                <div className="trust-badge">
                  <span className="icon">🏆</span>
                  <span>India's Most Trusted Brand</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Showreel / Manufacturing Excellence */}
      <section className="excellence-section">
        <div className="container">
          <div className="excellence-container">
            <div className="excellence-content reveal-left">
              <div className="section-badge-new" style={{background: 'rgba(212, 175, 55, 0.15)', color: 'var(--accent-gold)'}}>Our Legacy</div>
              <h2>Manufacturing <span style={{color: 'var(--accent-gold)'}}>Excellence</span> Since 1995</h2>
              <p>With decades of experience, we've perfected the art of creating furniture that combines durability with aesthetic appeal. Every product undergoes rigorous quality testing.</p>
              <div className="excellence-stats">
                <div className="excellence-stat">
                  <span className="number">10+</span>
                  <span className="label">Production Units</span>
                </div>
                <div className="excellence-stat">
                  <span className="number">500+</span>
                  <span className="label">Skilled Workers</span>
                </div>
                <div className="excellence-stat">
                  <span className="number">100+</span>
                  <span className="label">Quality Checks</span>
                </div>
              </div>
            </div>
            <div className="excellence-image reveal-right">
              <img src="https://i.pinimg.com/1200x/ca/30/62/ca30629bebeb4066d8aee47ec53d8ccb.jpg" alt="Balaji Enterprises Manufacturing" />
            </div>
          </div>
        </div>
      </section>

      {/* Category Showcase */}
      <section className="category-showcase">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-badge-new">Shop by Category</div>
            <h2>Find Your <span style={{color: 'var(--accent-gold)'}}>Perfect Match</span></h2>
            <p>Tailored solutions for every need - home, office, or commercial</p>
          </div>
          <div className="category-grid">
            {categories.map((category, index) => (
              <Link to={category.link} key={index} className="category-card reveal" style={{transitionDelay: `${index * 0.1}s`}}>
                <div className="category-image">
                  <img src={category.image} alt={category.name} />
                </div>
                <div className="category-info">
                  <div style={{fontSize: '2rem', marginTop: '-30px'}}>{category.icon}</div>
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-badge-new">Best Sellers</div>
            <h2>Featured <span style={{color: 'var(--accent-gold)'}}>Products</span></h2>
            <p>Our most loved collections trusted by thousands</p>
          </div>
          <div className="products-slider-container">
            <div className="products-slider-track" ref={sliderRef}>
              {featuredProducts.slice(0, 3).map((product, index) => (
                <div key={product.id} className="product-slide">
                  <div className="product-card" onClick={() => setSelectedProduct(product)}>
                    <div className="product-media">
                      {product.images && product.images[0] ? (
                        <img src={product.images[0]} alt={product.name} loading="lazy" />
                      ) : (
                        <div className="image-placeholder">{getCategoryIcon(product.category)}</div>
                      )}
                      {product.featured && <div className="product-tag">⭐ Bestseller</div>}
                    </div>
                    <div className="product-details">
                      <span className="product-category">
                        {getCategoryIcon(product.category)} {getCategoryDisplayName(product.category)}
                      </span>
                      <h3>{product.name}</h3>
                      {/*<div className="product-price">₹{product.price?.toLocaleString() || '0'}</div>*/}

                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="slider-controls">
              <button className="slider-arrow" onClick={() => scrollSlider('left')}>❮</button>
              <button className="slider-arrow" onClick={() => scrollSlider('right')}>❯</button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Modal */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProduct(null)}>×</button>
            <div className="modal-inner">
              <div className="modal-gallery">
                {selectedProduct.images && selectedProduct.images.length > 0 ? (
                  <img src={selectedProduct.images[currentImageIndex]} alt={selectedProduct.name} />
                ) : (
                  <div style={{textAlign: 'center', fontSize: '3rem'}}>{getCategoryIcon(selectedProduct.category)}</div>
                )}
                {selectedProduct.images && selectedProduct.images.length > 1 && (
                  <div className="modal-gallery-controls">
                    <button onClick={prevImage}>❮</button>
                    <button onClick={nextImage}>❯</button>
                  </div>
                )}
              </div>
              <div className="modal-info">
                <span className="product-category">
                  {getCategoryIcon(selectedProduct.category)} {getCategoryDisplayName(selectedProduct.category)}
                </span>
                <h2>{selectedProduct.name}</h2>
                {/*<div className="modal-price">₹{selectedProduct.price?.toLocaleString() || '0'}</div>*/}

                <p>{selectedProduct.description || 'Experience premium comfort and durability with Balaji Enterprises. Engineered for excellence.'}</p>
                <div className="modal-buttons">
                  <a href={`tel:${phoneNumber}`} className="btn-primary" style={{textAlign: 'center'}}>📞 Call for Best Price</a>
                  <button onClick={() => openWhatsApp(selectedProduct.name)} className="btn-wa">💬 Chat on WhatsApp</button>
                  <Link to="/book-appointment" className="btn-secondary">Book Free Consultation →</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pillars Section */}
<section className="pillars-section">
  <div className="container">
    <div className="section-header reveal">
      <div className="section-badge-new" style={{background: 'rgba(212, 175, 55, 0.15)', color: 'var(--gold)'}}>Why Choose Us</div>
      <h2 style={{color: 'white'}}>Built on <span style={{color: 'var(--gold)'}}>Trust & Quality</span></h2>
      <p style={{color: 'rgba(255, 255, 255, 0.8)'}}>Every product from Balaji Enterprises is a testament to quality and care</p>
    </div>
    <div className="pillars-grid">
      {pillars.map((pillar, index) => (
        <div key={index} className="pillar-card reveal" style={{transitionDelay: `${index * 0.1}s`}}>
          <div className="pillar-icon">{pillar.icon}</div>
          <h3>{pillar.title}</h3>
          <p>{pillar.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-badge-new">Testimonials</div>
            <h2>Trusted by <span style={{color: 'var(--accent-gold)'}}>Thousands</span></h2>
            <p>Real stories from our happy customers</p>
          </div>
          <div className="testimonials-grid">
            {reviews.slice(0, 3).map((review) => (
              <div key={review.id} className="testimonial-card">
                <div className="testimonial-quote">“</div>
                <p className="testimonial-text">{review.comment}</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{review.name.charAt(0)}</div>
                  <div className="author-info">
                    <h4>{review.name}</h4>
                    <p>{'★'.repeat(review.rating)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* CTA Section */}
<section className="cta-section">
  <div className="cta-overlay"></div>
  <div className="stars-bg"></div>
  <div className="container">
    <div className="reveal">
      <h2>Ready for the <span style={{color: 'var(--gold)'}}>Ultimate Comfort Experience?</span></h2>
      <p>Join 50,000+ happy customers who trust Balaji Enterprises for their furniture needs</p>
      <div className="cta-buttons">
        <Link to="/products" className="btn-primary">Explore Collection →</Link>
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-outline-light">💬 WhatsApp Inquiry</a>
      </div>
    </div>
  </div>
</section>
    </div>
  );
};

export default Home;