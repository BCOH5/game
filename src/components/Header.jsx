import React from 'react';

const Header = ({ showTitle = true }) => {
  if (!showTitle) return null;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '1rem',
      width: '100%',
      textAlign: 'center'
    }}>
      <h1 style={{
        fontSize: '1.5rem',
        margin: '0',
        textShadow: '4px 4px 0px #000',
        color: 'white',
        letterSpacing: '2px'
      }}>
        🎮 술-스크린 : 익스트림 음주 골프
      </h1>
      <div style={{
        marginTop: '10px',
        backgroundColor: 'var(--neon-yellow)',
        color: 'black',
        padding: '5px 15px',
        fontWeight: 'bold',
        boxShadow: '4px 4px 0px #000'
      }}>
        미션: 친목 도모 및 음주 가무 (생존하라!)
      </div>
    </div>
  );
};

export default Header;
