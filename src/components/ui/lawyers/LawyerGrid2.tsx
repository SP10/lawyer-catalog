'use client'

import React from 'react';
import { Lawyer, Maybe } from '../../../../generated/graphql';
import { Card, CardContent, Grid2 as Grid, Typography, CardActionArea, Avatar, Skeleton } from '@mui/material';
import UrlHelper from '@/helpers/url.helper';
import dynamic from 'next/dynamic';

const CustomAvatar = dynamic(() => import('../CustomAvatar'), {
    loading: () => <Skeleton variant="rectangular" animation='wave' width={60} height={60} />,
  })

const LawyerCard = ({ lawyer, parent }: { lawyer: Maybe<Lawyer>, parent: { slug: string } }) => {
    const [selectedCard, setSelectedCard] = React.useState<string | undefined>('');

    const imageUrl = lawyer?.photo ? UrlHelper.getImageUrl(lawyer?.photo) : undefined;

    return (
        <Card elevation={6} sx={{ height: '100%' }}>
            <CardActionArea
                onClick={() => setSelectedCard(lawyer?.documentId)}
                href={`${parent.slug}/${lawyer?.slug}`}
                data-active={selectedCard === lawyer?.documentId ? '' : undefined}
                sx={{
                    height: '100%',
                    '&[data-active]': {
                        backgroundColor: 'action.selected',
                        '&:hover': {
                            backgroundColor: 'action.selectedHover',
                        },
                    },
                }}
            >
                <CardContent sx={{ height: '100%', minHeight: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>

                    {imageUrl ? (
                        <CustomAvatar src={imageUrl} alt={lawyer?.last_name || ''} />
                    ) : (
                        <Avatar sx={{
                            width: { xs: 60, md: 65, lg: 75 },
                            height: { xs: 60, md: 65, lg: 75 },
                        }}>{lawyer?.last_name?.charAt(0).toUpperCase() || ''}</Avatar>
                    )}
                    <Typography variant="h6" component="p">
                        {lawyer?.last_name} {lawyer?.first_name}
                    </Typography>
                    {lawyer?.surname && (
                        <Typography variant="h6" component="p">
                            {lawyer?.surname}
                        </Typography>
                    )}
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default function LawyerGrid2({ lawyers = [], params }: { lawyers: Maybe<Lawyer>[], params?: { slug: string } }) {
    if (lawyers && lawyers.length < 1) {
        return;
    }

    const parent = params?.slug ? {
        slug: params.slug
    } : { slug: '' };

    return (
        <Grid container spacing={2}>
            {lawyers.map(lawyer => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} 
                    key={lawyer?.documentId || `lawyer-${lawyer?.documentId}-${lawyer?.slug}`}
                >
                    <LawyerCard lawyer={lawyer} parent={parent} />
                </Grid>
            ))}
        </Grid>
    )
}
