import { useEffect, useRef, useState } from 'react';
import { contentArray } from '../helper/exported_function';
import { motion, AnimatePresence } from 'framer-motion';

export default function StoryComponent() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timerKey, setTimerKey] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<number | null>(null);
  const [duration, setDuration] = useState(3);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleMetaDataLoaded = () => {
    if (contentArray[currentIndex].type === 'video') {
      const videoDuration = videoRef.current?.duration || 3;
      setDuration(videoDuration);
      setTimerKey((k) => k + 1); 
    }
  };

  useEffect(() => {
    if (isHovered) {
      timerRef.current = setTimeout(() => {
        handleNext();
      }, duration * 1000);
    };

    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isHovered, currentIndex, timerKey, duration]);

  const handleNext = () => {
    if (contentArray[(currentIndex + 1) % contentArray.length].type === 'image') {
    setDuration(3);
    } else {
      const videoDuration = videoRef.current?.duration || 3;  
      setDuration(videoDuration);
    }
    setCurrentIndex((prev) => (prev + 1) % contentArray.length);
    setTimerKey((k) => k + 1); 
  };

  return (
      <div className="w-72 h-128 rounded-xl bg-white shadow-lg overflow-hidden relative"
        onMouseEnter={() => {
          if (!isHovered ) {
            setIsHovered(true);
            setTimerKey((k) => k + 1); 
          }
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
          transition={{ duration: duration, ease: 'linear' }}
        />
      )}

        <AnimatePresence mode="wait">
          { contentArray[currentIndex].type === 'image' ?
          <motion.img
            key={contentArray[currentIndex].id}
            src={contentArray[currentIndex].image}
            alt="story"
            className="w-full h-full object-cover cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0}}
            onClick={handleNext}
          /> : 
          <motion.video
            ref={videoRef}
            key={contentArray[currentIndex].id}
            src={contentArray[currentIndex].video}
            className="w-full h-full object-cover cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0}}
            onClick={handleNext} 
            onLoadedMetadata={handleMetaDataLoaded}
            autoPlay
            muted 
          />
          }          
        </AnimatePresence>
      </div>
  )
};
