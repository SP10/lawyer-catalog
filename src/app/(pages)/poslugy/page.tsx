import Layout from '@/components/layout';
import { getServices } from '@/graphql/queries';
import { query } from '@/lib/apolloClient';
import { Service } from '../../../../generated/graphql';
import React from 'react';
import { Container, Typography } from '@mui/material';
import ServiceGrid from '@/components/ui/services/ServiceGrid';
import BreadcrumbSlot, { Breadcrumb } from '@/components/ui/breadcrumbs';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Послуги',
    description: 'Перелік послуг'
}

const getData = async (): Promise<Service[]> => {
    const response = await query({
        query: getServices, variables: {
            pagination: {
                pageSize: 40
            }
        }
    });

    const data = response && response.data.services;
    return data;
}

export default async function Services() {
    const services = await getData();

    const breadcrumbs: Breadcrumb[] = [
        {
            href: '/poslugy',
            children: 'Послуги',
            readonly: true
        }
    ];

    return (
        <Layout>
            <Container maxWidth="lg">
                <BreadcrumbSlot breadcrumbs={breadcrumbs} />
                <Typography variant="h2" component="p" gutterBottom>
                    Послуги
                </Typography>
                <ServiceGrid services={services} />
            </Container>
        </Layout>
    );
}
