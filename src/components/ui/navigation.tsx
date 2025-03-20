'use client'

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Logo from './logo';
import { Global } from '../../../generated/graphql';
import { Fade, Paper, Stack, Tooltip, Typography } from '@mui/material';
import Link from 'next/link';
import Search from '@/components/ui/input/Search';
import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { useSearch } from './search/SearchProvider';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
    boxShadow: theme.shadows[4],
    backdropFilter: 'blur(24px)',
    border: '0.1px solid',
    padding: '8px 12px',
}));

export default function Navigation({ data }: { data: Global }) {
    const [open, setOpen] = React.useState(false);
    const { searching, setSearching } = useSearch();

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    boxShadow: 0,
                    bgcolor: 'background.paper',
                    mt: 'calc(var(--template-frame-height, 0px) + 28px)',
                }}
            >
                <Container maxWidth="lg">
                    <StyledToolbar variant="dense" disableGutters>
                        <Link href="/">
                            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
                                <Logo />
                                <Typography variant='body2' gutterBottom
                                    color="text.secondary"
                                    sx={{ display: { xs: 'none', md: 'flex' }, fontWeight: 600, mt: 2 }}>
                                    {data?.siteName}
                                </Typography>
                            </Box>
                        </Link>

                        <Box
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                gap: 1,
                                alignItems: 'center',
                            }}
                        >
                            <Button variant="text" size="small" href='/poslugy'>
                                Послуги
                            </Button>
                            <Button variant="text" size="small" href='/advokaty'>
                                Адвокати
                            </Button>
                        </Box>

                        <Stack direction='row' spacing={2} sx={{ display: { xs: 'none', md: 'flex' } }} width={searching ? '30%' : 'auto'}>
                            <Search />

                            {searching && (
                                <Button
                                    variant='text'
                                    color='primary'
                                    onClick={() => setSearching(false)}
                                    sx={{ textTransform: 'none', typography: 'body2', alignSelf: 'flex-end', paddingBottom: '4px' }}
                                >
                                    відмінити
                                </Button>
                            )}

                        </Stack>


                        <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
                            <Tooltip title='Натисніть для пошуку'>
                                <IconButton aria-label='пошук' color='primary' size='medium' onClick={() => setSearching(true)}>
                                    <SearchIcon />
                                </IconButton>
                            </Tooltip>
                            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
                                <MenuIcon />
                            </IconButton>
                            <Drawer
                                anchor="top"
                                open={open}
                                onClose={toggleDrawer(false)}
                                PaperProps={{ sx: {} }}
                            >
                                <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                        }}
                                    >
                                        <IconButton onClick={toggleDrawer(false)}>
                                            <CloseRoundedIcon />
                                        </IconButton>
                                    </Box>

                                    <MenuItem>Послуги</MenuItem>
                                    <MenuItem>Адвокати</MenuItem>
                                    <Divider sx={{ my: 3 }} />
                                </Box>
                            </Drawer>
                        </Box>
                    </StyledToolbar>
                </Container>
            </AppBar>

            {/* Плаваючий пошуковий бар */}
            <Fade in={searching} timeout={300}>
                <Paper
                    sx={{
                        position: 'fixed',
                        top: 110,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        borderRadius: 25,
                        py: 1,
                        px: 2,
                        width: '90%',
                        boxShadow: 4,
                        zIndex: 1300,
                        display: { xs: 'flex', md: 'none' }
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <Search />
                        <IconButton onClick={() => setSearching(false)}>
                            <SearchOffIcon />
                        </IconButton>
                    </Box>
                </Paper>
            </Fade>
        </>
    );
}
