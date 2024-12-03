import React from 'react';
import { Searchbar } from 'react-native-paper';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={setSearchQuery}
      value={searchQuery}
      onSubmitEditing={handleSearch}
    />
  );
};

export default SearchBar;
