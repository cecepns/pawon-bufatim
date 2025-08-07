import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { MapPin, Instagram, Music, Clock, MessageCircle } from "lucide-react";
import Shopee from "../assets/shopee.png";
import Tokopedia from "../assets/tokopedia.png";

const Contact = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6 text-primary-500" />,
      title: "Alamat",
      content: "Kelurahan 7 Ulu, Palembang, Sumatera Selatan, Indonesia",
    },
    {
      icon: <Clock className="w-6 h-6 text-primary-500" />,
      title: "Jam Operasional",
      content: "Senin - Sabtu: 08.00 - 17.00 WIB",
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-primary-500" />,
      title: "Media Sosial",
      content: "Ikuti kami di Instagram dan TikTok untuk update terbaru",
    },
  ];

  const socialLinks = [
    {
      name: "Instagram",
      icon: <Instagram className="w-6 h-6" />,
      url: "https://www.instagram.com/cek.aat?igsh=Z200cW5vdGtqcnc%3D&utm_source=qr",
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      description: "@cek.aat",
    },
    {
      name: "TikTok",
      icon: <Music className="w-6 h-6" />,
      url: "https://www.tiktok.com/@cek.aat?_t=ZS-8yaxwUMn8Ft&_r=1",
      color: "bg-gradient-to-r from-gray-900 to-gray-700",
      description: "@cek.aat",
    },
    {
      name: "Shopee",
      icon: <img alt="shopee" src={Shopee} className="w-8 h-auto rounded-full" />,
      url: "#",
      color: "bg-gradient-to-r from-orange-500 to-orange-600",
      description: "burlian_toko",
    },
    {
      name: "Tokopedia",
      icon: <img alt="tokped" src={Tokopedia} className="w-8 h-auto rounded-full" />,
      url: "#",
      color: "bg-gradient-to-r from-green-500 to-green-600",
      description: "burlian toko",
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-600 overflow-hidden">
        <div className="absolute inset-0 bg-[url('assets/banner.jpg')] bg-cover bg-center opacity-10"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1
            className="text-3xl md:text-6xl font-bold text-white mb-6"
            data-aos="fade-up"
          >
            Hubungi <span className="text-primary-200">Kami</span>
          </h1>
          <p
            className="text-xl text-gray-100 leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Kami siap melayani dan menjawab pertanyaan Anda tentang
            produk-produk berkualitas kami
          </p>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              data-aos="fade-up"
            >
              Informasi Kontak
            </h2>
            <p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Jangan ragu untuk menghubungi kami melalui berbagai cara berikut
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-2xl text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="flex justify-center mb-4">{info.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {info.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{info.content}</p>
              </div>
            ))}
          </div>

          {/* Social Media Links */}
          <div className="text-center mb-16">
            <h3
              className="text-3xl font-bold text-gray-900 mb-8"
              data-aos="fade-up"
            >
              Ikuti Media Sosial Kami
            </h3>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${social.color} text-white p-6 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex items-center space-x-4 min-w-64`}
                  data-aos="fade-up"
                  data-aos-delay={index * 200}
                >
                  <div className="flex-shrink-0">{social.icon}</div>
                  <div className="text-left">
                    <div className="font-semibold text-lg">{social.name}</div>
                    <div className="text-sm opacity-90">
                      {social.description}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              data-aos="fade-up"
            >
              Lokasi Kami
            </h2>
            <p
              className="text-xl text-gray-600"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Kunjungi langsung toko kami di Kelurahan 7 Ulu, Palembang
            </p>
          </div>

          <div
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <div className="aspect-w-16 aspect-h-9 h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.0123456789!2d104.7456789!3d-2.9876543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMsKwNTknMTUuNiJTIDEwNMKwNDQnNDQuNCJF!5e0!3m2!1sen!2sid!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi UMKM CEK AAT"
              ></iframe>
            </div>
            <div className="p-8">
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-primary-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    UMKM CEK AAT
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Kelurahan 7 Ulu, Palembang, Sumatera Selatan, Indonesia
                  </p>
                  <p className="text-gray-500 mt-2">
                    Mudah diakses dengan transportasi umum dan kendaraan pribadi
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-6"
            data-aos="fade-up"
          >
            Siap Berbelanja Produk Berkualitas?
          </h2>
          <p
            className="text-xl text-gray-100 mb-8 leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Hubungi kami sekarang untuk informasi lebih lanjut tentang produk
            pempek dan tepung tulang ikan gabus berkualitas tinggi
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <a
              href="https://www.instagram.com/cek.aat?igsh=Z200cW5vdGtqcnc%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-primary-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Instagram size={20} />
              <span>Chat via Instagram</span>
            </a>
            <a
              href="https://www.tiktok.com/@cek.aat?_t=ZS-8yaxwUMn8Ft&_r=1"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-primary-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Music size={20} />
              <span>Lihat di TikTok</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
