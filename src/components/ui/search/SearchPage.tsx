'use client'

import { Box } from '@mui/material';
import { useSearch } from './SearchProvider';
import SearchResult from './SearchResult';
import SearchResultNotFound from './SearchResultNotFound';

export default function SearchPage() {
    const { results } = useSearch();
    const count: number = results.lawyers.length + results.services.length + results.regions.length;

    return (
        <Box sx={{my: 5}}>
            {count > 0 ? (<SearchResult />) : (<SearchResultNotFound />)}
        </Box>
    )
}