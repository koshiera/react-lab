import React from 'react';
import { render, screen } from '@testing-library/react';

import { App } from './view';

test('renders learn react link', () => {
	render(<App />);
	const linkElement = screen.getByText(/lab/i);
	expect(linkElement).toBeInTheDocument();
});
