'use client'

import React, { useState } from 'react';
import { Lawyer, Maybe } from '../../../../generated/graphql';
import { Avatar, Box, Button, Container, Typography, IconButton, Snackbar, Stack } from '@mui/material';
import { Facebook, Instagram, Telegram, WhatsApp, ContentCopy } from '@mui/icons-material';
import UrlHelper from '@/helpers/url.helper';
import Image from 'next/image';
import Viber from '../icon/Viber';

export default function LawyerDetailPage({ lawyer }: { lawyer: Maybe<Lawyer> }) {

    const imageUrl = lawyer?.photo ? UrlHelper.getImageUrl(lawyer?.photo) as string : undefined;
    const alt = (lawyer?.photo?.alternativeText || lawyer?.photo?.caption || lawyer?.last_name) as string;
    const showSocialButton = lawyer?.telegram || lawyer?.viber || lawyer?.instagram || lawyer?.whatsapp && lawyer.facebook;

    const [copySuccess, setCopySuccess] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    // Function to copy text to clipboard
    const copyToClipboard = (text?: string | null | undefined) => {
        if (text) {
            navigator.clipboard.writeText(text)
                .then(() => {
                    setCopySuccess('Cкопійовано!');
                    setOpenSnackbar(true);  // Show the snackbar
                })
                .catch(() => {
                    setCopySuccess('Помилка копіювання');
                    setOpenSnackbar(true);
                });
        }
    };

    // Handle closing the snackbar
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Container maxWidth="md" sx={{ my: 6 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* Lawyer Avatar with hover effect */}
                {imageUrl ? (
                    <Box
                        sx={{
                            position: 'relative',
                            width: { xs: 150, md: 180, lg: 220 },
                            height: { xs: 150, md: 180, lg: 220 },
                            overflow: 'hidden', // Забезпечує, що частини зображення, які виходять за межі контейнера, будуть приховані
                            borderRadius: '50%', // За замовчуванням кругла форма
                            transition: 'transform 0.3s ease, border-radius 0.3s ease', // Анімація при зміні
                            '&:hover': {
                                transform: 'scale(1.2)', // Збільшення зображення
                                borderRadius: '0%', // При наведенні зникає круглість
                            },
                        }}
                    >
                        <Image
                            src={imageUrl}
                            alt={alt}
                            fill
                            style={{
                                objectFit: 'cover',
                                transition: 'transform 0.3s ease', // Зробити так, щоб збільшення зображення було плавним
                            }}
                        />
                    </Box>
                ) : (
                    <Avatar sx={{
                        width: { xs: 150, md: 180, lg: 220 },
                        height: { xs: 150, md: 180, lg: 220 }, bgcolor: 'grey.500'
                    }} />
                )}

                {/* Lawyer Info */}
                <Box sx={{ mt: 2, width: '100%' }}>
                    <Stack direction='column' spacing={2}>
                        <Box>
                            <Typography variant='h5' gutterBottom>
                                {lawyer?.last_name}
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                                {lawyer?.first_name} {lawyer?.surname}
                            </Typography>
                        </Box>

                        {/* Contact Info */}
                        <Stack direction='column' spacing={1}>
                            {lawyer?.phone_number && (
                                <Stack direction='row' spacing={2}>
                                    <Stack direction={{ sm: 'column', md: 'row' }} sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Typography component='p' variant="body2" color="textSecondary" sx={{ mr: 1 }}>
                                            Номер телефону:
                                        </Typography>
                                        <a href={`tel:${lawyer.phone_number}`} style={{ textDecoration: 'none' }}>
                                            <Typography variant="body2" color="primary">{lawyer.phone_number}</Typography>
                                        </a>
                                    </Stack>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <IconButton onClick={() => copyToClipboard(lawyer?.phone_number)} size="small" title='cкопіювати номер телефону'>
                                            <ContentCopy fontSize="small" />
                                        </IconButton>
                                    </Box>
                                </Stack>
                            )}
                            {lawyer?.email && (
                                <Stack direction='row' spacing={2}>
                                    <Stack direction={{ sm: 'column', md: 'row' }} sx={{ display: 'flex', alignItems: 'left' }}>
                                        <Typography component='p' variant="body2" color="textSecondary" sx={{ mr: 1 }}>
                                            Email:
                                        </Typography>
                                        <a href={`mailto:${lawyer.email}`} style={{ textDecoration: 'none' }}>
                                            <Typography variant="body2" color="primary">{lawyer.email}</Typography>
                                        </a>
                                    </Stack>
                                    <IconButton onClick={() => copyToClipboard(lawyer?.email)} size="small" title='cкопіювати email'>
                                        <ContentCopy fontSize="small" />
                                    </IconButton>
                                </Stack>
                            )}
                        </Stack>

                        {/* Services */}
                        <Box>
                            {lawyer?.services?.length ? (
                                <Box>
                                    <Typography variant="h6">Послуги</Typography>
                                    <ul>
                                        {lawyer.services.map((service, index) => (
                                            <li key={index}>
                                                <Typography variant="body2" color="textSecondary">
                                                    {service?.name}
                                                </Typography>
                                            </li>
                                        ))}
                                    </ul>
                                </Box>
                            ) : (
                                <Box>
                                    <Typography variant="h6">Послуги</Typography>
                                    <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>Відсутні послуги</Typography>
                                </Box>
                            )}
                        </Box>

                        {/* Social Media Links with Icons */}
                        <Box>
                            {showSocialButton && (<Typography variant="h6">Соціальні мережі</Typography>)}
                            <Box
                                sx={{
                                    width: '100%',
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 2fr))',
                                    gap: 2,
                                    mt: 2
                                }}
                            >
                                {lawyer?.facebook && (
                                    <Button
                                        variant="outlined"
                                        component="a"
                                        href={lawyer.facebook}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label='Facebook'
                                        startIcon={<Facebook />}
                                    >
                                        Facebook
                                    </Button>
                                )}
                                {lawyer?.instagram && (
                                    <Button
                                        variant="outlined"
                                        component="a"
                                        href={lawyer.instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label='Instagram'
                                        startIcon={<Instagram />}
                                    >
                                        Instagram
                                    </Button>
                                )}
                                {lawyer?.telegram && (
                                    <Button
                                        variant="outlined"
                                        component="a"
                                        href={lawyer.telegram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label='Telegram'
                                        startIcon={<Telegram />}
                                    >
                                        Telegram
                                    </Button>
                                )}
                                {lawyer?.whatsapp && (
                                    <Button
                                        variant="outlined"
                                        component="a"
                                        href={lawyer.whatsapp}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label='WhatsApp'
                                        startIcon={<WhatsApp />}
                                    >
                                        WhatsApp
                                    </Button>
                                )}
                                {lawyer?.viber && (
                                    <Button
                                        variant="outlined"
                                        component="a"
                                        href={lawyer.viber}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label='Viber'
                                        startIcon={<Viber />}
                                    >
                                        Viber
                                    </Button>
                                )}
                            </Box>
                        </Box>
                    </Stack>
                </Box>
            </Box>

            {/* Snackbar for copy success */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000} // Snackbar will auto-hide after 3 seconds
                onClose={handleCloseSnackbar}
                message={copySuccess}
                anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
            />
        </Container>
    );
}
