'use client'
import { Box, Center, Image, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
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

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        lazyLoad: 'ondemand' as 'ondemand',

        autoplay: false,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: true,
                }
            },
            {
                breakpoint: 380,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,

                }
            }
        ]
    };

    return (
        <Box mx={8}>
            <Slider {...settings}>
                {stampIds.map((stampId) => (
                    <Box key={stampId}>
                        <StampCard stampId={stampId} />
                    </Box>
                ))}
            </Slider>
        </Box>
    );
}

export default StampGrid;
