import React, { useState, useRef, useEffect } from 'react';
import '../DesignSystem.css';

const Verification = ({ user, lang }) => {
    const [role, setRole] = useState(user?.profile?.role || 'FARMER');
    const [step, setStep] = useState(1);
    const [cameraActive, setCameraActive] = useState(false);
    const [selfie, setSelfie] = useState(null);
    const [idImage, setIdImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        if (user?.profile?.verification_status === 'VERIFIED') {
            setSuccess(true);
        }
    }, [user]);

    // Start Camera
    const startCamera = async () => {
        setCameraActive(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            console.error("Camera access denied:", err);
            alert("Please allow camera access for verification.");
            setCameraActive(false);
        }
    };

    // Capture Selfie
    const captureSelfie = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (video && canvas) {
            const context = canvas.getContext('2d');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            canvas.toBlob((blob) => {
                setSelfie(blob);
                setCameraActive(false);

                // Stop camera stream
                const stream = video.srcObject;
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
            }, 'image/jpeg');
        }
    };

    const handleIdUpload = (e) => {
        setIdImage(e.target.files[0]);
    };

    const handleSubmit = async () => {
        setUploading(true);

        const formData = new FormData();
        formData.append('role', role);
        formData.append('verification_status', 'VERIFIED'); // Force Verify for Demo
        if (selfie) formData.append('user_photo', selfie, 'selfie.jpg');
        if (idImage) formData.append('id_proof', idImage);

        try {
            const response = await fetch(`http://localhost:8000/api/profile/${user.id}/`, {
                method: 'PATCH',
                body: formData
            }); // Note: No Content-Type header needed for FormData; browser sets it with boundary

            if (response.ok) {
                setSuccess(true);
                // Update local storage user profile data
                // INSTANT VERIFICATION FOR DEMO: Set status to VERIFIED immediately
                const updatedUser = { ...user, profile: { ...user.profile, verification_status: 'VERIFIED', role: role } };
                localStorage.setItem('krishi_user', JSON.stringify(updatedUser));

                // Force page reload to reflect new badge in App.jsx
                setTimeout(() => window.location.href = '/', 2000);
            } else {
                alert("Verification upload failed. Please try again.");
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("Connection error. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    if (success) {
        return (
            <div className="verification-container text-center animate-fade-in">
                <div className="glass-card success-card">
                    <span className="large-icon">🎉</span>
                    <h2>{user?.profile?.verification_status === 'VERIFIED' ? 'Identity Verified!' : 'Verification Submitted!'}</h2>
                    <p>{user?.profile?.verification_status === 'VERIFIED' ? 'Thank you! Your identity is confirmed.' : 'Your documents are being reviewed by our AI system.'}</p>
                    <p>Status: <span className={user?.profile?.verification_status === 'VERIFIED' ? "badge badge-success" : "badge badge-warning"}>
                        {user?.profile?.verification_status || 'PENDING'}
                    </span></p>
                    <button className="btn-primary" onClick={() => window.location.href = '/'}>Go to Dashboard</button>
                    {user?.profile?.verification_status === 'VERIFIED' && <p style={{ marginTop: '1rem' }}>✅ You have full access to listings and contacts.</p>}
                </div>
                <style>{`
                    .badge-success { background: #d4edda; color: #155724; padding: 0.2rem 0.6rem; border-radius: 4px; }
                `}</style>
            </div>
        );
    }

    return (
        <div className="verification-container">
            <div className="glass-card">
                <h2>🔐 Identity Verification</h2>
                <p>Verify your identity to access premium features and trusted marketplace.</p>

                {step === 1 && (
                    <div className="step-content">
                        <h3>Step 1: Select Your Role</h3>
                        <div className="role-grid">
                            {['FARMER', 'RICE_MILL', 'CUSTOMER'].map((r) => (
                                <div
                                    key={r}
                                    className={`role-card ${role === r ? 'selected' : ''}`}
                                    onClick={() => setRole(r)}
                                >
                                    <span className="role-icon">
                                        {r === 'FARMER' ? '👨🌾' : r === 'RICE_MILL' ? '🏭' : '🛒'}
                                    </span>
                                    <h4>{r.replace('_', ' ')}</h4>
                                </div>
                            ))}
                        </div>
                        <button className="btn-primary full-width" onClick={() => setStep(2)}>Next</button>
                    </div>
                )}

                {step === 2 && (
                    <div className="step-content">
                        <h3>Step 2: Live Selfie</h3>
                        <p>We need to verify you are a real person.</p>

                        <div className="camera-box">
                            {selfie ? (
                                <img src={URL.createObjectURL(selfie)} alt="Selfie" className="preview-img" />
                            ) : cameraActive ? (
                                <div className="video-wrapper">
                                    <video ref={videoRef} autoPlay playsInline muted></video>
                                    <canvas ref={canvasRef} hidden></canvas>
                                </div>
                            ) : (
                                <div className="camera-placeholder">
                                    <span className="icon">📸</span>
                                </div>
                            )}
                        </div>

                        {!selfie ? (
                            !cameraActive ? (
                                <button className="btn-primary" onClick={startCamera}>Start Camera</button>
                            ) : (
                                <button className="btn-primary" onClick={captureSelfie}>Capture Photo</button>
                            )
                        ) : (
                            <button className="btn-secondary" onClick={() => { setSelfie(null); startCamera(); }}>Retake</button>
                        )}

                        <div className="nav-buttons">
                            <button className="btn-secondary" onClick={() => setStep(1)}>Back</button>
                            <button className="btn-primary" disabled={!selfie} onClick={() => setStep(3)}>Next</button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="step-content">
                        <h3>Step 3: ID Proof Upload</h3>
                        <p>Upload a Govt ID (Aadhar/Voter ID) for verification.</p>

                        <div className="upload-area">
                            <input type="file" id="id-upload" accept="image/*" onChange={handleIdUpload} hidden />
                            <label htmlFor="id-upload" className="upload-label">
                                {idImage ? (
                                    <div className="preview-small">
                                        <p>📄 {idImage.name}</p>
                                    </div>
                                ) : (
                                    <div className="placeholder">
                                        <span>📂 Click to Upload ID</span>
                                    </div>
                                )}
                            </label>
                        </div>

                        <div className="nav-buttons">
                            <button className="btn-secondary" onClick={() => setStep(2)}>Back</button>
                            <button className="btn-primary" disabled={!idImage || uploading} onClick={handleSubmit}>
                                {uploading ? 'Verifying...' : 'Submit Verification'}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                .verification-container { max-width: 600px; margin: 2rem auto; }
                .text-center { text-align: center; }
                .large-icon { font-size: 4rem; display: block; margin-bottom: 1rem; }
                .success-card { padding: 3rem; background: rgba(255, 255, 255, 0.9); }
                .role-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; margin: 2rem 0; }
                .role-card { 
                    border: 2px solid transparent; 
                    background: rgba(255,255,255,0.5); 
                    padding: 1rem; 
                    border-radius: 10px; 
                    cursor: pointer; 
                    text-align: center;
                    transition: all 0.3s;
                }
                .role-card.selected { border-color: var(--primary-green); background: rgba(45, 106, 79, 0.1); }
                .role-icon { font-size: 2rem; display: block; margin-bottom: 0.5rem; }
                .camera-box { 
                    width: 100%; height: 300px; background: #000; 
                    border-radius: 15px; overflow: hidden; margin: 1.5rem 0; 
                    display: flex; justify-content: center; align-items: center;
                }
                .video-wrapper, video, .preview-img { width: 100%; height: 100%; object-fit: cover; }
                .camera-placeholder { color: white; fone-size: 3rem; }
                .nav-buttons { display: flex; gap: 1rem; margin-top: 1.5rem; justify-content: space-between; }
                .full-width { width: 100%; }
                .upload-area { margin: 2rem 0; }
                .upload-label { 
                    display: block; padding: 2rem; border: 2px dashed #ccc; 
                    border-radius: 10px; text-align: center; cursor: pointer;
                }
                .badge-warning { background: #ffe066; color: #664d03; padding: 0.2rem 0.6rem; border-radius: 4px; }
            `}</style>
        </div>
    );
};

export default Verification;
