import React from 'react';

const Scorecard = ({ players, currentHole }) => {
    const holes = Array.from({ length: 18 }, (_, i) => i + 1);

    return (
        <div className="pixel-box" style={{
            width: '100%',
            overflowX: 'auto',
            marginBottom: '10px',
            backgroundColor: 'rgba(0,0,0,0.95)',
            padding: '5px' // Reduced padding
        }}>
            <h3 className="text-neon-green" style={{ margin: '0 0 5px 0', fontSize: '0.8rem' }}>[ SCORECARD ]</h3>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.5rem', tableLayout: 'fixed' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #555', padding: '1px', width: '12%', fontSize: '0.4rem' }}>NAME</th>
                        {holes.map(h => (
                            <th key={h} style={{
                                border: '1px solid #555',
                                padding: '0',
                                color: h === currentHole ? 'var(--neon-yellow)' : '#aaa',
                                backgroundColor: h === currentHole ? '#333' : 'transparent',
                                fontSize: '0.4rem',
                                width: '4%' // Force small width
                            }}>
                                {h}
                            </th>
                        ))}
                        <th style={{ border: '1px solid #555', padding: '1px', color: 'var(--neon-yellow)', width: '8%', fontSize: '0.4rem' }}>TOT</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map(p => (
                        <tr key={p.id}>
                            <td style={{ border: '1px solid #555', padding: '1px', textAlign: 'left', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                <div style={{ fontSize: '0.5rem' }}>{p.name}</div>
                                <div style={{ fontSize: '0.4rem', color: 'var(--neon-red)' }}>🍺{p.totalDrinks}</div>
                            </td>
                            {holes.map(h => {
                                const score = p.scores[h];
                                const penalty = p.penalties[h];
                                return (
                                    <td key={h} style={{
                                        border: '1px solid #555',
                                        padding: '0',
                                        textAlign: 'center',
                                        position: 'relative',
                                        backgroundColor: h === currentHole ? '#222' : 'transparent',
                                        height: '25px',
                                        fontSize: '0.5rem'
                                    }}>
                                        {score !== undefined ? (
                                            <>
                                                <span style={{ color: 'white' }}>{score}</span>
                                                {penalty > 0 && (
                                                    <div style={{
                                                        position: 'absolute',
                                                        top: '-2px',
                                                        right: '-2px',
                                                        color: 'var(--neon-red)',
                                                        fontSize: '0.35rem',
                                                        lineHeight: '1'
                                                    }}>
                                                        ●{penalty}
                                                    </div>
                                                )}
                                            </>
                                        ) : ''}
                                    </td>
                                );
                            })}
                            <td style={{ border: '1px solid #555', padding: '1px', textAlign: 'center', color: 'var(--neon-yellow)', fontSize: '0.6rem' }}>
                                {Object.values(p.scores).reduce((a, b) => a + b, 0)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Scorecard;
