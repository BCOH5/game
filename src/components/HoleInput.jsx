import React, { useState, useEffect } from 'react';

const HoleInput = ({ players, currentHole, onCompleteHole }) => {
    const [inputs, setInputs] = useState({});

    useEffect(() => {
        // Initialize inputs for current hole
        const initial = {};
        players.forEach(p => {
            initial[p.id] = { score: p.scores[currentHole] || 0, penalties: p.penalties[currentHole] || 0 };
        });
        setInputs(initial);
    }, [players, currentHole]);

    const handleChange = (playerId, field, value) => {
        setInputs(prev => ({
            ...prev,
            [playerId]: {
                ...prev[playerId],
                [field]: parseInt(value) || 0
            }
        }));
    };

    const handleSubmit = () => {
        onCompleteHole(inputs);
    };

    const handleBirdie = (playerId) => {
        const player = players.find(p => p.id === playerId);
        // Immediately update state without confirmation
        setInputs(prev => {
            const nextState = {};
            players.forEach(p => {
                const current = prev[p.id] || { score: 0, penalties: 0 };
                if (p.id !== playerId) {
                    nextState[p.id] = { ...current, penalties: (current.penalties || 0) + 1 };
                } else {
                    nextState[p.id] = current;
                }
            });
            return nextState;
        });

        // Show celebration message after a short delay to allow UI to update
        setTimeout(() => {
            alert(`${player.name}님 버디 축하합니다. 버디버디!`);
        }, 100);
    };

    return (
        <div className="pixel-box" style={{ width: '100%', maxWidth: '700px', margin: '0 auto' }}>
            <h2 className="text-neon-yellow" style={{ textAlign: 'center', marginBottom: '20px' }}>
                ⛳ HOLE {currentHole} 입력
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 0.5fr', gap: '10px', marginBottom: '10px', borderBottom: '2px solid white', paddingBottom: '5px' }}>
                <div>PLAYER</div>
                <div style={{ textAlign: 'center' }}>SCORE</div>
                <div style={{ textAlign: 'center', color: 'var(--neon-red)' }}>PENALTY</div>
                <div style={{ textAlign: 'center', color: 'var(--neon-green)' }}>Birdie</div>
            </div>

            {players.map(p => (
                <div key={p.id} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 0.5fr', gap: '10px', marginBottom: '15px', alignItems: 'center' }}>
                    <div style={{ fontSize: '1.2rem' }}>{p.name}</div>

                    {/* Score Control */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50px' }}>
                        <button
                            onClick={() => handleChange(p.id, 'score', (inputs[p.id]?.score || 0) - 1)}
                            style={{
                                background: 'var(--neon-blue)',
                                border: 'none',
                                width: '40px',
                                height: '100%',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                fontSize: '1.5rem',
                                color: 'black'
                            }}
                        >-</button>
                        <div style={{
                            flex: 1,
                            textAlign: 'center',
                            fontSize: '1.5rem',
                            backgroundColor: 'black',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderTop: '2px solid white',
                            borderBottom: '2px solid white'
                        }}>
                            {inputs[p.id]?.score || 0}
                        </div>
                        <button
                            onClick={() => handleChange(p.id, 'score', (inputs[p.id]?.score || 0) + 1)}
                            style={{
                                background: 'var(--neon-red)',
                                border: 'none',
                                width: '40px',
                                height: '100%',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                fontSize: '1.5rem',
                                color: 'black'
                            }}
                        >+</button>
                    </div>

                    {/* Penalty Control */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <button
                            onClick={() => handleChange(p.id, 'penalties', Math.max(0, (inputs[p.id]?.penalties || 0) - 1))}
                            style={{ background: '#555', color: 'white', border: 'none', width: '30px', height: '30px', cursor: 'pointer', fontWeight: 'bold' }}
                        >-</button>
                        <span style={{ margin: '0 10px', color: 'var(--neon-red)', fontSize: '1.2rem' }}>
                            {inputs[p.id]?.penalties || 0}
                        </span>
                        <button
                            onClick={() => handleChange(p.id, 'penalties', (inputs[p.id]?.penalties || 0) + 1)}
                            style={{ background: '#555', color: 'white', border: 'none', width: '30px', height: '30px', cursor: 'pointer', fontWeight: 'bold' }}
                        >+</button>
                    </div>

                    {/* Birdie Button */}
                    <button
                        onClick={() => handleBirdie(p.id)}
                        style={{
                            backgroundColor: 'var(--neon-yellow)',
                            color: 'black',
                            border: 'none',
                            cursor: 'pointer',
                            height: '40px',
                            fontSize: '0.8rem',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '2px 2px 0px #000'
                        }}
                        title="버디! (나머지 플레이어 벌주 +1)"
                    >
                        버디
                    </button>
                </div>
            ))}

            <button
                onClick={handleSubmit}
                style={{
                    width: '100%',
                    padding: '15px',
                    backgroundColor: 'var(--neon-green)',
                    color: 'black',
                    border: 'none',
                    fontFamily: 'var(--pixel-font)',
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                    marginTop: '20px',
                    boxShadow: '4px 4px 0px #000'
                }}
            >
                HOLE COMPLETE ▶
            </button>

            {/* Rule Summary */}
            <div style={{ marginTop: '20px', borderTop: '1px dashed #555', paddingTop: '10px', fontSize: '0.8rem', color: '#aaa' }}>
                <h4 style={{ margin: '0 0 5px 0', color: 'white' }}>[ 벌주 규칙 요약 ]</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    <span>🌊 해저드/OB: +1잔</span>
                    <span>🏖️ 벙커: +1잔</span>
                    <span>⛳ 쓰리펏: +1잔</span>
                    <span>🧅 양파: +2잔</span>
                </div>
            </div>
        </div>
    );
};

export default HoleInput;
