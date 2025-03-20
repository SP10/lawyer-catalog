'use client'

import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import { useMediaQuery } from '@mui/material';
import theme from '@/theme';

export type Breadcrumb = {
    href: string;
    children: React.ReactNode;
    readonly: boolean;
}

const TextBreadcrumb = ({ breadcrumb }: { breadcrumb: Breadcrumb }) => {
    return (
        <Typography
            sx={{ color: 'text.primary', display: 'flex', alignItems: 'center' }}
        >
            {breadcrumb.children}
        </Typography>
    )
}

const LinkBreadcrumb = ({ breadcrumb }: { breadcrumb: Breadcrumb }) => {
    return (
        <Link
            underline="hover"
            sx={{ display: 'flex', alignItems: 'center' }}
            color="inherit"
            href={breadcrumb.href}
        >
            {breadcrumb.children}
        </Link>
    )
}

export default function BreadcrumbSlot({ breadcrumbs }: { breadcrumbs: Breadcrumb[] }) {
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <div role="presentation">
            <Breadcrumbs maxItems={isDesktop ? 6 : 3} aria-label="breadcrumb" sx={{ mb: '1rem' }}>
                <Link
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center' }}
                    color="inherit"
                    href="/"
                >
                    <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                </Link>
                {breadcrumbs.map((breadcrumb, index) => (
                    breadcrumb.readonly ? (
                        <TextBreadcrumb breadcrumb={breadcrumb} key={index} />
                    ) : (
                        <LinkBreadcrumb breadcrumb={breadcrumb} key={index} />
                    )
                ))}
            </Breadcrumbs>
        </div>
    );
}