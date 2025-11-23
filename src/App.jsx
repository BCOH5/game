import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HoleInput from './components/HoleInput';
import SettlementModal from './components/SettlementModal';
import Scorecard from './components/Scorecard';
import PlayerManager from './components/PlayerManager';
import WarningPopup from './components/WarningPopup';

function App() {
  const [players, setPlayers] = useState([
    { id: 1, name: '이대우', scores: {}, penalties: {}, totalDrinks: 0 },
    { id: 2, name: '송재열', scores: {}, penalties: {}, totalDrinks: 0 },
    { id: 3, name: '홍재익', scores: {}, penalties: {}, totalDrinks: 0 },
    { id: 4, name: '오병철', scores: {}, penalties: {}, totalDrinks: 0 }
  ]);
  const [currentHole, setCurrentHole] = useState(1);
  const [gameState, setGameState] = useState('SETUP'); // SETUP, PLAYING, SETTLEMENT, FINISHED
  const [settlementResults, setSettlementResults] = useState([]);

  // Sound effects
  const playSound = (type) => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    const now = ctx.currentTime;

    if (type === 'complete') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.linearRampToValueAtTime(800, now + 0.2);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === 'next') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(600, now);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    }
  };

  const addPlayer = (name) => {
    if (players.length >= 4) {
      alert('최대 4명까지만 가능합니다!');
      return;
    }
    const newId = Math.max(...players.map(p => p.id), 0) + 1;
    setPlayers([...players, { id: newId, name, scores: {}, penalties: {}, totalDrinks: 0 }]);
  };

  const removePlayer = (id) => {
    setPlayers(players.filter(p => p.id !== id));
  };

  const startGame = () => {
    if (players.length === 0) {
      alert('플레이어를 등록해주세요!');
      return;
    }
    setGameState('PLAYING');
  };

  const handleHoleComplete = (inputs) => {
    playSound('complete');

    // Calculate settlement
    const results = players.map(p => {
      const input = inputs[p.id] || { score: 0, penalties: 0 };
      const drinks = input.penalties; // Basic rule: 1 penalty = 1 drink
      return { ...p, ...input, drinks };
    });

    // Update players state
    setPlayers(players.map(p => {
      const input = inputs[p.id] || { score: 0, penalties: 0 };
      return {
        ...p,
        scores: { ...p.scores, [currentHole]: input.score },
        penalties: { ...p.penalties, [currentHole]: input.penalties },
        totalDrinks: p.totalDrinks + input.penalties
      };
    }));

    setSettlementResults(results);
    setGameState('SETTLEMENT');
  };

  const nextHole = () => {
    playSound('next');
    if (currentHole === 18) {
      setGameState('FINISHED');
    } else {
      setCurrentHole(h => h + 1);
      setGameState('PLAYING');
    }
  };

  return <div style={{
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '10px', // Reduced from 20px
    paddingBottom: '10px', // Reduced from 20px
    overflowY: 'auto'
  }}>
    <Header showTitle={gameState === 'SETUP'} />

    {
      gameState === 'SETUP' && (
        <div style={{ width: '90%', maxWidth: '600px' }}>
          <PlayerManager
            players={players}
            onAddPlayer={addPlayer}
            onRemovePlayer={removePlayer}
            selectedPlayerId={null}
            onSelectPlayer={() => { }}
          />
          <button
            onClick={startGame}
            style={{
              width: '100%',
              padding: '15px',
              backgroundColor: 'var(--neon-green)',
              color: 'black',
              border: 'none',
              fontFamily: 'var(--pixel-font)',
              fontSize: '1.5rem',
              cursor: 'pointer',
              marginTop: '20px',
              boxShadow: '4px 4px 0px #000',
              pointerEvents: 'auto'
            }}
          >
            GAME START ▶
          </button>
          <WarningPopup />
        </div>
      )
    }

    {
      (gameState === 'PLAYING' || gameState === 'SETTLEMENT' || gameState === 'FINISHED') && (
        <div style={{ width: '95%', maxWidth: '1000px' }}>
          <Scorecard players={players} currentHole={currentHole} />

          {gameState === 'PLAYING' && (
            <HoleInput
              players={players}
              currentHole={currentHole}
              onCompleteHole={handleHoleComplete}
            />
          )}
        </div>
      )
    }

    {
      gameState === 'SETTLEMENT' && (
        <SettlementModal results={settlementResults} onNext={nextHole} />
      )
    }

    {
      gameState === 'FINISHED' && (
        <div className="pixel-box" style={{ textAlign: 'center', padding: '2rem', border: '4px solid var(--neon-yellow)' }}>
          <h2 className="text-neon-yellow" style={{ fontSize: '2rem' }}>🏆 GAME OVER 🏆</h2>
          <div style={{ fontSize: '1.5rem', margin: '20px 0' }}>
            Winner: <span className="text-neon-green">
              {players.sort((a, b) => a.totalDrinks - b.totalDrinks)[0].name}
            </span>
          </div>
          <p>가장 적게 마신 당신이 승자!</p>
          <button onClick={() => window.location.reload()} style={{ padding: '10px', cursor: 'pointer' }}>RESTART</button>
        </div>
      )
    }
  </div >
  );
}

export default App;
