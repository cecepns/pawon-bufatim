import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { ArrowLeft, Star, Share2, Phone, MessageCircle } from "lucide-react";
import axios from "../config/axios";
import { getImageUrl, getImageAltText, getLargeImageUrl } from "../utils/imageUtils";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/products/${id}`);
      
      if (response.data.success) {
        setProduct(response.data.data);
        fetchRelatedProducts(response.data.data.category_id);
      } else {
        navigate('/products');
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedProducts = async (categoryId) => {
    try {
      const response = await axios.get('/products', {
        params: {
          category_id: categoryId,
          limit: 4
        }
      });
      
      if (response.data.success) {
        // Filter out current product
        const filtered = response.data.data.filter(p => p.id !== parseInt(id));
        setRelatedProducts(filtered.slice(0, 3));
      }
    } catch (error) {
      console.error("Error fetching related products:", error);
    }
  };

  const handleWhatsAppOrder = () => {
    const message = `Halo, saya tertarik dengan produk *${product.name}* dengan harga *Rp ${parseFloat(product.price).toLocaleString('id-ID')}*. Apakah produk ini tersedia?`;
    const whatsappUrl = `https://wa.me/6285246219423?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Lihat produk ${product.name} dari Pawon Bufatim`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link produk telah disalin ke clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat detail produk...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Produk tidak ditemukan</h2>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
          >
            <ArrowLeft size={20} />
            Kembali ke Produk
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-primary-600">Beranda</Link>
            <span className="text-gray-400">/</span>
            <Link to="/products" className="text-gray-500 hover:text-primary-600">Produk</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="space-y-4" data-aos="fade-right">
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg">
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                    <div className="text-gray-400">Memuat gambar...</div>
                  </div>
                )}
                <img
                  src={getLargeImageUrl(product.image_url)}
                  alt={getImageAltText(product.name, product.category_name)}
                  className={`w-full h-96 lg:h-[500px] object-cover transition-opacity duration-300 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                />
                {product.category_name && (
                  <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {product.category_name}
                  </div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6" data-aos="fade-left">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">(4.8) • 120 ulasan</span>
                  </div>
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors duration-200"
                  >
                    <Share2 size={20} />
                    <span className="text-sm">Bagikan</span>
                  </button>
                </div>
              </div>

              <div className="bg-primary-50 p-6 rounded-2xl">
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  Rp {parseFloat(product.price).toLocaleString('id-ID')}
                </div>
                <p className="text-gray-600 text-sm">
                  Harga sudah termasuk pajak dan ongkos kirim
                </p>
              </div>

              {product.description && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Deskripsi Produk</h3>
                  <div 
                    className="prose prose-gray max-w-none"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full bg-green-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-3"
                >
                  <MessageCircle size={24} />
                  Pesan via WhatsApp
                </button>
                
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full bg-primary-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-primary-700 transition-colors duration-200 flex items-center justify-center gap-3"
                >
                  <Phone size={24} />
                  Hubungi Kami
                </button>
              </div>

              {/* Product Features */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Keunggulan Produk</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                    <span className="text-gray-700">Bahan berkualitas tinggi</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                    <span className="text-gray-700">Dibuat dengan resep tradisional</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                    <span className="text-gray-700">Hygienis dan aman dikonsumsi</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                    <span className="text-gray-700">Pengiriman cepat dan aman</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4" data-aos="fade-up">
                Produk Terkait
              </h2>
              <p className="text-gray-600" data-aos="fade-up" data-aos-delay="200">
                Produk lain yang mungkin Anda sukai
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct, index) => (
                <Link
                  key={relatedProduct.id}
                  to={`/products/${relatedProduct.id}`}
                  className="group block"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2">
                    <div className="relative overflow-hidden">
                        <img
                          src={getImageUrl(relatedProduct.image_url)}
                          alt={getImageAltText(relatedProduct.name, relatedProduct.category_name)}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      {relatedProduct.category_name && (
                        <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {relatedProduct.category_name}
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {relatedProduct.description ? 
                          relatedProduct.description.replace(/<[^>]*>/g, '').substring(0, 80) + '...' : 
                          'Deskripsi tidak tersedia'
                        }
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-primary-600">
                          Rp {parseFloat(relatedProduct.price).toLocaleString('id-ID')}
                        </span>
                        <span className="text-sm text-gray-500">
                          Lihat Detail →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to Products */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <ArrowLeft size={20} />
            Lihat Semua Produk
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
