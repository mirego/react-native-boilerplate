import React from 'react';
import { describe, it } from '@jest/globals';
import { screen, render } from '@testing-library/react-native';
import App from '../src/App';

describe('tests work', () => {
  it('should render the app', () => {
    render(<App />);

    expect(screen.getByTestId('test-label')).toBeDefined();
  });
});
