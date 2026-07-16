import React from 'react';

const Dashboard = () => {
  return (
    <div style={{ 
      padding: '3rem', 
      textAlign: 'center', 
      fontFamily: 'sans-serif',
      color: '#333' 
    }}>
      <h1 style={{ fontSize: '2.5rem', color: '#4F46E5' }}>
        🎉 Welcome to the BirrBazaar Dashboard!
      </h1>
      <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>
        You have successfully logged in using the live API. 🚀
      </p>
      <button 
        onClick={() => {
          localStorage.removeItem('token'); // Or wherever you store your auth token
          window.location.href = '/login';
        }}
        style={{
          marginTop: '2rem',
          padding: '0.75rem 1.5rem',
          backgroundColor: '#EF4444',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;