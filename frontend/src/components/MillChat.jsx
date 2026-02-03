import React from 'react';
import FarmingAssistant from './FarmingAssistant';
import '../DesignSystem.css';

const MillChat = () => {
    return (
        <div className="mill-chat-page animate-fade-in">
            <div className="glass-card page-header" style={{ maxWidth: '800px', margin: '2rem auto', textAlign: 'center' }}>
                <span style={{ fontSize: '3rem' }}>🏭</span>
                <h2 className="text-gradient">Mill Master AI</h2>
                <p>Your dedicated assistant for Milling Operations, Export & Machinery.</p>
            </div>

            <FarmingAssistant overrideRole="rice_mill" />
        </div>
    );
};

export default MillChat;
