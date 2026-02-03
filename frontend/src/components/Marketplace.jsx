import React, { useState, useEffect } from 'react';
import '../DesignSystem.css';

const Marketplace = ({ user }) => {
    const [products, setProducts] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [contactVisible, setContactVisible] = useState(null);
    const role = user?.profile?.role || 'FARMER';
    const [newProduct, setNewProduct] = useState({
        item_name: '',
        description: '',
        price: '',
        quantity: '',
        unit: 'kg'
    });

    useEffect(() => {
        fetchProducts();
    }, []);



    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/market/products/');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        if (!user) {
            alert('Please login to post a listing!');
            return;
        }
        try {
            const response = await fetch('http://localhost:8000/api/market/products/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...newProduct, seller: user.id }),
            });
            if (response.ok) {
                alert('Success! Your crop has been listed.');
                setShowAddForm(false);
                fetchProducts();
            } else {
                const errorData = await response.json();
                alert('Error: ' + JSON.stringify(errorData));
            }
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Failed to connect to the server.');
        }
    };

    return (
        <div className="marketplace-container">
            <div className="market-header">
                <h2>{role === 'CUSTOMER' ? '🛒 Buy Quality Rice' : '🛒 Farmer Marketplace'}</h2>
                {role !== 'CUSTOMER' && (
                    <button className="btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
                        {showAddForm ? 'Close Form' : (role === 'RICE_MILL' ? 'List Rice' : 'List My Crop')}
                    </button>
                )}
            </div>

            {showAddForm && (
                <section className="glass-card add-form animate-fade-in">
                    <h3>{role === 'RICE_MILL' ? 'List Processed Rice' : 'List Raw Crop'}</h3>
                    <p className="form-subtitle">
                        {role === 'RICE_MILL' ? 'Sell to Customers & Retailers' : 'Sell to Rice Mills'}
                    </p>
                    {!user && <p style={{ color: '#d9480f' }}>⚠️ You must be logged in to post.</p>}
                    <form onSubmit={handleAddProduct}>
                        <div className="form-grid">
                            <input
                                type="text"
                                placeholder={role === 'RICE_MILL' ? "Brand/Variety (e.g. Royal Basmati)" : "Crop Name (e.g. Paddy 1009)"}
                                required value={newProduct.item_name}
                                onChange={e => setNewProduct({ ...newProduct, item_name: e.target.value })}
                            />

                            {role === 'FARMER' && (
                                <select
                                    value={newProduct.description.split(' - ')[0] || ''}
                                    onChange={e => setNewProduct({ ...newProduct, description: `${e.target.value} - Harvested: ${new Date().toLocaleDateString()}` })}
                                >
                                    <option value="">Select Crop Condition...</option>
                                    <option value="Fresh Harvest">Fresh Harvest</option>
                                    <option value="Dried (Low Moisture)">Dried (Low Moisture)</option>
                                    <option value="Raw / Unprocessed">Raw / Unprocessed</option>
                                </select>
                            )}

                            {role === 'RICE_MILL' && (
                                <select
                                    value={newProduct.description.split(' - ')[0] || ''}
                                    onChange={e => setNewProduct({ ...newProduct, description: `${e.target.value} - Polished: Double` })}
                                >
                                    <option value="">Select Grade...</option>
                                    <option value="Premium Grade A">Premium Grade A</option>
                                    <option value="Standard Grade B">Standard Grade B</option>
                                    <option value="Broken Rice">Broken Rice</option>
                                </select>
                            )}

                            <textarea
                                placeholder="Additional Details (Moisture level, location, etc.)" required
                                value={newProduct.description}
                                onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                            />
                        </div>

                        <div className="input-group">
                            <input
                                type="number" placeholder="Price (₹)" required
                                value={newProduct.price}
                                onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                            />
                            <input
                                type="number" placeholder="Quantity" required
                                value={newProduct.quantity}
                                onChange={e => setNewProduct({ ...newProduct, quantity: e.target.value })}
                            />
                            <select
                                value={newProduct.unit}
                                onChange={e => setNewProduct({ ...newProduct, unit: e.target.value })}
                            >
                                <option value="kg">kg</option>
                                <option value="Quintal">Quintal</option>
                                <option value="Bag">Bag (25kg)</option>
                                <option value="Ton">Ton</option>
                            </select>
                        </div>
                        <button type="submit" className="btn-primary" disabled={!user}>
                            {role === 'RICE_MILL' ? 'List Rice for Sale' : 'List Crop @ Mandi'}
                        </button>
                    </form>
                </section>
            )}

            <div className="products-grid">
                {products.map(product => (
                    <div key={product.id} className="glass-card p-card">
                        <div className="p-header">
                            <span className="p-icon">🌾</span>
                            <div className="p-titles">
                                <h4>{product.item_name}</h4>
                                <span className="seller-tag">By Worker_{product.seller}</span>
                            </div>
                        </div>
                        <p className="p-desc">{product.description}</p>
                        <div className="p-info">
                            <span className="p-price">₹{product.price} / {product.unit}</span>
                            <span className="p-qty">Qty: {product.quantity}</span>
                        </div>

                        <div className="contact-section">
                            {role === 'CUSTOMER' ? (
                                <button className="btn-primary full-width" onClick={() => alert("Added to Cart!")}>
                                    Add to Cart 🛒
                                </button>
                            ) : (
                                // For farmers/mills viewing
                                contactVisible === product.id ? (
                                    <div className="contact-revealed animate-fade-in">
                                        <p>📞 +91 98765 43210</p>
                                        <button
                                            className="btn-secondary btn-small"
                                            onClick={() => {
                                                const message = `Hello, I'm interested in your ${product.item_name} listed on Krishi AI. (₹${product.price} / ${product.unit})`;
                                                window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`, '_blank');
                                            }}
                                        >
                                            WhatsApp
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        className="btn-primary full-width"
                                        onClick={() => setContactVisible(product.id)}
                                    >
                                        Contact Farmer
                                    </button>
                                )
                            )}
                        </div>
                    </div>
                ))}
                {products.length === 0 && !showAddForm && (
                    <p>No listings yet. Be the first to list your crops!</p>
                )}
            </div>

            <style>{`
        .marketplace-container { max-width: 1000px; margin: 2rem auto; }
        .market-header {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 2rem;
        }
        .add-form { margin-bottom: 2rem; padding: 2rem; border-left: 5px solid var(--primary-green); }
        .add-form h3 { font-size: 1.8rem; color: var(--primary-green); margin-bottom: 0.5rem; }
        .form-subtitle { color: #666; margin-bottom: 1.5rem; }
        
        .add-form form { display: flex; flex-direction: column; gap: 1.5rem; }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        
        /* Glass Input Styling */
        .add-form input, .add-form select, .add-form textarea {
          width: 100%;
          padding: 1rem 1.2rem;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.3);
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(10px);
          font-size: 1rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }
        .add-form input:focus, .add-form select:focus, .add-form textarea:focus {
           background: rgba(255, 255, 255, 0.9);
           border-color: var(--primary-green);
           box-shadow: 0 0 15px rgba(46, 125, 50, 0.2);
           outline: none;
           transform: translateY(-2px);
        }
        .add-form textarea { grid-column: span 2; min-height: 80px; resize: vertical; }

        .input-group { display: grid; grid-template-columns: 1fr 1fr 0.8fr; gap: 1.5rem; align-items: center; }

        .products-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 2rem;
        }
        .p-card { text-align: left; display: flex; flex-direction: column; gap: 1rem; transition: transform 0.3s; }
        .p-card:hover { transform: translateY(-5px); }
        .p-header { display: flex; align-items: center; gap: 1rem; }
        .seller-tag { font-size: 0.7rem; color: #888; display: block; }
        .p-icon { font-size: 2rem; background: #e9ecef; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; border-radius: 50%; }
        .p-desc { font-size: 0.9rem; color: #666; flex: 1; }
        .p-info { display: flex; justify-content: space-between; font-weight: 700; color: var(--primary-green); background: rgba(46, 125, 50, 0.1); padding: 0.5rem; border-radius: 8px; }
        .contact-revealed { 
            background: rgba(45, 106, 79, 0.1); 
            padding: 1rem; border-radius: 15px; 
            text-align: center; display: flex; flex-direction: column; gap: 0.5rem;
        }
        .full-width { width: 100%; justify-content: center; }
        .btn-small { font-size: 0.8rem; padding: 0.3rem 0.6rem; }
      `}</style>
        </div>
    );
};

export default Marketplace;
