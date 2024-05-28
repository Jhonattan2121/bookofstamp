"use client";
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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    document.body.style.cursor = 'none';

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        body, * {
          cursor: none !important;
        }
      `}</style>
      
      <div className={styles.cursor} style={{ left: `${position.x}px`, top: `${position.y}px`, position: 'absolute' }}>
        <Image src={cursorImage} alt="Custom Cursor" width={50} height={50} />
      </div>
    </>
  );
};

export default Cursor;
