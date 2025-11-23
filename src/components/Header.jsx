import React from 'react';

const Header = ({ showTitle = true }) => {
  if (!showTitle) return null;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '0.5rem', // Reduced padding
      width: '100%',
      textAlign: 'center'
    }}>
      <h1 style={{
        fontSize: '1rem', // Reduced font size
        margin: '0',
        textShadow: '2px 2px 0px #000', // Reduced shadow
        color: 'white',
        letterSpacing: '1px'
      }}>
        🎮 술-스크린
      </h1>
      <div style={{
        marginTop: '5px',
        backgroundColor: 'var(--neon-yellow)',
        color: 'black',
        padding: '2px 10px', // Reduced padding
        fontWeight: 'bold',
        fontSize: '0.7rem', // Reduced font size
        boxShadow: '2px 2px 0px #000'
      }}>
        미션: 생존하라!
      </div>
    </div>
  );
};

export default Header;
