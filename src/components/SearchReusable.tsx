import React from 'react';

interface SearchBarProps {
  searchQuery: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, handleSearchChange }) => {
  return (
    <div className="p-4">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        className="w-80 h-10 p-3 border rounded-md bg-white dark:bg-gray-800"
        placeholder="Buscar mes y año: 'Diciembre 2024'"
      />
    </div>
  );
};

export default SearchBar;
