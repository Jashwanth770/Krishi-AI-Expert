import React, { useState, useEffect } from 'react';
import '../DesignSystem.css';

const PriceTrends = ({ userLocation }) => {
    const [selectedCrop, setSelectedCrop] = useState('Wheat');
    const [priceData, setPriceData] = useState([]);
    const [loading, setLoading] = useState(true);

    const crops = ['Wheat', 'Onion', 'Tomato', 'Soybean', 'Rice', 'Cotton'];

    // Mock historical data - in production, this would come from backend
    const mockTrendData = {
        'Wheat': [
            { date: 'Jan 20', price: 2100 },
            { date: 'Jan 22', price: 2150 },
            { date: 'Jan 24', price: 2200 },
            { date: 'Jan 26', price: 2250 },
            { date: 'Jan 27', price: 2250 },
            { date: 'Predicted', price: 2300, predicted: true }
        ],
        'Onion': [
            { date: 'Jan 20', price: 2000 },
            { date: 'Jan 22', price: 1950 },
            { date: 'Jan 24', price: 1850 },
            { date: 'Jan 26', price: 1800 },
            { date: 'Jan 27', price: 1800 },
            { date: 'Predicted', price: 1750, predicted: true }
        ],
        'Tomato': [
            { date: 'Jan 20', price: 35 },
            { date: 'Jan 22', price: 38 },
            { date: 'Jan 24', price: 39 },
            { date: 'Jan 26', price: 40 },
            { date: 'Jan 27', price: 40 },
            { date: 'Predicted', price: 42, predicted: true }
        ]
    };

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setPriceData(mockTrendData[selectedCrop] || mockTrendData['Wheat']);
            setLoading(false);
        }, 500);
    }, [selectedCrop]);

    const maxPrice = Math.max(...priceData.map(d => d.price));
    const minPrice = Math.min(...priceData.map(d => d.price));
    const currentPrice = priceData[priceData.length - 2]?.price || 0;
    const predictedPrice = priceData[priceData.length - 1]?.price || 0;
    const trend = predictedPrice > currentPrice ? 'up' : predictedPrice < currentPrice ? 'down' : 'stable';

    return (
        <div className="trends-container">
            <div className="trends-header">
                <h2>📈 Market Price Trends</h2>
                <p>AI-Powered Price Predictions for {userLocation}</p>
            </div>

            {/* Crop Selector */}
            <div className="crop-selector glass-card">
                <h3>Select Crop</h3>
                <div className="crop-buttons">
                    {crops.map(crop => (
                        <button
                            key={crop}
                            className={`crop-btn ${selectedCrop === crop ? 'active' : ''}`}
                            onClick={() => setSelectedCrop(crop)}
                        >
                            {crop}
                        </button>
                    ))}
                </div>
            </div>

            {/* Price Summary */}
            <div className="price-summary glass-card">
                <div className="summary-item">
                    <span className="label">Current Price</span>
                    <span className="value">₹{currentPrice}</span>
                </div>
                <div className="summary-item">
                    <span className="label">Predicted (Next Week)</span>
                    <span className={`value trend-${trend}`}>
                        ₹{predictedPrice} {trend === 'up' ? '▲' : trend === 'down' ? '▼' : '▬'}
                    </span>
                </div>
                <div className="summary-item">
                    <span className="label">7-Day Range</span>
                    <span className="value">₹{minPrice} - ₹{maxPrice}</span>
                </div>
            </div>

            {/* Chart */}
            <div className="glass-card chart-container">
                <h3>Price History & Forecast</h3>
                {loading ? (
                    <p>Loading chart...</p>
                ) : (
                    <div className="chart">
                        <div className="chart-bars">
                            {priceData.map((item, idx) => {
                                const height = ((item.price - minPrice) / (maxPrice - minPrice)) * 100;
                                return (
                                    <div key={idx} className="bar-wrapper">
                                        <div
                                            className={`bar ${item.predicted ? 'predicted' : ''}`}
                                            style={{ height: `${Math.max(height, 10)}%` }}
                                        >
                                            <span className="bar-value">₹{item.price}</span>
                                        </div>
                                        <span className="bar-label">{item.date}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* AI Insights */}
            <div className="glass-card ai-insights">
                <h3>🤖 AI Market Insights</h3>
                <div className="insight-item">
                    <span className="insight-icon">💡</span>
                    <p>
                        {trend === 'up'
                            ? `${selectedCrop} prices are expected to rise by ${Math.round(((predictedPrice - currentPrice) / currentPrice) * 100)}% next week. Good time to hold inventory.`
                            : trend === 'down'
                                ? `${selectedCrop} prices may drop by ${Math.round(((currentPrice - predictedPrice) / currentPrice) * 100)}% next week. Consider selling now.`
                                : `${selectedCrop} prices are expected to remain stable. Market conditions are favorable.`
                        }
                    </p>
                </div>
                <div className="insight-item">
                    <span className="insight-icon">📊</span>
                    <p>Demand is {trend === 'up' ? 'high' : 'moderate'} in {userLocation.split(',')[0]} region. {trend === 'up' ? 'Premium quality crops will fetch better prices.' : 'Focus on bulk sales for better margins.'}</p>
                </div>
            </div>

            <style>{`
        .trends-container { max-width: 1000px; margin: 2rem auto; }
        .trends-header { text-align: center; margin-bottom: 2rem; }
        .crop-selector { margin-bottom: 2rem; }
        .crop-buttons { 
          display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 1rem; 
        }
        .crop-btn {
          padding: 0.8rem 1.5rem; border-radius: 50px; border: 2px solid var(--primary-green);
          background: white; color: var(--primary-green); cursor: pointer;
          font-weight: 600; transition: all 0.3s;
        }
        .crop-btn.active {
          background: var(--primary-green); color: white;
        }
        .price-summary {
          display: flex; justify-content: space-around; margin-bottom: 2rem;
          padding: 2rem; gap: 2rem;
        }
        .summary-item { text-align: center; }
        .summary-item .label { display: block; font-size: 0.9rem; color: #666; margin-bottom: 0.5rem; }
        .summary-item .value { display: block; font-size: 1.8rem; font-weight: 800; color: var(--primary-green); }
        .trend-up { color: #2d6a4f; }
        .trend-down { color: #d9480f; }
        .chart-container { padding: 2rem; }
        .chart { 
          height: 300px; display: flex; align-items: flex-end; 
          border-left: 3px solid #2d6a4f; border-bottom: 3px solid #2d6a4f;
          padding: 2rem 1rem 1rem 1rem; margin-top: 2rem;
          background: linear-gradient(to top, rgba(45, 106, 79, 0.03), transparent);
          border-radius: 10px;
        }
        .chart-bars { 
          display: flex; gap: 1.5rem; width: 100%; align-items: flex-end; 
          justify-content: space-around;
        }
        .bar-wrapper { 
          flex: 1; display: flex; flex-direction: column; align-items: center; 
          height: 100%;
        }
        .bar {
          width: 100%; 
          background: linear-gradient(180deg, #2d6a4f 0%, #52b788 100%);
          border-radius: 10px 10px 0 0; 
          position: relative;
          display: flex; align-items: flex-start; justify-content: center;
          transition: all 0.3s;
          box-shadow: 0 4px 12px rgba(45, 106, 79, 0.3);
          border: 2px solid #2d6a4f;
        }
        .bar:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(45, 106, 79, 0.4);
        }
        .bar.predicted {
          background: linear-gradient(180deg, #ffb703 0%, #ffd60a 100%);
          opacity: 0.9; 
          border: 3px dashed #fb8500;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.9; }
          50% { opacity: 1; }
        }
        .bar-value {
          font-size: 0.85rem; font-weight: 800; 
          color: #2d6a4f;
          background: white;
          padding: 0.3rem 0.6rem; 
          position: absolute; 
          top: -35px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          border: 2px solid #2d6a4f;
        }
        .bar.predicted .bar-value {
          color: #fb8500;
          border-color: #fb8500;
        }
        .bar-label {
          font-size: 0.75rem; 
          color: #2d6a4f; 
          margin-top: 0.8rem;
          text-align: center;
          font-weight: 600;
        }
        .ai-insights { margin-top: 2rem; }
        .insight-item {
          display: flex; gap: 1rem; align-items: flex-start; 
          padding: 1rem; background: rgba(45, 106, 79, 0.05);
          border-radius: 15px; margin-top: 1rem;
        }
        .insight-icon { font-size: 1.5rem; }
        @media (max-width: 768px) {
          .price-summary { flex-direction: column; gap: 1rem; }
          .chart { height: 200px; }
          .crop-buttons { justify-content: center; }
        }
      `}</style>
        </div>
    );
};

export default PriceTrends;
