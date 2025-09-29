import { Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">PB</span>
              </div>
              <span className="font-bold text-xl">Pawon Bufatim</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Specialist pempek dan tekwan berkualitas tinggi dengan cita rasa tradisional yang autentik.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Beranda
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Kontak
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Hubungi Kami</h3>
            <div className="space-y-2">
              <p className="text-gray-300">Jalan Sei Wain No.KM.15 No.47</p>
              <p className="text-gray-300">Karang Joang, Balikpapan Utara, Balikpapan</p>
              <p className="text-gray-300">Kalimantan Timur 76127</p>
            </div>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/pawon.bufatim/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-full hover:bg-primary-500 transition-colors"
              >
                <Instagram size={20} />
              </a>
              {/* <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-full hover:bg-primary-500 transition-colors"
              >
                <Music size={20} />
              </a>
              <div className="rounded-full flex items-center justify-center">
                <img src={Tokopedia} alt="tokped" className="w-6 h-auto rounded-full" />
              </div>
              <div className="rounded-full flex items-center justify-center">
                <img src={Shopee} alt="shopee" className="w-6 h-auto rounded-full" />
              </div> */}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Pawon Bufatim. Semua hak cipta dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;