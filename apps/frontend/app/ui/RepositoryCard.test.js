import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RepositoryCard from './RepositoryCard';

const mockRepository = {
  name: 'test-repo',
  description: 'Test repository description',
  html_url: 'https://example.com/test-repo',
  owner: {
    login: 'test-user',
    avatar_url: 'https://example.com/avatar',
  },
};

test('renders RepositoryCard with correct content', () => {
  render(<RepositoryCard repository={mockRepository} />);

  expect(screen.getByText('test-repo')).toBeInTheDocument();
  expect(screen.getByText('Test repository description')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'test-repo' })).toHaveAttribute(
    'href',
    'https://example.com/test-repo'
  );

  expect(screen.getByAltText('test-user avatar')).toBeInTheDocument();
  expect(screen.getByText('by')).toBeInTheDocument();
  expect(screen.getByText('test-user')).toBeInTheDocument();
});
