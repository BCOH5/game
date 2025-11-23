import React from 'react';

const SettlementModal = ({ results, onNext }) => {
    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.9)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
        }}>
            <div className="pixel-box" style={{ width: '90%', maxWidth: '500px', border: '4px solid var(--neon-yellow)' }}>
                <h2 className="text-neon-yellow" style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '20px' }}>
                    💰 정산 타임 💰
                </h2>

                <div style={{ marginBottom: '30px' }}>
                    {results.map((r, idx) => (
                        <div key={idx} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '15px',
                            borderBottom: '1px dashed #555',
                            paddingBottom: '5px'
                        }}>
                            <span style={{ fontSize: '1.2rem' }}>{r.name}</span>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span style={{ marginRight: '10px', color: '#aaa' }}>벌칙:</span>
                                <span style={{
                                    color: r.drinks > 0 ? 'var(--neon-red)' : 'var(--neon-green)',
                                    fontSize: '1.5rem',
                                    textShadow: r.drinks > 0 ? '2px 2px 0px #000' : 'none'
                                }}>
                                    {r.drinks} 잔
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={onNext}
                    className="blink"
                    style={{
                        width: '100%',
                        padding: '15px',
                        backgroundColor: 'var(--neon-blue)',
                        color: 'black',
                        border: 'none',
                        fontFamily: 'var(--pixel-font)',
                        fontSize: '1.2rem',
                        cursor: 'pointer'
                    }}
                >
                    NEXT HOLE ▶
                </button>
            </div>
        </div>
    );
};

export default SettlementModal;
