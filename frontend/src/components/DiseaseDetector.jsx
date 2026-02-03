import React, { useState } from 'react';
import '../DesignSystem.css';

import translations from '../translations'; // Check path is correct

const DiseaseDetector = ({ lang }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    // Get translations for current lang
    const t = translations[lang] || translations['en'];

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        setResult(null);
    };

    const handleUpload = async () => {
        if (!selectedFile) return;
        setLoading(true);

        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('language', lang || 'en');

        try {
            // Backend URL
            const response = await fetch('http://localhost:8000/api/ai/detect-disease/', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error('Error detecting disease:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="disease-detector-container">
            <section className="glass-card">
                <h2>🔍 {lang === 'hi' ? 'फसल रोग पहचान' : lang === 'mr' ? 'पीक रोग निदान' : lang === 'te' ? 'పంట వ్యాధి గుర్తింపు' : 'AI Crop Disease Detection'}</h2>
                <p>{lang === 'hi' ? 'स्पष्ट फोटो लें' : lang === 'mr' ? 'स्पष्ट फोटो घ्या' : lang === 'te' ? 'స్పష్టమైన ఫోటో తీయండి' : 'Take a clear photo of the leaf to identify diseases.'}</p>

                <div className="upload-section">
                    <input
                        type="file"
                        accept="image/*"
                        id="leaf-upload"
                        onChange={handleFileChange}
                        hidden
                    />
                    <label htmlFor="leaf-upload" className="upload-box">
                        {selectedFile ? (
                            <div className="preview">
                                <img src={URL.createObjectURL(selectedFile)} alt="Preview" />
                                <p>{selectedFile.name}</p>
                            </div>
                        ) : (
                            <div className="placeholder">
                                <span className="icon">📸</span>
                                <p>Click to Upload or Capture</p>
                            </div>
                        )}
                    </label>

                    <button
                        className="btn-primary"
                        onClick={handleUpload}
                        disabled={!selectedFile || loading}
                    >
                        {loading ? 'Analyzing...' : 'Analyze Leaf'}
                    </button>
                </div>

                {result && (
                    <div className="result-section animate-fade-in">
                        <div className="report-header">
                            <div className="header-main">
                                <span className="category-label">{result.crop_name} Diagnostic</span>
                                <h3>{result.likely_problem}</h3>
                                <div className="header-badges">
                                    <span className={`status-badge ${result.health_status === 'Healthy' ? 'safe' : result.health_status === 'Urgent' ? 'danger' : 'warning'}`}>
                                        {result.health_status} Status
                                    </span>
                                    {result.severity && <span className={`severity-badge ${result.severity.toLowerCase()}`}>{result.severity} Severity</span>}
                                    {result.lifecycle_stage && <span className="stage-badge">{result.lifecycle_stage} Stage</span>}
                                </div>
                            </div>
                        </div>

                        <div className="report-grid">
                            {/* Section 1: Crop Identity */}
                            <div className="report-card">
                                <h4>🌱 Crop Identity</h4>
                                <ul>
                                    <li><strong>Crop Name:</strong> {result.crop_name}</li>
                                    <li><strong>Likely Problem:</strong> {result.likely_problem}</li>
                                    <li><strong>Spread Risk:</strong> {result.spread_risk}</li>
                                </ul>
                            </div>

                            {/* Section 2: Clinical Diagnostics */}
                            <div className="report-card blue-border">
                                <h4>🔬 Diagnostic Insights</h4>
                                <ul>
                                    <li><strong>Visual Symptoms:</strong> {result.diagnostics?.visual_symptoms}</li>
                                    <li><strong>Affected Parts:</strong> {result.diagnostics?.affected_parts}</li>
                                    <li><strong>Pattern:</strong> {result.diagnostics?.spread_pattern}</li>
                                </ul>
                            </div>

                            {/* Section 3: Treatment Plan */}
                            <div className="report-card red-border">
                                <h4>🚑 Immediate Treatment</h4>
                                <ul>
                                    {result.immediate_treatment?.map((item, i) => <li key={i}>{item}</li>)}
                                </ul>
                            </div>

                            {/* Section 4: Management */}
                            <div className="report-card purple-border">
                                <h4>🚜 Crop Management</h4>
                                <ul>
                                    {result.crop_management?.map((item, i) => <li key={i}>{item}</li>)}
                                </ul>
                            </div>

                            {/* Section 5: Organic */}
                            <div className="report-card green-border">
                                <h4>🌿 Organic Options</h4>
                                <ul>
                                    {result.organic_options?.map((item, i) => <li key={i}>{item}</li>)}
                                </ul>
                            </div>

                            {/* AI Reasoning */}
                            <div className="report-card full-width ai-reasoning">
                                <h4>🤖 AI Scientific Reasoning</h4>
                                <p><strong>Visual Logic:</strong> {result.visual_logic}</p>
                                <p className="notes-box"><strong>Final Recommendation:</strong> {result.notes}</p>
                            </div>
                        </div>

                        <style>{`
                            .result-section { margin-top: 2rem; padding: 2.5rem; background: #fff; border-radius: 30px; box-shadow: 0 20px 40px rgba(0,0,0,0.05); }
                            .report-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2.5rem; border-bottom: 2px solid #f1f3f5; padding-bottom: 1.5rem; }
                            .header-main h3 { margin: 0.5rem 0; font-size: 2rem; color: #c92a2a; font-weight: 800; }
                            .header-badges { display: flex; gap: 0.8rem; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap; }
                            .category-label { font-size: 0.8rem; text-transform: uppercase; color: #adb5bd; letter-spacing: 2px; font-weight: 700; }
                            
                            .status-badge { padding: 0.3rem 0.8rem; border-radius: 8px; font-weight: 700; font-size: 0.85rem; }
                            .status-badge.safe { background: #ebfbee; color: #2b8a3e; }
                            .status-badge.warning { background: #fff9db; color: #f08c00; }
                            .status-badge.danger { background: #fff5f5; color: #c92a2a; }

                            .severity-badge { padding: 0.3rem 0.8rem; border-radius: 8px; font-weight: 700; font-size: 0.85rem; background: #e9ecef; color: #495057; }
                            .severity-badge.high { background: #fff5f5; color: #c92a2a; }
                            .stage-badge { background: #e7f5ff; color: #1971c2; padding: 0.3rem 0.8rem; border-radius: 8px; font-weight: 700; font-size: 0.85rem; }

                            .report-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
                            .report-card { background: #f8f9fa; padding: 1.5rem; border-radius: 20px; border-left: 6px solid #dee2e6; }
                            .report-card h4 { margin: 0 0 1rem 0; font-size: 1.1rem; color: #212529; }
                            .report-card ul { list-style: none; padding: 0; margin: 0; }
                            .report-card li { margin-bottom: 0.8rem; font-size: 0.95rem; color: #495057; border-bottom: 1px solid rgba(0,0,0,0.03); padding-bottom: 0.3rem; }
                            .report-card li strong { color: #212529; font-weight: 600; }

                            .blue-border { border-left-color: #339af0; }
                            .red-border { border-left-color: #ff6b6b; }
                            .purple-border { border-left-color: #845ef7; }
                            .green-border { border-left-color: #51cf66; }
                            
                            .full-width { grid-column: 1 / -1; }
                            .ai-reasoning { background: #e6fcf5; border-left-color: #20c997; }
                            .notes-box { margin-top: 1rem; padding-top: 1rem; border-top: 1px dotted #20c997; font-style: italic; }

                            @media (max-width: 768px) {
                                .report-grid { grid-template-columns: 1fr; }
                            }
                        `}</style>
                    </div>
                )}
            </section>

            <style>{`
        .disease-detector-container {
          max-width: 800px;
          margin: 2rem auto;
        }
        .upload-section {
          margin: 2rem 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }
        .upload-box {
          width: 100%;
          height: 300px;
          border: 3px dashed var(--secondary-green);
          border-radius: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          transition: background 0.3s ease;
          overflow: hidden;
        }
        .upload-box:hover {
          background: rgba(64, 145, 108, 0.05);
        }
        .preview img {
          max-height: 200px;
          border-radius: 10px;
        }
        .placeholder .icon { font-size: 3rem; }
        .result-section {
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid var(--glass-border);
        }
        .result-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        .badge {
          padding: 0.5rem 1rem;
          border-radius: 50px;
          font-weight: 600;
          font-size: 0.8rem;
        }
        .badge.moderate { background: #ffe8cc; color: #d9480f; }
        .plan-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .plan-item {
          background: white;
          padding: 1rem;
          border-radius: 15px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .plan-item h4 { margin-bottom: 0.5rem; font-size: 0.9rem; }
        .prevention {
          background: var(--bg-sage);
          padding: 1.5rem;
          border-radius: 15px;
        }
        .prevention h4 { margin-bottom: 0.5rem; }
        .prevention ul { padding-left: 1.5rem; }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
};

export default DiseaseDetector;
