'use client';

import React from 'react';
import { Grid2 as Grid, Typography } from '@mui/material';
import SearchResults from './SearchResults';
import { useSearch } from './SearchProvider';

const getResultsWord = (count: number): string =>  {
    if (count === 1) {
      return 'результат';
    }

    if (count > 1 && count < 5) {
      return 'результати';
    }

    return 'результатів';
  }
  

export default function SearchResult() {
    const { results, query } = useSearch();
    const count: number = results.lawyers.length + results.services.length + results.regions.length;

    return (
        <Grid container spacing={2}>
            <Grid size={12}>
                <Typography variant="h5" sx={{ marginBottom: "5px" }}>Усі результати</Typography>
                <Typography variant="subtitle2" component='p'>{`${count} ${getResultsWord(count)} знайдено для '${query}'`}</Typography>
            </Grid>
            <Grid size={12}>
                <SearchResults />
            </Grid>
        </Grid>
    );
}