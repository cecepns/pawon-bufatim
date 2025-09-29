# Image Utilities

This directory contains utilities for handling product images throughout the application.

## Files

- `imageUtils.js` - Core image utility functions
- `../components/ProductImage.jsx` - Reusable product image component
- `../hooks/useImageLoader.js` - Custom hook for image loading states

## Usage Examples

### Basic Image URL Handling

```javascript
import { getImageUrl, getImageAltText } from '../utils/imageUtils';

// Get full image URL with fallback
const imageUrl = getImageUrl(product.image_url);
const altText = getImageAltText(product.name, product.category_name);

// Use in JSX
<img src={imageUrl} alt={altText} />
```

### Optimized Images

```javascript
import { getThumbnailUrl, getLargeImageUrl } from '../utils/imageUtils';

// Get thumbnail for product cards
const thumbnailUrl = getThumbnailUrl(product.image_url);

// Get large image for detail pages
const largeImageUrl = getLargeImageUrl(product.image_url);
```

### Using the ProductImage Component

```javascript
import ProductImage from '../components/ProductImage';

// Basic usage
<ProductImage 
  product={product} 
  size="medium" 
  showCategory={true} 
/>

// With custom handlers
<ProductImage 
  product={product}
  size="large"
  onLoad={() => console.log('Image loaded')}
  onError={() => console.log('Image failed to load')}
/>
```

### Using the Image Loader Hook

```javascript
import { useImageLoader } from '../hooks/useImageLoader';

const MyComponent = ({ product }) => {
  const { isLoaded, hasError, isLoading, src } = useImageLoader(product.image_url, {
    preload: true,
    onLoad: () => console.log('Image loaded'),
    onError: () => console.log('Image failed')
  });

  if (isLoading) return <div>Loading...</div>;
  if (hasError) return <div>Image not available</div>;
  
  return <img src={src} alt={product.name} />;
};
```

## API Reference

### `getImageUrl(imageUrl, fallback)`
- **Parameters:**
  - `imageUrl` (string): The image URL from the API
  - `fallback` (string, optional): Fallback image path
- **Returns:** Complete image URL with proper API base URL

### `getOptimizedImageUrl(imageUrl, options, fallback)`
- **Parameters:**
  - `imageUrl` (string): The image URL from the API
  - `options` (object): Image optimization options
    - `width` (number): Desired width
    - `height` (number): Desired height
    - `quality` (string): Image quality (1-100)
  - `fallback` (string, optional): Fallback image path
- **Returns:** Optimized image URL

### `getThumbnailUrl(imageUrl, fallback)`
- **Parameters:**
  - `imageUrl` (string): The image URL from the API
  - `fallback` (string, optional): Fallback image path
- **Returns:** Thumbnail image URL (300x300, 80% quality)

### `getLargeImageUrl(imageUrl, fallback)`
- **Parameters:**
  - `imageUrl` (string): The image URL from the API
  - `fallback` (string, optional): Fallback image path
- **Returns:** Large image URL (800x600, 90% quality)

### `getImageAltText(productName, categoryName)`
- **Parameters:**
  - `productName` (string): Product name
  - `categoryName` (string, optional): Category name
- **Returns:** Accessible alt text for the image

### `isValidImageUrl(imageUrl)`
- **Parameters:**
  - `imageUrl` (string): The image URL to check
- **Returns:** Boolean indicating if the URL is valid

### `preloadImage(imageUrl)`
- **Parameters:**
  - `imageUrl` (string): The image URL to preload
- **Returns:** Promise that resolves when image is loaded

### `getImageDimensions(imageUrl)`
- **Parameters:**
  - `imageUrl` (string): The image URL
- **Returns:** Promise resolving to `{width, height}` object

### `generateSrcSet(imageUrl, sizes)`
- **Parameters:**
  - `imageUrl` (string): Base image URL
  - `sizes` (array): Array of sizes for responsive images
- **Returns:** Srcset string for responsive images

## Environment Variables

The image utilities use the following environment variables:

- `VITE_API_URL`: API base URL (default: `http://localhost:5000`)

## Image Optimization

Currently, the utilities return the original image URLs. For production, consider integrating with:

- **Cloudinary**: For automatic image optimization and transformation
- **ImageKit**: For responsive images and optimization
- **AWS CloudFront**: For CDN and optimization
- **Next.js Image Optimization**: If migrating to Next.js

## Error Handling

All image utilities include proper error handling:

- **Invalid URLs**: Returns fallback image
- **Missing Images**: Uses placeholder SVG
- **Network Errors**: Graceful degradation
- **Loading States**: Proper loading indicators

## Accessibility

The utilities ensure proper accessibility:

- **Alt Text**: Automatically generated from product information
- **Loading States**: Screen reader friendly
- **Error States**: Clear error messaging
- **Focus Management**: Proper focus handling

## Performance

Optimizations included:

- **Lazy Loading**: Images load only when needed
- **Preloading**: Critical images preloaded
- **Caching**: Proper cache headers
- **Compression**: Optimized image sizes
- **Responsive**: Different sizes for different viewports
