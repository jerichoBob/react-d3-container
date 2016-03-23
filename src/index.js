import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/App';

const el = document.getElementById('reactNode');

ReactDOM.render(<App data={[1, 2, 3]} root_el={el} />, el);
