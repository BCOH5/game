import React from 'react';

const HUD = ({ hp }) => {
    // HP Bar calculation
    const totalBlocks = 10;
    const filledBlocks = Math.ceil((hp / 100) * totalBlocks);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0 2rem',
            width: '100%',
            marginBottom: '1rem'
        }}>
            {/* Player Status */}
            <div className="pixel-box" style={{ width: '45%' }}>
                <h3 className="text-neon-blue" style={{ margin: '0 0 10px 0' }}>[ 플레이어 상태 ]</h3>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ marginRight: '10px' }}>간 HP:</span>
                    <div style={{ display: 'flex' }}>
                        {[...Array(totalBlocks)].map((_, i) => (
                            <div key={i} style={{
                                width: '20px',
                                height: '20px',
                                backgroundColor: i < filledBlocks ? (hp < 40 ? 'var(--neon-red)' : 'var(--neon-green)') : '#333',
                                marginRight: '2px',
                                border: '1px solid white'
                            }} />
                        ))}
                    </div>
                    <span style={{ marginLeft: '10px', color: hp < 40 ? 'var(--neon-red)' : 'white' }}>
                        {hp < 40 ? '(위험!)' : ''}
                    </span>
                </div>
            </div>

            {/* Item Definitions */}
            <div className="pixel-box" style={{ width: '45%' }}>
                <h3 className="text-neon-yellow" style={{ margin: '0 0 10px 0' }}>[ ℹ️ 아이템 정의 ]</h3>
                <div style={{ fontSize: '0.8rem', lineHeight: '1.5' }}>
                    <div>🟢 소주 포션 (1잔)</div>
                    <div>🍺 소맥 (반잔)</div>
                </div>
            </div>
        </div>
    );
};

export default HUD;
