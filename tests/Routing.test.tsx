import Root from '../src/routes/root';
import ErrorPage from '../src/error-page';
import { TeamPage } from '../src/pages/TeamPage';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

const routes = [
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/team',
        element: <TeamPage />,
      },
    ],
  },
];

describe('Routing Integration test', () => {
  it('renders Root component on homepage correctly', () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/'],
    });
    render(<RouterProvider router={router} />);
    expect(
      screen.getByText(
        'Discover and explore a wide variety of Pokemons. Learn about their names, abilities and types. You can also select your favorite Pokemons and build your own dream team of up to 6 members. Add them to your personal collection by starring them, and strategize the best team to use in your battles!',
      ),
    ).toBeInTheDocument();
  });
  it('renders TeamPage component on /team route', () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/team'],
    });
    render(<RouterProvider router={router} />);
    expect(
      screen.getByText(
        "Here you can view all the Pokemons you've favorited and added to your personal team. You can manage your team of up to 6 Pokemons, see their details, and adjust your strategy. If you've changed your mind, you can easily remove any Pokemon from your team by un-favoriting them, allowing you to make room for new additions.",
      ),
    ).toBeInTheDocument();
  });
  it('renders ErrorPage on invalid path', () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/example'],
    });
    render(<RouterProvider router={router} />);
    expect(screen.getByText('Oops!')).toBeInTheDocument();
  });
});
