import React from 'react';
import { describe, it, beforeEach, afterEach } from '@jest/globals';
import { screen, render, waitFor } from '@testing-library/react-native';
import { container, singleton } from 'tsyringe';
import App from '../src/App';
import Geolocation, { GeolocationStatus } from '~/services/geolocation';

@singleton()
class GeolocationMock extends Geolocation {
  getCurrentPosition = jest.fn().mockResolvedValue({
    status: GeolocationStatus.Available,
    position: { coords: { latitude: 10, longitude: 10 } },
    error: null,
  });
}

describe('tests work', () => {
  beforeEach(() => {
    container.register(Geolocation, GeolocationMock);
  });

  afterEach(() => {
    container.clearInstances();
  });

  it('should render the app', async () => {
    render(<App />);

    await expect(screen.findByTestId('test-label')).toBeDefined();

    await waitFor(() =>
      expect(screen.findByTestId('current-position')).toBeDefined()
    );

    await expect(screen.getByTestId('current-position')).toHaveTextContent(
      'Latitude:10 Longitude:10'
    );
  });
});
