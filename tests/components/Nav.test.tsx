import { render, screen } from '@testing-library/react';
import Nav from '../../src/components/Nav';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { TeamPage } from '../../src/pages/TeamPage';
import Banner from '../../src/components/Banner';

type TestData = {
  title: string;
  text: string;
  rootImage: string;
  teamImage: string;
  mobileImage: string;
};
const createTestData = () => {
  return {
    title: 'Test',
    text: 'Lorem ipsum',
    rootImage: '../../src/assets/banner.webp',
    teamImage: '../../src/assets/banner-team.jpeg',
    mobileImage: '../../src/assets/banner-team-mb.jpeg',
  };
};

let bannerTestData: TestData;
beforeEach(() => {
  bannerTestData = createTestData();
});

describe('Nav component', () => {
  it('navigates to team page after clicking Link element', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Nav />} />
          <Route path="/team" element={<TeamPage />} />
        </Routes>
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('link', { name: /Your Team/i }));

    expect(screen.getByText('Team Chris')).toBeInTheDocument();
  });
  it('navigates to homepage after clicking Link element', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/team']}>
        <Routes>
          <Route path="/team" element={<Nav />} />
          <Route
            path="/"
            element={
              <Banner
                title={bannerTestData.title}
                text={bannerTestData.text}
                desktopImage={bannerTestData.rootImage}
                mobileImage={bannerTestData.mobileImage}
              />
            }
          />
        </Routes>
      </MemoryRouter>,
    );
    await user.click(screen.getByRole('link', { name: /Explore Pokemons/i }));
    expect(screen.getByText('Lorem ipsum')).toBeInTheDocument();
  });
});
