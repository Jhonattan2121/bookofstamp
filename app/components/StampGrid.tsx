'use client'
import { Text, Spinner, Center, Image, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import StampCard from './stampCard';
import getStampsInfo from '../utils/getStampsInfo';
import { StampInfo } from '../utils/getStampsInfo';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface StampGridProps {
    stampIds: string[];
}

const StampGrid: React.FC<StampGridProps> = ({ stampIds }) => {
    const [stampData, setStampData] = useState<Record<string, StampInfo | null>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAllStampsInfo = async () => {
            try {
                const data: Record<string, StampInfo | null> = {};
                for (const stampId of stampIds) {
                    const info = await getStampsInfo(stampId);
                    data[stampId] = info ? info.data.stamp : null;
                }
                setStampData(data);
            } catch (err) {
                setError('Failed to fetch stamp information.');
            } finally {
                setLoading(false);
            }
        }
        fetchAllStampsInfo();
    }, [stampIds]);

    if (loading) {
        return (
            <Center mt={10}>
                <VStack>
                    <Image
                        src="https://www.gifcen.com/wp-content/uploads/2022/03/pepe-the-frog-gif-1.gif"
                        alt=""
                        boxSize="200px"
                    />
                    <Text fontSize="48px">Loading...</Text>
                </VStack>
            </Center>
        );
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <Slider {...settings}>
            {stampIds.map(stampId => (
                <div key={stampId}>
                    <StampCard stampId={stampId} stampInfo={stampData[stampId]} />
                </div>
            ))}
        </Slider>
    );
}

export default StampGrid;
