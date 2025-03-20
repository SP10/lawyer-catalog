'use client'

import React from 'react';
import { Policy } from '../../../../generated/graphql';
import { Container, Fab, Typography } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import BackToTop from '../button/BackTop';
import BreadcrumbSlot, { Breadcrumb } from '../breadcrumbs';


export default function PolicyPage({ policy }: { policy: Policy }) {
    const breadcrumbs: Breadcrumb[] = [
        {
            href: '/policy',
            children: policy.title,
            readonly: true
        }
    ];

    return (
        <React.Fragment>
            <Container maxWidth="lg">
                <BreadcrumbSlot breadcrumbs={breadcrumbs} />
                <Typography variant="h2" component="p" gutterBottom>{policy.title}</Typography>
                {policy.content && (<div dangerouslySetInnerHTML={{ __html: policy.content }} />)}
            </Container>
            <BackToTop>
                <Fab size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </BackToTop>
        </React.Fragment>
    )
}