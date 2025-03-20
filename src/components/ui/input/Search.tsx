'use client';

import { TextField, InputAdornment, IconButton, CircularProgress, Stack, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { ChangeEvent } from 'react';
import { useSearch } from '../search/SearchProvider';

export default function Search() {
  const { query, setQuery, loading, searching, setSearching } = useSearch();

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleClear = () => {
    setQuery('');
  };

  return (
    <Stack direction='row' spacing={2} width='100%'>
      {searching ? (
        <Stack direction='row' spacing={2} width='100%'>
          <TextField
            fullWidth
            variant='outlined'
            placeholder='Пошук...'
            value={query}
            onChange={handleSearch}
            size='small'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: query && (
                <InputAdornment position='end'>
                  {loading ? (
                    <CircularProgress size={24} />
                  ) : (
                    <IconButton onClick={handleClear}>
                      <ClearIcon />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      ) : (
        <Tooltip title='Натисніть для пошуку'>
          <IconButton aria-label='пошук' color='primary' size='medium' onClick={() => setSearching(true)}>
            <SearchIcon />
          </IconButton>
        </Tooltip>
      )}
    </Stack>
  );
}
