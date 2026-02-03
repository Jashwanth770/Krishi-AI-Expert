import React, { useState } from 'react';
import '../DesignSystem.css';
import FarmingAssistant from './FarmingAssistant';

const RiceQualityCheck = () => {
    const role = localStorage.getItem('user_role');
    const [selectedFile, setSelectedFile] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        setResult(null);
    };

    const handleAnalyze = async () => {
        if (!selectedFile) return;
        setAnalyzing(true);
        setResult(null);

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/ai/analyze-rice/', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Analysis Failed');
            }

            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error(error);
            alert("Analysis Failed: " + error.message);
            // No Mock Fallback - enforce realtime check failure
        } finally {
            setAnalyzing(false);
        }
    };

    return (
        <div className="rice-quality-container animate-fade-in">
            <section className="glass-card">
                <h2>🍚 AI Rice Quality Analysis</h2>
                <p>Upload a clear photo of rice grains to determine quality grade.</p>

                <div className="upload-section">
                    <input type="file" id="rice-upload" accept="image/*" onChange={handleFileChange} hidden />
                    <label htmlFor="rice-upload" className="upload-box">
                        {selectedFile ? (
                            <div className="preview">
                                <img src={URL.createObjectURL(selectedFile)} alt="Rice Sample" />
                                <p>{selectedFile.name}</p>
                            </div>
                        ) : (
                            <div className="placeholder">
                                <span className="icon">📸</span>
                                <p>Click to Upload Sample</p>
                            </div>
                        )}
                    </label>

                    <button className="btn-primary" disabled={!selectedFile || analyzing} onClick={handleAnalyze}>
                        {analyzing ? 'Analyzing Grains...' : 'Check Quality'}
                    </button>
                </div>

                {result && (
                    <div className="result-section animate-fade-in">
                        <div className="report-header">
                            <div className="header-main">
                                <span className="category-label">Expert Analysis Report</span>
                                <h3>{result.rice_type}</h3>
                                <div className="header-badges">
                                    <p className="overall-grade">{result.overall_grade}</p>
                                    {result.industrial_code && <span className="industrial-id-badge">ID: {result.industrial_code}</span>}
                                    {result.processing_type && <span className="process-badge">{result.processing_type}</span>}
                                    {result.milling_standard && <span className="milling-badge">{result.milling_standard}</span>}
                                </div>
                            </div>
                            <div className="price-badge">
                                <label>Market Estimate</label>
                                <span>{result.price_estimate}</span>
                            </div>
                        </div>

                        <div className="report-grid">
                            {/* Section 1: Appearance */}
                            <div className="report-card">
                                <h4>🔍 Grain Appearance</h4>
                                <ul>
                                    <li><strong>Color:</strong> {result.grain_appearance?.color}</li>
                                    <li><strong>Shape:</strong> {result.grain_appearance?.shape}</li>
                                    <li><strong>Uniformity:</strong> {result.grain_appearance?.uniformity}</li>
                                </ul>
                            </div>

                            {/* Section 2: Physical Metrics */}
                            <div className="report-card blue-border">
                                <h4>📏 Physical Quality</h4>
                                <ul>
                                    <li><strong>Broken Content:</strong> {result.broken_content?.percentage}</li>
                                    <li><strong>Milling Std:</strong> {result.broken_content?.standard_check}</li>
                                    <li><strong>Purity:</strong> {result.purity_cleanliness?.foreign_matter}</li>
                                    <li><strong>Cleanliness:</strong> {result.purity_cleanliness?.damaged_grains}</li>
                                </ul>
                            </div>

                            {/* Section 3: Health & Condition */}
                            <div className="report-card orange-border">
                                <h4>🌡️ Health & Condition</h4>
                                <ul>
                                    <li><strong>Chalkiness:</strong> {result.chalkiness_health?.chalkiness}</li>
                                    <li><strong>Maturity:</strong> {result.chalkiness_health?.maturity_notes}</li>
                                    <li><strong>Moisture:</strong> {result.moisture_condition?.level}</li>
                                    <li><strong>Storage Info:</strong> {result.moisture_condition?.shelf_life_impact}</li>
                                </ul>
                            </div>

                            {/* Section 4: Processing */}
                            <div className="report-card purple-border">
                                <h4>⚙️ Milling & Polishing</h4>
                                <ul>
                                    <li><strong>Milling:</strong> {result.milling_polishing?.milling_type}</li>
                                    <li><strong>Polishing:</strong> {result.milling_polishing?.polishing_level}</li>
                                    <li><strong>Package Suggestion:</strong> {result.storage_packaging?.suitable_package}</li>
                                </ul>
                            </div>

                            {/* Section 5: Usage */}
                            <div className="report-card green-border">
                                <h4>🍲 Cooking & Market</h4>
                                <ul>
                                    <li><strong>Texture:</strong> {result.cooking_quality_detailed?.texture}</li>
                                    <li><strong>Cooking:</strong> {result.cooking_quality_detailed?.cooking_speed}</li>
                                    <li><strong>Suitability:</strong> {result.market_suitability?.join(", ")}</li>
                                </ul>
                            </div>

                            {/* AI Reasoning */}
                            <div className="report-card full-width ai-reasoning">
                                <h4>🤖 AI Expert Reasoning</h4>
                                <p><strong>Visual Logic:</strong> {result.visual_logic}</p>
                                <p className="notes-box"><strong>Final Verdict:</strong> {result.notes}</p>
                            </div>
                        </div>
                    </div>
                )}
            </section>

            <style>{`
                .rice-quality-container { max-width: 900px; margin: 2rem auto; }
                .upload-section { display: flex; flex-direction: column; gap: 1.5rem; margin: 2rem 0; align-items: center; }
                .upload-box { 
                    width: 100%; height: 250px; border: 3px dashed var(--secondary-green); 
                    border-radius: 20px; display: flex; justify-content: center; align-items: center; cursor: pointer;
                    transition: background 0.3s;
                }
                .upload-box:hover { background: rgba(64, 145, 108, 0.05); }
                .preview img { max-height: 200px; border-radius: 10px; }
                
                .result-section { margin-top: 2rem; padding: 2.5rem; background: #fff; border-radius: 30px; box-shadow: 0 20px 40px rgba(0,0,0,0.05); }
                
                .report-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2.5rem; border-bottom: 2px solid #f1f3f5; padding-bottom: 1.5rem; }
                .header-main h3 { margin: 0.5rem 0; font-size: 2rem; color: var(--primary-green); font-weight: 800; }
                .header-badges { display: flex; gap: 0.8rem; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap; }
                .process-badge { 
                    background: #fff0f6; color: #d6336c; border: 1.5px solid #d6336c; 
                    padding: 0.2rem 0.8rem; border-radius: 8px; font-weight: 700; font-size: 0.85rem;
                    text-transform: uppercase; letter-spacing: 0.5px;
                }
                .industrial-id-badge {
                    background: #e7f5ff; color: #1971c2; border: 1.5px solid #1971c2;
                    padding: 0.2rem 0.8rem; border-radius: 8px; font-weight: 800; font-size: 0.85rem;
                }
                .milling-badge {
                    background: #f3f0ff; color: #6741d9; border: 1.5px solid #6741d9;
                    padding: 0.2rem 0.8rem; border-radius: 8px; font-weight: 700; font-size: 0.85rem;
                }
                .category-label { font-size: 0.8rem; text-transform: uppercase; color: #adb5bd; letter-spacing: 2px; font-weight: 700; }
                .overall-grade { font-size: 1.1rem; color: #495057; font-weight: 600; background: #e9ecef; display: inline-block; padding: 0.3rem 1rem; border-radius: 10px; }
                
                .price-badge { text-align: right; background: #fff9db; padding: 1rem 1.5rem; border-radius: 15px; border: 1px solid #ffec99; }
                .price-badge label { display: block; font-size: 0.75rem; color: #f08c00; font-weight: 700; text-transform: uppercase; }
                .price-badge span { font-size: 1.5rem; font-weight: 900; color: #e67700; }

                .report-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
                .report-card { background: #f8f9fa; padding: 1.5rem; border-radius: 20px; border-left: 6px solid #dee2e6; }
                .report-card h4 { margin: 0 0 1rem 0; font-size: 1.1rem; color: #212529; }
                .report-card ul { list-style: none; padding: 0; margin: 0; }
                .report-card li { margin-bottom: 0.8rem; font-size: 0.95rem; color: #495057; border-bottom: 1px solid rgba(0,0,0,0.03); padding-bottom: 0.3rem; }
                .report-card li strong { color: #212529; font-weight: 600; }

                .blue-border { border-left-color: #339af0; }
                .orange-border { border-left-color: #ff922b; }
                .purple-border { border-left-color: #845ef7; }
                .green-border { border-left-color: #51cf66; }
                
                .full-width { grid-column: 1 / -1; }
                .ai-reasoning { background: #e6fcf5; border-left-color: #20c997; }
                .notes-box { margin-top: 1rem; padding-top: 1rem; border-top: 1px dotted #20c997; font-style: italic; }

                @media (max-width: 768px) {
                    .report-grid { grid-template-columns: 1fr; }
                    .report-header { flex-direction: column; gap: 1.5rem; }
                    .price-badge { text-align: left; width: 100%; }
                }
            `}</style>
        </div>
    );
};

export default RiceQualityCheck;
