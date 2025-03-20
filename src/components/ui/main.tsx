'use client'

import { styled } from '@mui/material';
import React from 'react';

const StyledMain = styled('main')(({ theme }) => ({
    display: 'flex',
    marginTop: `calc(18 * ${theme.spacing()})`,
    marginBottom: `calc(18 * ${theme.spacing()})`,
    gap: `calc(4 * ${theme.spacing()})`
}));

export function Main({ children }: { children: React.ReactNode }) {

    return (
        <StyledMain>{children}</StyledMain>
    );
}