import { Instagram, Music } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">CA</span>
              </div>
              <span className="font-bold text-xl">UMKM CEK AAT</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Mengangkat potensi lokal dan memberdayakan masyarakat melalui produk berkualitas sejak tahun 2000.
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
              <p className="text-gray-300">Kelurahan 7 Ulu, Palembang</p>
              <p className="text-gray-300">Sumatera Selatan, Indonesia</p>
            </div>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/cek.aat?igsh=Z200cW5vdGtqcnc%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-full hover:bg-primary-500 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.tiktok.com/@cek.aat?_t=ZS-8yaxwUMn8Ft&_r=1"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-full hover:bg-primary-500 transition-colors"
              >
                <Music size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 UMKM CEK AAT. Semua hak cipta dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;