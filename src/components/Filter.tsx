import React, { useEffect, useState } from 'react';
import '../styles/filter.css';

type FilterProps = {
  name: string;
  values: string[];
  onFilterChange: (selectedValue: string) => void;
};

export default function Filter({ name, values, onFilterChange }: FilterProps) {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setSelectedValue(selected);
    onFilterChange(selected);
    sessionStorage.setItem('filter', selected);
  };

  useEffect(() => {
    const savedFilter = sessionStorage.getItem('filter');
    if (savedFilter) {
      setSelectedValue(savedFilter);
    }
  }, [selectedValue]);
  return (
    <div className="pokemon-types">
      <label htmlFor={name.toLowerCase()}>Filter on type</label>
      <select id={name.toLowerCase()} value={selectedValue} onChange={handleChange} aria-label={`Select a ${name} `}>
        <option value="">All types</option>
        {values.map((value, index) => (
          <option key={index} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
}
