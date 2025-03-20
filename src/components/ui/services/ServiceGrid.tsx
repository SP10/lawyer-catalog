'use client'

import React from 'react';
import { Maybe, Service } from '../../../../generated/graphql';
import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material';

const ServiceCard = ({ service }: { service: Maybe<Service> }) => {
    const [selectedCard, setSelectedCard] = React.useState<string|undefined>('');
    return (
        <Card elevation={6}>
            <CardActionArea
                onClick={() => setSelectedCard(service?.documentId)}
                href={`/poslugy/${service?.slug}`}
                data-active={selectedCard === service?.documentId ? '' : undefined}
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
                <CardContent sx={{ height: '100%', minHeight: '150px', textAlign: 'center' }}>
                    <Typography variant="h6" component="p">
                        {service?.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default function ServiceGrid({ services }: { services: Service[] }) {
    return (
        <Box
            sx={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
                gap: 2,
            }}
        >
            {services.map(item => (
               <ServiceCard service={item} key={item.documentId} />
            ))}
        </Box>
    )
}
