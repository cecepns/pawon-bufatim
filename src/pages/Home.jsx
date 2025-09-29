import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  ArrowRight,
  Star,
  Users,
  Award,
  Heart,
} from "lucide-react";
import axios from "../config/axios";
import { getImageUrl, getImageAltText } from "../utils/imageUtils";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out-cubic",
    });
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/products", {
        params: {
          limit: 4,
          page: 1
        }
      });
      
      if (response.data.success) {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: <Star className="w-8 h-8 text-primary-500" />,
      title: "Kualitas Terjamin",
      description:
        "Produk pempek dan tekwan berkualitas tinggi dengan standar terbaik",
    },
    {
      icon: <Users className="w-8 h-8 text-primary-500" />,
      title: "Spesialis Pempek & Tekwan",
      description: "Spesialisasi dalam pempek dan tekwan autentik",
    },
    {
      icon: <Award className="w-8 h-8 text-primary-500" />,
      title: "Cita Rasa Tradisional",
      description: "Dipercaya masyarakat dengan cita rasa tradisional",
    },
    {
      icon: <Heart className="w-8 h-8 text-primary-500" />,
      title: "Produk Premium",
      description: "Bangga menghadirkan cita rasa pempek dan tekwan terbaik",
    },
  ];


  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('assets/banner.jpg')] bg-cover bg-no-repeat bg-center opacity-20"></div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <span className="text-primary-200">Pawon Bufatim</span>
          </h1>
          <p
            className="text-xl md:text-2xl mb-8 text-gray-100 leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            Specialist Pempek dan Tekwan Berkualitas Tinggi. Terima catering.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            <Link
              to="/about"
              className="bg-white text-primary-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>Tentang Kami</span>
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-primary-600 transition-all duration-300 transform hover:scale-105"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              data-aos="fade-up"
            >
              Mengapa Memilih Pawon Bufatim?
            </h2>
            <p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Komitmen kami terhadap kualitas dan pemberdayaan masyarakat
              menjadikan Pawon Bufatim pilihan terpercaya
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              data-aos="fade-up"
            >
              Produk Unggulan Kami
            </h2>
            <p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Produk berkualitas tinggi yang telah dipercaya masyarakat selama
              bertahun-tahun
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                  <div className="h-64 bg-gray-300"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-300 rounded mb-3"></div>
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product, index) => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="group block"
                  data-aos="fade-up"
                  data-aos-delay={index * 200}
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                    <img
                      src={getImageUrl(product.image_url)}
                      alt={getImageAltText(product.name, product.category_name)}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="bg-amber-600 p-6 text-white">
                      <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                      <p className="text-gray-200 text-sm leading-relaxed mb-3">
                        {product.description ? 
                          product.description.replace(/<[^>]*>/g, '').substring(0, 80) + '...' : 
                          'Produk berkualitas tinggi dari Pawon Bufatim'
                        }
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-green-400 font-semibold">
                          Rp {parseFloat(product.price).toLocaleString('id-ID')}
                        </span>
                        <span className="text-sm text-gray-300">
                          Lihat Detail →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* View All Products Button */}
          <div className="text-center mt-12" data-aos="fade-up" data-aos-delay="800">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-full font-semibold hover:bg-primary-700 transition-all duration-300 transform hover:scale-105"
            >
              <span>Lihat Semua Produk</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6" data-aos="fade-up">
            Mari Bergabung dengan Keluarga Besar Pawon Bufatim
          </h2>
          <p
            className="text-xl text-gray-100 mb-8 leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Rasakan pengalaman berbelanja produk lokal berkualitas dan ikut
            serta dalam memberdayakan ekonomi kerakyatan
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <Link
              to="/contact"
              className="bg-white text-primary-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>Hubungi Kami Sekarang</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
