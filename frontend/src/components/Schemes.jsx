import React, { useState } from 'react';
import '../DesignSystem.css';

const Schemes = () => {
    const [age, setAge] = useState('');
    const [landSize, setLandSize] = useState('');
    const [eligibilityResult, setEligibilityResult] = useState(null);

    const schemes = [
        {
            id: 1,
            name: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
            benefit: "₹6,000 per year in three installments",
            eligibility: "Small and marginal farmers with up to 2 hectares of land.",
            link: "https://pmkisan.gov.in/"
        },
        {
            id: 2,
            name: "Pradhan Mantri Fasal Bima Yojana (Crop Insurance)",
            benefit: "Financial support against crop loss due to natural calamities.",
            eligibility: "All farmers including sharecroppers and tenant farmers.",
            link: "https://pmfby.gov.in/"
        },
        {
            id: 3,
            name: "Kisan Credit Card (KCC) Scheme",
            benefit: "Low-interest loans for agricultural needs and equipment.",
            eligibility: "All farmers, individuals or joint borrowers.",
            link: "https://www.rbi.org.in/"
        }
    ];

    const checkEligibility = () => {
        // Mock AI Eligibility Logic
        if (parseFloat(landSize) <= 2) {
            setEligibilityResult({
                status: "Eligible for PM-KISAN, PMFBY, and KCC!",
                advice: "You qualify for small farmer benefits. PM-KISAN is highly recommended for direct income support."
            });
        } else {
            setEligibilityResult({
                status: "Eligible for PMFBY and KCC.",
                advice: "While you exceed the PM-KISAN land limit, you are fully covered for crop insurance and credit cards."
            });
        }
    };

    return (
        <div className="schemes-container">
            <h2>🏛️ Government Schemes & Subsidies</h2>
            <p>Find the best support for your farm and check your eligibility instantly.</p>

            {/* Eligibility Checker */}
            <section className="glass-card eligibility-card">
                <h3>🔍 AI Eligibility Checker</h3>
                <div className="checker-form">
                    <input
                        type="number" placeholder="Your Age"
                        value={age} onChange={e => setAge(e.target.value)}
                    />
                    <input
                        type="number" placeholder="Land Size (in Hectares)"
                        value={landSize} onChange={e => setLandSize(e.target.value)}
                    />
                    <button className="btn-primary" onClick={checkEligibility}>Check My Status</button>
                </div>
                {eligibilityResult && (
                    <div className="eligibility-result animate-fade-in">
                        <h4>{eligibilityResult.status}</h4>
                        <p>{eligibilityResult.advice}</p>
                    </div>
                )}
            </section>

            {/* Schemes List */}
            <div className="schemes-list">
                {schemes.map(scheme => (
                    <div key={scheme.id} className="glass-card scheme-item">
                        <h3>{scheme.name}</h3>
                        <p className="benefit">💰 **Benefit:** {scheme.benefit}</p>
                        <p className="eligibility">👤 **Who is it for?** {scheme.eligibility}</p>
                        <a href={scheme.link} target="_blank" rel="noopener noreferrer" className="btn-primary">Official Website</a>
                    </div>
                ))}
            </div>

            <style>{`
        .schemes-container { max-width: 900px; margin: 2rem auto; }
        .eligibility-card { margin: 2rem 0; border-left: 5px solid var(--accent-gold); }
        .checker-form { display: flex; gap: 1rem; margin-top: 1rem; }
        .checker-form input { padding: 1rem; border-radius: 10px; border: 1px solid #ddd; flex: 1; }
        .eligibility-result { 
          margin-top: 1.5rem; padding: 1rem; background: rgba(255, 183, 3, 0.1); 
          border-radius: 15px; text-align: center;
        }
        .eligibility-result h4 { color: #d9480f; }
        .schemes-list { display: flex; flex-direction: column; gap: 1.5rem; }
        .scheme-item { text-align: left; display: flex; flex-direction: column; gap: 0.8rem; }
        .scheme-item h3 { font-size: 1.2rem; }
        .benefit, .eligibility { font-size: 0.95rem; }
        @media (max-width: 600px) {
          .checker-form { flex-direction: column; }
        }
      `}</style>
        </div>
    );
};

export default Schemes;
