/**
 * Image utility functions for handling product images
 */

// Default placeholder image
const PLACEHOLDER_IMAGE = "/placeholder-product.svg";

// API base URL for images
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Get the full image URL for a product
 * @param {string} imageUrl - The image URL from the API
 * @param {string} fallback - Fallback image path (optional)
 * @returns {string} - Complete image URL
 */
export const getImageUrl = (imageUrl, fallback = PLACEHOLDER_IMAGE) => {
  // If no image URL provided, return fallback
  if (!imageUrl) {
    return fallback;
  }

  // If image URL is already a complete URL, return as is
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }

  // If image URL starts with /uploads, construct full URL
  if (imageUrl.startsWith('/uploads/')) {
    return `${API_BASE_URL}${imageUrl}`;
  }

  // If image URL doesn't start with /, add /uploads prefix
  if (!imageUrl.startsWith('/')) {
    return `${API_BASE_URL}/uploads/${imageUrl}`;
  }

  // Default case: prepend API base URL
  return `${API_BASE_URL}${imageUrl}`;
};

/**
 * Get optimized image URL with size parameters
 * @param {string} imageUrl - The image URL from the API
 * @param {Object} options - Image optimization options
 * @param {number} options.width - Desired width
 * @param {number} options.height - Desired height
 * @param {string} options.quality - Image quality (1-100)
 * @param {string} fallback - Fallback image path
 * @returns {string} - Optimized image URL
 */
export const getOptimizedImageUrl = (imageUrl, options = {}, fallback = PLACEHOLDER_IMAGE) => {
  const baseUrl = getImageUrl(imageUrl, fallback);
  
  // If it's a placeholder, return as is
  if (baseUrl === fallback) {
    return baseUrl;
  }

  // For now, return the base URL
  // In the future, you can add image optimization service integration
  // like Cloudinary, ImageKit, or AWS CloudFront
  return baseUrl;
};

/**
 * Get thumbnail image URL
 * @param {string} imageUrl - The image URL from the API
 * @param {string} fallback - Fallback image path
 * @returns {string} - Thumbnail image URL
 */
export const getThumbnailUrl = (imageUrl, fallback = PLACEHOLDER_IMAGE) => {
  return getOptimizedImageUrl(imageUrl, { width: 300, height: 300, quality: 80 }, fallback);
};

/**
 * Get large image URL for detail pages
 * @param {string} imageUrl - The image URL from the API
 * @param {string} fallback - Fallback image path
 * @returns {string} - Large image URL
 */
export const getLargeImageUrl = (imageUrl, fallback = PLACEHOLDER_IMAGE) => {
  return getOptimizedImageUrl(imageUrl, { width: 800, height: 600, quality: 90 }, fallback);
};

/**
 * Check if image URL is valid
 * @param {string} imageUrl - The image URL to check
 * @returns {boolean} - Whether the image URL is valid
 */
export const isValidImageUrl = (imageUrl) => {
  if (!imageUrl) return false;
  
  // Check if it's a valid URL or path
  const urlPattern = /^(https?:\/\/|\/)/;
  return urlPattern.test(imageUrl);
};

/**
 * Get image alt text for accessibility
 * @param {string} productName - Product name
 * @param {string} categoryName - Category name (optional)
 * @returns {string} - Alt text for the image
 */
export const getImageAltText = (productName, categoryName = '') => {
  if (categoryName) {
    return `${productName} - ${categoryName} dari Pawon Bufatim`;
  }
  return `${productName} dari Pawon Bufatim`;
};

/**
 * Preload image for better performance
 * @param {string} imageUrl - The image URL to preload
 * @returns {Promise} - Promise that resolves when image is loaded
 */
export const preloadImage = (imageUrl) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${imageUrl}`));
    img.src = getImageUrl(imageUrl);
  });
};

/**
 * Get image dimensions from URL (if available)
 * @param {string} imageUrl - The image URL
 * @returns {Promise<{width: number, height: number}>} - Image dimensions
 */
export const getImageDimensions = (imageUrl) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight
      });
    };
    img.onerror = () => reject(new Error(`Failed to load image: ${imageUrl}`));
    img.src = getImageUrl(imageUrl);
  });
};

/**
 * Generate responsive image srcset
 * @param {string} imageUrl - Base image URL
 * @param {Array} sizes - Array of sizes for responsive images
 * @returns {string} - Srcset string for responsive images
 */
export const generateSrcSet = (imageUrl, sizes = [300, 600, 900, 1200]) => {
  if (!imageUrl) return '';
  
  return sizes
    .map(size => `${getOptimizedImageUrl(imageUrl, { width: size })} ${size}w`)
    .join(', ');
};

export default {
  getImageUrl,
  getOptimizedImageUrl,
  getThumbnailUrl,
  getLargeImageUrl,
  isValidImageUrl,
  getImageAltText,
  preloadImage,
  getImageDimensions,
  generateSrcSet
};
