import React from 'react';
import ReactDOM from 'react-dom';
import LayoutHeader from './layout/js/Layout-header';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LayoutHeader />, div);
  ReactDOM.unmountComponentAtNode(div);
});
