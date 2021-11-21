import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// import Home from './views/home';
// import Lane from './views/lane';
import Station from './views/station';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Route path="/" exact component={Station} />
      {/* <Route path="/" exact component={Home} />
      <Route path="/lane" component={Lane} />
      <Route path="/station" component={Station} /> */}
    </Router>
  );
}

export default App;
