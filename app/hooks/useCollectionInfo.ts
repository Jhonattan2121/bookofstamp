// app/hooks/useCollectionInfo.ts
'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';

const useCollectionInfo = () => {
    const [collectionInfo, setCollectionInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCollectionInfo = async () => {
            try {
                const response = await axios.get('https://api.stamped.ninja/collection/book_of_stamp');
                if (response.status !== 200) {
                    throw new Error('Network response was not ok');
                }
                const data = response.data;
                setCollectionInfo(data);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCollectionInfo();
    }, []);

    return { collectionInfo, isLoading, error };
};

export default useCollectionInfo;
