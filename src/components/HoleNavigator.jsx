import React from 'react';

const HoleNavigator = ({ currentHole, onNextHole, onPrevHole }) => {
    return (
        <div className="pixel-box" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
            backgroundColor: 'rgba(0,0,0,0.9)'
        }}>
            <button
                onClick={onPrevHole}
                disabled={currentHole === 1}
                style={{
                    background: 'none',
                    border: '2px solid white',
                    color: currentHole === 1 ? '#555' : 'white',
                    fontFamily: 'var(--pixel-font)',
                    cursor: currentHole === 1 ? 'not-allowed' : 'pointer',
                    padding: '5px 10px'
                }}
            >
                ◀ PREV
            </button>

            <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--neon-yellow)' }}>CURRENT HOLE</div>
                <div style={{ fontSize: '2rem', color: 'white', textShadow: '2px 2px 0px var(--neon-blue)' }}>
                    {currentHole}
                </div>
            </div>

            <button
                onClick={onNextHole}
                disabled={currentHole === 18}
                style={{
                    background: 'none',
                    border: '2px solid white',
                    color: currentHole === 18 ? '#555' : 'white',
                    fontFamily: 'var(--pixel-font)',
                    cursor: currentHole === 18 ? 'not-allowed' : 'pointer',
                    padding: '5px 10px'
                }}
            >
                NEXT ▶
            </button>
        </div>
    );
};

export default HoleNavigator;
