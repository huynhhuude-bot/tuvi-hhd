'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  DUC_HAI_STORE_INFO,
  FISHING_CATEGORIES,
  DEFAULT_FISHING_PRODUCTS,
  loadFishingProducts,
  saveFishingProducts,
  getTodayFishingForecast
} from '../../data/ducHaiFishingData';
import {
  isAdminAuthenticated,
  buildVietQrUrl
} from '../../data/monetizationData';

export default function DucHaiFishingStorePage() {
  const [products, setProducts] = useState(DEFAULT_FISHING_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [cart, setCart] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  // Customer Checkout Form
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerNote, setCustomerNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD');

  // Admin Quick Add Product Form
  const [showAdminAdd, setShowAdminAdd] = useState(false);
  const [newProd, setNewProd] = useState({
    name: '',
    category: 'can-cau',
    price: 250000,
    originalPriceDisplay: '350.000đ',
    badge: 'Mới Về',
    specs: 'Chính hãng · Bảo hành uy tín tại Đức Hải Fishing',
    desc: '',
    image: ''
  });

  const forecast = useMemo(() => getTodayFishingForecast(), []);

  useEffect(() => {
    setProducts(loadFishingProducts());
    setIsAdmin(isAdminAuthenticated());
    try {
      const savedCart = localStorage.getItem('hhd_duc_hai_cart_v1');
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) setCart(parsed);
      }
    } catch {}
  }, []);

  const saveCart = (nextCart) => {
    setCart(nextCart);
    try {
      localStorage.setItem('hhd_duc_hai_cart_v1', JSON.stringify(nextCart));
    } catch {}
  };

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3200);
  };

  const addToCart = (product, openImmediately = false) => {
    const existingIndex = cart.findIndex((item) => item.id === product.id);
    let nextCart;
    if (existingIndex > -1) {
      nextCart = cart.map((item, idx) =>
        idx === existingIndex ? { ...item, qty: item.qty + 1 } : item
      );
    } else {
      nextCart = [
        ...cart,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          priceDisplay: product.priceDisplay,
          image: product.image,
          categoryLabel: product.categoryLabel,
          qty: 1
        }
      ];
    }
    saveCart(nextCart);
    if (openImmediately) {
      setShowCartModal(true);
    } else {
      showToast(`🎣 Đã thêm "${product.name.slice(0, 38)}..." vào giỏ hàng!`);
    }
  };

  const updateCartQty = (id, delta) => {
    const nextCart = cart
      .map((item) => (item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item))
      .filter((item) => item.qty > 0);
    saveCart(nextCart);
  };

  const clearCart = () => {
    saveCart([]);
    showToast('Đã làm trống giỏ hàng.');
  };

  const cartTotalCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.qty, 0),
    [cart]
  );

  const cartTotalPrice = useMemo(
    () => cart.reduce((sum, item) => sum + (Number(item.price) || 0) * item.qty, 0),
    [cart]
  );

  const filteredProducts = useMemo(() => {
    let list = products.filter((p) => {
      const matchCat = selectedCategory === 'ALL' || p.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        (p.specs && p.specs.toLowerCase().includes(q)) ||
        (p.desc && p.desc.toLowerCase().includes(q)) ||
        (p.categoryLabel && p.categoryLabel.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });

    if (sortBy === 'price-asc') {
      list = [...list].sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === 'price-desc') {
      list = [...list].sort((a, b) => (b.price || 0) - (a.price || 0));
    }
    return list;
  }, [products, selectedCategory, searchQuery, sortBy]);

  const buildOrderSummaryText = () => {
    const lines = [
      '🎣 ĐƠN ĐẶT HÀNG — CỬA HÀNG DỤNG CỤ CÂU CÁ ĐỨC HẢI FISHING',
      `📍 Đ/c Shop: ${DUC_HAI_STORE_INFO.address}`,
      `📞 Hotline/Zalo: ${DUC_HAI_STORE_INFO.phoneDisplay}`,
      '----------------------------------------',
      `👤 Khách hàng: ${customerName || 'Khách đặt trên Web'}`,
      `📱 SĐT nhận hàng: ${customerPhone || 'Chưa nhập'}`,
      `🏠 Địa chỉ giao: ${customerAddress || 'Nhận tại cửa hàng / Trao đổi qua Zalo'}`,
      `📝 Ghi chú: ${customerNote || 'Không có'}`,
      `💳 Thanh toán: ${paymentMethod === 'COD' ? 'Thanh toán khi nhận hàng (Ship COD)' : 'Chuyển khoản VietQR'}`,
      '----------------------------------------',
      '📦 DANH SÁCH DỤNG CỤ CÂU CÁ:'
    ];
    cart.forEach((item, idx) => {
      const lineTotal = ((Number(item.price) || 0) * item.qty).toLocaleString('vi-VN') + 'đ';
      lines.push(`${idx + 1}. ${item.name} — SL: ${item.qty} × ${item.priceDisplay} = ${lineTotal}`);
    });
    lines.push('----------------------------------------');
    lines.push(`💰 TỔNG CỘNG TẠM TÍNH: ${cartTotalPrice.toLocaleString('vi-VN')}đ`);
    return lines.join('\n');
  };

  const handleSendOrderZalo = async () => {
    if (cart.length === 0) {
      showToast('Giỏ hàng đang trống! Hãy chọn dụng cụ câu cá trước.');
      return;
    }
    const orderText = buildOrderSummaryText();
    try {
      await navigator.clipboard.writeText(orderText);
      showToast('✅ Đã sao chép nội dung đơn hàng! Đang mở Zalo 0983.339.397 để bạn dán gửi...');
    } catch {
      showToast('Đang mở Zalo 0983.339.397...');
    }
    setTimeout(() => {
      window.open(DUC_HAI_STORE_INFO.zaloUrl, '_blank', 'noopener,noreferrer');
    }, 600);
  };

  const handleCopyOrder = async () => {
    const orderText = buildOrderSummaryText();
    try {
      await navigator.clipboard.writeText(orderText);
      showToast('📋 Đã sao chép chi tiết đơn hàng vào bộ nhớ tạm!');
    } catch {
      showToast('Không thể sao chép tự động.');
    }
  };

  const handleQuickSingleOrderZalo = async (product) => {
    const msg = `🎣 Chào Cửa hàng ĐỨC HẢI FISHING (${DUC_HAI_STORE_INFO.phoneDisplay})!\nTôi muốn đặt mua sản phẩm:\n- Tên: ${product.name}\n- Giá: ${product.priceDisplay}\n- Thông số: ${product.specs}\nXin tư vấn giúp tôi!`;
    try {
      await navigator.clipboard.writeText(msg);
      showToast('✅ Đã chép thông tin sản phẩm! Đang mở Zalo Đức Hải Fishing...');
    } catch {}
    setTimeout(() => {
      window.open(DUC_HAI_STORE_INFO.zaloUrl, '_blank', 'noopener,noreferrer');
    }, 450);
  };

  const handleAdminAddProduct = (e) => {
    e.preventDefault();
    if (!newProd.name.trim()) return;
    const catObj = FISHING_CATEGORIES.find((c) => c.id === newProd.category);
    const priceNum = Number(newProd.price) || 150000;
    const item = {
      id: 'dh-custom-' + Date.now(),
      name: newProd.name.trim(),
      category: newProd.category,
      categoryLabel: catObj ? catObj.label.replace(/^[^\s]+\s/, '') : 'Đồ Câu Cá',
      price: priceNum,
      priceDisplay: priceNum.toLocaleString('vi-VN') + 'đ',
      originalPriceDisplay: newProd.originalPriceDisplay || (priceNum * 1.35).toLocaleString('vi-VN') + 'đ',
      badge: newProd.badge || 'Mới Về',
      specs: newProd.specs || 'Hàng chính hãng tại Đức Hải Fishing',
      desc: newProd.desc || 'Sản phẩm chất lượng cao chuyên phục vụ anh em cần thủ.',
      image: newProd.image.trim() || DEFAULT_FISHING_PRODUCTS[0].image
    };
    const next = [item, ...products];
    setProducts(next);
    saveFishingProducts(next);
    setNewProd({
      name: '',
      category: 'can-cau',
      price: 250000,
      originalPriceDisplay: '350.000đ',
      badge: 'Mới Về',
      specs: 'Chính hãng · Bảo hành uy tín tại Đức Hải Fishing',
      desc: '',
      image: ''
    });
    setShowAdminAdd(false);
    showToast('✅ Đã thêm sản phẩm mới vào cửa hàng Đức Hải Fishing!');
  };

  const handleAdminDeleteProduct = (id) => {
    const next = products.filter((p) => p.id !== id);
    setProducts(next);
    saveFishingProducts(next);
    showToast('Đã xóa sản phẩm khỏi danh sách.');
  };

  const handleAdminResetDefault = () => {
    setProducts(DEFAULT_FISHING_PRODUCTS);
    saveFishingProducts(DEFAULT_FISHING_PRODUCTS);
    showToast('Đã khôi phục 12 sản phẩm mẫu mặc định của Đức Hải Fishing.');
  };

  const vietQrUrl = buildVietQrUrl(
    {
      bankCode: 'MB',
      accountNo: '0983339397',
      accountName: 'DUC HAI FISHING',
      message: `DHF ${customerPhone || 'DAT DO CAU'}`
    },
    cartTotalPrice > 0 ? cartTotalPrice : 100000
  );

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #04101C 0%, #07192B 45%, #050F1A 100%)',
        color: '#F1F5F9',
        paddingBottom: 100
      }}
    >
      {/* Toast Notification */}
      {toastMsg && (
        <div
          style={{
            position: 'fixed',
            top: 20,
            right: 20,
            zIndex: 99999,
            background: 'linear-gradient(135deg, #0284C7, #0369A1)',
            border: '2px solid #FACC15',
            color: '#FFF',
            padding: '12px 18px',
            borderRadius: 12,
            fontWeight: 800,
            fontSize: 13.5,
            boxShadow: '0 12px 32px rgba(0,0,0,0.65)',
            maxWidth: 420
          }}
        >
          {toastMsg}
        </div>
      )}

      {/* Top Sticky Store Bar */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'rgba(5, 18, 32, 0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(56, 189, 248, 0.3)',
          padding: '10px 18px'
        }}
      >
        <div
          style={{
            maxWidth: 1180,
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link
              href="/"
              style={{
                padding: '6px 12px',
                borderRadius: 8,
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.18)',
                color: '#E2E8F0',
                fontSize: 12,
                fontWeight: 700,
                textDecoration: 'none'
              }}
            >
              ← Về Trang Chủ HHD
            </Link>
            <div>
              <div style={{ fontSize: 15, fontWeight: 900, color: '#FACC15', letterSpacing: 0.4 }}>
                🎣 ĐỨC HẢI FISHING — VĨNH LONG
              </div>
              <div style={{ fontSize: 11, color: '#93C5FD' }}>
                📍 {DUC_HAI_STORE_INFO.address} · 📞 {DUC_HAI_STORE_INFO.phoneDisplay}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <a
              href={`tel:${DUC_HAI_STORE_INFO.phone}`}
              style={{
                padding: '8px 13px',
                borderRadius: 9,
                background: 'rgba(220, 38, 38, 0.9)',
                border: '1px solid #F87171',
                color: '#FFF',
                fontSize: 12,
                fontWeight: 800,
                textDecoration: 'none'
              }}
            >
              📞 Gọi: {DUC_HAI_STORE_INFO.phoneDisplay}
            </a>

            <a
              href={DUC_HAI_STORE_INFO.zaloUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                padding: '8px 13px',
                borderRadius: 9,
                background: 'linear-gradient(135deg, #0284C7, #0369A1)',
                border: '1px solid #38BDF8',
                color: '#FFF',
                fontSize: 12,
                fontWeight: 800,
                textDecoration: 'none'
              }}
            >
              💬 Chat Zalo Tư Vấn
            </a>

            <button
              type="button"
              onClick={() => setShowCartModal(true)}
              style={{
                padding: '8px 15px',
                borderRadius: 9,
                background: 'linear-gradient(135deg, #FACC15, #CA8A04)',
                border: '1px solid #FEF08A',
                color: '#090D16',
                fontSize: 12.5,
                fontWeight: 900,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6
              }}
            >
              <span>🛒 Giỏ Hàng ({cartTotalCount})</span>
              {cartTotalPrice > 0 && (
                <span
                  style={{
                    background: '#0F172A',
                    color: '#FACC15',
                    padding: '2px 7px',
                    borderRadius: 6,
                    fontSize: 11
                  }}
                >
                  {cartTotalPrice.toLocaleString('vi-VN')}đ
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '22px 16px' }}>
        {/* ================================================================ */}
        {/* HERO BANNER — CỬA HÀNG DỤNG CỤ CÂU CÁ ĐỨC HẢI FISHING             */}
        {/* ================================================================ */}
        <div
          style={{
            borderRadius: 22,
            background:
              'radial-gradient(circle at 85% 20%, rgba(56, 189, 248, 0.22), transparent 55%), linear-gradient(135deg, #071E34 0%, #0B2B46 55%, #071626 100%)',
            border: '2px solid rgba(250, 204, 21, 0.55)',
            padding: '28px 26px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.55)',
            marginBottom: 24,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 24,
            alignItems: 'center'
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-block',
                padding: '5px 14px',
                borderRadius: 999,
                background: 'rgba(250, 204, 21, 0.16)',
                border: '1px solid #FACC15',
                color: '#FDE047',
                fontSize: 12,
                fontWeight: 800,
                marginBottom: 12
              }}
            >
              🏆 TRUNG TÂM ĐỒ CÂU CHÍNH HÃNG UY TÍN TẠI VĨNH LONG
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-serif, serif)',
                fontSize: 'clamp(24px, 3.6vw, 36px)',
                fontWeight: 900,
                color: '#FACC15',
                lineHeight: 1.25,
                margin: '0 0 10px 0',
                textShadow: '0 2px 12px rgba(0,0,0,0.5)'
              }}
            >
              {DUC_HAI_STORE_INFO.name}
            </h1>

            <p style={{ fontSize: 15, color: '#E0F2FE', lineHeight: 1.6, margin: '0 0 16px 0', fontWeight: 600 }}>
              {DUC_HAI_STORE_INFO.tagline}
            </p>

            <div
              style={{
                background: 'rgba(6, 15, 26, 0.78)',
                border: '1px solid rgba(56, 189, 248, 0.4)',
                borderRadius: 14,
                padding: '14px 16px',
                marginBottom: 18,
                display: 'grid',
                gap: 8
              }}
            >
              <div style={{ fontSize: 14, color: '#F8FAFC' }}>
                📍 <strong style={{ color: '#38BDF8' }}>Địa chỉ cửa hàng:</strong>{' '}
                <strong>{DUC_HAI_STORE_INFO.address}</strong>
              </div>
              <div style={{ fontSize: 14, color: '#F8FAFC' }}>
                📞 <strong style={{ color: '#FACC15' }}>Điện thoại / Zalo đặt hàng:</strong>{' '}
                <a
                  href={`tel:${DUC_HAI_STORE_INFO.phone}`}
                  style={{ color: '#FDE047', fontWeight: 900, fontSize: 16, textDecoration: 'none' }}
                >
                  {DUC_HAI_STORE_INFO.phoneDisplay} ({DUC_HAI_STORE_INFO.phone})
                </a>
              </div>
              <div style={{ fontSize: 13, color: '#86EFAC' }}>
                🚚 <strong>Chính sách giao hàng:</strong> {DUC_HAI_STORE_INFO.shippingPolicy}
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              <a
                href={DUC_HAI_STORE_INFO.zaloUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  padding: '12px 20px',
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, #FACC15, #CA8A04)',
                  color: '#090D16',
                  fontWeight: 900,
                  fontSize: 14,
                  textDecoration: 'none',
                  boxShadow: '0 6px 20px rgba(250, 204, 21, 0.35)'
                }}
              >
                💬 Nhắn Zalo Mua Hàng Ngay ({DUC_HAI_STORE_INFO.phoneDisplay})
              </a>

              <a
                href={`tel:${DUC_HAI_STORE_INFO.phone}`}
                style={{
                  padding: '12px 18px',
                  borderRadius: 12,
                  background: 'rgba(220, 38, 38, 0.9)',
                  border: '1px solid #FCA5A5',
                  color: '#FFF',
                  fontWeight: 800,
                  fontSize: 14,
                  textDecoration: 'none'
                }}
              >
                📞 Gọi Trực Tiếp Chủ Shop
              </a>
            </div>
          </div>

          {/* Right Hero Showcase Card: 4 Featured Tackle Categories */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 10
            }}
          >
            {DEFAULT_FISHING_PRODUCTS.slice(0, 4).map((item) => (
              <div
                key={item.id}
                onClick={() => addToCart(item, false)}
                style={{
                  background: 'rgba(9, 18, 30, 0.9)',
                  border: '1px solid rgba(250, 204, 21, 0.35)',
                  borderRadius: 14,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'transform 0.2s'
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: '100%', height: 118, objectFit: 'cover', display: 'block' }}
                />
                <div style={{ padding: '8px 10px' }}>
                  <div
                    style={{
                      fontSize: 11.5,
                      fontWeight: 800,
                      color: '#F8FAFC',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {item.name}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                    <span style={{ fontSize: 12.5, fontWeight: 900, color: '#FACC15' }}>{item.priceDisplay}</span>
                    <span style={{ fontSize: 10, color: '#38BDF8', fontWeight: 700 }}>+ Giỏ hàng</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================================================================ */}
        {/* LỊCH CÂU CÁ & DỰ BÁO CON NƯỚC MIỀN TÂY VĨNH LONG HÔM NAY         */}
        {/* ================================================================ */}
        <div
          style={{
            borderRadius: 18,
            background: 'linear-gradient(135deg, rgba(12, 36, 58, 0.92), rgba(8, 24, 40, 0.95))',
            border: '1px solid rgba(56, 189, 248, 0.4)',
            padding: '18px 20px',
            marginBottom: 24
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 10,
              marginBottom: 12
            }}
          >
            <div>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: '#38BDF8',
                  textTransform: 'uppercase',
                  letterSpacing: 0.6
                }}
              >
                🌊 TIỆN ÍCH CẦN THỦ ĐỨC HẢI FISHING · {forecast.dateStr} ({forecast.lunarDay})
              </span>
              <h2 style={{ margin: '4px 0 0 0', fontSize: 18, color: '#FACC15', fontWeight: 800 }}>
                Lịch Câu Cá & Khung Giờ Vàng Cá Ăn Mồi Hôm Nay
              </h2>
            </div>
            <div
              style={{
                padding: '6px 14px',
                borderRadius: 99,
                background: 'rgba(16, 185, 129, 0.2)',
                border: '1px solid #10B981',
                color: '#6EE7B7',
                fontWeight: 800,
                fontSize: 12.5
              }}
            >
              ⭐ Điểm Đi Câu: {forecast.rating}
            </div>
          </div>

          <div style={{ fontSize: 13.5, color: '#E2E8F0', marginBottom: 12 }}>
            🧭 <strong>Nhận định con nước sông hồ:</strong> {forecast.tideStatus}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 10
            }}
          >
            {forecast.bestHours.map((h, i) => (
              <div
                key={i}
                style={{
                  padding: '10px 12px',
                  borderRadius: 10,
                  background: 'rgba(5, 15, 28, 0.75)',
                  border: '1px solid rgba(250, 204, 21, 0.25)',
                  fontSize: 12.5,
                  color: '#FDE68A',
                  fontWeight: 700
                }}
              >
                {h}
              </div>
            ))}
          </div>
        </div>

        {/* ================================================================ */}
        {/* ADMIN QUICK ADD PRODUCT PANEL (CHỈ HIỆN KHI ADMIN ĐĂNG NHẬP)     */}
        {/* ================================================================ */}
        {isAdmin && (
          <div
            style={{
              borderRadius: 16,
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1.5px solid #10B981',
              padding: 16,
              marginBottom: 22
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#6EE7B7' }}>
                🔐 Chế Độ Chủ Cửa Hàng Đức Hải Fishing (Đã xác thực Admin)
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  type="button"
                  onClick={() => setShowAdminAdd(!showAdminAdd)}
                  style={{
                    padding: '7px 14px',
                    borderRadius: 8,
                    background: '#10B981',
                    color: '#052E16',
                    border: 'none',
                    fontWeight: 800,
                    fontSize: 12,
                    cursor: 'pointer'
                  }}
                >
                  {showAdminAdd ? 'Đóng Khung Thêm' : '+ Đăng Thêm Sản Phẩm Đồ Câu Mới'}
                </button>
                <button
                  type="button"
                  onClick={handleAdminResetDefault}
                  style={{
                    padding: '7px 12px',
                    borderRadius: 8,
                    background: 'rgba(255,255,255,0.1)',
                    color: '#E2E8F0',
                    border: '1px solid rgba(255,255,255,0.2)',
                    fontSize: 12,
                    cursor: 'pointer'
                  }}
                >
                  Khôi phục mặc định
                </button>
              </div>
            </div>

            {showAdminAdd && (
              <form
                onSubmit={handleAdminAddProduct}
                style={{
                  marginTop: 14,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: 10
                }}
              >
                <input
                  type="text"
                  required
                  placeholder="Tên cần câu / máy câu / mồi câu..."
                  value={newProd.name}
                  onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                  style={{
                    padding: '9px 12px',
                    borderRadius: 8,
                    background: '#09131F',
                    border: '1px solid #38BDF8',
                    color: '#FFF'
                  }}
                />
                <select
                  value={newProd.category}
                  onChange={(e) => setNewProd({ ...newProd, category: e.target.value })}
                  style={{
                    padding: '9px 12px',
                    borderRadius: 8,
                    background: '#09131F',
                    border: '1px solid #38BDF8',
                    color: '#FFF'
                  }}
                >
                  {FISHING_CATEGORIES.filter((c) => c.id !== 'ALL').map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="Giá bán (VNĐ), VD: 350000"
                  value={newProd.price}
                  onChange={(e) => setNewProd({ ...newProd, price: e.target.value })}
                  style={{
                    padding: '9px 12px',
                    borderRadius: 8,
                    background: '#09131F',
                    border: '1px solid #38BDF8',
                    color: '#FFF'
                  }}
                />
                <input
                  type="text"
                  placeholder="Thông số kỹ thuật (Dài, tải cá, vòng tua...)"
                  value={newProd.specs}
                  onChange={(e) => setNewProd({ ...newProd, specs: e.target.value })}
                  style={{
                    padding: '9px 12px',
                    borderRadius: 8,
                    background: '#09131F',
                    border: '1px solid #38BDF8',
                    color: '#FFF'
                  }}
                />
                <input
                  type="text"
                  placeholder="Link ảnh sản phẩm (Để trống dùng ảnh minh họa)"
                  value={newProd.image}
                  onChange={(e) => setNewProd({ ...newProd, image: e.target.value })}
                  style={{
                    padding: '9px 12px',
                    borderRadius: 8,
                    background: '#09131F',
                    border: '1px solid #38BDF8',
                    color: '#FFF'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: '9px 16px',
                    borderRadius: 8,
                    background: '#FACC15',
                    color: '#090D16',
                    border: 'none',
                    fontWeight: 900,
                    cursor: 'pointer'
                  }}
                >
                  💾 Lưu Sản Phẩm Lên Shop
                </button>
              </form>
            )}
          </div>
        )}

        {/* ================================================================ */}
        {/* CATEGORY TABS & SEARCH BAR                                       */}
        {/* ================================================================ */}
        <div
          style={{
            background: 'rgba(8, 20, 35, 0.92)',
            border: '1px solid rgba(250, 204, 21, 0.3)',
            borderRadius: 16,
            padding: 16,
            marginBottom: 22
          }}
        >
          {/* Category Pills */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 8,
              marginBottom: 14
            }}
          >
            {FISHING_CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{
                    padding: '9px 14px',
                    borderRadius: 10,
                    border: active ? '1.5px solid #FACC15' : '1px solid rgba(148, 163, 184, 0.25)',
                    background: active
                      ? 'linear-gradient(135deg, #FACC15, #CA8A04)'
                      : 'rgba(15, 23, 42, 0.85)',
                    color: active ? '#090D16' : '#E2E8F0',
                    fontWeight: active ? 900 : 700,
                    fontSize: 13,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6
                  }}
                >
                  <span>{cat.label}</span>
                  <span
                    style={{
                      fontSize: 10,
                      padding: '1px 6px',
                      borderRadius: 99,
                      background: active ? 'rgba(0,0,0,0.2)' : 'rgba(56, 189, 248, 0.15)',
                      color: active ? '#090D16' : '#38BDF8'
                    }}
                  >
                    {cat.countBadge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search & Sort Row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: 10
            }}
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="🔍 Tìm kiếm cần câu Carbon, máy đứng, máy ngang Lure, mồi nhái hơi, lưỡi câu, phao đèn, chì..."
              style={{
                width: '100%',
                padding: '11px 14px',
                borderRadius: 10,
                background: '#050E1A',
                border: '1px solid rgba(56, 189, 248, 0.4)',
                color: '#F8FAFC',
                fontSize: 13.5
              }}
            />

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '11px 14px',
                borderRadius: 10,
                background: '#050E1A',
                border: '1px solid rgba(250, 204, 21, 0.4)',
                color: '#FDE047',
                fontWeight: 700,
                fontSize: 13
              }}
            >
              <option value="featured">🔥 Bán chạy & Đề xuất</option>
              <option value="price-asc">💰 Giá: Thấp đến Cao</option>
              <option value="price-desc">💎 Giá: Cao đến Thấp</option>
            </select>
          </div>
        </div>

        {/* ================================================================ */}
        {/* PRODUCT GRID (DANH SÁCH DỤNG CỤ CÂU CÁ)                          */}
        {/* ================================================================ */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
            gap: 18,
            marginBottom: 32
          }}
        >
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              style={{
                background: 'rgba(10, 22, 38, 0.95)',
                border: '1px solid rgba(250, 204, 21, 0.32)',
                borderRadius: 18,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 12px 30px rgba(0,0,0,0.45)'
              }}
            >
              <div>
                {/* Product Illustration / Image */}
                <div style={{ position: 'relative' }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: 185,
                      objectFit: 'cover',
                      display: 'block',
                      borderBottom: '1px solid rgba(250, 204, 21, 0.25)'
                    }}
                  />
                  {product.badge && (
                    <span
                      style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        background: 'linear-gradient(135deg, #DC2626, #991B1B)',
                        border: '1px solid #FACC15',
                        color: '#FFF',
                        fontSize: 10.5,
                        fontWeight: 800,
                        padding: '3px 9px',
                        borderRadius: 99
                      }}
                    >
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Product Body */}
                <div style={{ padding: '14px 15px 10px' }}>
                  <div style={{ fontSize: 11, color: '#38BDF8', fontWeight: 800, marginBottom: 4 }}>
                    {product.categoryLabel}
                  </div>

                  <h3
                    style={{
                      fontSize: 15,
                      fontWeight: 800,
                      color: '#F8FAFC',
                      lineHeight: 1.38,
                      margin: '0 0 8px 0'
                    }}
                  >
                    {product.name}
                  </h3>

                  <div
                    style={{
                      padding: '6px 9px',
                      borderRadius: 8,
                      background: 'rgba(56, 189, 248, 0.1)',
                      border: '1px solid rgba(56, 189, 248, 0.25)',
                      fontSize: 11.5,
                      color: '#BAE6FD',
                      fontWeight: 600,
                      marginBottom: 8
                    }}
                  >
                    ⚙️ {product.specs}
                  </div>

                  <p style={{ fontSize: 12, color: '#94A3B8', lineHeight: 1.48, margin: '0 0 10px 0' }}>
                    {product.desc}
                  </p>
                </div>
              </div>

              {/* Price & Action Footer */}
              <div style={{ padding: '0 15px 15px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    marginBottom: 10
                  }}
                >
                  <div>
                    <span style={{ fontSize: 20, fontWeight: 900, color: '#FACC15' }}>
                      {product.priceDisplay}
                    </span>
                    {product.originalPriceDisplay && (
                      <span
                        style={{
                          fontSize: 12,
                          color: '#64748B',
                          textDecoration: 'line-through',
                          marginLeft: 8
                        }}
                      >
                        {product.originalPriceDisplay}
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: 11, color: '#4ADE80', fontWeight: 700 }}>✓ Sẵn hàng</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  <button
                    type="button"
                    onClick={() => addToCart(product, false)}
                    style={{
                      padding: '9px 10px',
                      borderRadius: 9,
                      background: 'linear-gradient(135deg, #FACC15, #CA8A04)',
                      border: '1px solid #FEF08A',
                      color: '#090D16',
                      fontWeight: 900,
                      fontSize: 12,
                      cursor: 'pointer'
                    }}
                  >
                    🛒 + Giỏ Hàng
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickSingleOrderZalo(product)}
                    style={{
                      padding: '9px 10px',
                      borderRadius: 9,
                      background: 'linear-gradient(135deg, #0284C7, #0369A1)',
                      border: '1px solid #38BDF8',
                      color: '#FFF',
                      fontWeight: 800,
                      fontSize: 12,
                      cursor: 'pointer'
                    }}
                  >
                    💬 Mua Qua Zalo
                  </button>
                </div>

                {isAdmin && (
                  <button
                    type="button"
                    onClick={() => handleAdminDeleteProduct(product.id)}
                    style={{
                      width: '100%',
                      marginTop: 8,
                      padding: '5px',
                      borderRadius: 6,
                      background: 'rgba(239, 68, 68, 0.18)',
                      border: '1px solid #EF4444',
                      color: '#FCA5A5',
                      fontSize: 11,
                      cursor: 'pointer'
                    }}
                  >
                    🗑️ Xóa sản phẩm (Admin)
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ================================================================ */}
        {/* KHU VỰC GIỎ HÀNG & ĐẶT GIAO HÀNG TRỰC TIẾP TRÊN TRANG            */}
        {/* ================================================================ */}
        <div
          id="gio-hang-duc-hai"
          style={{
            borderRadius: 20,
            background: 'linear-gradient(135deg, #071A2E 0%, #091322 100%)',
            border: '2px solid #FACC15',
            padding: '24px 20px',
            marginBottom: 28
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 10,
              marginBottom: 16
            }}
          >
            <div>
              <h2 style={{ margin: 0, fontSize: 22, color: '#FACC15', fontWeight: 900 }}>
                🛒 Giỏ Hàng & Đặt Giao Đồ Câu Tận Nơi (Ship COD Toàn Quốc)
              </h2>
              <div style={{ fontSize: 13, color: '#93C5FD', marginTop: 4 }}>
                Kiểm tra hàng thoải mái trước khi thanh toán · Hỗ trợ tư vấn kỹ thuật câu 24/7 qua Zalo{' '}
                <strong>{DUC_HAI_STORE_INFO.phoneDisplay}</strong>
              </div>
            </div>
            {cart.length > 0 && (
              <button
                type="button"
                onClick={clearCart}
                style={{
                  padding: '6px 12px',
                  borderRadius: 8,
                  background: 'rgba(239, 68, 68, 0.2)',
                  border: '1px solid #EF4444',
                  color: '#FCA5A5',
                  fontSize: 12,
                  cursor: 'pointer'
                }}
              >
                Làm trống giỏ hàng
              </button>
            )}
          </div>

          {cart.length === 0 ? (
            <div
              style={{
                padding: '28px 16px',
                textAlign: 'center',
                background: 'rgba(5, 12, 22, 0.65)',
                borderRadius: 14,
                border: '1px dashed rgba(250, 204, 21, 0.35)'
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 8 }}>🎣</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#E2E8F0' }}>
                Giỏ hàng của bạn đang trống. Hãy bấm &ldquo;🛒 + Giỏ Hàng&rdquo; ở sản phẩm bên trên để chọn mua!
              </div>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
                gap: 20
              }}
            >
              {/* Left: Cart Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {cart.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 10,
                      padding: '10px 12px',
                      borderRadius: 12,
                      background: 'rgba(5, 13, 24, 0.85)',
                      border: '1px solid rgba(56, 189, 248, 0.3)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: 58, height: 44, objectFit: 'cover', borderRadius: 8 }}
                      />
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 800, color: '#F8FAFC' }}>{item.name}</div>
                        <div style={{ fontSize: 12, color: '#FACC15', fontWeight: 700 }}>
                          {item.priceDisplay} × {item.qty} ={' '}
                          {((Number(item.price) || 0) * item.qty).toLocaleString('vi-VN')}đ
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <button
                        type="button"
                        onClick={() => updateCartQty(item.id, -1)}
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 6,
                          border: '1px solid #64748B',
                          background: '#0F172A',
                          color: '#FFF',
                          fontWeight: 900,
                          cursor: 'pointer'
                        }}
                      >
                        -
                      </button>
                      <span style={{ fontSize: 13, fontWeight: 800, minWidth: 20, textAlign: 'center' }}>
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateCartQty(item.id, 1)}
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 6,
                          border: '1px solid #FACC15',
                          background: '#FACC15',
                          color: '#090D16',
                          fontWeight: 900,
                          cursor: 'pointer'
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}

                <div
                  style={{
                    padding: '14px 16px',
                    borderRadius: 12,
                    background: 'rgba(250, 204, 21, 0.12)',
                    border: '1px solid #FACC15',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span style={{ fontSize: 14, fontWeight: 800, color: '#F8FAFC' }}>
                    Tổng cộng ({cartTotalCount} sản phẩm):
                  </span>
                  <span style={{ fontSize: 22, fontWeight: 900, color: '#FACC15' }}>
                    {cartTotalPrice.toLocaleString('vi-VN')}đ
                  </span>
                </div>
              </div>

              {/* Right: Customer Shipping Info & Submit */}
              <div
                style={{
                  background: 'rgba(5, 13, 24, 0.85)',
                  border: '1px solid rgba(250, 204, 21, 0.35)',
                  borderRadius: 14,
                  padding: 16,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10
                }}
              >
                <div style={{ fontSize: 14, fontWeight: 800, color: '#FACC15' }}>
                  📦 Thông Tin Người Nhận Hàng
                </div>

                <input
                  type="text"
                  placeholder="Họ và tên anh/chị cần thủ..."
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  style={{
                    padding: '10px 12px',
                    borderRadius: 8,
                    background: '#091422',
                    border: '1px solid rgba(148,163,184,0.35)',
                    color: '#FFF'
                  }}
                />

                <input
                  type="tel"
                  placeholder="Số điện thoại nhận hàng (Bắt buộc)..."
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  style={{
                    padding: '10px 12px',
                    borderRadius: 8,
                    background: '#091422',
                    border: '1px solid rgba(148,163,184,0.35)',
                    color: '#FFF'
                  }}
                />

                <input
                  type="text"
                  placeholder="Địa chỉ nhận hàng (Ấp/Khóm, Xã/Phường, Tỉnh/Thành)..."
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  style={{
                    padding: '10px 12px',
                    borderRadius: 8,
                    background: '#091422',
                    border: '1px solid rgba(148,163,184,0.35)',
                    color: '#FFF'
                  }}
                />

                <input
                  type="text"
                  placeholder="Ghi chú: Chọn chiều dài cần (1m8/2m1/2m4), size máy (3000/5000), số dây PE..."
                  value={customerNote}
                  onChange={(e) => setCustomerNote(e.target.value)}
                  style={{
                    padding: '10px 12px',
                    borderRadius: 8,
                    background: '#091422',
                    border: '1px solid rgba(148,163,184,0.35)',
                    color: '#FFF'
                  }}
                />

                <div style={{ display: 'flex', gap: 10 }}>
                  <label style={{ fontSize: 12.5, color: '#E2E8F0', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'COD'}
                      onChange={() => setPaymentMethod('COD')}
                    />{' '}
                    🚚 Nhận hàng trả tiền (Ship COD)
                  </label>
                  <label style={{ fontSize: 12.5, color: '#E2E8F0', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'QR'}
                      onChange={() => setPaymentMethod('QR')}
                    />{' '}
                    🏦 Quét mã VietQR
                  </label>
                </div>

                {paymentMethod === 'QR' && (
                  <div
                    style={{
                      textAlign: 'center',
                      background: '#FFF',
                      padding: 10,
                      borderRadius: 10,
                      color: '#090D16'
                    }}
                  >
                    <img
                      src={vietQrUrl}
                      alt="VietQR Đức Hải Fishing"
                      style={{ maxWidth: 190, height: 'auto', margin: '0 auto', display: 'block' }}
                    />
                    <div style={{ fontSize: 11.5, fontWeight: 800, marginTop: 4 }}>
                      STK: 0983339397 — ĐỨC HẢI FISHING
                    </div>
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 8, marginTop: 4 }}>
                  <button
                    type="button"
                    onClick={handleSendOrderZalo}
                    style={{
                      padding: '12px 16px',
                      borderRadius: 10,
                      background: 'linear-gradient(135deg, #FACC15, #CA8A04)',
                      border: '1px solid #FEF08A',
                      color: '#090D16',
                      fontWeight: 900,
                      fontSize: 13.5,
                      cursor: 'pointer'
                    }}
                  >
                    🚀 Gửi Đơn Hàng Qua Zalo 0983.339.397
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyOrder}
                    style={{
                      padding: '12px 14px',
                      borderRadius: 10,
                      background: 'rgba(56, 189, 248, 0.2)',
                      border: '1px solid #38BDF8',
                      color: '#E0F2FE',
                      fontWeight: 800,
                      fontSize: 12.5,
                      cursor: 'pointer'
                    }}
                  >
                    📋 Chép Đơn
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ================================================================ */}
        {/* FOOTER THÔNG TIN CỬA HÀNG ĐỨC HẢI FISHING                        */}
        {/* ================================================================ */}
        <div
          style={{
            borderRadius: 18,
            background: 'rgba(6, 15, 28, 0.9)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            padding: '20px 22px',
            textAlign: 'center'
          }}
        >
          <div style={{ fontSize: 17, fontWeight: 900, color: '#FACC15', marginBottom: 6 }}>
            🎣 {DUC_HAI_STORE_INFO.name}
          </div>
          <div style={{ fontSize: 13.5, color: '#E2E8F0', marginBottom: 4 }}>
            📍 Địa chỉ: <strong>{DUC_HAI_STORE_INFO.address}</strong>
          </div>
          <div style={{ fontSize: 13.5, color: '#FDE047', fontWeight: 800, marginBottom: 10 }}>
            📞 Điện thoại / Zalo: {DUC_HAI_STORE_INFO.phoneDisplay} ({DUC_HAI_STORE_INFO.phone})
          </div>
          <div style={{ fontSize: 12, color: '#94A3B8' }}>
            Thiết kế & Tích hợp Hệ thống Thương mại Điện tử bởi <strong>Công ty Truyền thông K94</strong>
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* POPUP GIỎ HÀNG NHANH KHI BẤM NÚT TRÊN THANH TOPBAR                */}
      {/* ================================================================ */}
      {showCartModal && (
        <div
          onClick={() => setShowCartModal(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(0,0,0,0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: 540,
              maxHeight: '88vh',
              overflowY: 'auto',
              background: '#071728',
              border: '2px solid #FACC15',
              borderRadius: 18,
              padding: 20
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <h3 style={{ margin: 0, fontSize: 18, color: '#FACC15', fontWeight: 900 }}>
                🛒 Giỏ Hàng Đức Hải Fishing ({cartTotalCount})
              </h3>
              <button
                type="button"
                onClick={() => setShowCartModal(false)}
                style={{
                  background: 'transparent',
                  border: '1px solid #64748B',
                  color: '#FFF',
                  borderRadius: 8,
                  padding: '4px 10px',
                  cursor: 'pointer'
                }}
              >
                ✕ Đóng
              </button>
            </div>

            {cart.length === 0 ? (
              <p style={{ color: '#94A3B8', textAlign: 'center', padding: 20 }}>
                Chưa có sản phẩm nào trong giỏ hàng.
              </p>
            ) : (
              <>
                <div style={{ display: 'grid', gap: 8, marginBottom: 14 }}>
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: 10,
                        background: '#0B2138',
                        borderRadius: 10
                      }}
                    >
                      <div style={{ fontSize: 12.5, fontWeight: 700, color: '#F8FAFC', flex: 1, paddingRight: 8 }}>
                        {item.name}
                        <div style={{ color: '#FACC15', fontWeight: 800, marginTop: 2 }}>
                          {item.priceDisplay} × {item.qty}
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <button
                          type="button"
                          onClick={() => updateCartQty(item.id, -1)}
                          style={{ width: 26, height: 26, borderRadius: 6, cursor: 'pointer' }}
                        >
                          -
                        </button>
                        <span style={{ fontWeight: 800 }}>{item.qty}</span>
                        <button
                          type="button"
                          onClick={() => updateCartQty(item.id, 1)}
                          style={{ width: 26, height: 26, borderRadius: 6, cursor: 'pointer' }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '10px 12px',
                    background: 'rgba(250,204,21,0.15)',
                    borderRadius: 10,
                    marginBottom: 14
                  }}
                >
                  <span style={{ fontWeight: 800 }}>Tổng cộng:</span>
                  <span style={{ fontWeight: 900, color: '#FACC15', fontSize: 18 }}>
                    {cartTotalPrice.toLocaleString('vi-VN')}đ
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <a
                    href="#gio-hang-duc-hai"
                    onClick={() => setShowCartModal(false)}
                    style={{
                      padding: '11px',
                      borderRadius: 10,
                      background: '#38BDF8',
                      color: '#090D16',
                      fontWeight: 900,
                      textAlign: 'center',
                      textDecoration: 'none',
                      fontSize: 13
                    }}
                  >
                    📝 Nhập Địa Chỉ Nhận Hàng
                  </a>
                  <button
                    type="button"
                    onClick={handleSendOrderZalo}
                    style={{
                      padding: '11px',
                      borderRadius: 10,
                      background: '#FACC15',
                      color: '#090D16',
                      fontWeight: 900,
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: 13
                    }}
                  >
                    💬 Đặt Ngay Qua Zalo
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
