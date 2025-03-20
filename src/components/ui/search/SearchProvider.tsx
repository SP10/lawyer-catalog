'use client'

import { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import { Lawyer, Region, Service } from '../../../../generated/graphql';

export type SearchResultType = {
    lawyers: Lawyer[];
    services: Service[];
    regions: Region[];
};

interface SearchContextType {
    query: string;
    setQuery: (query: string) => void;
    loading: boolean;
    results: SearchResultType;
    searching: boolean;
    setSearching: (searching: boolean) => void;
    setLoading: (loading: boolean) => void;
    setResults: (results: SearchResultType) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

const getSearchResults = async (query: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/search?name=${query}`);
    const data = await response.json();
    return data;
};

export function SearchProvider({ children }: { children: ReactNode }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResultType>({ lawyers: [], services: [], regions: [] });
    const [loading, setLoading] = useState(false);
    const [searching, setSearching] = useState(false);

    useEffect(() => {
        if (!query) {
            setResults({ lawyers: [], services: [], regions: [] });
            return;
        }

        const delayDebounce = setTimeout(() => {
            setLoading(true);
            getSearchResults(query).then((data) => {
                setLoading(false);
                setResults(data);
            });
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [query]);

    return (
        <SearchContext.Provider value={{ query, setQuery, loading, results, searching, setLoading, setSearching, setResults }}>
            {children}
        </SearchContext.Provider>
    );
}

export function useSearch() {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
}
