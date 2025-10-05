import { render, screen } from '@testing-library/react';


const WeatherTitle = () => <h1>Weather App</h1>;

test('renders Weather App title', () => {
  render(<WeatherTitle />);
  const titleElement = screen.getByText(/Weather App/i);
  expect(titleElement).toBeInTheDocument();
});
