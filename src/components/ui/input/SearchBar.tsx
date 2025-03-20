'use client';

import { TextField, InputAdornment, IconButton, Button, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useRouter } from 'next/navigation';
import { useSearch } from '../search/SearchProvider';


export default function SearchBar() {
  const { setQuery, query } = useSearch();
  const router = useRouter();

  const handleSearch = () => {
    if (query) {
      setQuery(query);
      router.push('/search');
    }

  };

  const handleClear = () => {
    setQuery('');
  };

  return (
    <>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Пошук..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && handleSearch()}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: query && (
                <InputAdornment position="end">
                  <IconButton onClick={handleClear}>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }
          }}
        />
        <Button variant="contained" color='primary' size='large' onClick={handleSearch}>Пошук</Button>
      </Stack>
    </>
  );
}
