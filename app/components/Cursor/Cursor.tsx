"use client";
import { useMediaQuery } from '@chakra-ui/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import cursorImage from '../../../public/cursor.png';
import styles from './Cursor.module.css';

interface Position {
  x: number;
  y: number;
}

const Cursor = () => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setPosition((prev) => ({ ...prev }));
    };

    document.body.style.cursor = 'none';
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      document.body.style.cursor = 'auto';
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <style jsx global>{`
        body, * {
          cursor: none !important;
        }
      `}</style>

      <div
        className={styles.cursor}
        style={{
          left: `${position.x}px`,
          top: `${position.y + (typeof window !== 'undefined' ? window.scrollY : 0)}px`,
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none'
        }}
      >
        <Image src={cursorImage} alt="Custom Cursor" width={60} height={60} />
      </div>
    </>
  );
};

export default Cursor;
