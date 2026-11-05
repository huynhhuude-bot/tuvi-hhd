'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  DEFAULT_MONETIZATION_CONFIG,
  VIETQR_BANKS,
  loadMonetizationConfig,
  saveMonetizationConfig,
  buildVietQrUrl,
  isAdminAuthenticated,
  verifyAndLoginAdmin,
  logoutAdmin,
  getLockoutState,
  changeAdminCredentials
} from '../../data/monetizationData';

export default function QuanLyKiemTienPage() {
  const [config, setConfig] = useState(DEFAULT_MONETIZATION_CONFIG);
  const [activeTab, setActiveTab] = useState('affiliate'); // 'affiliate' | 'banners' | 'vietqr' | 'security'
  const [savedToast, setSavedToast] = useState(false);

  // Admin Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [loginPassword, setLoginPassword] = useState('');
  const [loginPin, setLoginPin] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [lockoutSeconds, setLockoutSeconds] = useState(0);

  // Change Password / PIN State
  const [currentPassInput, setCurrentPassInput] = useState('');
  const [newPassInput, setNewPassInput] = useState('');
  const [newPinInput, setNewPinInput] = useState('');
  const [secMessage, setSecMessage] = useState({ type: '', text: '' });

  // New Product form
  const [newProd, setNewProd] = useState({
    name: '',
    element: 'Kim',
    price: '299.000đ',
    originalPrice: '490.000đ',
    commissionBadge: 'Pháp Khí Hộ Mệnh',
    icon: '📿',
    benefit: 'Chiêu tài tụ lộc, bổ khuyết Ngũ Hành và hộ thân bình an.',
    shopeeUrl: '',
    tiktokUrl: ''
  });

  useEffect(() => {
    setConfig(loadMonetizationConfig());
    const authed = isAdminAuthenticated();
    setIsAuthenticated(authed);
    setAuthChecked(true);
    const lock = getLockoutState();
    setLockoutSeconds(lock.remainingSeconds || 0);
  }, []);

  // Countdown timer when brute-force lockout is active
  useEffect(() => {
    if (lockoutSeconds <= 0) return;
    const timer = setInterval(() => {
      const lock = getLockoutState();
      setLockoutSeconds(lock.remainingSeconds || 0);
      if (lock.remainingSeconds <= 0) {
        setLoginError('');
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [lockoutSeconds]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const res = verifyAndLoginAdmin(loginPassword, loginPin);
    if (res.ok) {
      setIsAuthenticated(true);
      setLoginError('');
      setLoginPassword('');
      setLoginPin('');
    } else {
      setLoginError(res.error || 'Xác thực thất bại!');
      const lock = getLockoutState();
      setLockoutSeconds(lock.remainingSeconds || 0);
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    setIsAuthenticated(false);
    setLoginPassword('');
    setLoginPin('');
    setLoginError('');
  };

  const handleChangeCredentials = (e) => {
    e.preventDefault();
    const res = changeAdminCredentials(currentPassInput, newPassInput, newPinInput);
    if (res.ok) {
      setSecMessage({
        type: 'success',
        text: '✓ Đã cập nhật Mật khẩu Quản trị & Mã PIN 6 số thành công!'
      });
      setCurrentPassInput('');
      setNewPassInput('');
      setNewPinInput('');
    } else {
      setSecMessage({
        type: 'error',
        text: res.error || 'Không thể đổi mật khẩu.'
      });
    }
  };

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'k94-monetization-config.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJson = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(String(ev.target?.result || '{}'));
        if (parsed && Array.isArray(parsed.products)) {
          setConfig(parsed);
          saveMonetizationConfig(parsed);
          setSavedToast(true);
          setTimeout(() => setSavedToast(false), 2500);
        }
      } catch {
        alert('File cấu hình JSON không hợp lệ!');
      }
    };
    reader.readAsText(file);
  };

  const handleSave = (nextCfg = config) => {
    saveMonetizationConfig(nextCfg);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  const updateProductField = (idx, field, val) => {
    const nextProducts = [...config.products];
    nextProducts[idx] = { ...nextProducts[idx], [field]: val };
    setConfig({ ...config, products: nextProducts });
  };

  const addNewProduct = () => {
    if (!newProd.name.trim()) return;
    const item = {
      ...newProd,
      id: `custom-${Date.now()}`,
      targetElements: [newProd.element]
    };
    const nextCfg = { ...config, products: [item, ...config.products] };
    setConfig(nextCfg);
    saveMonetizationConfig(nextCfg);
    setNewProd({
      name: '',
      element: 'Kim',
      price: '299.000đ',
      originalPrice: '490.000đ',
      commissionBadge: 'Pháp Khí Hộ Mệnh',
      icon: '📿',
      benefit: 'Chiêu tài tụ lộc, bổ khuyết Ngũ Hành và hộ thân bình an.',
      shopeeUrl: '',
      tiktokUrl: ''
    });
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  const removeProduct = (idx) => {
    const nextProducts = config.products.filter((_, i) => i !== idx);
    const nextCfg = { ...config, products: nextProducts };
    setConfig(nextCfg);
    saveMonetizationConfig(nextCfg);
  };

  const updateBannerField = (idx, field, val) => {
    const nextBanners = [...config.banners];
    nextBanners[idx] = { ...nextBanners[idx], [field]: val };
    setConfig({ ...config, banners: nextBanners });
  };

  const updateSidePanelField = (side, idx, field, val) => {
    const currentSide = [...(config.sidePanels?.[side] || [])];
    currentSide[idx] = { ...currentSide[idx], [field]: val };
    setConfig({
      ...config,
      sidePanels: {
        ...(config.sidePanels || DEFAULT_MONETIZATION_CONFIG.sidePanels),
        [side]: currentSide
      }
    });
  };

  const resetDefaults = () => {
    setConfig(DEFAULT_MONETIZATION_CONFIG);
    saveMonetizationConfig(DEFAULT_MONETIZATION_CONFIG);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  if (!authChecked) {
    return <div style={{ minHeight: '100vh', background: '#0B0C10' }} />;
  }

  // ==========================================================================
  // 2-FACTOR SECURITY GATE (Renders when not authenticated)
  // ==========================================================================
  if (!isAuthenticated) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: 'radial-gradient(circle at top, #1A1610 0%, #090A0F 70%)',
          color: '#E2E4E9',
          fontFamily: 'var(--font-sans, sans-serif)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: 460,
            background: 'rgba(18, 20, 28, 0.96)',
            border: '1.5px solid rgba(201, 168, 76, 0.5)',
            borderRadius: 24,
            padding: '34px 28px',
            boxShadow: '0 24px 64px rgba(0, 0, 0, 0.85)'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div
              style={{
                width: 60,
                height: 60,
                margin: '0 auto 14px',
                borderRadius: 16,
                background: 'linear-gradient(135deg, rgba(201,168,76,0.25), rgba(201,168,76,0.06))',
                border: '1px solid #c9a84c',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28
              }}
            >
              🔐
            </div>
            <div
              style={{
                display: 'inline-block',
                padding: '3px 12px',
                borderRadius: 99,
                background: 'rgba(229, 57, 53, 0.16)',
                border: '1px solid rgba(229, 57, 53, 0.4)',
                color: '#FF8A80',
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 1,
                textTransform: 'uppercase',
                marginBottom: 8
              }}
            >
              Khu Vực Quản Trị Bảo Mật 2 Lớp (SHA-256)
            </div>
            <h1 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 24, color: '#F4E3B2', margin: '0 0 6px' }}>
              Xác Thực Admin Công Ty K94
            </h1>
            <p style={{ fontSize: 13, color: '#9DA3B4', margin: 0, lineHeight: 1.5 }}>
              Trang cấu hình Link Affiliate, Banner Quảng Cáo & Tài Khoản Ngân Hàng chỉ dành riêng cho Quản trị viên K94 Media.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} style={{ display: 'grid', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, color: '#c9a84c', fontWeight: 700, marginBottom: 6 }}>
                1. MẬT KHẨU QUẢN TRỊ ADMIN
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  disabled={lockoutSeconds > 0}
                  placeholder="Nhập mật khẩu Quản trị K94..."
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 44px 12px 14px',
                    borderRadius: 12,
                    border: '1px solid rgba(201,168,76,0.4)',
                    background: '#0E1017',
                    color: '#F4E3B2',
                    fontSize: 14
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: 10,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#9DA3B4',
                    cursor: 'pointer',
                    fontSize: 13
                  }}
                >
                  {showPassword ? '🙈' : '👁'}
                </button>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12, color: '#c9a84c', fontWeight: 700, marginBottom: 6 }}>
                2. MÃ PIN BẢO MẬT (6 CHỮ SỐ)
              </label>
              <input
                type="password"
                inputMode="numeric"
                maxLength={6}
                required
                disabled={lockoutSeconds > 0}
                placeholder="••••••"
                value={loginPin}
                onChange={(e) => setLoginPin(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: 12,
                  border: '1px solid rgba(201,168,76,0.4)',
                  background: '#0E1017',
                  color: '#FFD54F',
                  fontSize: 18,
                  letterSpacing: 6,
                  fontWeight: 800,
                  textAlign: 'center'
                }}
              />
            </div>

            {(loginError || lockoutSeconds > 0) && (
              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: 10,
                  background: 'rgba(229, 57, 53, 0.16)',
                  border: '1px solid rgba(229, 57, 53, 0.45)',
                  color: '#FF8A80',
                  fontSize: 12.5,
                  lineHeight: 1.5,
                  textAlign: 'center'
                }}
              >
                {lockoutSeconds > 0
                  ? `⛔ Đã khóa chống dò mật khẩu! Vui lòng đợi ${lockoutSeconds} giây nữa.`
                  : loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={lockoutSeconds > 0}
              style={{
                padding: '13px 20px',
                borderRadius: 12,
                background: lockoutSeconds > 0 ? '#3A3F50' : 'linear-gradient(135deg, #e0c168, #b88928)',
                color: '#0B0C10',
                fontWeight: 800,
                fontSize: 14,
                border: 'none',
                cursor: lockoutSeconds > 0 ? 'not-allowed' : 'pointer'
              }}
            >
              🔓 Mở Khóa Bảng Điều Khiển Quản Trị
            </button>
          </form>

          <div style={{ marginTop: 20, textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 16 }}>
            <Link href="/" style={{ color: '#9DA3B4', fontSize: 13, textDecoration: 'none' }}>
              ← Quay về Trang Chủ HHD Tử Vi
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // AUTHENTICATED ADMIN DASHBOARD
  // ==========================================================================
  return (
    <div style={{ minHeight: '100vh', background: '#0B0C10', color: '#E2E4E9', fontFamily: 'var(--font-sans, sans-serif)', paddingBottom: 80 }}>
      <header style={{ borderBottom: '1px solid rgba(201,168,76,0.2)', background: 'rgba(11,12,16,0.92)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: '#E8D5A3' }}>
            <span style={{ width: 32, height: 32, borderRadius: 6, background: 'linear-gradient(135deg, #c9a84c, #8b6914)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#0B0C10' }}>H</span>
            <span style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 18, fontWeight: 700 }}>HHD Quản Trị Kiếm Tiền & Quảng Cáo K94</span>
          </Link>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <Link href="/vat-pham-phong-thuy" style={{ padding: '7px 14px', borderRadius: 99, border: '1px solid rgba(201,168,76,0.4)', color: '#F4E3B2', textDecoration: 'none', fontSize: 13, fontWeight: 700 }}>
              🛍 Xem Cửa Hàng Vật Phẩm →
            </Link>
            <button
              onClick={() => handleSave(config)}
              style={{
                padding: '8px 18px',
                borderRadius: 99,
                background: 'linear-gradient(135deg, #66BB6A, #43A047)',
                color: '#0B0C10',
                fontWeight: 800,
                fontSize: 13,
                border: 'none',
                cursor: 'pointer'
              }}
            >
              {savedToast ? '✓ Đã Lưu Cấu Hình!' : '💾 Lưu Toàn Bộ Thay Đổi'}
            </button>
            <button
              onClick={handleLogout}
              style={{
                padding: '8px 14px',
                borderRadius: 99,
                background: 'rgba(229, 57, 53, 0.2)',
                border: '1px solid rgba(229, 57, 53, 0.5)',
                color: '#FF8A80',
                fontWeight: 700,
                fontSize: 12.5,
                cursor: 'pointer'
              }}
            >
              🔒 Khóa & Đăng Xuất
            </button>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1080, margin: '0 auto', padding: '36px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ display: 'inline-block', padding: '4px 14px', borderRadius: 999, border: '1px solid rgba(129,199,132,0.45)', background: 'rgba(129,199,132,0.12)', color: '#81C784', fontSize: 12, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10, fontWeight: 700 }}>
            ✓ Đã Xác Thực Quản Trị Viên K94 Media · Phiên Bảo Mật SHA-256
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 'clamp(26px, 3.8vw, 38px)', color: '#F4E3B2', margin: '0 0 8px 0' }}>
            Cấu Hình Link Affiliate Shopee/TikTok, Banner Quảng Cáo & QR Nhận Lộc
          </h1>
          <p style={{ color: '#9DA3B4', maxWidth: 700, margin: '0 auto', lineHeight: 1.6 }}>
            Dán trực tiếp link tiếp thị liên kết (Shopee Affiliate, TikTok Shop, Accesstrade), chỉnh sửa nội dung Banner Quảng Cáo K94 và cài đặt Số Tài Khoản Ngân Hàng nhận lộc VietQR.
          </p>
        </div>

        {/* 5 Management Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
          {[
            { id: 'affiliate', label: '🛒 1. Sản Phẩm & Link Affiliate' },
            { id: 'sidepanels', label: '📐 2. Panel Quảng Cáo 2 Bên Trái/Phải (6 Khung)' },
            { id: 'banners', label: '📢 3. Banner Ngang Chân Trang K94' },
            { id: 'vietqr', label: '🧧 4. Mã QR Ngân Hàng Nhận Lộc' },
            { id: 'security', label: '🔐 5. Đổi Mật Khẩu / PIN & Sao Lưu' }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                padding: '11px 18px',
                borderRadius: 999,
                border: activeTab === t.id ? '1px solid #c9a84c' : '1px solid rgba(255,255,255,0.12)',
                background: activeTab === t.id ? 'rgba(201,168,76,0.22)' : '#141722',
                color: activeTab === t.id ? '#F4E3B2' : '#A3A8B8',
                fontWeight: 700,
                fontSize: 13.5,
                cursor: 'pointer'
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* TAB 1: AFFILIATE PRODUCTS */}
        {activeTab === 'affiliate' && (
          <div style={{ display: 'grid', gap: 24 }}>
            <div style={{ background: 'rgba(20,22,30,0.9)', border: '1px solid rgba(102,187,106,0.4)', borderRadius: 20, padding: 24 }}>
              <h3 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 20, color: '#81C784', margin: '0 0 14px 0' }}>
                ➕ Thêm Nhanh Sản Phẩm Affiliate Mới
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginBottom: 12 }}>
                <input
                  type="text"
                  placeholder="Tên vật phẩm (VD: Vòng Trầm Hương K94)"
                  value={newProd.name}
                  onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                  style={{ padding: '10px 14px', borderRadius: 10, border: '1px solid rgba(201,168,76,0.35)', background: '#11131A', color: '#F4E3B2' }}
                />
                <select
                  value={newProd.element}
                  onChange={(e) => setNewProd({ ...newProd, element: e.target.value })}
                  style={{ padding: '10px 14px', borderRadius: 10, border: '1px solid rgba(201,168,76,0.35)', background: '#11131A', color: '#F4E3B2' }}
                >
                  {['Kim', 'Mộc', 'Thủy', 'Hỏa', 'Thổ'].map((el) => (
                    <option key={el} value={el}>Hợp Mệnh {el}</option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Giá bán (VD: 350.000đ)"
                  value={newProd.price}
                  onChange={(e) => setNewProd({ ...newProd, price: e.target.value })}
                  style={{ padding: '10px 14px', borderRadius: 10, border: '1px solid rgba(201,168,76,0.35)', background: '#11131A', color: '#F4E3B2' }}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12, marginBottom: 14 }}>
                <input
                  type="text"
                  placeholder="Dán Link Affiliate Shopee (VD: https://s.shopee.vn/...)"
                  value={newProd.shopeeUrl}
                  onChange={(e) => setNewProd({ ...newProd, shopeeUrl: e.target.value })}
                  style={{ padding: '10px 14px', borderRadius: 10, border: '1px solid rgba(238,77,45,0.5)', background: '#11131A', color: '#F4E3B2' }}
                />
                <input
                  type="text"
                  placeholder="Dán Link Affiliate TikTok Shop / Zalo"
                  value={newProd.tiktokUrl}
                  onChange={(e) => setNewProd({ ...newProd, tiktokUrl: e.target.value })}
                  style={{ padding: '10px 14px', borderRadius: 10, border: '1px solid rgba(201,168,76,0.35)', background: '#11131A', color: '#F4E3B2' }}
                />
              </div>
              <button
                onClick={addNewProduct}
                style={{ padding: '10px 20px', borderRadius: 10, background: 'linear-gradient(135deg, #e0c168, #b88928)', color: '#0B0C10', fontWeight: 800, border: 'none', cursor: 'pointer' }}
              >
                + Thêm Vào Cửa Hàng Affiliate
              </button>
            </div>

            <div style={{ display: 'grid', gap: 14 }}>
              {config.products.map((p, idx) => (
                <div key={p.id} style={{ background: 'rgba(20,22,30,0.88)', border: '1px solid rgba(201,168,76,0.25)', borderRadius: 16, padding: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, flexWrap: 'wrap', gap: 8 }}>
                    <strong style={{ color: '#F4E3B2', fontSize: 16 }}>{p.icon} {p.name} (Hành {p.element})</strong>
                    <button
                      onClick={() => removeProduct(idx)}
                      style={{ padding: '4px 10px', borderRadius: 8, background: 'rgba(229,57,53,0.18)', color: '#EF9A9A', border: '1px solid rgba(229,57,53,0.35)', fontSize: 12, cursor: 'pointer' }}
                    >
                      Xóa
                    </button>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 10 }}>
                    <div>
                      <label style={{ fontSize: 11, color: '#FF8A65', display: 'block', marginBottom: 4 }}>Link Affiliate Shopee (Dán link rút gọn s.shopee.vn):</label>
                      <input
                        type="text"
                        value={p.shopeeUrl}
                        onChange={(e) => updateProductField(idx, 'shopeeUrl', e.target.value)}
                        style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid rgba(238,77,45,0.4)', background: '#11131A', color: '#F4E3B2', fontSize: 13 }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: 11, color: '#c9a84c', display: 'block', marginBottom: 4 }}>Link Affiliate TikTok Shop / Lazada / Zalo:</label>
                      <input
                        type="text"
                        value={p.tiktokUrl}
                        onChange={(e) => updateProductField(idx, 'tiktokUrl', e.target.value)}
                        style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid rgba(201,168,76,0.35)', background: '#11131A', color: '#F4E3B2', fontSize: 13 }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: 11, color: '#9DA3B4', display: 'block', marginBottom: 4 }}>Giá hiển thị:</label>
                      <input
                        type="text"
                        value={p.price}
                        onChange={(e) => updateProductField(idx, 'price', e.target.value)}
                        style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.15)', background: '#11131A', color: '#FFD54F', fontSize: 13, fontWeight: 700 }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: LEFT & RIGHT SIDE PANELS (6 SLOTS FOR AD RENTAL & SERVICES) */}
        {activeTab === 'sidepanels' && (
          <div style={{ display: 'grid', gap: 28 }}>
            <div style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.35)', borderRadius: 16, padding: 18 }}>
              <div style={{ fontWeight: 800, color: '#F4E3B2', fontSize: 15, marginBottom: 4 }}>
                📐 Quản Lý 6 Khung Panel Quảng Cáo Cho Thuê 2 Bên Trái & Phải (Hiển thị cố định ở tất cả 12 tính năng)
              </div>
              <div style={{ fontSize: 13, color: '#9DA3B4', lineHeight: 1.55 }}>
                Khi có đối tác thuê đặt quảng cáo ở Cánh Trái hoặc Cánh Phải, bạn chỉ cần dán <strong>Link Ảnh Banner (240×360px)</strong>, sửa Tiêu đề và dán <strong>Link Đích (Website / Zalo / Shopee của khách)</strong> rồi bấm <strong>Lưu Toàn Bộ Thay Đổi</strong>.
              </div>
            </div>

            {['left', 'right'].map((sideKey) => {
              const sideTitle =
                sideKey === 'left'
                  ? '⬅️ 3 PANEL CÁNH TRÁI (LEFT SKYSCRAPER PANELS)'
                  : '➡️ 3 PANEL CÁNH PHẢI (RIGHT SKYSCRAPER PANELS)';
              const slots = config.sidePanels?.[sideKey] || [];

              return (
                <div key={sideKey} style={{ display: 'grid', gap: 16 }}>
                  <h3 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 20, color: '#c9a84c', margin: 0 }}>
                    {sideTitle}
                  </h3>
                  {slots.map((slot, idx) => (
                    <div
                      key={slot.id}
                      style={{
                        background: 'rgba(20,22,30,0.9)',
                        border: '1px solid rgba(201,168,76,0.3)',
                        borderRadius: 18,
                        padding: 20,
                        display: 'grid',
                        gap: 12
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                        <span style={{ fontSize: 13, color: '#FFD54F', fontWeight: 800 }}>
                          {sideKey === 'left' ? `KHUNG TRÁI #${idx + 1}` : `KHUNG PHẢI #${idx + 1}`}
                        </span>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, color: '#81C784', cursor: 'pointer' }}>
                          <input
                            type="checkbox"
                            checked={Boolean(slot.isRentalSlot)}
                            onChange={(e) => updateSidePanelField(sideKey, idx, 'isRentalSlot', e.target.checked)}
                          />
                          Hiển thị khung viền nét đứt &quot;Đang Cho Thuê Banner 240×360px&quot;
                        </label>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 12 }}>
                        <div>
                          <label style={{ fontSize: 11, color: '#9DA3B4', display: 'block', marginBottom: 4 }}>Nhãn (Badge)</label>
                          <input
                            type="text"
                            value={slot.badge || ''}
                            onChange={(e) => updateSidePanelField(sideKey, idx, 'badge', e.target.value)}
                            style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid rgba(201,168,76,0.35)', background: '#11131A', color: '#c9a84c', fontWeight: 700 }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: 11, color: '#9DA3B4', display: 'block', marginBottom: 4 }}>Nhãn Phụ / Giá Thuê</label>
                          <input
                            type="text"
                            value={slot.priceTag || ''}
                            onChange={(e) => updateSidePanelField(sideKey, idx, 'priceTag', e.target.value)}
                            style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid rgba(201,168,76,0.35)', background: '#11131A', color: '#81C784', fontWeight: 700 }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: 11, color: '#9DA3B4', display: 'block', marginBottom: 4 }}>Link Ảnh Banner (Tùy chọn, VD: https://.../banner.jpg)</label>
                          <input
                            type="text"
                            placeholder="Để trống nếu dùng khung chữ"
                            value={slot.imageUrl || ''}
                            onChange={(e) => updateSidePanelField(sideKey, idx, 'imageUrl', e.target.value)}
                            style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid rgba(201,168,76,0.35)', background: '#11131A', color: '#F4E3B2' }}
                          />
                        </div>
                      </div>

                      <div>
                        <label style={{ fontSize: 11, color: '#9DA3B4', display: 'block', marginBottom: 4 }}>Tiêu Đề Quảng Cáo</label>
                        <input
                          type="text"
                          value={slot.title || ''}
                          onChange={(e) => updateSidePanelField(sideKey, idx, 'title', e.target.value)}
                          style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid rgba(201,168,76,0.35)', background: '#11131A', color: '#F4E3B2', fontWeight: 700 }}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: 11, color: '#9DA3B4', display: 'block', marginBottom: 4 }}>Mô Tả Ngắn</label>
                        <input
                          type="text"
                          value={slot.desc || ''}
                          onChange={(e) => updateSidePanelField(sideKey, idx, 'desc', e.target.value)}
                          style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid rgba(201,168,76,0.35)', background: '#11131A', color: '#E2E4E9' }}
                        />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12 }}>
                        <div>
                          <label style={{ fontSize: 11, color: '#9DA3B4', display: 'block', marginBottom: 4 }}>Địa Chỉ Cửa Hàng / Đơn Vị (Tùy chọn)</label>
                          <input
                            type="text"
                            placeholder="VD: Ấp Cái Cui, xã Hòa Hiệp, Tỉnh Vĩnh Long"
                            value={slot.address || ''}
                            onChange={(e) => updateSidePanelField(sideKey, idx, 'address', e.target.value)}
                            style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid rgba(201,168,76,0.35)', background: '#11131A', color: '#E0F2FE' }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: 11, color: '#9DA3B4', display: 'block', marginBottom: 4 }}>Số Điện Thoại Liên Hệ</label>
                          <input
                            type="text"
                            placeholder="VD: 0983339397"
                            value={slot.phone || ''}
                            onChange={(e) => updateSidePanelField(sideKey, idx, 'phone', e.target.value)}
                            style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid rgba(201,168,76,0.35)', background: '#11131A', color: '#FFD54F', fontWeight: 700 }}
                          />
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                        <div>
                          <label style={{ fontSize: 11, color: '#9DA3B4', display: 'block', marginBottom: 4 }}>Chữ Trên Nút Bấm (CTA)</label>
                          <input
                            type="text"
                            value={slot.ctaText || ''}
                            onChange={(e) => updateSidePanelField(sideKey, idx, 'ctaText', e.target.value)}
                            style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid rgba(201,168,76,0.35)', background: '#11131A', color: '#FFD54F', fontWeight: 700 }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: 11, color: '#9DA3B4', display: 'block', marginBottom: 4 }}>Link Đích Khi Khách Bấm (Zalo / Web / Affiliate)</label>
                          <input
                            type="text"
                            value={slot.ctaUrl || ''}
                            onChange={(e) => updateSidePanelField(sideKey, idx, 'ctaUrl', e.target.value)}
                            style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid rgba(201,168,76,0.35)', background: '#11131A', color: '#F4E3B2' }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 3: AD BANNERS & K94 SERVICES */}
        {activeTab === 'banners' && (
          <div style={{ display: 'grid', gap: 18 }}>
            {config.banners.map((b, idx) => (
              <div key={b.id} style={{ background: 'rgba(20,22,30,0.88)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 18, padding: 22, display: 'grid', gap: 12 }}>
                <div style={{ fontSize: 13, color: '#c9a84c', fontWeight: 700 }}>VỊ TRÍ BANNER QUẢNG CÁO #{idx + 1}</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 12 }}>
                  <div>
                    <label style={{ fontSize: 11, color: '#9DA3B4', display: 'block', marginBottom: 4 }}>Nhãn Nổi Bật (Badge)</label>
                    <input type="text" value={b.badge} onChange={(e) => updateBannerField(idx, 'badge', e.target.value)} style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid rgba(201,168,76,0.35)', background: '#11131A', color: '#c9a84c', fontWeight: 700 }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, color: '#9DA3B4', display: 'block', marginBottom: 4 }}>Tiêu Đề Quảng Cáo</label>
                    <input type="text" value={b.title} onChange={(e) => updateBannerField(idx, 'title', e.target.value)} style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid rgba(201,168,76,0.35)', background: '#11131A', color: '#F4E3B2', fontWeight: 700 }} />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 11, color: '#9DA3B4', display: 'block', marginBottom: 4 }}>Mô Tả Ngắn</label>
                  <input type="text" value={b.desc} onChange={(e) => updateBannerField(idx, 'desc', e.target.value)} style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid rgba(201,168,76,0.35)', background: '#11131A', color: '#E2E4E9' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ fontSize: 11, color: '#9DA3B4', display: 'block', marginBottom: 4 }}>Chữ Trên Nút Bấm (CTA)</label>
                    <input type="text" value={b.ctaText} onChange={(e) => updateBannerField(idx, 'ctaText', e.target.value)} style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid rgba(201,168,76,0.35)', background: '#11131A', color: '#81C784', fontWeight: 700 }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, color: '#9DA3B4', display: 'block', marginBottom: 4 }}>Link Đích Khi Khách Bấm (Zalo / Web / Affiliate)</label>
                    <input type="text" value={b.ctaUrl} onChange={(e) => updateBannerField(idx, 'ctaUrl', e.target.value)} style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid rgba(201,168,76,0.35)', background: '#11131A', color: '#F4E3B2' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: VIETQR BANK DONATION / GIEO DUYÊN */}
        {activeTab === 'vietqr' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, alignItems: 'center' }}>
            <div style={{ background: 'rgba(20,22,30,0.88)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 20, padding: 24, display: 'grid', gap: 14 }}>
              <div style={{ fontSize: 13, color: '#c9a84c', fontWeight: 700 }}>CÀI ĐẶT TÀI KHOẢN NGÂN HÀNG TẠO MÃ VIETQR</div>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: '#9DA3B4', marginBottom: 4 }}>Chọn Ngân Hàng</label>
                <select
                  value={config.donation.bankCode}
                  onChange={(e) => setConfig({ ...config, donation: { ...config.donation, bankCode: e.target.value } })}
                  style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: '1px solid rgba(201,168,76,0.4)', background: '#11131A', color: '#F4E3B2', fontWeight: 700 }}
                >
                  {VIETQR_BANKS.map((b) => (
                    <option key={b.code} value={b.code}>{b.name} ({b.code})</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: '#9DA3B4', marginBottom: 4 }}>Số Tài Khoản Ngân Hàng</label>
                <input
                  type="text"
                  value={config.donation.accountNo}
                  onChange={(e) => setConfig({ ...config, donation: { ...config.donation, accountNo: e.target.value } })}
                  style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: '1px solid rgba(201,168,76,0.4)', background: '#11131A', color: '#F4E3B2', fontSize: 16, fontWeight: 800 }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: '#9DA3B4', marginBottom: 4 }}>Tên Chủ Tài Khoản (Không dấu)</label>
                <input
                  type="text"
                  value={config.donation.accountName}
                  onChange={(e) => setConfig({ ...config, donation: { ...config.donation, accountName: e.target.value } })}
                  style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: '1px solid rgba(201,168,76,0.4)', background: '#11131A', color: '#F4E3B2', fontWeight: 700 }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: '#9DA3B4', marginBottom: 4 }}>Mức Lộc Gợi Ý Mặc Định (VNĐ)</label>
                <input
                  type="number"
                  value={config.donation.defaultAmount}
                  onChange={(e) => setConfig({ ...config, donation: { ...config.donation, defaultAmount: Number(e.target.value) } })}
                  style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: '1px solid rgba(201,168,76,0.4)', background: '#11131A', color: '#FFD54F', fontWeight: 700 }}
                />
              </div>
              <button
                onClick={() => handleSave(config)}
                style={{ padding: '12px 20px', borderRadius: 12, background: 'linear-gradient(135deg, #e0c168, #b88928)', color: '#0B0C10', fontWeight: 800, border: 'none', cursor: 'pointer' }}
              >
                💾 Lưu Cài Đặt Mã QR Nhận Lộc
              </button>
            </div>

            <div style={{ background: 'rgba(20,22,30,0.9)', border: '1px solid rgba(201,168,76,0.4)', borderRadius: 22, padding: 26, textAlign: 'center' }}>
              <div style={{ fontSize: 12, color: '#c9a84c', fontWeight: 700, marginBottom: 10 }}>XEM TRƯỚC MÃ QR GIEO DUYÊN NHẬN LỘC</div>
              <img
                src={buildVietQrUrl(config.donation)}
                alt="VietQR Gieo Duyên K94"
                style={{ width: 250, height: 'auto', borderRadius: 16, border: '2px solid #c9a84c', background: '#FFF', padding: 8 }}
              />
              <div style={{ marginTop: 12, fontSize: 14, fontWeight: 700, color: '#F4E3B2' }}>
                {config.donation.bankCode} · {config.donation.accountNo}
              </div>
              <div style={{ fontSize: 13, color: '#c9a84c' }}>{config.donation.accountName}</div>
            </div>
          </div>
        )}

        {/* TAB 4: SECURITY, CHANGE PASSWORD/PIN & BACKUP JSON */}
        {activeTab === 'security' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
            <form
              onSubmit={handleChangeCredentials}
              style={{
                background: 'rgba(20,22,30,0.9)',
                border: '1px solid rgba(201,168,76,0.35)',
                borderRadius: 20,
                padding: 24,
                display: 'grid',
                gap: 14
              }}
            >
              <div style={{ fontSize: 14, color: '#c9a84c', fontWeight: 800 }}>
                🔐 ĐỔI MẬT KHẨU QUẢN TRỊ & MÃ PIN 6 SỐ (MÃ HÓA SHA-256)
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: '#9DA3B4', marginBottom: 4 }}>Mật khẩu Quản trị hiện tại</label>
                <input
                  type="password"
                  required
                  value={currentPassInput}
                  onChange={(e) => setCurrentPassInput(e.target.value)}
                  placeholder="Nhập mật khẩu đang dùng..."
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid rgba(201,168,76,0.35)', background: '#11131A', color: '#F4E3B2' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: '#9DA3B4', marginBottom: 4 }}>Mật khẩu Quản trị mới (Tối thiểu 6 ký tự)</label>
                <input
                  type="password"
                  required
                  value={newPassInput}
                  onChange={(e) => setNewPassInput(e.target.value)}
                  placeholder="Nhập mật khẩu mới..."
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid rgba(201,168,76,0.35)', background: '#11131A', color: '#F4E3B2' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: '#9DA3B4', marginBottom: 4 }}>Mã PIN 6 chữ số mới</label>
                <input
                  type="password"
                  inputMode="numeric"
                  maxLength={6}
                  required
                  value={newPinInput}
                  onChange={(e) => setNewPinInput(e.target.value)}
                  placeholder="VD: 888999"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid rgba(201,168,76,0.35)', background: '#11131A', color: '#FFD54F', fontWeight: 800, letterSpacing: 4 }}
                />
              </div>

              {secMessage.text && (
                <div
                  style={{
                    padding: '10px 12px',
                    borderRadius: 10,
                    background: secMessage.type === 'success' ? 'rgba(102,187,106,0.16)' : 'rgba(229,57,53,0.16)',
                    border: secMessage.type === 'success' ? '1px solid #66BB6A' : '1px solid #EF5350',
                    color: secMessage.type === 'success' ? '#81C784' : '#FF8A80',
                    fontSize: 12.5
                  }}
                >
                  {secMessage.text}
                </div>
              )}

              <button
                type="submit"
                style={{ padding: '12px 18px', borderRadius: 12, background: 'linear-gradient(135deg, #e0c168, #b88928)', color: '#0B0C10', fontWeight: 800, border: 'none', cursor: 'pointer' }}
              >
                🔑 Cập Nhật Mật Khẩu & Mã PIN Mới
              </button>
            </form>

            {/* Backup & Restore JSON */}
            <div
              style={{
                background: 'rgba(20,22,30,0.9)',
                border: '1px solid rgba(201,168,76,0.35)',
                borderRadius: 20,
                padding: 24,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 16
              }}
            >
              <div>
                <div style={{ fontSize: 14, color: '#c9a84c', fontWeight: 800, marginBottom: 8 }}>
                  📦 SAO LƯU & KHÔI PHỤC CẤU HÌNH (JSON)
                </div>
                <p style={{ fontSize: 13, color: '#9DA3B4', lineHeight: 1.6, margin: '0 0 16px' }}>
                  Tải xuống toàn bộ danh sách sản phẩm Affiliate, link Shopee/TikTok, Banner quảng cáo K94 và thông tin VietQR thành file <code>k94-monetization-config.json</code> để sao lưu hoặc chuyển sang máy tính/điện thoại khác.
                </p>
                <div style={{ display: 'grid', gap: 12 }}>
                  <button
                    type="button"
                    onClick={handleExportJson}
                    style={{ padding: '11px 16px', borderRadius: 10, background: 'rgba(201,168,76,0.18)', border: '1px solid #c9a84c', color: '#F4E3B2', fontWeight: 700, cursor: 'pointer' }}
                  >
                    ⬇️ Tải File Sao Lưu Cấu Hình (.JSON)
                  </button>
                  <label
                    style={{
                      display: 'block',
                      textAlign: 'center',
                      padding: '11px 16px',
                      borderRadius: 10,
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px dashed rgba(255,255,255,0.25)',
                      color: '#E2E4E9',
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    ⬆️ Nhập File Cấu Hình (.JSON) Từ Máy
                    <input type="file" accept=".json" onChange={handleImportJson} style={{ display: 'none' }} />
                  </label>
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={resetDefaults}
                  style={{ padding: '8px 12px', borderRadius: 8, background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: '#8C93A8', fontSize: 12, cursor: 'pointer' }}
                >
                  Khôi phục danh sách gốc
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  style={{ padding: '8px 14px', borderRadius: 8, background: 'rgba(229,57,53,0.2)', border: '1px solid #EF5350', color: '#FF8A80', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
                >
                  🔒 Đăng Xuất Ngay
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
