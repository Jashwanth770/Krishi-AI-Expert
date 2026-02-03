import React from 'react';
import '../DesignSystem.css';

const Profile = ({ user }) => {
    if (!user) return <p>Please login to see your profile.</p>;

    return (
        <div className="profile-container">
            <div className="glass-card profile-card animate-fade-in">
                <div className="profile-header">
                    <div className="avatar-big">{user.profile?.avatar_icon || '👨🌾'}</div>
                    <h2>{user.username}</h2>
                    <p className="tagline">Authorized Farmer | {user.profile?.location || 'Sangli, India'}</p>
                </div>

                <div className="profile-details">
                    <div className="detail-item">
                        <span className="label">📧 Email</span>
                        <span className="value">{user.email || 'Not provided'}</span>
                    </div>
                    <div className="detail-item">
                        <span className="label">📞 Contact</span>
                        <span className="value">{user.profile?.phone || '+91 98765 43210'}</span>
                    </div>
                    <div className="detail-item">
                        <span className="label">📍 Location</span>
                        <span className="value">{user.profile?.location || 'Sangli, Maharashtra'}</span>
                    </div>
                </div>

                <div className="farmer-stats">
                    <div className="stat-box">
                        <h4>12</h4>
                        <p>Listings</p>
                    </div>
                    <div className="stat-box">
                        <h4>4.8</h4>
                        <p>Rating</p>
                    </div>
                    <div className="stat-box">
                        <h4>24</h4>
                        <p>Buyers</p>
                    </div>
                </div>

                <button className="btn-primary full-width">Edit Profile</button>
            </div>

            <style>{`
        .profile-container { max-width: 600px; margin: 2rem auto; }
        .profile-card { text-align: center; display: flex; flex-direction: column; gap: 2rem; }
        .avatar-big { font-size: 5rem; margin-bottom: 1rem; }
        .profile-details { text-align: left; display: flex; flex-direction: column; gap: 1rem; }
        .detail-item { display: flex; justify-content: space-between; border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 0.5rem; }
        .label { font-weight: 600; color: #666; }
        .farmer-stats { display: flex; justify-content: space-around; background: rgba(45, 106, 79, 0.05); padding: 1.5rem; border-radius: 20px; }
        .stat-box h4 { font-size: 1.5rem; color: var(--primary-green); }
        .stat-box p { font-size: 0.8rem; color: #666; }
      `}</style>
        </div>
    );
};

export default Profile;
