import React from 'react';

const Scorecard = ({ players, currentHole }) => {
    const holes = Array.from({ length: 18 }, (_, i) => i + 1);

    return (
        <div className="pixel-box" style={{
            width: '100%',
            overflowX: 'auto',
            marginBottom: '20px',
            backgroundColor: 'rgba(0,0,0,0.95)'
        }}>
            <h3 className="text-neon-green" style={{ margin: '0 0 10px 0' }}>[ SCORECARD ]</h3>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.6rem', tableLayout: 'fixed' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #555', padding: '2px', width: '15%' }}>P</th>
                        {holes.map(h => (
                            <th key={h} style={{
                                border: '1px solid #555',
                                padding: '2px',
                                color: h === currentHole ? 'var(--neon-yellow)' : '#aaa',
                                backgroundColor: h === currentHole ? '#333' : 'transparent',
                                fontSize: '0.5rem'
                            }}>
                                {h}
                            </th>
                        ))}
                        <th style={{ border: '1px solid #555', padding: '2px', color: 'var(--neon-yellow)', width: '8%' }}>T</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map(p => (
                        <tr key={p.id}>
                            <td style={{ border: '1px solid #555', padding: '2px', textAlign: 'left', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                {p.name}
                                <div style={{ fontSize: '0.5rem', color: 'var(--neon-red)' }}>D:{p.totalDrinks}</div>
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
                                        height: '30px'
                                    }}>
                                        {score !== undefined ? (
                                            <>
                                                <span style={{ color: 'white' }}>{score}</span>
                                                {penalty > 0 && (
                                                    <div style={{
                                                        position: 'absolute',
                                                        top: '0',
                                                        right: '0',
                                                        color: 'var(--neon-red)',
                                                        fontSize: '0.5rem',
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
                            <td style={{ border: '1px solid #555', padding: '2px', textAlign: 'center', color: 'var(--neon-yellow)' }}>
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
