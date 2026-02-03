import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './DesignSystem.css';
import DiseaseDetector from './components/DiseaseDetector';
import FarmingAssistant from './components/FarmingAssistant';
import Marketplace from './components/Marketplace';
import Schemes from './components/Schemes';
import Auth from './components/Auth';
import Profile from './components/Profile';

import PriceTrends from './components/PriceTrends';
import Verification from './components/Verification';
import RiceQualityCheck from './components/RiceQualityCheck';
import RiceMillAnalytics from './components/RiceMillAnalytics';
import MillChat from './components/MillChat';

import { translations } from './translations';

const Dashboard = ({ userLocation, lang, user }) => {
  const [marketPrices, setMarketPrices] = useState([]);
  const [loadingPrices, setLoadingPrices] = useState(true);
  const t = translations[lang];
  const isVerified = user?.profile?.verification_status === 'VERIFIED';
  const role = user?.profile?.role || 'FARMER'; // Default to FARMER if undefined


  const [weather, setWeather] = useState({
    temperature: '24',
    condition: 'Partly Cloudy',
    humidity: '75',
    alerts: []
  });
  const [loadingWeather, setLoadingWeather] = useState(true);

  useEffect(() => {
    fetchMarketPrices();
    fetchWeather();
  }, [userLocation]);

  const fetchMarketPrices = async () => {
    setLoadingPrices(true);
    try {
      const response = await fetch(`http://localhost:8000/api/market-prices/?location=${userLocation}`);
      const data = await response.json();
      setMarketPrices(data.prices);
    } catch (error) {
      console.error('Error fetching market prices:', error);
    } finally {
      setLoadingPrices(false);
    }
  };

  const fetchWeather = async () => {
    setLoadingWeather(true);
    try {
      const response = await fetch(`http://localhost:8000/api/weather/?location=${userLocation}`);
      const data = await response.json();
      setWeather({
        temperature: data.temperature,
        condition: data.condition,
        humidity: data.humidity,
        alerts: data.alerts || []
      });
    } catch (error) {
      console.error('Error fetching weather:', error);
    } finally {
      setLoadingWeather(false);
    }
  };

  return (
    <main className="main-content">
      <section className="glass-card weather-widget">
        <div className="widget-header">
          <h3>{t.weatherTitle}</h3>
          <span className="location">📍 {userLocation}</span>
        </div>
        <div className="weather-stats">
          <div className="stat">
            <span className="temp">{loadingWeather ? '...' : weather.temperature}°C</span>
            <span className="condition">{loadingWeather ? 'Loading...' : weather.condition}</span>
            <span className="humidity">💧 Humidity: {weather.humidity}%</span>
          </div>
          <div className="ai-alert">
            {weather.alerts.length > 0 && (
              <p>
                {weather.alerts[0].type === 'warning' ? '⚠️' : weather.alerts[0].type === 'alert' ? '🚨' : 'ℹ️'}
                {' '}<strong>{t.aiAdvice}:</strong> {weather.alerts[0].message}
              </p>
            )}
          </div>
        </div>
      </section>

      <div className="actions-grid">
        {/* Common Feature: Market Prices */}
        <Link to="/trends" className="glass-card action-card no-deco">
          <span className="icon">�</span>
          <h3>{t.marketPrice}</h3>
          <p>{t.marketDesc}</p>
          <button className="btn-primary">{t.viewTrends}</button>
        </Link>

        {/* FARMER FEATURES */}
        {role === 'FARMER' && (
          <>
            <Link to="/disease" className="glass-card action-card no-deco">
              <span className="icon">�</span>
              <h3>{t.diseaseDetect}</h3>
              <p>{t.diseaseDesc}</p>
              <button className="btn-primary">{t.scanNow}</button>
            </Link>

            <Link to="/chat" className="glass-card action-card no-deco">
              <span className="icon">💬</span>
              <h3>AI Chat Help</h3>
              <p>{t.askAnything}</p>
              <button className="btn-primary">{t.chatNow}</button>
            </Link>

            <Link to="/schemes" className="glass-card action-card no-deco">
              <span className="icon">🏛️</span>
              <h3>{t.govSchemes}</h3>
              <p>{t.subsidyChecker}</p>
              <button className="btn-primary">{t.findSupport}</button>
            </Link>
            <Link to="/analytics" className="glass-card action-card no-deco">
              <span className="icon">📈</span>
              <h3>My Harvest</h3>
              <p>Track Sales</p>
              <button className="btn-primary" style={{ background: 'var(--accent-gold)' }}>Analytics</button>
            </Link>
          </>
        )}

        {/* RICE MILL FEATURES */}
        {role === 'RICE_MILL' && (
          <>
            <Link to="/analytics" className="glass-card action-card no-deco">
              <span className="icon">🏭</span>
              <h3>Mill Analytics</h3>
              <p>Manage Inventory</p>
              <button className="btn-primary" style={{ background: 'var(--accent-gold)' }}>Dashboard</button>
            </Link>
            <Link to="/rice-quality" className="glass-card action-card no-deco">
              <span className="icon">🍚</span>
              <h3>Rice Quality Check</h3>
              <p>AI Grade Analysis</p>
              <button className="btn-primary">Inspect Rice</button>
            </Link>
            {/* Mills can also use chat for market insights */}
            <Link to="/mill-chat" className="glass-card action-card no-deco">
              <span className="icon">🏭</span>
              <h3>Ask Mill Master</h3>
              <p>Expert Milling Advice</p>
              <button className="btn-primary">Chat Now</button>
            </Link>
          </>
        )}

        {/* CUSTOMER FEATURES */}
        {role === 'CUSTOMER' && (
          <>
            <Link to="/market" className="glass-card action-card no-deco">
              <span className="icon">🛒</span>
              <h3>Buy Quality Rice</h3>
              <p>Direct from Mills</p>
              <button className="btn-primary">Shop Now</button>
            </Link>
            <div className="glass-card action-card">
              <span className="icon">✅</span>
              <h3>Verified Quality</h3>
              <p>AI Tested Grains</p>
              <button className="btn-secondary" style={{ pointerEvents: 'none' }}>Guaranteed</button>
            </div>
          </>
        )}
      </div>


      <section className="glass-card community-pulse" style={{ marginTop: '2rem' }}>
        <div className="widget-header">
          <h3>{t.communityPulse}</h3>
        </div>
        <div className="pulse-grid">
          <div className="pulse-card">
            <h4>{t.trendingCrops}</h4>
            <ul>
              <li>🌾 Wheat (High Demand) <span className="trend up">▲</span></li>
              <li>🧅 Onion (Price Drop) <span className="trend down">▼</span></li>
              <li>🌽 Maize (Steady) <span className="trend up">▲</span></li>
            </ul>
          </div>
          <div className="pulse-card">
            <h4>{t.topRice}</h4>
            <ul>
              <li>🍚 Basmati Premium (Export) ⭐</li>
              <li>🍚 Sona Masoori (Local Favorite) 🔥</li>
              <li>🍚 Indrayani (New Stock) 🆕</li>
            </ul>
          </div>
        </div>
        <div className="live-ticker">
          <p className="ticker-text">{t.activity}: Farmer Ram listed 10Q Wheat • Rice Mill A sold 50kg Basmati • New Scheme Added • High Demand for Cotton in Nagpur</p>
        </div>
      </section>

      <section className="glass-card market-prices-section">
        <div className="widget-header">
          <h3>{t.livePrices} ({userLocation.split(',')[0]})</h3>
        </div>
        <div className="price-scroll">
          {loadingPrices ? (
            <p>Fetching latest rates...</p>
          ) : (
            marketPrices.map((item, idx) => (
              <div key={idx} className="price-card">
                <span className="crop-name">{item.crop}</span>
                <span className="crop-price">₹{item.price} / {item.unit}</span>
                <span className={`trend ${item.trend}`}>
                  {item.trend === 'up' ? '▲' : item.trend === 'down' ? '▼' : '▬'}
                </span>
              </div>
            ))
          )}
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <Link to="/trends" className="btn-secondary" style={{ display: 'inline-flex' }}>📊 View Detailed Prices</Link>
          <Link to="/market" className="btn-primary" style={{ display: 'inline-flex' }}>🛒 Enter Marketplace</Link>
        </div>
      </section>
    </main >
  );
};

function App() {
  const [location, setLocation] = useState('Sangli, India');
  const [showLocationInput, setShowLocationInput] = useState(false);
  const [tempLocation, setTempLocation] = useState(location);
  const [user, setUser] = useState(null);
  const [lang, setLang] = useState('en');
  const t = translations[lang];

  const toggleLang = () => {
    const langs = ['en', 'hi', 'mr', 'te'];
    const nextIdx = (langs.indexOf(lang) + 1) % langs.length;
    setLang(langs[nextIdx]);
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('krishi_user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Sync dashboard location with user profile
  useEffect(() => {
    if (user?.profile?.location) {
      setLocation(user.profile.location);
      setTempLocation(user.profile.location);
    }
  }, [user]);

  const handleLocationUpdate = (e) => {
    e.preventDefault();
    setLocation(tempLocation);
    setShowLocationInput(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('krishi_user');
  };

  return (
    <Router>
      <div className="dashboard-container">
        <header className="header">
          <Link to="/" className="logo-section no-deco">
            <h1 className="text-gradient">Krishi AI</h1>
            <p>Your Intelligent Farming Partner</p>
          </Link>

          <div className="header-actions">
            <div className="location-selector">
              <button
                className="btn-secondary"
                onClick={() => setShowLocationInput(!showLocationInput)}
              >
                📍 {location}
              </button>
              {showLocationInput && (
                <form className="location-form glass-card" onSubmit={handleLocationUpdate}>
                  <input
                    type="text"
                    value={tempLocation}
                    onChange={(e) => setTempLocation(e.target.value)}
                    placeholder="Enter city, country"
                    autoFocus
                  />
                  <button type="submit" className="btn-primary">Update</button>
                </form>
              )}
            </div>

            {user ? (
              <div className="user-menu">
                <Link to="/profile" className="btn-secondary no-deco">👤 {user.username}</Link>
                {user.profile?.verification_status === 'VERIFIED' ? (
                  <span style={{
                    background: '#d4edda', color: '#155724',
                    padding: '0.5rem 1rem', borderRadius: '20px',
                    fontWeight: 'bold', border: '1px solid #c3e6cb',
                    display: 'flex', alignItems: 'center', gap: '5px'
                  }}>
                    {user.profile.role === 'FARMER' ? '👨‍🌾 Farmer Verified' :
                      user.profile.role === 'RICE_MILL' ? '🏭 Rice Mill Verified' : '🛒 Customer Verified'}
                  </span>
                ) : (
                  <Link to="/verify" className="btn-secondary" style={{ background: '#ffc107', color: '#000', border: 'none' }}>
                    VERIFY
                  </Link>
                )}
                <button className="btn-primary btn-small" onClick={logout}>{t.logout}</button>
              </div>
            ) : (
              <Link to="/auth" className="btn-primary no-deco">{t.login}</Link>
            )}

            <div className="lang-selector">
              <span className="globe-icon">🌐</span>
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="lang-dropdown"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="mr">मराठी</option>
                <option value="te">తెలుగు</option>
              </select>
            </div>
          </div>
        </header>

        <Routes>
          <Route path="/" element={user ? <Dashboard userLocation={location} lang={lang} user={user} /> : <Auth setGlobalUser={setUser} lang={lang} />} />
          <Route path="/disease" element={<DiseaseDetector lang={lang} />} />
          <Route path="/chat" element={<FarmingAssistant lang={lang} />} />
          <Route path="/market" element={<Marketplace user={user} lang={lang} />} />
          <Route path="/schemes" element={<Schemes lang={lang} />} />
          <Route path="/trends" element={<PriceTrends userLocation={location} lang={lang} />} />
          <Route path="/auth" element={<Auth setGlobalUser={setUser} lang={lang} />} />
          <Route path="/profile" element={<Profile user={user} lang={lang} />} />
          <Route path="/verify" element={user ? <Verification user={user} lang={lang} /> : <Auth setGlobalUser={setUser} lang={lang} />} />
          <Route path="/analytics" element={user ? <RiceMillAnalytics user={user} lang={lang} /> : <Auth setGlobalUser={setUser} lang={lang} />} />
          <Route path="/rice-quality" element={user ? <RiceQualityCheck lang={lang} /> : <Auth setGlobalUser={setUser} lang={lang} />} />
          <Route path="/detect-disease" element={user ? <DiseaseDetector lang={lang} /> : <Auth setGlobalUser={setUser} lang={lang} />} />
          <Route path="/mill-chat" element={<MillChat />} />
        </Routes>

        <Link to="/chat" className="voice-assistant-fab">
          <button className="fab-btn">🎙️</button>
        </Link>

        <style>{`
          .dashboard-container {
            padding: 2rem;
            max-width: 1200px;
            margin: 0 auto;
            min-height: 100vh;
          }
          .no-deco { text-decoration: none; color: inherit; }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 3rem;
          }
          .header-actions { display: flex; gap: 1rem; align-items: center; position: relative; }
          .btn-secondary {
            background: rgba(45, 106, 79, 0.1);
            color: var(--primary-green);
            border: 1px solid var(--primary-green);
            padding: 0.5rem 1rem;
            border-radius: 50px;
            cursor: pointer;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
          .lang-selector {
            position: relative;
            display: flex;
            align-items: center;
            background: rgba(45, 106, 79, 0.1);
            border: 1px solid var(--primary-green);
            border-radius: 50px;
            padding: 0 0.5rem;
          }
          .globe-icon { font-size: 1.2rem; margin-right: 0.2rem; }
          .lang-dropdown {
            background: transparent;
            border: none;
            color: var(--primary-green);
            font-weight: 600;
            font-size: 0.95rem;
            padding: 0.5rem;
            border-radius: 50px;
            cursor: pointer;
            outline: none;
            appearance: none; /* Hide default arrow in some browsers if desired, or keep it */
            padding-right: 1.5rem; /* Space for arrow usually */
          }
          .user-menu { display: flex; gap: 0.5rem; align-items: center; }
          .btn-small { padding: 0.4rem 0.8rem; font-size: 0.8rem; }
          .location-form {
            position: absolute;
            top: 100%;
            right: 0;
            z-index: 1000;
            margin-top: 10px;
            display: flex;
            gap: 0.5rem;
            padding: 1rem;
          }
          .location-form input {
            padding: 0.5rem 1rem;
            border-radius: 20px;
            border: 1px solid #ddd;
          }
          .weather-widget { margin-bottom: 2rem; }
          .weather-stats {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 1rem;
          }
          .stat { display: flex; flex-direction: column; gap: 0.5rem; }
          .temp { font-size: 3rem; font-weight: 800; }
          .condition { font-size: 1rem; color: #666; }
          .humidity { font-size: 0.9rem; color: var(--primary-green); font-weight: 600; }
          .ai-alert {
            background: rgba(255, 183, 3, 0.1);
            padding: 1rem;
            border-left: 4px solid var(--accent-gold);
            border-radius: 10px;
            max-width: 400px;
          }
          .actions-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
          }
          .action-card {
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
            cursor: pointer;
          }
          .action-card .icon { font-size: 2.5rem; }
          .price-scroll {
            display: flex;
            gap: 1.5rem;
            overflow-x: auto;
            padding: 1rem 0;
          }
          .price-card {
            min-width: 180px;
            background: white;
            padding: 1.5rem;
            border-radius: 20px;
            text-align: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }
          .crop-name { font-weight: 700; color: #666; }
          .crop-price { font-size: 1.2rem; font-weight: 800; color: var(--primary-green); }
          .trend.up { color: #2d6a4f; }
          .trend.down { color: #d9480f; }
          .voice-assistant-fab {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            z-index: 100;
          }
          .fab-btn {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--accent-gold), var(--primary-green));
            border: none;
            color: white;
            font-size: 2rem;
            cursor: pointer;
            box-shadow: 0 8px 32px rgba(0,0,0,0.2);
            transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .fab-btn:hover { transform: scale(1.1); }
          @media (max-width: 768px) {
            .dashboard-container { padding: 1rem; }
            .header { flex-direction: column; gap: 1rem; text-align: center; }
            .header-actions { justify-content: center; flex-wrap: wrap; }
            .weather-stats { flex-direction: column; gap: 1rem; text-align: center; }
            .ai-alert { max-width: 100%; }
            .pulse-grid { grid-template-columns: 1fr; }
          }
          .pulse-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 0.5rem; }
          .pulse-card { background: rgba(255,255,255,0.6); padding: 1rem; border-radius: 15px; }
          .pulse-card h4 { color: var(--primary-green); margin-bottom: 0.5rem; }
          .pulse-card ul { list-style: none; padding: 0; }
          .pulse-card li { display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid rgba(0,0,0,0.05); }
          .live-ticker { 
            background: #111; color: #0f0; font-family: 'Courier New', monospace; 
            padding: 0.8rem; margin-top: 1rem; border-radius: 10px; 
            overflow: hidden; white-space: nowrap;
          }
          .ticker-text { animation: scroll 15s linear infinite; display: inline-block; }
          @keyframes scroll {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }

        `}</style>
      </div>
    </Router>
  );
}

export default App;
