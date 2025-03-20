import { getRegions } from '@/graphql/queries';
import { query } from '@/lib/apolloClient';
import { Region } from '../../../../generated/graphql';
import React from 'react';
import LawyerPage from '@/components/ui/page/LawyerPage';
import Layout from '@/components/layout';

export const dynamic = 'force-dynamic';

const getData = async (): Promise<Region[]> => {
    const response = await query({
        query: getRegions, variables: {
            pagination: {
                pageSize: 500
            },
            filters: {
                is_parent: {
                    eq: true
                }
            }
        }
    });

    const data = response && response.data.regions;
    return data;
}

export default async function Lawyers({}: {
    params: Promise<unknown>
}) {
    const regions = await getData();

    return (
        <Layout>
            <LawyerPage regions={regions}/>
        </Layout>
    );
}
