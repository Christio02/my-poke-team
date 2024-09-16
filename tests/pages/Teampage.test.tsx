import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { TeamPage } from '../../src/pages/TeamPage';

describe('Teampage', () => {
  it('matches snapshot with correct props', () => {
    const { asFragment } = render(
      <MemoryRouter initialEntries={['/team']}>
        <Routes>
          <Route path={'/team'} element={<TeamPage />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
