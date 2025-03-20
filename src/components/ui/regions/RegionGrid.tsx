'use client'

import React from 'react';
import { Region, Maybe } from '../../../../generated/graphql';
import { Card, CardContent, Grid2 as Grid, Typography, CardActionArea } from '@mui/material';
import LawyerGrid2 from '../lawyers/LawyerGrid2';

const RegionCard = ({ region }: { region: Maybe<Region> }) => {
    const [selectedCard, setSelectedCard] = React.useState<string | undefined>('');
    return (
        <Card elevation={6}>
            <CardActionArea
                onClick={() => setSelectedCard(region?.documentId)}
                href={`/advokaty/${region?.slug}`}
                data-active={selectedCard === region?.documentId ? '' : undefined}
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
                <CardContent sx={{
                    height: '100%',
                    minHeight: '150px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Typography variant="h6" component="p" sx={{ textAlign: 'center' }}>
                        {region?.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default function RegionGrid({ regions }: { regions: Region[] }) {
    return (
        <Grid container spacing={2}>
            {regions.map(item => (
                <Grid size={12} key={item.documentId}>
                    <Typography variant='subtitle1' sx={{ marginBottom: '1rem' }}>{item.name}</Typography>
                    <Grid container spacing={1} key={item.documentId}>
                        {item.regions && item.regions.length > 0 ? (
                            item.regions.map(region => (
                                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={region?.documentId || `region-${item.documentId}-${region?.slug}`}>
                                    <RegionCard region={region} />
                                </Grid>
                            ))
                        ) : (
                            <Grid size={12}>
                                <LawyerGrid2 lawyers={item.lawyers} />
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            ))}
        </Grid>
    );
}