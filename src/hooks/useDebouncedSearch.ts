import { useState, useRef } from "react";

export const useDebouncedSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    
    debounceTimeout.current = setTimeout(() => {
      setDebouncedSearchQuery(event.target.value);
    }, 500);
  };

  return { searchQuery, debouncedSearchQuery, handleSearchChange };
};
