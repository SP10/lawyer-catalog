import Layout from '@/components/layout';
import { getLawyers, getRegions } from '@/graphql/queries';
import { query } from '@/lib/apolloClient';
import { Lawyer, Region } from '../../../../../../generated/graphql';
import React from 'react';
import { Container } from '@mui/material';
import BreadcrumbSlot, { Breadcrumb } from '@/components/ui/breadcrumbs';
import LawyerDetailPage from '@/components/ui/lawyers/LawyerDetailPage';
import { Metadata, ResolvingMetadata } from 'next';
import UrlHelper from '@/helpers/url.helper';
import CallMe from '@/components/ui/button/CallMe';

export const dynamic = 'force-dynamic';

type Props = {
    params: Promise<{ advokat: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    const slug = (await params).advokat;
    // fetch data
    const response = await query({
        query: getLawyers, variables: {
            filters: {
                slug: {
                    eq: slug
                },
            },
            pagination: {
                limit: 1
            }
        }
    });

    const lawyer = response && response.data.lawyers.length > 0 ? response.data.lawyers[0] : {};
    const seo = lawyer?.seo || null;

    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || []
    const imageUrl = UrlHelper.getImageUrl(seo?.shareImage) as string;

    return {
        title: seo?.metaTitle,
        description: seo?.metaDescription,
        openGraph: {
            title: seo?.metaTitle,
            description: seo?.metaDescription,
            images: [imageUrl, ...previousImages],
            type: 'website'
        },
    }
}

const getLawyerData = async (slug: string): Promise<Lawyer> => {
    const response = await query({
        query: getLawyers, variables: {
            filters: {
                slug: {
                    eq: slug
                }
            },
            pagination: {
                limit: 1
            }
        }
    });

    const data = response && response.data && response.data.lawyers && response.data.lawyers[0];
    return data;
}

const getRegionData = async (slug: string): Promise<Region> => {
    const response = await query({
        query: getRegions, variables: {
            filters: {
                slug: {
                    eq: slug
                }
            },
            pagination: {
                limit: 1
            }
        }
    });

    const data = response && response.data && response.data.regions && response.data.regions[0];
    return data;
}

export default async function LawyerPage({ params }: { 
    params: Promise<{ slug: string, advokat: string, url: { pathname: string } }> 
}) {
    const pathname = (await params).url?.pathname;
    const slug = (await params).slug;
    const advokat = (await params).advokat;

    const lawyer = await getLawyerData(advokat);
    const region = await getRegionData(slug);

    const breadcrumbs: Breadcrumb[] = [
        {
            href: '/advokaty',
            children: 'Адвокати',
            readonly: false
        },
        {
            href: `/advokaty/${slug}`,
            children: region?.name,
            readonly: false
        },
        {
            href: pathname,
            children: [lawyer?.first_name, lawyer?.last_name].join(' '),
            readonly: true
        }
    ];

    // JSON-LD Schema for Lawyer
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": `${lawyer.first_name} ${lawyer.last_name}`,
        "jobTitle": "Адвокат",
        "url": `${process.env.HOST}/advokaty/${slug}/${advokat}`,
        "image": lawyer && lawyer.photo && UrlHelper.getImageUrl(lawyer?.photo),
        "telephone": lawyer?.phone_number,
        "sameAs": [], // You can add the lawyer's social media profiles here
        "address": {
            "@type": "PostalAddress",
            "streetAddress": lawyer?.address, // Assuming the lawyer has an office address field
            "addressLocality": lawyer?.city?.name,
            "addressCountry": 'Україна'
        }
    };

    return (
        <Layout>
            <Container maxWidth="lg">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <BreadcrumbSlot breadcrumbs={breadcrumbs} />
                <LawyerDetailPage lawyer={lawyer} />
                <CallMe phoneNumber={lawyer.phone_number} />
            </Container>
        </Layout>
    );
}
