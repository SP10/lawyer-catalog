'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSearch } from './SearchProvider';
import LawyerGrid from '../lawyers/LawyerGrid';
import RegionGrid from '../regions/RegionGrid';
import ServiceGrid from '../services/ServiceGrid';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`search-result-tabpanel-${index}`}
            aria-labelledby={`search-result-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

export default function SearchResults() {
    const { results } = useSearch();
    const [value, setValue] = React.useState(0);
    const isMobile = useMediaQuery('(max-width:600px)');

    const handleChange = (newValue: number) => {
        setValue(newValue);
    };

    const tabItems = [
        { label: `Адвокати (${results.lawyers.length})`, component: <LawyerGrid lawyers={results.lawyers} /> },
        { label: `Адвокати та послуги (${results.services.length})`, component: <ServiceGrid services={results.services} /> },
        { label: `Адвокати по регіонах (${results.regions.length})`, component: <RegionGrid regions={results.regions} /> }
    ];

    return (
        <Box sx={{ width: '100%' }}>
            {isMobile ? (
                <Stack spacing={1} sx={{ p: 2 }}>
                    {tabItems.map((tab, index) => (
                        <Chip
                            key={index}
                            label={tab.label}
                            onClick={() => handleChange(index)}
                            color={value === index ? 'primary' : 'default'}
                        />
                    ))}
                </Stack>
            ) : (
                <Tabs value={value} onChange={(_, newValue) => handleChange(newValue)} aria-label="Результати пошуку" variant='scrollable' scrollButtons allowScrollButtonsMobile>
                    {tabItems.map((tab, index) => (
                        <Tab key={index} label={tab.label} />
                    ))}
                </Tabs>
            )}
            {tabItems.map((tab, index) => (
                <CustomTabPanel key={index} value={value} index={index}>
                    {tab.component}
                </CustomTabPanel>
            ))}
        </Box>
    );
}
