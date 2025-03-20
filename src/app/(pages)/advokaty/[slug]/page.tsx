import Layout from '@/components/layout';
import { getRegions } from '@/graphql/queries';
import { query } from '@/lib/apolloClient';
import { Region } from '../../../../../generated/graphql';
import React from 'react';
import { Container } from '@mui/material';
import BreadcrumbSlot, { Breadcrumb } from '@/components/ui/breadcrumbs';
import { Metadata, ResolvingMetadata } from 'next';
import UrlHelper from '@/helpers/url.helper';
import LawyerGrid from '@/components/ui/lawyers/LawyerGrid';

export const dynamic = 'force-dynamic';

type Props = {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    const slug = (await params).slug;
    // fetch data
    const response = await query({
        query: getRegions, variables: {
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

    const region = response && response.data.regions && response.data.regions.length > 0 ? response.data.regions[0] : {};
    const seo = region?.seo || null;

    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || []
    const imageUrl = seo?.shareImage ? UrlHelper.getImageUrl(seo?.shareImage) as string: '';

    return {
        title: seo?.metaTitle || region?.name,
        description: seo?.metaDescription,
        openGraph: {
            title: seo?.metaTitle,
            description: seo?.metaDescription,
            images: [imageUrl, ...previousImages],
            type: 'website'
        },
    }
}

const getData = async (slug: string): Promise<Region> => {
    const response = await query({
        query: getRegions, variables: {
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

    const data = response && response.data.regions && response.data.regions.length > 0 ? response.data.regions[0] : {};
    return data;
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string, url: { pathname: string } }> }) {
    const pathname = (await params).url?.pathname;
    const slug = (await params).slug;
    const region = await getData(slug);
    const lawyers = region && region.lawyers || [];

    const breadcrumbs: Breadcrumb[] = [
        {
            href: '/advokaty',
            children: 'Адвокати',
            readonly: false
        },
        {
            href: pathname,
            children: [region?.name],
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
