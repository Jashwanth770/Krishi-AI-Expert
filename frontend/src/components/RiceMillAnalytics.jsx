import React, { useState, useEffect } from 'react';
import '../DesignSystem.css';
import MarketTicker from './MarketTicker';
import FarmingAssistant from './FarmingAssistant';

const RiceMillAnalytics = ({ user, lang }) => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ totalViews: 1240, totalSales: 45, revenue: 65000 });
    const [livePrices, setLivePrices] = useState([]);
    const [showChat, setShowChat] = useState(false);

    useEffect(() => {
        if (user) {
            fetchListings();
            fetchLivePrices();
            const interval = setInterval(fetchLivePrices, 3000); // 3s Polling
            return () => clearInterval(interval);
        }
    }, [user]);

    const fetchLivePrices = async () => {
        try {
            const res = await fetch('http://localhost:8000/api/market-prices/');
            if (res.ok) {
                const data = await res.json();
                setLivePrices(data.prices);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const fetchListings = async () => {
        try {
            const res = await fetch(`http://localhost:8000/api/market/products/?seller=${user.id}`);
            if (res.ok) {
                const data = await res.json();
                setListings(data);
                // Calculcated stats mock
                setStats(prev => ({ ...prev, totalListings: data.length }));
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this listing?")) return;
        try {
            const res = await fetch(`http://localhost:8000/api/market/products/${id}/`, {
                method: 'DELETE'
            });
            if (res.ok) {
                setListings(listings.filter(item => item.id !== id));
                alert("Listing deleted successfully.");
            } else {
                alert("Failed to delete.");
            }
        } catch (err) {
            alert("Error deleting listing.");
        }
    };

    if (!user) return <div className="text-center p-2">Please login.</div>;

    return (
        <div className="dashboard-container">
            <h2 className="text-gradient">
                {user?.profile?.role === 'FARMER' ? '🌾 Farming Analytics' : '🏭 Rice Mill Analytics'}
            </h2>
            <p style={{ marginBottom: '2rem' }}>Manage your inventory and track performance.</p>

            <div className="stats-grid">
                <div className="glass-card stat-card">
                    <h3>📦 {listings.length}</h3>
                    <p>Active Listings</p>
                </div>
                <div className="glass-card stat-card">
                    <h3>👁️ {stats.totalViews}</h3>
                    <p>Total Views</p>
                </div>
                <div className="glass-card stat-card">
                    <h3>💰 ₹{stats.revenue}</h3>
                    <p>Est. Revenue</p>
                </div>
            </div>

            {/* LIVE MARKET TICKER */}
            <MarketTicker />

            {/* PREDICTION CHART AREA */}
            <div className="prediction-section glass-card animate-fade-in-up">
                <h3>📈 AI Pulse: 7-Day Price Forecast</h3>
                <p>Real-time market simulation & future trends.</p>
                <div className="chart-grid">
                    {livePrices.slice(0, 3).map((crop, i) => (
                        <div className="chart-box" key={i}>
                            <h4>{crop.crop} Trend</h4>
                            <div className="mini-chart">
                                {crop.forecast?.map((day, idx) => (
                                    <div className="bar-wrapper" key={idx}>
                                        <div className="bar" style={{ height: `${(day.price / 3000) * 100}%` }} title={`₹${day.price}`}></div>
                                        <span className="day-label">{day.day}</span>
                                    </div>
                                ))}
                            </div>
                            <p className="prediction-text">
                                Predict: <strong>{crop.forecast?.[6].price > crop.price ? "High Demand 🚀" : "Price Drop 📉"}</strong>
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* MILL CHAT REMOVED (Use /mill-chat) */}

            <h3 style={{ marginTop: '3rem', marginBottom: '1rem' }}>My Listings</h3>

            {loading ? <p>Loading inventory...</p> : (
                <div className="listings-table-wrapper glass-card">
                    {listings.length === 0 ? (
                        <div className="text-center p-2">
                            <p>No listings found.</p>
                            <button className="btn-primary" onClick={() => window.location.href = '/market'}>+ Add New Listing</button>
                        </div>
                    ) : (
                        <table className="custom-table">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Product</th>
                                    <th>Price/Unit</th>
                                    <th>Stock</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listings.map(item => (
                                    <tr key={item.id}>
                                        <td>
                                            <div className="table-img" style={{ backgroundImage: `url(${item.image || 'https://via.placeholder.com/50'})` }}></div>
                                        </td>
                                        <td>
                                            <strong>{item.name}</strong>
                                            <p className="sub-text">{item.description.substring(0, 30)}...</p>
                                        </td>
                                        <td>₹{item.price} / {item.unit}</td>
                                        <td>{item.quantity} {item.unit}</td>
                                        <td>
                                            <button className="btn-danger-sm" onClick={() => handleDelete(item.id)}>🗑️ Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}

            <style>{`
                .prediction-section { margin-top: 2rem; padding: 1.5rem; }
                .chart-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin-top: 1rem; }
                .chart-box { background: rgba(255,255,255,0.5); padding: 1rem; border-radius: 12px; }
                .mini-chart { display: flex; align-items: flex-end; justify-content: space-between; height: 100px; margin: 1rem 0; border-bottom: 1px solid #ddd; }
                .bar-wrapper { display: flex; flex-direction: column; align-items: center; width: 12%; }
                .bar { width: 100%; background: linear-gradient(to top, #74c0fc, #339af0); border-radius: 4px 4px 0 0; transition: height 0.5s ease; }
                .day-label { font-size: 0.7rem; margin-top: 4px; color: #666; }
                .prediction-text { margin-top: 0.5rem; font-size: 0.9rem; text-align: center; }

                .prediction-text { margin-top: 0.5rem; font-size: 0.9rem; text-align: center; }

                .listings-table-wrapper { overflow-x: auto; }
                .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; }
                .stat-card { text-align: center; padding: 2rem; }
                .stat-card h3 { font-size: 2.5rem; color: var(--primary-green); margin-bottom: 0.5rem; }
                .custom-table { width: 100%; border-collapse: collapse; }
                .custom-table th { text-align: left; padding: 1rem; color: #666; border-bottom: 2px solid #eee; }
                .custom-table td { padding: 1rem; border-bottom: 1px solid #eee; }
                .table-img { width: 50px; height: 50px; border-radius: 8px; background-size: cover; background-position: center; background-color: #eee; }
                .btn-danger-sm {
                    background: #ffe3e3; color: #d9480f; border: 1px solid #d9480f;
                    padding: 0.3rem 0.8rem; border-radius: 20px; cursor: pointer; font-size: 0.8rem;
                }
                .btn-danger-sm:hover { background: #d9480f; color: white; }
                .sub-text { font-size: 0.8rem; color: #888; margin: 0; }
            `}</style>
        </div>
    );
};

export default RiceMillAnalytics;
