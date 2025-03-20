'use client'

import React from 'react';
import { Lawyer, Maybe } from '../../../../generated/graphql';
import { Avatar, Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import UrlHelper from '@/helpers/url.helper';

export default function LawyerPreview({ lawyer }: { lawyer: Maybe<Lawyer> }) {

    const alt = lawyer?.photo?.alternativeText || lawyer?.photo?.caption || lawyer?.last_name;
    const imageUrl = lawyer?.photo ? UrlHelper.getImageUrl(lawyer?.photo) : undefined;

    return (
        <Card sx={{ display: 'flex', alignItems: 'center' }} variant='elevation'>
            <CardMedia sx={{ position: 'relative' }}>
                <Avatar
                    alt={alt}
                    src={imageUrl} // Key change here
                    sx={{ width: { sm: 56, md: 64 }, height: { sm: 56, md: 64 } }}
                />
            </CardMedia>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="subtitle2">
                        {lawyer?.last_name}
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        component="div"
                        sx={{ color: 'text.secondary' }}
                    >
                        {lawyer?.first_name} {lawyer?.surname}
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>

                </Box>
            </Box>
        </Card>
    )
}