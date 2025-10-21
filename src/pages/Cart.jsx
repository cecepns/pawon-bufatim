import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { X, Plus, Minus, ChevronDown, ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import QRISImage from '../assets/qris.jpeg';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const [isClient, setIsClient] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('bank');
  const [showQRIS, setShowQRIS] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCheckout = () => {
    let paymentDetails = '';
    
    if (selectedPayment === 'bank') {
      paymentDetails = `Metode Pembayaran: Transfer Bank\nBank: BRI\nNo. Rekening: 012101119816504\nAtas Nama: HANIFA AMNA FAIZA`;
    } else {
      paymentDetails = 'Metode Pembayaran: QRIS\nSilakan scan kode QRIS yang tersedia';
    }
    
    const orderMessage = `Halo, saya ingin memesan:\n\n${cart
      .map(
        (item) =>
          `${item.name} (${item.quantity} x Rp ${item.price.toLocaleString('id-ID')})`
      )
      .join('\n')}\n\nTotal: Rp ${cartTotal.toLocaleString('id-ID')}\n\n${paymentDetails}\n\nTerima kasih!`;

    const whatsappUrl = `https://wa.me/6285246219423?text=${encodeURIComponent(orderMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat keranjang...</p>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Keranjang Kamu Kosong</h2>
          <p className="text-gray-600 mb-6">Ayo mulai belanja dan tambahkan produk ke keranjangmu!</p>
          <Link
            to="/products"
            className="inline-block bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-6 rounded-full transition-colors"
          >
            Lihat Produk
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-36 px-4 pb-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Keranjang Belanja</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium text-gray-900">Daftar Produk</h2>
                  <button
                    onClick={() => {
                      if (window.confirm('Apakah Anda yakin ingin mengosongkan keranjang?')) {
                        clearCart();
                        toast.success('Keranjang berhasil dikosongkan');
                      }
                    }}
                    className="text-sm text-red-500 hover:text-red-600"
                  >
                    Kosongkan Keranjang
                  </button>
                </div>
              </div>
              
              <div className="divide-y">
                {cart.map((item) => (
                  <div key={item.id} className="p-4 flex">
                    <div className="w-24 h-24 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between">
                        <h3 className="text-md font-medium text-gray-900">{item.name}</h3>
                        <button
                          onClick={() => {
                            removeFromCart(item.id);
                            toast.success('Produk dihapus dari keranjang');
                          }}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <X size={18} />
                        </button>
                      </div>
                      
                      <p className="mt-1 text-sm text-gray-500">Rp {item.price.toLocaleString('id-ID')}</p>
                      
                      <div className="mt-3 flex items-center">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 border border-gray-300 rounded-l-md hover:bg-gray-50"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4 py-1 border-t border-b border-gray-300 text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 border border-gray-300 rounded-r-md hover:bg-gray-50"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="ml-4 text-right">
                      <p className="font-medium text-gray-900">
                        Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-32">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Ringkasan Belanja</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Harga ({cart.reduce((sum, item) => sum + item.quantity, 0)} Produk)</span>
                  <span className="font-medium">Rp {cartTotal.toLocaleString('id-ID')}</span>
                </div>
                
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-lg">Total Tagihan</span>
                    <span className="font-bold text-xl text-primary-600">
                      Rp {cartTotal.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
                
                <div className="pt-4">
                  <h3 className="font-medium text-gray-900 mb-2">Metode Pembayaran</h3>
                  <div className="space-y-3">
                    <div 
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        selectedPayment === 'bank' 
                          ? 'border-primary-500 bg-primary-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedPayment('bank')}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Transfer Bank</p>
                          <p className="text-sm text-gray-500">BRI - 012101119816504</p>
                          <p className="text-sm text-gray-500">a.n. HANIFA AMNA FAIZA</p>
                        </div>
                        {selectedPayment === 'bank' && (
                          <div className="w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="border-2 rounded-lg overflow-hidden">
                      <div 
                        className={`p-4 cursor-pointer transition-colors ${
                          selectedPayment === 'qris' 
                            ? 'border-primary-500 bg-primary-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedPayment('qris')}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">QRIS</p>
                            <p className="text-sm text-gray-500">Scan kode QRIS</p>
                          </div>
                          <div className="flex items-center">
                            {selectedPayment === 'qris' ? (
                              <ChevronUp size={20} className="text-gray-500" />
                            ) : (
                              <ChevronDown size={20} className="text-gray-500" />
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {selectedPayment === 'qris' && (
                        <div className="p-4 border-t border-gray-200 bg-white">
                          <div className="flex justify-center">
                            <img 
                              src={QRISImage} 
                              alt="QRIS Payment" 
                              className="w-full h-64 object-contain"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://via.placeholder.com/200?text=QRIS+Code';
                              }}
                            />
                          </div>
                          <p className="text-xs text-gray-500 text-center mt-2">
                            Scan kode QRIS di atas untuk melakukan pembayaran
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handleCheckout}
                  className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-6 rounded-lg transition-colors mt-4"
                >
                  Lanjutkan ke Pembayaran
                </button>
                
                <Link
                  to="/products"
                  className="block text-center text-primary-500 hover:text-primary-600 font-medium mt-2"
                >
                  Lanjutkan Belanja
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
