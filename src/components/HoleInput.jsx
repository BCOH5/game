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
        <div className="pixel-box" style={{ width: '100%', maxWidth: '700px', margin: '0 auto', padding: '10px' }}>
            <h2 className="text-neon-yellow" style={{ textAlign: 'center', marginBottom: '10px', fontSize: '1rem' }}>
                ⛳ HOLE {currentHole} 입력
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 0.6fr', gap: '5px', marginBottom: '5px', borderBottom: '2px solid white', paddingBottom: '2px', fontSize: '0.6rem' }}>
                <div>PLAYER</div>
                <div style={{ textAlign: 'center' }}>SCORE</div>
                <div style={{ textAlign: 'center', color: 'var(--neon-red)' }}>PENALTY</div>
                <div style={{ textAlign: 'center', color: 'var(--neon-green)' }}>Birdie</div>
            </div>

            {players.map(p => (
                <div key={p.id} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 0.6fr', gap: '5px', marginBottom: '8px', alignItems: 'center' }}>
                    <div style={{ fontSize: '0.8rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>

                    {/* Score Control */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '35px' }}>
                        <button
                            onClick={() => handleChange(p.id, 'score', (inputs[p.id]?.score || 0) - 1)}
                            style={{
                                background: 'var(--neon-blue)',
                                border: 'none',
                                width: '25px',
                                height: '100%',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                color: 'black',
                                padding: 0
                            }}
                        >-</button>
                        <div style={{
                            flex: 1,
                            textAlign: 'center',
                            fontSize: '1rem',
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
                                width: '25px',
                                height: '100%',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                color: 'black',
                                padding: 0
                            }}
                        >+</button>
                    </div>

                    {/* Penalty Control */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <button
                            onClick={() => handleChange(p.id, 'penalties', Math.max(0, (inputs[p.id]?.penalties || 0) - 1))}
                            style={{ background: '#555', color: 'white', border: 'none', width: '20px', height: '20px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem', padding: 0 }}
                        >-</button>
                        <span style={{ margin: '0 5px', color: 'var(--neon-red)', fontSize: '0.9rem' }}>
                            {inputs[p.id]?.penalties || 0}
                        </span>
                        <button
                            onClick={() => handleChange(p.id, 'penalties', (inputs[p.id]?.penalties || 0) + 1)}
                            style={{ background: '#555', color: 'white', border: 'none', width: '20px', height: '20px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem', padding: 0 }}
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
                            height: '30px',
                            fontSize: '0.6rem',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '1px 1px 0px #000',
                            padding: '0'
                        }}
                        title="버디!"
                    >
                        버디
                    </button>
                </div>
            ))}

            <button
                onClick={handleSubmit}
                style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: 'var(--neon-green)',
                    color: 'black',
                    border: 'none',
                    fontFamily: 'var(--pixel-font)',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    marginTop: '10px',
                    boxShadow: '2px 2px 0px #000'
                }}
            >
                HOLE COMPLETE ▶
            </button>

            {/* Rule Summary */}
            <div style={{ marginTop: '10px', borderTop: '1px dashed #555', paddingTop: '5px', fontSize: '0.6rem', color: '#aaa' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', justifyContent: 'center' }}>
                    <span>🌊해저드/OB:+1</span>
                    <span>🏖️벙커:+1</span>
                    <span>⛳3펏:+1</span>
                    <span>🧅양파:+2</span>
                </div>
            </div>
        </div>
    );
};

export default HoleInput;
