import React from 'react';
import MoodBlender from './components/MoodBlender';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', padding: 0, margin: 0 }}>
      <MoodBlender soundEnabled={true} />
    </div>
  );
}

export default App;