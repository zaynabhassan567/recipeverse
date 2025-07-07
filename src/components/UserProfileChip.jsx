import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { clearUser } from '../store';
import SplashScreen from './SplashScreen';
import { logoutUser } from '../userSlice';

const chipStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#fff',
  borderRadius: '50%',
  width: 40,
  height: 40,
  boxShadow: '0 2px 8px rgba(110,58,89,0.10)',
  cursor: 'pointer',
  position: 'relative',
  marginLeft: 16,
  border: '2px solid #6e3a59',
  fontWeight: 700,
  fontSize: 18,
  color: '#6e3a59',
  overflow: 'hidden',
};

const tooltipStyle = {
  position: 'absolute',
  top: 48,
  right: 0,
  background: '#fff',
  color: '#6e3a59',
  border: '1px solid #6e3a59',
  borderRadius: 8,
  padding: '10px 18px',
  fontSize: 15,
  fontWeight: 500,
  boxShadow: '0 4px 16px rgba(232,67,147,0.10)',
  zIndex: 100,
  minWidth: 180,
  textAlign: 'left',
};

const buttonStyle = {
  display: 'block',
  width: '100%',
  margin: '10px 0 0 0',
  padding: '8px 0',
  background: '#6e3a59',
  color: '#fff',
  border: 'none',
  borderRadius: 6,
  fontWeight: 700,
  fontSize: 15,
  cursor: 'pointer',
  textAlign: 'center',
  transition: 'background 0.18s',
};

export default function UserProfileChip() {
  const { user, isAuthenticated } = useSelector(state => state.user);
  const [hover, setHover] = React.useState(false);
  const [showSplash, setShowSplash] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  if (!isAuthenticated || !user) return null;
  const initial = user.displayName ? user.displayName[0].toUpperCase() : (user.email ? user.email[0].toUpperCase() : '?');

  const handleLogout = async () => {
    if (location.pathname.startsWith('/admin')) {
      dispatch(logoutUser());
      navigate('/');
    } else {
      setShowSplash(true);
      setHover(false);
      setTimeout(() => {
        dispatch(logoutUser());
        navigate('/');
      }, 2500);
    }
  };

  const handleDashboard = () => {
    navigate('/admin');
  };

  const handleHome = () => {
    navigate('/');
  };

  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      tabIndex={0}
      aria-label="User profile"
    >
      {showSplash && <SplashScreen />}
      <div style={chipStyle}>
        {user.photoURL ? (
          <img src={user.photoURL} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
        ) : (
          initial
        )}
      </div>
      {hover && !showSplash && (
        <div style={tooltipStyle}>
          <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 10, color: '#6e3a59' }}>Hello, {user.displayName || user.email}</div>
          {isAdmin ? (
            <button style={buttonStyle} onClick={handleHome}>Home</button>
          ) : (
            <button style={buttonStyle} onClick={handleDashboard}>Dashboard</button>
          )}
          <button style={{ ...buttonStyle, background: '#fff', color: '#6e3a59', border: '1px solid #6e3a59', marginTop: 8 }} onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
} 