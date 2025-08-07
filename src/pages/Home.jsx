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
  X,
} from "lucide-react";
import Product1 from "../assets/product-1.jpeg";
import Product2 from "../assets/product-2.jpeg";
import Product3 from "../assets/product-3.jpeg";
import Product4 from "../assets/product-4.jpeg";
import Product5 from "../assets/product-5.jpeg";

const Home = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);



  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    document.body.style.overflow = "unset";
  };

  const features = [
    {
      icon: <Star className="w-8 h-8 text-primary-500" />,
      title: "Kualitas Terjamin",
      description:
        "Produk berkualitas tinggi dengan standar terbaik sejak 2000",
    },
    {
      icon: <Users className="w-8 h-8 text-primary-500" />,
      title: "Memberdayakan Masyarakat",
      description: "Mengangkat potensi lokal dan ekonomi kerakyatan",
    },
    {
      icon: <Award className="w-8 h-8 text-primary-500" />,
      title: "Pengalaman 24 Tahun",
      description: "Dipercaya masyarakat selama lebih dari dua dekade",
    },
    {
      icon: <Heart className="w-8 h-8 text-primary-500" />,
      title: "Produk Lokal",
      description: "Bangga menghadirkan cita rasa asli Palembang",
    },
  ];

  const products = [
    {
      name: "Tekwan Kering",
      // description: "Pempek autentik dengan cita rasa tradisional yang telah diwariskan turun temurun. Dibuat dengan bahan berkualitas tinggi dan resep rahasia keluarga yang telah terjaga selama puluhan tahun.",
      image: Product1,
      price: "Rp 40.000",
      // details: "Tersedia dalam berbagai ukuran dan varian rasa. Cocok untuk konsumsi pribadi maupun acara keluarga."
    },
    {
      name: "Pempek Keriting",
      // description: "Tepung berkualitas tinggi dari ikan gabus pilihan, kaya akan protein dan nutrisi. Diproses dengan teknologi modern untuk menjaga kualitas dan kandungan gizi.",
      image: Product2,
      price: "Rp 3.000",
      // details: "Ideal untuk campuran makanan bayi, suplemen kesehatan, dan bahan baku industri makanan."
    },
    {
      name: "Pempek Lenjer",
      // description: "Berbagai produk olahan ikan berkualitas tinggi yang diproduksi dengan standar higienis dan teknologi terkini untuk menghasilkan produk terbaik.",
      image: Product3,
      price: "Rp 3.000",
      // details: "Meliputi berbagai jenis olahan ikan yang cocok untuk berbagai kebutuhan konsumen."
    },
    {
      name: "Pempek Telur",
      // description: "Produk-produk unggulan yang menggabungkan cita rasa tradisional dengan inovasi modern untuk memenuhi kebutuhan pasar yang terus berkembang.",
      image: Product4,
      price: "Rp 3.000",
      // details: "Dibuat dengan bahan lokal pilihan dan diproduksi dengan standar kualitas tinggi."
    },
    {
      name: "Tepung Tulang Ikan Gabus",
      // description: "Produk eksklusif yang menjadi kebanggaan CEK AAT, menggabungkan tradisi dan inovasi untuk menghasilkan produk terbaik.",
      image: Product5,
      price: "Rp 80.000 (250g)",
      // details: "Produk premium dengan kualitas terbaik yang telah dipercaya oleh ribuan pelanggan."
    },
  ];

  return (
    <div className="min-h-screen">

      {/* Product Modal */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <X size={20} />
              </button>
              <div className="w-full h-96 py-5">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-contain rounded-t-2xl"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {selectedProduct.name}
                </h3>
                <p className="text-green-600 font-semibold text-lg mb-4">
                  {selectedProduct.price}
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {selectedProduct.description}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {selectedProduct.details}
                </p>
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={closeModal}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-full font-semibold hover:bg-gray-50 transition-colors duration-200"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
            UMKM <span className="text-primary-200">CEK AAT</span>
          </h1>
          <p
            className="text-xl md:text-2xl mb-8 text-gray-100 leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            Mengangkat Potensi Lokal, Memberdayakan Masyarakat Sejak 2000
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
              Mengapa Memilih CEK AAT?
            </h2>
            <p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Komitmen kami terhadap kualitas dan pemberdayaan masyarakat
              menjadikan CEK AAT pilihan terpercaya
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {products.map((product, index) => (
              <div
                key={index}
                className="group cursor-pointer"
                data-aos="fade-up"
                data-aos-delay={index * 200}
                onClick={() => openModal(product)}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <h3 className="text-2xl font-bold mb-3">{product.name}</h3>
                    <p className="text-gray-200 leading-relaxed">
                      {product.description}
                    </p>
                    <div className="mt-4 flex items-center space-x-2">
                      <span className="text-green-400 font-semibold">
                        {product.price}
                      </span>
                      <span className="text-sm text-gray-300">
                        • Klik untuk detail
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6" data-aos="fade-up">
            Mari Bergabung dengan Keluarga Besar CEK AAT
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
