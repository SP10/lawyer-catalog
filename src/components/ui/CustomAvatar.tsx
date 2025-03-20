'use client'

import { Box } from '@mui/material';
import Image from 'next/image';

export default function CustomAvatar({ src, alt }: { src: string, alt: string }) {
    return (
        <Box
            sx={{
                position: 'relative',
                width: { xs: 60, md: 65, lg: 85 },
                height: { xs: 60, md: 65, lg: 85 },
                overflow: 'hidden',
                borderRadius: '50%',
                transition: 'transform 0.3s ease, border-radius 0.3s ease'
            }}
        >
            <Image
                src={src}
                alt={alt}
                fill
                style={{
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease', // Зробити так, щоб збільшення зображення було плавним
                }}
            />
        </Box>
    );
};
