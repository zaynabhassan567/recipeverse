import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    if (!form.name.trim() || !form.email.trim()) {
      setError('Please enter your name and email.');
      setLoading(false);
      return;
    }
    setTimeout(() => {
      setSuccess(`Thank you, ${form.name}! You have signed up for Pinch of Yum email updates.`);
      setForm({ name: '', email: '' });
      setLoading(false);
    }, 800);
  };

  return (
    <>
      <Navbar />
      <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff8f0' }}>
        <form onSubmit={handleSubmit} style={{ background: '#fff', padding: 36, borderRadius: 16, boxShadow: '0 2px 16px rgba(110,58,89,0.10)', minWidth: 340, maxWidth: 400, width: '100%' }}>
          <h2 style={{ textAlign: 'center', color: '#e75480', marginBottom: 24 }}>Sign Up for Email Updates</h2>
          {success && <div style={{ color: '#20bf6b', marginBottom: 16, textAlign: 'center', fontWeight: 700 }}>{success}</div>}
          {error && <div style={{ color: '#c00', marginBottom: 16, textAlign: 'center', fontWeight: 700 }}>{error}</div>}
          <div style={{ marginBottom: 18 }}>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 700 }}>Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} required style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }} />
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 700 }}>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }} />
          </div>
          <button type="submit" style={{ width: '100%', background: '#e75480', color: '#fff', fontWeight: 700, padding: 12, borderRadius: 6, border: 'none', fontSize: 18, cursor: 'pointer' }} disabled={loading}>
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
} 