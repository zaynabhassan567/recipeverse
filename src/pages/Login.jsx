import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin');
    } catch (err) {
      setError('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#faf6f2' }}>
      <form onSubmit={handleSubmit} style={{ background: '#fff', padding: 36, borderRadius: 16, boxShadow: '0 2px 16px rgba(110,58,89,0.10)', minWidth: 320, position: 'relative' }}>
        <h2 style={{ textAlign: 'center', color: '#6e3a59', marginBottom: 24 }}>Admin Login</h2>
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 700 }}>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }} />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 700 }}>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }} />
        </div>
        {error && <div style={{ color: '#c00', marginBottom: 12, textAlign: 'center' }}>{error}</div>}
        <button type="submit" style={{ width: '100%', background: '#6e3a59', color: '#fff', fontWeight: 700, padding: 12, borderRadius: 6, border: 'none', fontSize: 18, cursor: 'pointer' }} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <div style={{ marginTop: 18, textAlign: 'center' }}>
          <span style={{ color: '#444', fontSize: 15 }}>Only authorized users can log in.</span>
        </div>
      </form>
    </div>
  );
} 