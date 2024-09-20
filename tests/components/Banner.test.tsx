import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
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

describe('Banner component', () => {
  const setViewportSize = (width: number) => {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      writable: true,
      value: width,
    });
    // src:https://stackoverflow.com/questions/45868042/figuring-out-how-to-mock-the-window-size-changing-for-a-react-component-test
    // and chatgpt: "I get error attempt to assign to const or readonly variable"

    window.dispatchEvent(new Event('resize'));
  };
  it('Renders with correct text and image on root path, and desktop', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route
            path={'/'}
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
    expect(screen.getByText('Test'));
    expect(screen.getByText('Lorem ipsum'));
    expect(screen.getByTestId('background')).toHaveStyle(`background-image: url(${bannerTestData.rootImage})`);
  });
  it('Renders with correct text and image on /team path, and desktop', () => {
    render(
      <MemoryRouter initialEntries={['/team']}>
        <Routes>
          <Route
            path={'/team'}
            element={
              <Banner
                title={bannerTestData.title}
                text={bannerTestData.text}
                desktopImage={bannerTestData.teamImage}
                mobileImage={bannerTestData.mobileImage}
              />
            }
          />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByText('Test'));
    expect(screen.getByText('Lorem ipsum'));
    expect(screen.getByTestId('background')).toHaveStyle(`background-image: url(${bannerTestData.teamImage})`);
  });
  it('Renders with correct text and image on /team path, and mobile', () => {
    setViewportSize(750);

    render(
      <MemoryRouter initialEntries={['/team']}>
        <Routes>
          <Route
            path={'/team'}
            element={
              <Banner
                title={bannerTestData.title}
                text={bannerTestData.text}
                desktopImage={bannerTestData.teamImage}
                mobileImage={bannerTestData.mobileImage}
              />
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText('Test'));
    expect(screen.getByText('Lorem ipsum'));
    expect(screen.getByTestId('background')).toHaveStyle(`background-image: url(${bannerTestData.mobileImage})`);
  });

  it('matches snapshot on root path with desktop view', () => {
    const { asFragment } = render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route
            path={'/'}
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
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches snapshot on path /team and desktopimage', () => {
    const { asFragment } = render(
      <MemoryRouter initialEntries={['/team']}>
        <Routes>
          <Route
            path={'/team'}
            element={
              <Banner
                title={bannerTestData.title}
                text={bannerTestData.text}
                desktopImage={bannerTestData.teamImage}
                mobileImage={bannerTestData.mobileImage}
              />
            }
          />
        </Routes>
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches snapshot on path /team and mobile', () => {
    setViewportSize(750);

    const { asFragment } = render(
      <MemoryRouter initialEntries={['/team']}>
        <Routes>
          <Route
            path={'/team'}
            element={
              <Banner
                title={bannerTestData.title}
                text={bannerTestData.text}
                desktopImage={bannerTestData.teamImage}
                mobileImage={bannerTestData.mobileImage}
              />
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
