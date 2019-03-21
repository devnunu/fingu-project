import React from 'react';
import ReactDom from 'react-dom';

import Router from './router/Router';

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

function App() {
  return (
    <div className="App">
      <Router />
    </div>
  );
}

ReactDom.render(<App />, document.getElementById('root') as HTMLElement);
