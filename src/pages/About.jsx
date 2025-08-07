import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Calendar, MapPin, Users, Target, Award, Heart } from 'lucide-react';
import Logo from '../assets/logo.png';

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  const milestones = [
    {
      year: "2000",
      title: "Pendirian UMKM CEK AAT",
      description: "Didirikan di Kelurahan 7 Ulu, Palembang sebagai usaha rumahan dengan skala kecil"
    },
    {
      year: "2005",
      title: "Ekspansi Produk",
      description: "Mulai mengembangkan variasi produk pempek dan tepung tulang ikan gabus"
    },
    {
      year: "2010",
      title: "Pengakuan Masyarakat",
      description: "Mendapat kepercayaan luas dari masyarakat Palembang dan sekitarnya"
    },
    {
      year: "2020",
      title: "Era Digital",
      description: "Memasuki era digital dengan kehadiran di media sosial dan platform online"
    },
    {
      year: "2024",
      title: "Inovasi Berkelanjutan",
      description: "Terus berinovasi dengan tetap mempertahankan kualitas dan nilai tradisional"
    }
  ];

  const values = [
    {
      icon: <Heart className="w-8 h-8 text-primary-500" />,
      title: "Kualitas",
      description: "Menjunjung tinggi kualitas dalam setiap produk yang dihasilkan"
    },
    {
      icon: <Users className="w-8 h-8 text-primary-500" />,
      title: "Kejujuran",
      description: "Menjalankan bisnis dengan transparansi dan integritas tinggi"
    },
    {
      icon: <Target className="w-8 h-8 text-primary-500" />,
      title: "Keberlanjutan",
      description: "Berkomitmen pada pembangunan ekonomi yang berkelanjutan"
    },
    {
      icon: <Award className="w-8 h-8 text-primary-500" />,
      title: "Pemberdayaan",
      description: "Memberdayakan masyarakat lokal dan ekonomi kerakyatan"
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-600 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-10"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 
            className="text-5xl md:text-6xl font-bold text-white mb-6"
            data-aos="fade-up"
          >
            Tentang <span className="text-primary-200">CEK AAT</span>
          </h1>
          <p 
            className="text-xl text-gray-100 leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Perjalanan 24 tahun dalam mengangkat potensi lokal dan memberdayakan masyarakat
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <img
                src={Logo}
                alt="UMKM CEK AAT"
                className="rounded-2xl shadow max-w-96 h-auto"
              />
            </div>
            <div data-aos="fade-left">
              <div className="flex items-center space-x-2 mb-4">
                <Calendar className="w-6 h-6 text-primary-500" />
                <span className="text-primary-500 font-semibold">Sejak 2000</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Cerita Kami Dimulai
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  UMKM CEK AAT didirikan pada tahun 2000 di Kelurahan 7 Ulu, Palembang, sebagai wujud komitmen untuk mengangkat potensi lokal dan memberdayakan masyarakat sekitar. Usaha ini lahir dari semangat wirausaha dan kepedulian terhadap ekonomi keluarga kecil, yang digagas langsung di bawah naungan H. Burlian Topo, seorang tokoh masyarakat yang dikenal visioner dan peduli terhadap pengembangan UMKM.
                </p>
                <p>
                  Berawal dari usaha rumahan dengan skala kecil, UMKM CEK AAT terus tumbuh dan berkembang dengan menjunjung tinggi kualitas, kejujuran, dan keberlanjutan. Dukungan masyarakat sekitar serta semangat gotong royong menjadi pondasi kuat dalam perjalanan usaha ini.
                </p>
                <p>
                  Dengan berfokus pada produk-produk lokal bernilai tinggi, CEK AAT menjadi salah satu UMKM yang mampu bertahan dan berkembang di tengah tantangan zaman. Hingga kini, UMKM CEK AAT tetap eksis dan menjadi inspirasi bagi pelaku usaha lainnya, membuktikan bahwa usaha yang dimulai dengan niat baik dan manajemen yang tepat dapat memberi dampak nyata bagi kemajuan ekonomi kerakyatan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl font-bold text-gray-900 mb-4"
              data-aos="fade-up"
            >
              Nilai-Nilai Kami
            </h2>
            <p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Prinsip-prinsip yang menjadi fondasi dalam setiap langkah perjalanan UMKM CEK AAT
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="flex justify-center mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl font-bold text-gray-900 mb-4"
              data-aos="fade-up"
            >
              Perjalanan Kami
            </h2>
            <p 
              className="text-xl text-gray-600"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Milestone penting dalam perjalanan UMKM CEK AAT selama 24 tahun
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary-200"></div>

            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
                data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                data-aos-delay={index * 100}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <div className="text-2xl font-bold text-primary-500 mb-2">
                      {milestone.year}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-500 rounded-full border-4 border-white shadow-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl font-bold text-gray-900 mb-4"
              data-aos="fade-up"
            >
              Lokasi Kami
            </h2>
            <div 
              className="flex items-center justify-center space-x-2 text-xl text-gray-600"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <MapPin className="w-6 h-6 text-primary-500" />
              <span>Kelurahan 7 Ulu, Palembang, Sumatera Selatan</span>
            </div>
          </div>

          <div 
            className="bg-white rounded-2xl shadow-lg p-8 text-center"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Berlokasi strategis di jantung kota Palembang, UMKM CEK AAT mudah diakses dan telah menjadi bagian dari kehidupan masyarakat lokal. Lokasi ini dipilih dengan pertimbangan kedekatan dengan komunitas yang ingin kami berdayakan dan layani.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;