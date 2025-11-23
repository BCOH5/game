import React, { useState } from 'react';

const PlayerManager = ({ players, onAddPlayer, onRemovePlayer, selectedPlayerId, onSelectPlayer }) => {
    const [newPlayerName, setNewPlayerName] = useState('');

    const handleAdd = () => {
        if (newPlayerName.trim()) {
            onAddPlayer(newPlayerName.trim());
            setNewPlayerName('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleAdd();
    };

    return (
        <div className="pixel-box" style={{ width: '100%', marginBottom: '1rem' }}>
            <h3 className="text-neon-blue" style={{ margin: '0 0 10px 0', fontSize: '1rem' }}>[ 플레이어 관리 ]</h3>

            {/* Add Player Input */}
            <div style={{ display: 'flex', marginBottom: '15px' }}>
                <input
                    type="text"
                    value={newPlayerName}
                    onChange={(e) => setNewPlayerName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="이름 입력..."
                    style={{
                        flex: 1,
                        backgroundColor: 'black',
                        color: 'white',
                        border: '2px solid white',
                        fontFamily: 'var(--pixel-font)',
                        padding: '5px',
                        marginRight: '10px'
                    }}
                />
                <button
                    onClick={handleAdd}
                    style={{
                        backgroundColor: 'var(--neon-green)',
                        color: 'black',
                        border: 'none',
                        fontFamily: 'var(--pixel-font)',
                        cursor: 'pointer',
                        padding: '5px 10px',
                        fontWeight: 'bold'
                    }}
                >
                    등록
                </button>
            </div>

            {/* Player List */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {players.map(player => (
                    <div
                        key={player.id}
                        onClick={() => onSelectPlayer(player.id)}
                        style={{
                            border: `2px solid ${selectedPlayerId === player.id ? 'var(--neon-yellow)' : '#555'}`,
                            padding: '5px',
                            minWidth: '120px',
                            backgroundColor: selectedPlayerId === player.id ? 'rgba(255, 240, 31, 0.1)' : 'transparent',
                            cursor: 'pointer',
                            position: 'relative'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                            <span style={{ color: selectedPlayerId === player.id ? 'var(--neon-yellow)' : 'white' }}>
                                {player.name}
                            </span>
                            <span
                                onClick={(e) => { e.stopPropagation(); onRemovePlayer(player.id); }}
                                style={{ color: 'var(--neon-red)', cursor: 'pointer', fontSize: '0.8rem' }}
                            >
                                X
                            </span>
                        </div>

                        {/* HP Bar */}
                        <div style={{ width: '100%', height: '10px', backgroundColor: '#333', border: '1px solid white' }}>
                            <div style={{
                                width: `${player.hp}%`,
                                height: '100%',
                                backgroundColor: player.hp < 40 ? 'var(--neon-red)' : 'var(--neon-green)',
                                transition: 'width 0.3s'
                            }} />
                        </div>
                        <div style={{ fontSize: '0.6rem', textAlign: 'right', marginTop: '2px', color: '#aaa' }}>
                            {player.hp}%
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlayerManager;
