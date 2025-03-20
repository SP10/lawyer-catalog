'use client';

import { InputAdornment, IconButton, CircularProgress, Stack, Tooltip, Autocomplete, TextField, Typography, Box, ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useMemo, useState } from 'react';
import { useSearch } from '../search/SearchProvider';
import UrlHelper from '@/helpers/url.helper';


const getURL = (slug: string|undefined) => {
  return (`${process.env.NEXT_PUBLIC_HOST}/advokat/${slug}}`);
}

export default function SearchAutocomplete() {
  const [open, setOpen] = useState(false);
  const { query, setQuery, loading, searching, setSearching, results } = useSearch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClear = () => setQuery('');

  // Формуємо список адвокатів у категоріях
  const options = useMemo(() =>[
    ...(results.lawyers.length ? [{ category: 'Адвокати', count: results.lawyers.length, lawyers: results.lawyers }] : []),
    ...(results.services.length
      ? [{ category: 'Сервіси', count: results.services.length, lawyers: results.services.flatMap(service => service.lawyers || []) }]
      : []),
    ...(results.regions.length
      ? [{ category: 'Регіони', count: results.regions.length, lawyers: results.regions.flatMap(region => region.lawyers || []) }]
      : []),
  ], [results]).flatMap(group =>
    group.lawyers.map(lawyer => ({
      ...lawyer,
      category: group.category, // Додаємо категорію в кожен об'єкт
      count: group.count, // Додаємо кількість в кожен об'єкт
    }))
  );

  console.log(options);

  return (
    <Stack direction="row" spacing={2} width="100%">
      {searching ? (
        <Autocomplete
          fullWidth
          autoComplete
          open={open}
          onOpen={handleOpen}
          onClose={handleClose}
          options={options}
          getOptionLabel={(option) => (option?.last_name ? option.last_name : '')}
          groupBy={(option) => option.category}
          isOptionEqualToValue={(option, value) => option.documentId === value.documentId}
          noOptionsText="Нічого не знайдено"
          loadingText="Завантаження..."
          loading={loading}
          inputValue={query}
          onInputChange={(_, newInputValue) => {
            setQuery(newInputValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              size="small"
              variant="outlined"
              placeholder="Пошук..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              slotProps={{
                input: {
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      {loading ? (
                        <CircularProgress size={24} />
                      ) : (
                        query && (
                          <IconButton onClick={handleClear}>
                            <ClearIcon />
                          </IconButton>
                        )
                      )}
                    </InputAdornment>
                  ),
                }
              }}
            />
          )}
          renderOption={(props, option) => (
            <ListItem component="a" href={getURL(option?.slug)} key={option.documentId}>
              <ListItemAvatar>
                {option.photo ? (
                  <Avatar src={UrlHelper.getImageUrl(option.photo)} alt={option.last_name} />
                ) : (
                  <Avatar>{option.last_name ? option.last_name[0] : '?'}</Avatar>
                )}
              </ListItemAvatar>
              <ListItemText primary={option.last_name} secondary={option.first_name} />
            </ListItem>
          )}
          renderGroup={(params) => (
            <Box key={params.key}>
              <Typography variant="subtitle2" sx={{ pl: 2, pt: 1, pb: 0.5, fontWeight: 'bold', bgcolor: '#f5f5f5' }}>
                {params.group}
              </Typography>
              {params.children}
            </Box>
          )}
        />
      ) : (
        <Tooltip title="Натисніть для пошуку">
          <IconButton aria-label="пошук" color="primary" size="medium" onClick={() => setSearching(true)}>
            <SearchIcon />
          </IconButton>
        </Tooltip>
      )}
    </Stack>
  );
}
