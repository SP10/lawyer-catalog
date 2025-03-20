import Layout from '@/components/layout';
import SearchPage from '@/components/ui/search/SearchPage';
import { Container } from '@mui/material';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Пошук',
    description: 'Результати пошуку на сайті. Знайдіть потрібну інформацію швидко та зручно.',
    openGraph: {
        title: 'Пошук - Результати',
        description: 'Перегляньте результати пошуку та знайдіть потрібну інформацію.',
        url:   `${process.env.HOST}/search`,
        type: 'website'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Пошук - Результати',
        description: 'Перегляньте результати пошуку та знайдіть потрібну інформацію.',
    }
}

export default function SearchResultPage() {
    return (
        <Layout>
            <Container maxWidth="lg">
                <SearchPage />
            </Container>
        </Layout>
    )
}