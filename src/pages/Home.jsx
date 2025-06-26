import React from 'react';

const Home = () => {
  return (
    <div>
      {/* Main content goes here */}
      <section style={{
        width: '100%',
        background: '#fff',
        padding: '32px 0 24px 0',
        borderBottom: '1px solid #eee',
        textAlign: 'center',
      }}>
        <style>{`
          @media (max-width: 600px) {
            .script-break { display: block !important; margin-top: 4px !important; }
          }
        `}</style>
        <span style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 800,
          fontSize: 18,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#222',
          marginRight: 8,
        }}>
          SIMPLE RECIPES MADE FOR
        </span>
        <span className="script-break" style={{
          fontFamily: 'Dancing Script, cursive',
          fontWeight: 400,
          fontSize: 28,
          color: '#6e3a59',
          verticalAlign: 'middle',
        }}>
          real, actual, everyday life.
        </span>
      </section>
    </div>
  );
};

export default Home; 