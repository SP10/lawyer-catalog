import Layout from '@/components/layout';
import { Policy } from '../../../../generated/graphql';
import { query } from '@/lib/apolloClient';
import { getPolicy } from '@/graphql/queries';
import PolicyPage from '@/components/ui/page/PolicyPage';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';


const getData = async (): Promise<Policy> => {
    const response = await query({
        query: getPolicy
    });

    const data = response && response.data && response.data.policy;
    return data;
}

export async function generateMetadata(): Promise<Metadata> {
    const policy = await getData()
    const seo = policy?.seo || null;

    return {
        title: seo?.metaTitle || policy?.title,
        description: seo?.metaDescription,
        openGraph: {
            title: seo?.metaTitle,
            description: seo?.metaDescription,
            type: 'website'
        },
    }
}

export default async function Page() {
    const policy = await getData();

    return (
        <Layout>
            <PolicyPage policy={policy} />
        </Layout>
    );
}