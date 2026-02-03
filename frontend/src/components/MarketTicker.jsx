
import React, { useState, useEffect } from 'react';

const MarketTicker = () => {
    const [prices, setPrices] = useState([]);

    useEffect(() => {
        fetchPrices();
        const interval = setInterval(fetchPrices, 5000);
        return () => clearInterval(interval);
    }, []);

    const fetchPrices = async () => {
        try {
            const res = await fetch('http://localhost:8000/api/market-prices/');
            if (res.ok) {
                const data = await res.json();
                setPrices(data.prices);
            }
        } catch (err) {
            console.error("Ticker Error:", err);
        }
    };

    if (prices.length === 0) return null;

    return (
        <div className="market-ticker-container glass-card">
            <div className="ticker-label">📢 LIVE MANDI RATES</div>
            <div className="ticker-wrap">
                <div className="ticker-move">
                    {prices.map((p, i) => (
                        <div className="ticker-item" key={i}>
                            <span className="crop-icon">🌾</span>
                            <strong>{p.crop}</strong>:
                            <span className={p.trend === 'up' ? 'price-up' : p.trend === 'down' ? 'price-down' : ''}>
                                ₹{p.price}/{p.unit} ({p.trend === 'up' ? '▲' : p.trend === 'down' ? '▼' : '▬'})
                            </span>
                        </div>
                    ))}
                    {/* Duplicate for seamless loop */}
                    {prices.map((p, i) => (
                        <div className="ticker-item" key={`dup-${i}`}>
                            <span className="crop-icon">🌾</span>
                            <strong>{p.crop}</strong>:
                            <span className={p.trend === 'up' ? 'price-up' : p.trend === 'down' ? 'price-down' : ''}>
                                ₹{p.price}/{p.unit}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                .market-ticker-container {
                    display: flex;
                    align-items: center;
                    overflow: hidden;
                    white-space: nowrap;
                    padding: 0.8rem;
                    margin-bottom: 2rem;
                    border-left: 5px solid #2f9e44;
                    background: rgba(255, 255, 255, 0.9);
                }
                .ticker-label {
                    background: #2f9e44;
                    color: white;
                    padding: 0.3rem 0.8rem;
                    border-radius: 4px;
                    font-weight: bold;
                    font-size: 0.8rem;
                    margin-right: 1rem;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                    z-index: 2;
                }
                .ticker-wrap { width: 100%; overflow: hidden; position: relative; }
                .ticker-move { display: inline-block; white-space: nowrap; animation: ticker 40s linear infinite; }
                .ticker-move:hover { animation-play-state: paused; }
                .ticker-item { display: inline-block; padding: 0 2rem; font-size: 1rem; }
                
                @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

                .price-up { color: #37b24d; font-weight: bold; }
                .price-down { color: #f03e3e; font-weight: bold; }
            `}</style>
        </div>
    );
};

export default MarketTicker;
