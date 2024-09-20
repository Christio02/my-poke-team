import Root from '../src/routes/root';
import ErrorPage from '../src/error-page';
import { TeamPage } from '../src/pages/TeamPage';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

const routes = [
  {
    path: '/project1',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/project1/team',
        element: <TeamPage />,
      },
    ],
  },
];

describe('Routing Integration test', () => {
  it('renders Root component on homepage correctly', () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/project1'],
    });
    render(<RouterProvider router={router} />);
    expect(
      screen.getByText(
        /Type/i,
      ),
    ).toBeInTheDocument();
  });
  it('renders TeamPage component on /team route', () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/project1/team'],
    });
    render(<RouterProvider router={router} />);
    expect(
      screen.getByText(
      /Team Name/i,
      ),
    ).toBeInTheDocument();
  });
  it('renders ErrorPage on invalid path', () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/project1/example'],
    });
    render(<RouterProvider router={router} />);
    expect(screen.getByText('Oops!')).toBeInTheDocument();
  });
});
