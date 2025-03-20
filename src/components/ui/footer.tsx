'use client'

import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
// import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// import FacebookIcon from '@mui/icons-material/GitHub';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import TwitterIcon from '@mui/icons-material/X';
import Logo from './logo';
import { Global, Region, Service } from '../../../generated/graphql';
import { Stack } from '@mui/material';


const Copyright = ({ siteName }: { siteName: string }) => {
    return (
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
            {'Всі права захищено © '}
            <Link color="text.secondary" href="/">
                {siteName}
            </Link>
            &nbsp;
            {new Date().getFullYear()}
        </Typography>
    );
}

export default function Footer({ data, services, regions }: { data: Global, services: Service[], regions: Region[] }) {
    return (
        <React.Fragment>
            <Divider />
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: { xs: 4, sm: 8 },
                    py: { xs: 8, sm: 10 },
                    textAlign: { sm: 'center', md: 'left' },
                }}
            >
                <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} spacing={2}
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        width: '100%',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 4,
                            minWidth: { xs: '100%', sm: '60%' },
                        }}
                    >
                        <Box sx={{ width: { xs: '100%', sm: '60%' } }}>
                            <Link href="/" sx={{ textDecoration: 'none' }}>
                                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
                                    <Logo />
                                    <Typography variant='body2' gutterBottom
                                        color="text.secondary"
                                        sx={{ display: 'flex', fontWeight: 600, mt: 2 }}>
                                        {data?.siteName}
                                    </Typography>
                                </Box>
                            </Link>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
                        }}
                    >
                        <Link color="text.primary" variant="body2" href="/lawyers" sx={{ fontWeight: 'medium', textDecoration: 'none' }}>
                            Послуги
                        </Link>
                        {services.map((service: Service) => (
                            <Link color="text.secondary" variant="body2" href={`/poslugy/${service.slug}`} sx={{ textDecoration: 'none'}} key={service.documentId}>
                                {service.name}
                            </Link>
                        ))}
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
                        }}
                    >
                        <Link color="text.primary" variant="body2" href="/lawyers" sx={{ fontWeight: 'medium', textDecoration: 'none' }}>
                            Адвокати
                        </Link>

                        {regions.map((region: Region) => (
                            <Link color="text.secondary" variant="body2" href={`/advokaty/${region.slug}`} sx={{ textDecoration: 'none'}} key={region.documentId}>
                                {region.name}
                            </Link>
                        ))}

                    </Box>
                </Stack>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        pt: { xs: 4, sm: 8 },
                        width: '100%',
                        borderTop: '1px solid',
                        borderColor: 'divider',
                    }}
                >
                    <div>
                        <Link color="text.secondary" variant="body2" href="/policy">
                            Політика конфіденційності
                        </Link>
                        <Copyright siteName={data.siteName} />
                    </div>
                    {/* <Stack
                        direction="row"
                        spacing={1}
                        useFlexGap
                        sx={{ justifyContent: 'left', color: 'text.secondary' }}
                    >
                        <IconButton
                            color="inherit"
                            size="small"
                            href="https://github.com/mui"
                            aria-label="GitHub"
                            sx={{ alignSelf: 'center' }}
                        >
                            <FacebookIcon />
                        </IconButton>
                        <IconButton
                            color="inherit"
                            size="small"
                            href="https://x.com/MaterialUI"
                            aria-label="X"
                            sx={{ alignSelf: 'center' }}
                        >
                            <TwitterIcon />
                        </IconButton>
                        <IconButton
                            color="inherit"
                            size="small"
                            href="https://www.linkedin.com/company/mui/"
                            aria-label="LinkedIn"
                            sx={{ alignSelf: 'center' }}
                        >
                            <LinkedInIcon />
                        </IconButton>
                    </Stack> */}
                </Box>
            </Container>
        </React.Fragment>
    );
}