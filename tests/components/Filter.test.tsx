import { describe, it, expect } from "vitest";

import { render, screen, fireEvent } from '@testing-library/react';
import Filter from '../../src/components/Filter';
import { vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

const mockOnFilterChange = vi.fn();

const createTestFilterData = () => ({
  name: 'Type',
  values: ['Fire', 'Water', 'Grass'],
});

let testFilterData: ReturnType<typeof createTestFilterData>;

beforeEach(() => {
  testFilterData = createTestFilterData();
  mockOnFilterChange.mockClear();
});

describe('Filter component', () => {
  it('renders with correct props ', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route
            path="/"
            element={<Filter name={testFilterData.name} values={testFilterData.values} onFilterChange={mockOnFilterChange} />}
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByLabelText(`Select a ${testFilterData.name}`)).toBeInTheDocument();
  });

  it('matches snapshot with correct props', () => {
    const { asFragment } = render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route
            path="/"
            element={<Filter name={testFilterData.name} values={testFilterData.values} onFilterChange={mockOnFilterChange} />}
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correct number of options', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route
            path="/"
            element={<Filter name={testFilterData.name} values={testFilterData.values} onFilterChange={mockOnFilterChange} />}
          />
        </Routes>
      </MemoryRouter>,
    );

    testFilterData.values.forEach((value) => {
      expect(screen.getByText(value)).toBeInTheDocument();
    });

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(testFilterData.values.length + 1);
  });

  it('calls onFilterChange when a value is selected', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route
            path="/"
            element={<Filter name={testFilterData.name} values={testFilterData.values} onFilterChange={mockOnFilterChange} />}
          />
        </Routes>
      </MemoryRouter>,
    );

    const selectElement = screen.getByLabelText(`Select a ${testFilterData.name}`) as HTMLSelectElement;

    fireEvent.change(selectElement, { target: { value: 'Fire' } });

    expect(mockOnFilterChange).toHaveBeenCalledWith('Fire');
    expect(selectElement.value).toBe('Fire');
  });

  it('persists filter value in sessionStorage', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route
            path="/"
            element={<Filter name={testFilterData.name} values={testFilterData.values} onFilterChange={mockOnFilterChange} />}
          />
        </Routes>
      </MemoryRouter>,
    );

    const selectElement = screen.getByLabelText(`Select a ${testFilterData.name}`);

    // Simulate selecting a value
    fireEvent.change(selectElement, { target: { value: 'Water' } });

    // Check if the selected value is saved to sessionStorage
    expect(sessionStorage.getItem('filter')).toBe('Water');
  });

  it('restores filter value from sessionStorage', () => {
    // Set a value in sessionStorage before rendering
    sessionStorage.setItem('filter', 'Grass');

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route
            path="/"
            element={<Filter name={testFilterData.name} values={testFilterData.values} onFilterChange={mockOnFilterChange} />}
          />
        </Routes>
      </MemoryRouter>,
    );

    const selectElement = screen.getByLabelText(`Select a ${testFilterData.name}`) as HTMLSelectElement;

    expect(selectElement.value).toBe('Grass');
  });
});