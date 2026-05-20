import React from 'react';
import MoodBlender from './components/MoodBlender';

function App() {
  return (
    <div className="app-root">
      <MoodBlender soundEnabled={true} />
    </div>
  );
}

export default App;