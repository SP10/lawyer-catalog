import { MetadataRoute } from 'next';
import { getLawyers } from '@/graphql/queries';
import { query } from '@/lib/apolloClient';
import { Lawyer, Maybe, Region, Service } from './../../generated/graphql';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const { data } = await query({
        query: getLawyers,
        variables: {
            filters: {},
            pagination: {
                pageSize: 500,
            },
            sort: ['order:asc'],
        },
    });

    const lawyers: Lawyer[] = data.lawyers || [];

    return lawyers.flatMap((lawyer: Lawyer) => {
        const seo = lawyer.seo || {
            changefreq: 'monthly',
            priority: 0.5,
        };

        const changeFrequency = seo.changefreq as 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' | undefined;
        const priority = seo.priority as number;

        // Генеруємо URL для регіонів
        const regionUrls = (lawyer.regions || [])
            .flatMap((region: Maybe<Region>) =>
                region?.slug
                    ? [
                        {
                            url: `${process.env.HOST}/advokaty/${region.slug}/${lawyer.slug}`,
                            lastModified: lawyer.updatedAt ? new Date(lawyer.updatedAt).toISOString() : new Date().toISOString(),
                            changeFrequency,
                            priority,
                        },
                    ]
                    : []
            );

        // Генеруємо URL для послуг
        const serviceUrls = (lawyer.services || [])
            .flatMap((service: Maybe<Service>) =>
                service?.slug
                    ? [
                        {
                            url: `${process.env.HOST}/poslugy/${service.slug}/${lawyer.slug}`,
                            lastModified: lawyer.updatedAt ? new Date(lawyer.updatedAt).toISOString() : new Date().toISOString(),
                            changeFrequency,
                            priority,
                        },
                    ]
                    : []
            );

        return [...regionUrls, ...serviceUrls];
    });
}
