import React from 'react';
import aboutPortrait from '../assets/about-portrait.jpg';
import AboutFooterBar from '../components/AboutFooterBar';

const container = {
  maxWidth: 1200,
  margin: '0 auto',
  display: 'flex',
  alignItems: 'stretch',
  background: '#faf9f7',
  borderRadius: 18,
  boxShadow: '0 2px 16px rgba(110,58,89,0.06)',
  overflow: 'hidden',
  flexWrap: 'wrap',
  marginTop: 0,
};
const left = {
  flex: 1,
  minWidth: 320,
  background: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
};
const right = {
  flex: 2,
  minWidth: 320,
  background: '#faf9f7',
  padding: '48px 48px 48px 48px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};
const img = {
  width: 340,
  height: 420,
  objectFit: 'cover',
  borderRadius: 12,
  boxShadow: '0 2px 16px rgba(110,58,89,0.10)',
};
const breadcrumb = {
  color: '#888',
  fontWeight: 700,
  fontSize: 15,
  letterSpacing: '0.08em',
  marginBottom: 18,
  textTransform: 'uppercase',
};
const heading = {
  color: '#6e3a59',
  fontFamily: 'Montserrat, sans-serif',
  fontWeight: 800,
  fontSize: 56,
  letterSpacing: '0.08em',
  marginBottom: 18,
};
const subheading = {
  fontWeight: 800,
  fontSize: 22,
  color: '#222',
  marginBottom: 8,
  fontFamily: 'Montserrat, sans-serif',
};
const script = {
  fontFamily: 'Dancing Script, cursive',
  fontSize: 38,
  color: '#888',
  marginLeft: 8,
  display: 'inline-block',
};
const desc = {
  fontSize: 20,
  color: '#444',
  marginBottom: 24,
  lineHeight: 1.6,
  maxWidth: 700,
};

export default function About() {
  return (
    <div style={container}>
      <div style={left}>
        <img src={aboutPortrait} alt="Lindsay portrait" style={img} />
      </div>
      <div style={right}>
        <div style={breadcrumb}>PINCH OF YUM &gt; ABOUT ME</div>
        <div style={heading}>About Me</div>
        <div style={subheading}>HI, MY NAME IS <span style={script}>lindsay!</span></div>
        <div style={desc}>
          And Pinch of Yum is my little corner of the internet!<br /><br />
          I'm the voice, author, and creator behind Pinch of Yum. What started as a casual hobby over 14 years ago in 2010 while I was working as a fourth grade teacher has now grown into a full-blown business (!!) that reaches millions of people with fun recipes each month, with content that has been featured on The Kitchn, CNN, Refinery29, Brit + Co, POPSUGAR, Huffington Post, The Everymom, PureWow, and more.
        </div>
      </div>
      <div style={{ flexBasis: '100%', padding: 0, margin: 0 }}>
        <AboutFooterBar />
      </div>
      <div style={{ flexBasis: '100%', padding: '48px 0 0 0', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px' }}>
          <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: 32, color: '#222', marginBottom: 24, marginTop: 0 }}>I LOVE FOOD!</h1>
          <div style={{ fontSize: 20, color: '#555', fontFamily: 'Lora, serif', lineHeight: 1.5, marginBottom: 32 }}>
            In this space, I am always sharing fresh, flavorful, (mostly) healthy recipes that I love to make and eat in my real, actual, every day life. If I wouldn't eat it in real life, I won't put in on the blog. My goal is to inspire you with food that is both approachable AND exciting, whether you're cooking for yourself, your family, your roommates, or your friends. I want you to be so excited about these recipes that you eagerly await 5pm when you can go home from work and start cooking.<br /><br />
            On a related note, I absolutely LOVE seeing the food that you're making. It will make my day if you tag <a href="https://instagram.com/pinchofyum" style={{ color: '#8a4c6c', textDecoration: 'underline' }}>@pinchofyum</a> in your Instagram photos and stories! We love to shout out our favorites on Fridays with our Reader Awards on Instagram Stories.
          </div>
        </div>
      </div>
    </div>
  );
} 