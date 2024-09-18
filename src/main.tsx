import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Root from './routes/root.tsx';
import { TeamPage } from './pages/TeamPage.tsx';
import ErrorPage from './error-page.tsx';
import App from './pages/App.tsx';
import { PokemonProvider } from './context/PokemonContext'; // Import the provider

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Navigate to="/home" replace />, // Redirect to /home
      },
      {
        path: '/team',
        element: <TeamPage />,
      },
      {
        path: '/home',
        element: <App />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PokemonProvider>
      <RouterProvider router={router} />
    </PokemonProvider>
  </StrictMode>,
);
