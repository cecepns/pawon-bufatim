import { useState, useEffect } from 'react';
import { getImageUrl } from '../utils/imageUtils';

/**
 * Custom hook for handling image loading states
 * @param {string} imageUrl - The image URL to load
 * @param {Object} options - Options for the hook
 * @param {boolean} options.preload - Whether to preload the image
 * @param {Function} options.onLoad - Callback when image loads
 * @param {Function} options.onError - Callback when image fails to load
 * @returns {Object} - Image loading state and utilities
 */
export const useImageLoader = (imageUrl, options = {}) => {
  const [imageState, setImageState] = useState({
    loaded: false,
    error: false,
    src: null
  });

  const { preload = true, onLoad, onError } = options;

  useEffect(() => {
    if (!imageUrl) {
      setImageState({
        loaded: false,
        error: true,
        src: null
      });
      return;
    }

    if (!preload) {
      setImageState({
        loaded: false,
        error: false,
        src: getImageUrl(imageUrl)
      });
      return;
    }

    // Reset state when imageUrl changes
    setImageState({
      loaded: false,
      error: false,
      src: null
    });

    const img = new Image();
    
    const handleLoad = () => {
      setImageState({
        loaded: true,
        error: false,
        src: getImageUrl(imageUrl)
      });
      if (onLoad) onLoad();
    };

    const handleError = () => {
      setImageState({
        loaded: false,
        error: true,
        src: null
      });
      if (onError) onError();
    };

    img.onload = handleLoad;
    img.onerror = handleError;
    img.src = getImageUrl(imageUrl);

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imageUrl, preload, onLoad, onError]);

  return {
    ...imageState,
    isLoading: !imageState.loaded && !imageState.error,
    hasError: imageState.error,
    isLoaded: imageState.loaded
  };
};

export default useImageLoader;
