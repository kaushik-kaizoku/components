import { useEffect, useRef, useState } from 'react';
import { contentArray } from '../helper/exported_function';
import { motion, AnimatePresence } from 'framer-motion';

export default function StoryComponent() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timerKey, setTimerKey] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isHovered) {
      timerRef.current = setTimeout(() => {
        handleNext();
      }, 3000);
    };

    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isHovered, currentIndex, timerKey]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % contentArray.length);
    setTimerKey((k) => k + 1); // Reset progress animation
  };

  return (
      <div className="w-72 h-128 rounded-xl bg-white shadow-lg overflow-hidden relative"
        onMouseEnter={() => {
          setIsHovered(true);
          setTimerKey((k) => k + 1); // Start animation fresh
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          if (timerRef.current !== null){
            clearTimeout(timerRef.current);
          }
        }}
      >
      {/* Progress bar */}
      { isHovered && (
        <motion.div
          key={timerKey}
          className="absolute top-0 left-0 h-1 bg-violet-500"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 3, ease: 'linear' }}
        />
      )}

        <AnimatePresence mode="wait">
          <motion.img
            key={contentArray[currentIndex].id}
            src={contentArray[currentIndex].image}
            alt="story"
            className="w-full h-full object-cover cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0}}
            onClick={handleNext}
          />
        </AnimatePresence>
      </div>
  )
};

