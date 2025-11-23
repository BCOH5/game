import React from 'react';

const WarningPopup = () => {
    return (
        <div className="blink" style={{
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            border: '4px solid var(--neon-red)',
            backgroundColor: 'black',
            padding: '1rem 3rem',
            zIndex: 100,
            boxShadow: '0 0 20px var(--neon-red)'
        }}>
            <h2 style={{
                color: 'var(--neon-red)',
                margin: 0,
                fontSize: '1.5rem',
                textTransform: 'uppercase'
            }}>
                🚨 시스템 치명적 경고 🚨
            </h2>
        </div>
    );
};

export default WarningPopup;
