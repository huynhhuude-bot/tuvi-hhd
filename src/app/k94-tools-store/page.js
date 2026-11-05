'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  K94_STORE_INFO,
  K94_STORE_CATEGORIES,
  DEFAULT_K94_TOOLS_PRODUCTS,
  K94_SOLUTION_ADVISOR,
  loadK94ToolsProducts,
  saveK94ToolsProducts
} from '../../data/k94ToolsStoreData';
import {
  isAdminAuthenticated,
  buildVietQrUrl
} from '../../data/monetizationData';

export default function K94ToolsStorePage() {
  const [products, setProducts] = useState(DEFAULT_K94_TOOLS_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedAdvisorId, setSelectedAdvisorId] = useState('creator-mmo');
  const [cart, setCart] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  // Customer Checkout Form
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerContact, setCustomerContact] = useState('');
  const [deploymentMode, setDeploymentMode] = useState('ULTRAVIEWER_KEY');
  const [customerNote, setCustomerNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('QR');

  // Admin Quick Add Form
  const [showAdminAdd, setShowAdminAdd] = useState(false);
  const [newProd, setNewProd] = useState({
    name: '',
    category: 'video-ai',
    price: 590000,
    originalPriceDisplay: '990.000đ',
    licenseType: 'Key Bản Quyền 1 Năm',
    partnerName: 'K94 Media & Đối Tác',
    badge: 'Tool Mới',
    specs: 'Hỗ trợ cài đặt qua UltraViewer · Bảo hành & cập nhật tự động',
    desc: '',
    image: ''
  });

  useEffect(() => {
    setProducts(loadK94ToolsProducts());
    setIsAdmin(isAdminAuthenticated());
    try {
      const savedCart = localStorage.getItem('hhd_k94_tools_cart_v1');
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) setCart(parsed);
      }
    } catch {}
  }, []);

  const saveCart = (nextCart) => {
    setCart(nextCart);
    try {
      localStorage.setItem('hhd_k94_tools_cart_v1', JSON.stringify(nextCart));
    } catch {}
  };

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3400);
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
          licenseType: product.licenseType,
          partnerName: product.partnerName,
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
      showToast(`🚀 Đã thêm "${product.name.slice(0, 38)}..." vào giỏ hàng!`);
    }
  };

  const addComboToCart = (recommendedIds) => {
    const itemsToAdd = products.filter((p) => recommendedIds.includes(p.id));
    if (itemsToAdd.length === 0) return;
    let nextCart = [...cart];
    itemsToAdd.forEach((product) => {
      const idx = nextCart.findIndex((item) => item.id === product.id);
      if (idx === -1) {
        nextCart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          priceDisplay: product.priceDisplay,
          licenseType: product.licenseType,
          partnerName: product.partnerName,
          image: product.image,
          categoryLabel: product.categoryLabel,
          qty: 1
        });
      }
    });
    saveCart(nextCart);
    showToast(`🎁 Đã thêm trọn bộ ${itemsToAdd.length} giải pháp đề xuất vào giỏ hàng!`);
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
        (p.partnerName && p.partnerName.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });

    if (sortBy === 'price-asc') {
      list = [...list].sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === 'price-desc') {
      list = [...list].sort((a, b) => (b.price || 0) - (a.price || 0));
    }
    return list;
  }, [products, selectedCategory, searchQuery, sortBy]);

  const activeAdvisor = useMemo(
    () => K94_SOLUTION_ADVISOR.find((a) => a.id === selectedAdvisorId) || K94_SOLUTION_ADVISOR[0],
    [selectedAdvisorId]
  );

  const advisorProducts = useMemo(
    () => products.filter((p) => activeAdvisor.recommendedIds.includes(p.id)),
    [products, activeAdvisor]
  );

  const deploymentLabel =
    deploymentMode === 'ULTRAVIEWER_KEY'
      ? 'Cấp Key Bản Quyền + Cài đặt từ xa qua UltraViewer / AnyDesk'
      : deploymentMode === 'SOURCE_CODE'
      ? 'Bàn giao Source Code / Thiết kế Web-App riêng theo yêu cầu'
      : 'Đăng ký Gói Dịch Vụ Truyền Thông / Quảng Cáo K94';

  const buildOrderSummaryText = () => {
    const lines = [
      '🚀 ĐƠN ĐĂNG KÝ TOOL, APP & DỊCH VỤ SỐ — K94 MEDIA & ĐỐI TÁC',
      `📞 Hotline/Zalo Tiếp Nhận: ${K94_STORE_INFO.phoneDisplay}`,
      '----------------------------------------',
      `👤 Khách hàng / Đơn vị: ${customerName || 'Khách đặt trên Web K94'}`,
      `📱 SĐT / Zalo nhận Key: ${customerPhone || 'Chưa nhập'}`,
      `💻 Email / ID UltraViewer: ${customerContact || 'Trao đổi qua Zalo'}`,
      `⚙️ Hình thức triển khai: ${deploymentLabel}`,
      `📝 Ghi chú yêu cầu: ${customerNote || 'Không có'}`,
      `💳 Thanh toán: ${paymentMethod === 'QR' ? 'Chuyển khoản VietQR K94' : 'Trao đổi & Thanh toán sau khi cài đặt Demo'}`,
      '----------------------------------------',
      '📦 DANH SÁCH TOOL / APP / DỊCH VỤ ĐĂNG KÝ:'
    ];
    cart.forEach((item, idx) => {
      const lineTotal = ((Number(item.price) || 0) * item.qty).toLocaleString('vi-VN') + 'đ';
      lines.push(
        `${idx + 1}. ${item.name} [${item.licenseType || 'Bản quyền'}] — SL: ${item.qty} × ${item.priceDisplay} = ${lineTotal}`
      );
    });
    lines.push('----------------------------------------');
    lines.push(`💰 TỔNG CỘNG THANH TOÁN: ${cartTotalPrice.toLocaleString('vi-VN')}đ`);
    return lines.join('\n');
  };

  const handleSendOrderZalo = async () => {
    if (cart.length === 0) {
      showToast('Giỏ hàng đang trống! Hãy chọn Tool, App hoặc Dịch vụ trước.');
      return;
    }
    const orderText = buildOrderSummaryText();
    try {
      await navigator.clipboard.writeText(orderText);
      showToast('✅ Đã sao chép phiếu đăng ký! Đang mở Zalo K94 (0983.339.397) để bạn dán gửi...');
    } catch {
      showToast('Đang mở Zalo K94 (0983.339.397)...');
    }
    setTimeout(() => {
      window.open(K94_STORE_INFO.zaloUrl, '_blank', 'noopener,noreferrer');
    }, 600);
  };

  const handleCopyOrder = async () => {
    const orderText = buildOrderSummaryText();
    try {
      await navigator.clipboard.writeText(orderText);
      showToast('📋 Đã sao chép chi tiết đơn đăng ký vào bộ nhớ tạm!');
    } catch {
      showToast('Không thể sao chép tự động.');
    }
  };

  const handleQuickSingleDemoZalo = async (product) => {
    const msg = `🚀 Chào Công ty Truyền thông K94 (${K94_STORE_INFO.phoneDisplay})!\nTôi quan tâm đến sản phẩm/dịch vụ:\n- Tên: ${product.name}\n- Gói: ${product.licenseType || 'Bản quyền'}\n- Giá niêm yết: ${product.priceDisplay}\n- Đơn vị phát triển: ${product.partnerName || 'K94 Media'}\nXin tư vấn chi tiết và gửi bản Demo / Hướng dẫn kích hoạt giúp tôi!`;
    try {
      await navigator.clipboard.writeText(msg);
      showToast('✅ Đã chép thông tin Tool/Dịch vụ! Đang mở Zalo K94 (0983.339.397)...');
    } catch {}
    setTimeout(() => {
      window.open(K94_STORE_INFO.zaloUrl, '_blank', 'noopener,noreferrer');
    }, 450);
  };

  const handlePartnerRegisterZalo = async () => {
    const msg = `🤝 Chào Công ty Truyền thông K94 (${K94_STORE_INFO.phoneDisplay})!\nTôi muốn đăng ký HỢP TÁC ĐỐI TÁC / ĐẠI LÝ PHÂN PHỐI TOOL, APP & DỊCH VỤ SỐ cùng K94 Media (Chiết khấu đại lý / Đưa sản phẩm lên chợ K94 Digital Store).\nXin gửi chính sách hợp tác giúp tôi!`;
    try {
      await navigator.clipboard.writeText(msg);
      showToast('✅ Đã sao chép nội dung đăng ký Đối tác! Đang mở Zalo K94...');
    } catch {}
    setTimeout(() => {
      window.open(K94_STORE_INFO.zaloUrl, '_blank', 'noopener,noreferrer');
    }, 450);
  };

  const handleAdminAddProduct = (e) => {
    e.preventDefault();
    if (!newProd.name.trim()) return;
    const catObj = K94_STORE_CATEGORIES.find((c) => c.id === newProd.category);
    const priceNum = Number(newProd.price) || 500000;
    const item = {
      id: 'k94-custom-' + Date.now(),
      name: newProd.name.trim(),
      category: newProd.category,
      categoryLabel: catObj ? catObj.label.replace(/^[^\s]+\s/, '') : 'Tool & Dịch Vụ K94',
      price: priceNum,
      priceDisplay: priceNum.toLocaleString('vi-VN') + 'đ',
      originalPriceDisplay:
        newProd.originalPriceDisplay || Math.round(priceNum * 1.4).toLocaleString('vi-VN') + 'đ',
      licenseType: newProd.licenseType || 'Bản quyền K94',
      partnerName: newProd.partnerName || 'K94 Media & Đối Tác',
      badge: newProd.badge || 'Mới Ra Mắt',
      specs: newProd.specs || 'Hỗ trợ cài đặt 1-1 qua UltraViewer · Bảo hành 24/7',
      desc: newProd.desc || 'Giải pháp công nghệ & truyền thông do K94 và đối tác phát triển.',
      image: newProd.image.trim() || DEFAULT_K94_TOOLS_PRODUCTS[0].image
    };
    const next = [item, ...products];
    setProducts(next);
    saveK94ToolsProducts(next);
    setNewProd({
      name: '',
      category: 'video-ai',
      price: 590000,
      originalPriceDisplay: '990.000đ',
      licenseType: 'Key Bản Quyền 1 Năm',
      partnerName: 'K94 Media & Đối Tác',
      badge: 'Tool Mới',
      specs: 'Hỗ trợ cài đặt qua UltraViewer · Bảo hành & cập nhật tự động',
      desc: '',
      image: ''
    });
    setShowAdminAdd(false);
    showToast('✅ Đã đăng thêm Tool / App / Dịch vụ mới lên Chợ K94!');
  };

  const handleAdminDeleteProduct = (id) => {
    const next = products.filter((p) => p.id !== id);
    setProducts(next);
    saveK94ToolsProducts(next);
    showToast('Đã xóa mục khỏi danh sách.');
  };

  const handleAdminResetDefault = () => {
    setProducts(DEFAULT_K94_TOOLS_PRODUCTS);
    saveK94ToolsProducts(DEFAULT_K94_TOOLS_PRODUCTS);
    showToast('Đã khôi phục 12 Tool, App & Dịch vụ mặc định của K94.');
  };

  const vietQrUrl = buildVietQrUrl(
    {
      bankCode: 'MB',
      accountNo: '0983339397',
      accountName: 'CONG TY TRUYEN THONG K94',
      message: `K94 TOOL ${customerPhone || 'CAP KEY'}`
    },
    cartTotalPrice > 0 ? cartTotalPrice : 490000
  );

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #060916 0%, #0C142C 45%, #070B18 100%)',
        color: '#F8FAFC',
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
            background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
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

      {/* Top Sticky Header Bar */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'rgba(7, 11, 24, 0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(168, 85, 247, 0.35)',
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
                🚀 K94 DIGITAL STORE — TOOL AI · APP · DỊCH VỤ SỐ
              </div>
              <div style={{ fontSize: 11, color: '#C4B5FD' }}>
                🤝 {K94_STORE_INFO.partnerUnit} · 📞 Hotline/Zalo: {K94_STORE_INFO.phoneDisplay}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <a
              href={`tel:${K94_STORE_INFO.phone}`}
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
              📞 Hotline: {K94_STORE_INFO.phoneDisplay}
            </a>

            <a
              href={K94_STORE_INFO.zaloUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                padding: '8px 13px',
                borderRadius: 9,
                background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
                border: '1px solid #C4B5FD',
                color: '#FFF',
                fontSize: 12,
                fontWeight: 800,
                textDecoration: 'none'
              }}
            >
              💬 Zalo Tư Vấn & Cấp Key
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
        {/* HERO BANNER — K94 DIGITAL STORE & PARTNER ECOSYSTEM              */}
        {/* ================================================================ */}
        <div
          style={{
            borderRadius: 22,
            background:
              'radial-gradient(circle at 85% 18%, rgba(168, 85, 247, 0.25), transparent 55%), linear-gradient(135deg, #0D132A 0%, #17153B 55%, #090D1C 100%)',
            border: '2px solid rgba(250, 204, 21, 0.55)',
            padding: '28px 26px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
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
                background: 'rgba(168, 85, 247, 0.2)',
                border: '1px solid #C084FC',
                color: '#E9D5FF',
                fontSize: 12,
                fontWeight: 800,
                marginBottom: 12
              }}
            >
              👑 HỆ SINH THÁI PHẦN MỀM, AI & TRUYỀN THÔNG K94 MEDIA × ĐỐI TÁC
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-serif, serif)',
                fontSize: 'clamp(23px, 3.4vw, 34px)',
                fontWeight: 900,
                color: '#FACC15',
                lineHeight: 1.25,
                margin: '0 0 10px 0',
                textShadow: '0 2px 12px rgba(0,0,0,0.5)'
              }}
            >
              {K94_STORE_INFO.name}
            </h1>

            <p style={{ fontSize: 14.5, color: '#E2E8F0', lineHeight: 1.6, margin: '0 0 16px 0', fontWeight: 600 }}>
              {K94_STORE_INFO.tagline}
            </p>

            <div
              style={{
                background: 'rgba(7, 11, 22, 0.82)',
                border: '1px solid rgba(168, 85, 247, 0.4)',
                borderRadius: 14,
                padding: '14px 16px',
                marginBottom: 18,
                display: 'grid',
                gap: 8
              }}
            >
              <div style={{ fontSize: 13.5, color: '#F8FAFC' }}>
                🤝 <strong style={{ color: '#C084FC' }}>Đơn vị phát triển & phân phối:</strong>{' '}
                <strong>{K94_STORE_INFO.partnerUnit}</strong>
              </div>
              <div style={{ fontSize: 13.5, color: '#F8FAFC' }}>
                📞 <strong style={{ color: '#FACC15' }}>Hotline / Zalo Cấp Key & Tư Vấn Giải Pháp:</strong>{' '}
                <a
                  href={`tel:${K94_STORE_INFO.phone}`}
                  style={{ color: '#FDE047', fontWeight: 900, fontSize: 16, textDecoration: 'none' }}
                >
                  {K94_STORE_INFO.phoneDisplay} ({K94_STORE_INFO.phone})
                </a>
              </div>
              <div style={{ fontSize: 13, color: '#86EFAC' }}>
                ⚡ <strong>Cam kết hỗ trợ:</strong> {K94_STORE_INFO.supportPolicy}
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              <a
                href={K94_STORE_INFO.zaloUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  padding: '12px 20px',
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, #FACC15, #CA8A04)',
                  color: '#090D16',
                  fontWeight: 900,
                  fontSize: 13.5,
                  textDecoration: 'none',
                  boxShadow: '0 6px 20px rgba(250, 204, 21, 0.35)'
                }}
              >
                💬 Nhắn Zalo Nhận Bản Demo & Báo Giá ({K94_STORE_INFO.phoneDisplay})
              </a>

              <button
                type="button"
                onClick={handlePartnerRegisterZalo}
                style={{
                  padding: '12px 18px',
                  borderRadius: 12,
                  background: 'rgba(139, 92, 246, 0.25)',
                  border: '1px solid #C084FC',
                  color: '#F3E8FF',
                  fontWeight: 800,
                  fontSize: 13.5,
                  cursor: 'pointer'
                }}
              >
                🤝 Đăng Ký Hợp Tác Cùng K94
              </button>
            </div>
          </div>

          {/* Right Hero Showcase: 4 Flagship Tools & Services */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 10
            }}
          >
            {DEFAULT_K94_TOOLS_PRODUCTS.slice(0, 4).map((item) => (
              <div
                key={item.id}
                onClick={() => addToCart(item, false)}
                style={{
                  background: 'rgba(10, 15, 30, 0.92)',
                  border: '1px solid rgba(250, 204, 21, 0.38)',
                  borderRadius: 14,
                  overflow: 'hidden',
                  cursor: 'pointer'
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
                    <span style={{ fontSize: 10, color: '#C084FC', fontWeight: 700 }}>+ Chọn mua</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================================================================ */}
        {/* TRỢ LÝ TƯ VẤN COMBO GIẢI PHÁP THEO NHU CẦU (SOLUTION ADVISOR)    */}
        {/* ================================================================ */}
        <div
          style={{
            borderRadius: 18,
            background: 'linear-gradient(135deg, rgba(20, 24, 52, 0.94), rgba(11, 15, 32, 0.96))',
            border: '1px solid rgba(168, 85, 247, 0.45)',
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
              marginBottom: 14
            }}
          >
            <div>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: '#C084FC',
                  textTransform: 'uppercase',
                  letterSpacing: 0.6
                }}
              >
                💡 CỐ VẤN GIẢI PHÁP CÔNG NGHỆ & TRUYỀN THÔNG K94
              </span>
              <h2 style={{ margin: '4px 0 0 0', fontSize: 18, color: '#FACC15', fontWeight: 800 }}>
                Chọn Mô Hình Của Bạn Để Xem Combo Tool + Dịch Vụ Tối Ưu Nhất
              </h2>
            </div>

            <button
              type="button"
              onClick={() => addComboToCart(activeAdvisor.recommendedIds)}
              style={{
                padding: '9px 16px',
                borderRadius: 10,
                background: 'linear-gradient(135deg, #10B981, #059669)',
                border: '1px solid #6EE7B7',
                color: '#FFF',
                fontWeight: 900,
                fontSize: 12.5,
                cursor: 'pointer'
              }}
            >
              ⚡ Thêm Trọn Bộ Giải Pháp Này Vào Giỏ
            </button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 10,
              marginBottom: 14
            }}
          >
            {K94_SOLUTION_ADVISOR.map((adv) => {
              const active = adv.id === selectedAdvisorId;
              return (
                <button
                  key={adv.id}
                  type="button"
                  onClick={() => setSelectedAdvisorId(adv.id)}
                  style={{
                    textAlign: 'left',
                    padding: '12px 14px',
                    borderRadius: 12,
                    border: active ? '2px solid #FACC15' : '1px solid rgba(148,163,184,0.25)',
                    background: active ? 'rgba(250, 204, 21, 0.14)' : 'rgba(9, 13, 26, 0.75)',
                    color: '#F8FAFC',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ fontSize: 13.5, fontWeight: 900, color: active ? '#FACC15' : '#E2E8F0' }}>
                    {adv.title}
                  </div>
                  <div style={{ fontSize: 11.5, color: '#94A3B8', marginTop: 4, lineHeight: 1.4 }}>
                    {adv.summary}
                  </div>
                </button>
              );
            })}
          </div>

          <div
            style={{
              padding: '12px 14px',
              borderRadius: 12,
              background: 'rgba(8, 12, 24, 0.85)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 10
            }}
          >
            <div style={{ fontSize: 12.5, color: '#BAE6FD' }}>
              🎯 <strong>Hiệu quả kỳ vọng:</strong> {activeAdvisor.savingNote}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {advisorProducts.map((p) => (
                <span
                  key={p.id}
                  onClick={() => addToCart(p, false)}
                  style={{
                    fontSize: 11.5,
                    padding: '4px 10px',
                    borderRadius: 99,
                    background: 'rgba(250, 204, 21, 0.16)',
                    border: '1px solid rgba(250, 204, 21, 0.45)',
                    color: '#FDE047',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  + {p.name.slice(0, 32)}... ({p.priceDisplay})
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ================================================================ */}
        {/* ADMIN QUICK ADD PANEL (CHỈ HIỆN KHI ĐĂNG NHẬP QUẢN TRỊ K94)      */}
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
                🔐 Chế Độ Quản Trị Viên K94 Digital Store (Đã xác thực Admin)
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
                  {showAdminAdd ? 'Đóng Khung Thêm' : '+ Đăng Thêm Tool / App / Dịch Vụ Mới'}
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
                  placeholder="Tên Tool / App / Dịch vụ mới..."
                  value={newProd.name}
                  onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                  style={{
                    padding: '9px 12px',
                    borderRadius: 8,
                    background: '#09131F',
                    border: '1px solid #C084FC',
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
                    border: '1px solid #C084FC',
                    color: '#FFF'
                  }}
                >
                  {K94_STORE_CATEGORIES.filter((c) => c.id !== 'ALL').map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="Giá bán (VNĐ), VD: 590000"
                  value={newProd.price}
                  onChange={(e) => setNewProd({ ...newProd, price: e.target.value })}
                  style={{
                    padding: '9px 12px',
                    borderRadius: 8,
                    background: '#09131F',
                    border: '1px solid #C084FC',
                    color: '#FFF'
                  }}
                />
                <input
                  type="text"
                  placeholder="Loại bản quyền (VD: Key 1 Năm / Trọn đời)"
                  value={newProd.licenseType}
                  onChange={(e) => setNewProd({ ...newProd, licenseType: e.target.value })}
                  style={{
                    padding: '9px 12px',
                    borderRadius: 8,
                    background: '#09131F',
                    border: '1px solid #C084FC',
                    color: '#FFF'
                  }}
                />
                <input
                  type="text"
                  placeholder="Đơn vị hợp tác (VD: K94 × Đối tác...)"
                  value={newProd.partnerName}
                  onChange={(e) => setNewProd({ ...newProd, partnerName: e.target.value })}
                  style={{
                    padding: '9px 12px',
                    borderRadius: 8,
                    background: '#09131F',
                    border: '1px solid #C084FC',
                    color: '#FFF'
                  }}
                />
                <input
                  type="text"
                  placeholder="Tính năng nổi bật (specs)..."
                  value={newProd.specs}
                  onChange={(e) => setNewProd({ ...newProd, specs: e.target.value })}
                  style={{
                    padding: '9px 12px',
                    borderRadius: 8,
                    background: '#09131F',
                    border: '1px solid #C084FC',
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
                  💾 Đăng Lên K94 Store
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
            background: 'rgba(11, 16, 34, 0.92)',
            border: '1px solid rgba(250, 204, 21, 0.3)',
            borderRadius: 16,
            padding: 16,
            marginBottom: 22
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 8,
              marginBottom: 14
            }}
          >
            {K94_STORE_CATEGORIES.map((cat) => {
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
                    fontSize: 12.5,
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
                      background: active ? 'rgba(0,0,0,0.2)' : 'rgba(168, 85, 247, 0.2)',
                      color: active ? '#090D16' : '#E9D5FF'
                    }}
                  >
                    {cat.countBadge}
                  </span>
                </button>
              );
            })}
          </div>

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
              placeholder="🔍 Tìm kiếm HHD CapCut, Remotion, Tool tải video Douyin/TikTok, Chatbot AI, Thiết kế Web, Quảng cáo..."
              style={{
                width: '100%',
                padding: '11px 14px',
                borderRadius: 10,
                background: '#060A17',
                border: '1px solid rgba(168, 85, 247, 0.45)',
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
                background: '#060A17',
                border: '1px solid rgba(250, 204, 21, 0.4)',
                color: '#FDE047',
                fontWeight: 700,
                fontSize: 13
              }}
            >
              <option value="featured">🔥 Nổi bật & Bán chạy nhất</option>
              <option value="price-asc">💰 Giá: Thấp đến Cao</option>
              <option value="price-desc">💎 Giá: Cao đến Thấp</option>
            </select>
          </div>
        </div>

        {/* ================================================================ */}
        {/* PRODUCT GRID (DANH SÁCH TOOL, APP & DỊCH VỤ K94 × ĐỐI TÁC)       */}
        {/* ================================================================ */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(275px, 1fr))',
            gap: 18,
            marginBottom: 32
          }}
        >
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              style={{
                background: 'rgba(11, 17, 34, 0.96)',
                border: '1px solid rgba(250, 204, 21, 0.32)',
                borderRadius: 18,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 12px 30px rgba(0,0,0,0.5)'
              }}
            >
              <div>
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
                        background: 'linear-gradient(135deg, #7C3AED, #4F46E5)',
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

                <div style={{ padding: '14px 15px 10px' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 6,
                      marginBottom: 5
                    }}
                  >
                    <span style={{ fontSize: 10.5, color: '#C084FC', fontWeight: 800 }}>
                      {product.categoryLabel}
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        color: '#93C5FD',
                        background: 'rgba(56, 189, 248, 0.12)',
                        padding: '2px 7px',
                        borderRadius: 6,
                        fontWeight: 700
                      }}
                    >
                      🤝 {product.partnerName || 'K94 Media'}
                    </span>
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
                      background: 'rgba(168, 85, 247, 0.12)',
                      border: '1px solid rgba(168, 85, 247, 0.3)',
                      fontSize: 11.5,
                      color: '#E9D5FF',
                      fontWeight: 600,
                      marginBottom: 8
                    }}
                  >
                    ⚡ {product.specs}
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
                    marginBottom: 6
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
                  <span style={{ fontSize: 10.5, color: '#4ADE80', fontWeight: 700 }}>
                    🔑 {product.licenseType || 'Bản quyền'}
                  </span>
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
                    onClick={() => handleQuickSingleDemoZalo(product)}
                    style={{
                      padding: '9px 10px',
                      borderRadius: 9,
                      background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
                      border: '1px solid #C4B5FD',
                      color: '#FFF',
                      fontWeight: 800,
                      fontSize: 12,
                      cursor: 'pointer'
                    }}
                  >
                    💬 Nhận Demo / Mua
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
                    🗑️ Xóa mục này (Admin)
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ================================================================ */}
        {/* KHU VỰC GIỎ HÀNG & ĐĂNG KÝ CẤP BẢN QUYỀN / ĐẶT DỊCH VỤ K94       */}
        {/* ================================================================ */}
        <div
          id="gio-hang-k94"
          style={{
            borderRadius: 20,
            background: 'linear-gradient(135deg, #0D142E 0%, #080C1C 100%)',
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
                🛒 Giỏ Hàng & Đăng Ký Kích Hoạt Bản Quyền / Đặt Dịch Vụ K94
              </h2>
              <div style={{ fontSize: 13, color: '#C4B5FD', marginTop: 4 }}>
                Hỗ trợ cài đặt trực tiếp qua UltraViewer / AnyDesk · Bàn giao Key & Hợp đồng dịch vụ qua Zalo{' '}
                <strong>{K94_STORE_INFO.phoneDisplay}</strong>
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
                background: 'rgba(6, 10, 22, 0.7)',
                borderRadius: 14,
                border: '1px dashed rgba(250, 204, 21, 0.35)'
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 8 }}>🚀</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#E2E8F0' }}>
                Giỏ hàng của bạn đang trống. Hãy chọn Tool AI, App hoặc Dịch vụ bên trên để đăng ký!
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
                      background: 'rgba(7, 11, 24, 0.9)',
                      border: '1px solid rgba(168, 85, 247, 0.35)'
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
                        <div style={{ fontSize: 11.5, color: '#FACC15', fontWeight: 700 }}>
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
                    Tổng cộng ({cartTotalCount} mục):
                  </span>
                  <span style={{ fontSize: 22, fontWeight: 900, color: '#FACC15' }}>
                    {cartTotalPrice.toLocaleString('vi-VN')}đ
                  </span>
                </div>
              </div>

              {/* Right: Customer Info & VietQR / Zalo */}
              <div
                style={{
                  background: 'rgba(7, 11, 24, 0.9)',
                  border: '1px solid rgba(250, 204, 21, 0.35)',
                  borderRadius: 14,
                  padding: 16,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10
                }}
              >
                <div style={{ fontSize: 14, fontWeight: 800, color: '#FACC15' }}>
                  🔑 Thông Tin Nhận Bản Quyền & Triển Khai Dịch Vụ
                </div>

                <input
                  type="text"
                  placeholder="Họ và tên / Tên Cửa hàng hoặc Công ty..."
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  style={{
                    padding: '10px 12px',
                    borderRadius: 8,
                    background: '#0B1224',
                    border: '1px solid rgba(148,163,184,0.35)',
                    color: '#FFF'
                  }}
                />

                <input
                  type="tel"
                  placeholder="Số điện thoại / Zalo nhận Key kích hoạt (Bắt buộc)..."
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  style={{
                    padding: '10px 12px',
                    borderRadius: 8,
                    background: '#0B1224',
                    border: '1px solid rgba(148,163,184,0.35)',
                    color: '#FFF'
                  }}
                />

                <input
                  type="text"
                  placeholder="Email nhận bản quyền hoặc ID UltraViewer / AnyDesk (Nếu cần cài từ xa)..."
                  value={customerContact}
                  onChange={(e) => setCustomerContact(e.target.value)}
                  style={{
                    padding: '10px 12px',
                    borderRadius: 8,
                    background: '#0B1224',
                    border: '1px solid rgba(148,163,184,0.35)',
                    color: '#FFF'
                  }}
                />

                <select
                  value={deploymentMode}
                  onChange={(e) => setDeploymentMode(e.target.value)}
                  style={{
                    padding: '10px 12px',
                    borderRadius: 8,
                    background: '#0B1224',
                    border: '1px solid rgba(168,85,247,0.45)',
                    color: '#E9D5FF',
                    fontWeight: 700
                  }}
                >
                  <option value="ULTRAVIEWER_KEY">
                    🔑 Cấp Key Bản Quyền + Hỗ trợ cài đặt qua UltraViewer
                  </option>
                  <option value="SOURCE_CODE">
                    💻 Bàn giao Source Code / Thiết kế Web & App theo yêu cầu riêng
                  </option>
                  <option value="MEDIA_SERVICE">
                    📢 Đăng ký Gói Dịch Vụ Truyền Thông, Thiết Kế & Quảng Cáo K94
                  </option>
                </select>

                <input
                  type="text"
                  placeholder="Ghi chú thêm yêu cầu riêng của bạn..."
                  value={customerNote}
                  onChange={(e) => setCustomerNote(e.target.value)}
                  style={{
                    padding: '10px 12px',
                    borderRadius: 8,
                    background: '#0B1224',
                    border: '1px solid rgba(148,163,184,0.35)',
                    color: '#FFF'
                  }}
                />

                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <label style={{ fontSize: 12.5, color: '#E2E8F0', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="k94Pay"
                      checked={paymentMethod === 'QR'}
                      onChange={() => setPaymentMethod('QR')}
                    />{' '}
                    🏦 Quét mã VietQR K94 (Kích hoạt ngay)
                  </label>
                  <label style={{ fontSize: 12.5, color: '#E2E8F0', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="k94Pay"
                      checked={paymentMethod === 'DEMO'}
                      onChange={() => setPaymentMethod('DEMO')}
                    />{' '}
                    💬 Tư vấn & Cài Demo trước qua Zalo
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
                      alt="VietQR Công ty Truyền thông K94"
                      style={{ maxWidth: 185, height: 'auto', margin: '0 auto', display: 'block' }}
                    />
                    <div style={{ fontSize: 11.5, fontWeight: 800, marginTop: 4 }}>
                      STK: 0983339397 — CONG TY TRUYEN THONG K94
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
                    🚀 Gửi Phiếu Đăng Ký Qua Zalo 0983.339.397
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyOrder}
                    style={{
                      padding: '12px 14px',
                      borderRadius: 10,
                      background: 'rgba(168, 85, 247, 0.2)',
                      border: '1px solid #C084FC',
                      color: '#F3E8FF',
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
        {/* CHƯƠNG TRÌNH HỢP TÁC ĐỐI TÁC & ĐẠI LÝ PHÂN PHỐI CÙNG K94         */}
        {/* ================================================================ */}
        <div
          style={{
            borderRadius: 20,
            background: 'linear-gradient(135deg, rgba(88, 28, 135, 0.35), rgba(15, 23, 42, 0.95))',
            border: '1.5px solid rgba(192, 132, 252, 0.5)',
            padding: '22px 24px',
            marginBottom: 24,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16
          }}
        >
          <div style={{ maxWidth: 740 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: '#C084FC', marginBottom: 4 }}>
              🤝 MỞ RỘNG HỆ SINH THÁI K94 MEDIA & PARTNERS
            </div>
            <h3 style={{ margin: '0 0 6px 0', fontSize: 19, color: '#FACC15', fontWeight: 900 }}>
              Bạn Có Tool/App Hay Muốn Đưa Lên Chợ K94 Hoặc Làm Đại Lý Phân Phối?
            </h3>
            <p style={{ margin: 0, fontSize: 13.5, color: '#E2E8F0', lineHeight: 1.55 }}>
              Công ty Truyền thông K94 luôn chào đón các lập trình viên, đội ngũ làm Tool AI/MMO và Cộng tác viên Affiliate hợp tác phân phối sản phẩm trên hệ thống với chiết khấu hoa hồng từ <strong>30% – 50%</strong>.
            </p>
          </div>

          <button
            type="button"
            onClick={handlePartnerRegisterZalo}
            style={{
              padding: '12px 20px',
              borderRadius: 12,
              background: 'linear-gradient(135deg, #A855F7, #6366F1)',
              border: '1px solid #FACC15',
              color: '#FFF',
              fontWeight: 900,
              fontSize: 13.5,
              cursor: 'pointer'
            }}
          >
            💬 Liên Hệ Hợp Tác Đối Tác (0983.339.397)
          </button>
        </div>

        {/* Footer */}
        <div
          style={{
            borderRadius: 18,
            background: 'rgba(7, 11, 24, 0.9)',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            padding: '20px 22px',
            textAlign: 'center'
          }}
        >
          <div style={{ fontSize: 17, fontWeight: 900, color: '#FACC15', marginBottom: 6 }}>
            🚀 {K94_STORE_INFO.name}
          </div>
          <div style={{ fontSize: 13.5, color: '#E2E8F0', marginBottom: 4 }}>
            Đơn vị vận hành: <strong>{K94_STORE_INFO.partnerUnit}</strong>
          </div>
          <div style={{ fontSize: 13.5, color: '#FDE047', fontWeight: 800, marginBottom: 8 }}>
            📞 Hotline / Zalo Cấp Key & Hỗ Trợ Kỹ Thuật 24/7: {K94_STORE_INFO.phoneDisplay} ({K94_STORE_INFO.phone})
          </div>
        </div>
      </div>

      {/* Popup Cart Modal */}
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
              background: '#0B1226',
              border: '2px solid #FACC15',
              borderRadius: 18,
              padding: 20
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <h3 style={{ margin: 0, fontSize: 18, color: '#FACC15', fontWeight: 900 }}>
                🛒 Giỏ Hàng K94 Digital Store ({cartTotalCount})
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
                Chưa có Tool, App hay Dịch vụ nào trong giỏ hàng.
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
                        background: '#131C38',
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
                    href="#gio-hang-k94"
                    onClick={() => setShowCartModal(false)}
                    style={{
                      padding: '11px',
                      borderRadius: 10,
                      background: '#C084FC',
                      color: '#090D16',
                      fontWeight: 900,
                      textAlign: 'center',
                      textDecoration: 'none',
                      fontSize: 13
                    }}
                  >
                    📝 Điền Thông Tin Nhận Key
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
                    💬 Gửi Đăng Ký Qua Zalo
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
