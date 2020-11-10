import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {}
  };
}

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test('renders correct text', () => {
  const { getByText } = render(<App />);

  getByText("FilmPedia");
  getByText("Access Now!");
});