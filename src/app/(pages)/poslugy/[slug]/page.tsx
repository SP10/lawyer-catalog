import Layout from '@/components/layout';
import { getServices } from '@/graphql/queries';
import { query } from '@/lib/apolloClient';
import { Service } from '../../../../../generated/graphql';
import React from 'react';
import { Container } from '@mui/material';
import BreadcrumbSlot, { Breadcrumb } from '@/components/ui/breadcrumbs';
import LawyerGrid from '@/components/ui/lawyers/LawyerGrid';
import UrlHelper from '@/helpers/url.helper';
import { Metadata, ResolvingMetadata } from 'next';

export const dynamic = 'force-dynamic';

type Props = {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    const slug = (await params).slug;
    // fetch data
    const response = await query({
        query: getServices, variables: {
            pagination: {
                limit: 1
            },
            filters: {
                slug: {
                    eq: slug
                }
            }
        }
    });

    const service = response && response.data.services && response.data.services.length > 0 ? response.data.services[0] : {};
    const seo = service?.seo || null;

    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || []
    const imageUrl = seo?.shareImage ? UrlHelper.getImageUrl(seo?.shareImage) as string: '';

    return {
        title: seo?.metaTitle || service?.name,
        description: seo?.metaDescription,
        openGraph: {
            title: seo?.metaTitle,
            description: seo?.metaDescription,
            images: [imageUrl, ...previousImages],
            type: 'website'
        },
    }
}

const getData = async (slug: string): Promise<Service> => {
    const response = await query({
        query: getServices, variables: {
            filters: {
                slug: {
                    eq: slug
                }
            },
            pagination: {
                limit: 1,
                page: null,
                pageSize: null,
                start: null
            }
        }
    });

    const data = response && response.data && response.data.services[0];
    return data;
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string, url: { pathname: string } }> }) {
    const pathname = (await params).url?.pathname;
    const slug = (await params).slug
    const service = await getData(slug);

    const lawyers = service && service.lawyers || [];

    const breadcrumbs: Breadcrumb[] = [
        {
            href: '/poslugy',
            children: 'Послуги',
            readonly: false
        },
        {
            href: pathname,
            children: [service?.name],
            readonly: true
        }
    ];

    return (
        <Layout>
            <Container maxWidth="lg">
                <BreadcrumbSlot breadcrumbs={breadcrumbs} />
                <LawyerGrid lawyers={lawyers} params={{ slug: slug }} />
            </Container>
        </Layout>
    );
}
