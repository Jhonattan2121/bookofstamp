'use client'
import { Box, Center, Image, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import StampCard from './stampCard';

interface StampGridProps {
    stampIds: string[];
}

const StampGrid: React.FC<StampGridProps> = ({ stampIds }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <Center mt={10}>
                <VStack>
                    <Image
                        src="https://www.gifcen.com/wp-content/uploads/2022/03/pepe-the-frog-gif-1.gif"
                        alt="Loading..."
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

    return (
        <Box zIndex={0} mx={8}>
            <Swiper
                spaceBetween={30}
                slidesPerView={3}
                autoplay={{ delay: 3000 }}
                effect={'coverflow'}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={{ clickable: true }}
                modules={[EffectCoverflow]}

                breakpoints={{
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    600: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    380: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                }}
            >
                {stampIds.map((stampId) => (
                    <SwiperSlide key={stampId}>
                        <StampCard stampId={stampId} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    );
}

export default StampGrid;
