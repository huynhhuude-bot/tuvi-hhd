'use client';

import { Suspense } from 'react';
import { ChartPage } from '../../lib/turbopackShim';

export default function Page() {
  return (
    <Suspense
      fallback={
        <div
          className="min-h-screen flex items-center justify-center text-sm"
          style={{ background: 'var(--t-bg)', color: 'var(--t-gold)' }}
        >
          Đang khởi tạo bàn sao Tử Vi Đẩu Số HHD...
        </div>
      }
    >
      <ChartPage />
    </Suspense>
  );
}
