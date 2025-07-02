import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Modern magenta/purple dashboard color variables
const dashboardColors = {
  '--dashboard-bg': '#f4f4f4', // light gray
  '--dashboard-sidebar-gradient': 'linear-gradient(180deg, #6c3483 0%, #e84393 100%)',
  '--dashboard-button': '#8e44ad', // purple
  '--dashboard-topbar': '#e84393', // magenta
  '--dashboard-button-hover': '#e84393', // vivid magenta
};

const sidebarStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: 220,
  height: '100vh',
  background: 'var(--dashboard-sidebar-gradient)',
  color: '#fff',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: 32,
  zIndex: 1001,
  boxShadow: '2px 0 12px rgba(110,58,89,0.10)'
};

const topbarStyle = {
  position: 'fixed',
  top: 0,
  left: 220,
  right: 0,
  height: 64,
  background: 'var(--dashboard-topbar)',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  paddingLeft: 32,
  fontWeight: 800,
  fontSize: 24,
  letterSpacing: '0.08em',
  zIndex: 1000,
  boxShadow: '0 2px 12px rgba(110,58,89,0.10)'
};

const contentStyle = {
  marginLeft: 220,
  marginTop: 64,
  padding: 32,
  minHeight: 'calc(100vh - 64px)',
  background: '#ffe6f2',
  display: 'block',
  width: 'calc(100vw - 220px)',
  overflowX: 'hidden'
};

const sidebarButtonBase = {
  width: '90%',
  padding: '10px 0',
  margin: '10px 0',
  background: 'none',
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  fontWeight: 700,
  fontSize: 17,
  cursor: 'pointer',
  letterSpacing: '0.04em',
  display: 'flex',
  alignItems: 'center',
  gap: 14,
  transition: 'background 0.18s, color 0.18s, box-shadow 0.18s',
  fontFamily: 'Montserrat, sans-serif',
  outline: 'none',
  position: 'relative',
};
const sidebarButtonActive = {
  background: 'rgba(255,255,255,0.10)',
  color: '#fff',
  borderLeft: '5px solid #fff',
  boxShadow: '0 2px 8px rgba(110,58,89,0.10)',
};
const sidebarButtonHover = {
  background: 'rgba(255,255,255,0.18)',
  color: '#fff',
};
const logoutButtonStyle = {
  ...sidebarButtonBase,
  color: '#fff',
  background: 'rgba(232,67,147,0.18)',
  borderLeft: '5px solid #e75480',
  marginTop: 'auto',
  marginBottom: 24,
};

// Add improved hover effect styles for sidebar buttons
const sidebarButtonHoverCSS = `
  .admin-sidebar-btn {
    transition: background 0.18s, box-shadow 0.18s;
  }
  .admin-sidebar-btn:hover {
    background: #e84393 !important;
    box-shadow: 0 4px 16px rgba(232,67,147,0.10);
  }
`;

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
  const [drawerOpen, setDrawerOpen] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 700);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <div style={dashboardColors}>
      <style>{sidebarButtonHoverCSS}</style>
      {/* Sidebar for desktop or drawer for mobile */}
      {isMobile ? (
        <>
          {/* Three dots menu button on top right */}
          <button
            style={{
              position: 'fixed',
              top: 18,
              right: 18,
              zIndex: 3001,
              background: 'rgba(232,67,147,0.18)',
              border: 'none',
              borderRadius: '50%',
              width: 44,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28,
              color: '#e84393',
              boxShadow: '0 2px 8px rgba(110,58,89,0.10)',
              cursor: 'pointer',
            }}
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
          >
            <span style={{ fontSize: 28, fontWeight: 900 }}>⋮</span>
          </button>
          {/* Drawer overlay */}
          {drawerOpen && (
            <>
              <div
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100vw',
                  height: '100vh',
                  background: 'rgba(0,0,0,0.18)',
                  zIndex: 3000,
                }}
                onClick={() => setDrawerOpen(false)}
              />
              <div
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '60vw',
                  maxWidth: 220,
                  height: '100vh',
                  backgroundImage: 'linear-gradient(180deg, #6c3483 0%, #e84393 100%)',
                  backgroundColor: '#6c3483',
                  color: '#fff',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  paddingTop: 32,
                  zIndex: 3001,
                  boxShadow: '2px 0 12px rgba(110,58,89,0.10)',
                  minWidth: 140,
                  minHeight: '100vh',
                  justifyContent: 'flex-start',
                  overflowY: 'auto',
                }}
              >
                <button
                  className="admin-sidebar-btn"
                  style={{
                    ...sidebarButtonBase,
                    ...(isActive('/admin') ? sidebarButtonActive : {}),
                  }}
                  onClick={() => { setDrawerOpen(false); navigate('/admin'); }}
                >
                  <span role="img" aria-label="Dashboard">📊</span> DASHBOARD
                </button>
                <button
                  className="admin-sidebar-btn"
                  style={{
                    ...sidebarButtonBase,
                    ...(isActive('/admin/recipes') ? sidebarButtonActive : {}),
                  }}
                  onClick={() => { setDrawerOpen(false); navigate('/admin/recipes'); }}
                >
                  <span role="img" aria-label="Recipes">🍽️</span> RECIPES
                </button>
                <button
                  className="admin-sidebar-btn"
                  style={{
                    ...sidebarButtonBase,
                    ...(isActive('/admin/cuisines') ? sidebarButtonActive : {}),
                  }}
                  onClick={() => { setDrawerOpen(false); navigate('/admin/cuisines'); }}
                >
                  <span role="img" aria-label="Cuisines">🍲</span> CUISINES
                </button>
                <button
                  className="admin-sidebar-btn"
                  style={logoutButtonStyle}
                  onClick={() => { setDrawerOpen(false); navigate('/'); }}
                >
                  <span role="img" aria-label="Logout">🚪</span> LOGOUT
                </button>
              </div>
            </>
          )}
        </>
      ) : (
        <div style={sidebarStyle}>
          <button
            className="admin-sidebar-btn"
            style={{
              ...sidebarButtonBase,
              ...(isActive('/admin') ? sidebarButtonActive : {}),
            }}
            onClick={() => navigate('/admin')}
            onMouseOver={e => Object.assign(e.currentTarget.style, sidebarButtonHover)}
            onMouseOut={e => Object.assign(e.currentTarget.style, isActive('/admin') ? sidebarButtonActive : sidebarButtonBase)}
          >
            <span role="img" aria-label="Dashboard">📊</span> DASHBOARD
          </button>
          <button
            className="admin-sidebar-btn"
            style={{
              ...sidebarButtonBase,
              ...(isActive('/admin/recipes') ? sidebarButtonActive : {}),
            }}
            onClick={() => navigate('/admin/recipes')}
            onMouseOver={e => Object.assign(e.currentTarget.style, sidebarButtonHover)}
            onMouseOut={e => Object.assign(e.currentTarget.style, isActive('/admin/recipes') ? sidebarButtonActive : sidebarButtonBase)}
          >
            <span role="img" aria-label="Recipes">🍽️</span> RECIPES
          </button>
          <button
            className="admin-sidebar-btn"
            style={{
              ...sidebarButtonBase,
              ...(isActive('/admin/cuisines') ? sidebarButtonActive : {}),
            }}
            onClick={() => navigate('/admin/cuisines')}
            onMouseOver={e => Object.assign(e.currentTarget.style, sidebarButtonHover)}
            onMouseOut={e => Object.assign(e.currentTarget.style, isActive('/admin/cuisines') ? sidebarButtonActive : sidebarButtonBase)}
          >
            <span role="img" aria-label="Cuisines">🍲</span> CUISINES
          </button>
          <button
            className="admin-sidebar-btn"
            style={logoutButtonStyle}
            onClick={() => navigate('/')}
            onMouseOver={e => e.currentTarget.style.background = 'rgba(232,67,147,0.28)'}
            onMouseOut={e => e.currentTarget.style.background = 'rgba(232,67,147,0.18)'}
          >
            <span role="img" aria-label="Logout">🚪</span> LOGOUT
          </button>
        </div>
      )}
      {/* Topbar */}
      <div style={topbarStyle}>Admin Dashboard</div>
      {/* Main Content */}
      <div style={contentStyle}>
        <Outlet />
      </div>
    </div>
  );
} 