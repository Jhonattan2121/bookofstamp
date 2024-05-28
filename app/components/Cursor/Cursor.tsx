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
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: { clientX: any; clientY: any; }) => {
      setPosition({ x: e.clientX - 14, y: e.clientY - 10 });
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

      <div className={styles.cursor} style={{ left: `${position.x - 12}px`, top: `${position.y - 15}px`, position: 'absolute' }}>
        <Image src={cursorImage} alt="Custom Cursor" width={60} />
      </div>
    </>
  );
};

export default Cursor;
