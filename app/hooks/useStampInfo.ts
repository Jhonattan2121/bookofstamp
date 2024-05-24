'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';

const useStampInfo = (stampId: string) => {
    const [stampData, setStampData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStampInfo = async () => {
            try {
                const response = await axios.get(`https://stampchain.io/api/stamps/${stampId}`);
                if (response.status !== 200) {
                    throw new Error('Failed to fetch stamp info');
                }
                setStampData(response.data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStampInfo();
    }, [stampId]); // Dependency array includes stampId to refetch if it changes

    return { stampData, loading, error };
};

export default useStampInfo;