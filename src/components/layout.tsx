import { getGlobalData, getRegions, getServices } from '@/graphql/queries';
import { query } from '@/lib/apolloClient';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Global, Region, Service } from '../../generated/graphql';
import Navigation from './ui/navigation';
import Footer from './ui/footer';
import { Main } from './ui/main';
import { Box } from '@mui/material';

const getData = async (): Promise<Global> => {
    const response = await query({
        query: getGlobalData, variables: {}
    });

    const data = response && response.data.global;
    return data;
}

const getServiceData = async (): Promise<Service[]> => {
    const response = await query({
        query: getServices, variables: {
            pagination: {
                pageSize: 15
            }
        }
    });

    const data = response && response.data.services;
    return data;
}

const getRegionData = async (): Promise<Region[]> => {
    const response = await query({
        query: getRegions, variables: {
            pagination: {
                pageSize: 15
            }
        }
    });

    const data = response && response.data.regions;
    return data;
}


export default async function Layout({ children }: { children: React.ReactNode }) {
    const data = await getData();
    const gaId = data.gaId as string;

    const services = await getServiceData();
    const regions = await getRegionData();

    return (
        <Box>
            <Navigation data={data} />
            <Box id="back-to-top-anchor"></Box>
            <Main>
                {children}
            </Main>
            <Footer data={data} services={services} regions={regions} />
            <GoogleAnalytics gaId={gaId} />
        </Box>
    );
}