'use client'

import React from 'react';
import { Region } from '../../../../generated/graphql';
import { Container, Fab, Typography } from '@mui/material';
import RegionGrid from '@/components/ui/regions/RegionGrid';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import BackToTop from '../button/BackTop';
import BreadcrumbSlot, { Breadcrumb } from '../breadcrumbs';


export default function LawyerPage({ regions }: { regions: Region[] }) {
    const breadcrumbs: Breadcrumb[] = [
        {
            href: '/advokaty',
            children: 'Адвокати',
            readonly: true
        }
    ];

    return (
        <React.Fragment>
            <Container maxWidth="lg">
                <BreadcrumbSlot breadcrumbs={breadcrumbs} />
                <Typography variant="h2" component="p" gutterBottom>Адвокати</Typography>
                <RegionGrid regions={regions} />
            </Container>
            <BackToTop>
                <Fab size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </BackToTop>
        </React.Fragment>
    )
}