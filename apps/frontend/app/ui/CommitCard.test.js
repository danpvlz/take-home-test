import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import moment from 'moment';

import { CommitCard } from './CommitCard';

const mockCommit = {
    "sha": "abc123",
    "author": {
        "login": "testUser",
        "avatar_url": "https://avatars.githubusercontent.com/u/55776282?v=4",
    },
    "commit": {
        "committer": {
            "date": "2023-11-16T15:50:14Z"
        },
        "message": "Test commit message"
    },
    "html_url": "https://example.com/commit/abc123"
}

test('renders CommitCard with correct content', () => {
  render(<CommitCard commit={mockCommit} />);

  expect(screen.getByText('testUser')).toBeInTheDocument();
  expect(screen.getByText('Test commit message')).toBeInTheDocument();

  const formattedDate = moment(mockCommit.commit.committer.date).calendar().toLocaleLowerCase();
  expect(screen.getByText(`committed ${formattedDate}`)).toBeInTheDocument();

  expect(screen.getByAltText('testUser avatar')).toBeInTheDocument();

  const commitLink = screen.getByRole('link', { name: 'Open commit on GitHub' });
  expect(commitLink).toHaveAttribute('href', 'https://example.com/commit/abc123');
  expect(commitLink).toHaveAttribute('target', '_blank');
  expect(commitLink).toHaveAttribute('rel', 'noreferrer');
});