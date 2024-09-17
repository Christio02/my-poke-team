import React, { useState } from 'react';

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
  };
  return (
    <div className="pokemon-types">
      <label htmlFor={name.toLowerCase()}>{name}</label>
      <select id={name.toLowerCase()} value={selectedValue} onChange={handleChange} />
      <option value="">Select {name}</option>
      {values.map((value, index) => (
        <option key={index} value={value}>
          {value}
        </option>
      ))}
    </div>
  );
}
