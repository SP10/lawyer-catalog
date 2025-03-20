'use client';

import { Typography, Box, Button } from '@mui/material';
import NoResult from '../icon/NoResult';

export default function SearchResultNotFound() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center'
            }}

            role='alert'
        >
            <NoResult color="secondary" sx={{ mb: 2 }} />
            <Typography variant="h5" sx={{ marginBottom: "5px" }}>
                Результатів не знайдено
            </Typography>
            <Typography variant="subtitle2" component="p">
                Спробуйте змінити запит або використати інші ключові слова
            </Typography>
            <Button href='/' variant="outlined" size="large" sx={{ mt: 2 }} aria-label='Перейти на головну сторінку'>На головну</Button>
        </Box>
    );
}
