import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event'

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

test('user click on Access Now button', () => {
  const { getByText } = render(<App />);

  userEvent.click(getByText("Access Now!"));
  getByText("Quick Login");
  getByText("Return");
  getByText("Submit");
  getByText("Username");
})