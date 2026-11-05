'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  DEFAULT_MONETIZATION_CONFIG,
  VIETQR_BANKS,
  loadMonetizationConfig,
  saveMonetizationConfig,
  buildVietQrUrl
} from '../../data/monetizationData';

export default function QuanLyKiemTienPage() {
  const [config, setConfig] = useState(DEFAULT_MONETIZATION_CONFIG);
  const [activeTab, setActiveTab] = useState('affiliate'); // 'affiliate' | 'banners' | 'vietqr'
  const [savedToast, setSavedToast] = useState(false);

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
  }, []);

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

  const resetDefaults = () => {
    setConfig(DEFAULT_MONETIZATION_CONFIG);
    saveMonetizationConfig(DEFAULT_MONETIZATION_CONFIG);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

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
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1080, margin: '0 auto', padding: '36px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ display: 'inline-block', padding: '4px 14px', borderRadius: 999, border: '1px solid rgba(201,168,76,0.35)', color: '#c9a84c', fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 }}>
            Trung Tâm Kiếm Tiền Không Cần Sửa Code · Công Ty Truyền Thông K94
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 'clamp(26px, 3.8vw, 38px)', color: '#F4E3B2', margin: '0 0 8px 0' }}>
            Cấu Hình Link Affiliate Shopee/TikTok, Banner Quảng Cáo & QR Nhận Lộc
          </h1>
          <p style={{ color: '#9DA3B4', maxWidth: 700, margin: '0 auto', lineHeight: 1.6 }}>
            Dán trực tiếp link tiếp thị liên kết (Shopee Affiliate, TikTok Shop, Accesstrade), chỉnh sửa nội dung Banner Quảng Cáo K94 và cài đặt Số Tài Khoản Ngân Hàng nhận lộc VietQR.
          </p>
        </div>

        {/* 3 Management Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
          {[
            { id: 'affiliate', label: '🛒 1. Quản Lý Sản Phẩm & Link Affiliate (Shopee / TikTok)' },
            { id: 'banners', label: '📢 2. Quản Lý Banner Quảng Cáo & Dịch Vụ K94 (0983.339.397)' },
            { id: 'vietqr', label: '🧧 3. Cài Đặt Mã QR Ngân Hàng Nhận Lộc / Gieo Duyên' }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                padding: '11px 20px',
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
            {/* Add New Product Box */}
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

            {/* Existing Products List */}
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
                      <label style={{ fontSize: 11, color: '#FF8A65', display: 'block', marginBottom: 4 }}>Link Affiliate Shopee (Dán link rút gọn s.shopee.vn của anh):</label>
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

        {/* TAB 2: AD BANNERS & K94 SERVICES */}
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

            {/* Live VietQR Preview */}
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

        <div style={{ marginTop: 28, textAlign: 'right' }}>
          <button
            onClick={resetDefaults}
            style={{ padding: '8px 14px', borderRadius: 8, background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: '#8C93A8', fontSize: 12, cursor: 'pointer' }}
          >
            Khôi phục danh sách mẫu ban đầu
          </button>
        </div>
      </main>
    </div>
  );
}
