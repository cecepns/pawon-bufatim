import { useState } from 'react';
import { getImageUrl, getImageAltText } from '../utils/imageUtils';

const ProductImage = ({ 
  product, 
  className = "", 
  size = "default",
  showCategory = false,
  onLoad,
  onError 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
    if (onLoad) onLoad();
  };

  const handleImageError = () => {
    setImageError(true);
    if (onError) onError();
  };

  const getImageSrc = () => {
    if (imageError) {
      return "/placeholder-product.jpg";
    }
    return getImageUrl(product?.image_url);
  };

  const getImageAlt = () => {
    if (!product) return "Product image";
    return getImageAltText(product.name, product.category_name);
  };

  const getSizeClasses = () => {
    switch (size) {
      case "thumbnail":
        return "h-48";
      case "medium":
        return "h-64";
      case "large":
        return "h-96 lg:h-[500px]";
      case "small":
        return "h-32";
      default:
        return "h-64";
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!imageLoaded && !imageError && (
        <div className={`absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center ${getSizeClasses()}`}>
          <div className="text-gray-400 text-sm">Memuat gambar...</div>
        </div>
      )}
      
      <img
        src={getImageSrc()}
        alt={getImageAlt()}
        className={`w-full ${getSizeClasses()} object-cover transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
      
      {showCategory && product?.category_name && (
        <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {product.category_name}
        </div>
      )}
      
      {imageError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="text-4xl mb-2">📷</div>
            <div className="text-sm">Gambar tidak tersedia</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductImage;
