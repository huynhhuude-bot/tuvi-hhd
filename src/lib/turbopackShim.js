'use client';

import * as jsxRuntime from 'react/jsx-runtime';
import * as React from 'react';
import * as NextNavigation from 'next/navigation';
import Link from 'next/link';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useInView,
  useScroll,
  useTransform,
} from 'framer-motion';
import { astro } from 'iztro';
import { Solar, Lunar, LunarMonth } from 'lunar-javascript';

import { factory80492 } from './modules/themeModule';
import { factory27469 } from './modules/scrollIntroModule';
import { factoryZiweiCore } from './modules/ziweiCoreModule';
import { factory31713 } from './modules/homePageModule';
import { factory57229 } from './modules/chartPageModule';
import { factory69124 } from './modules/hemingPageModule';
import { factory67730 } from './modules/librarySearchModule';
import { factory80300 } from './modules/librarySearchPageModule';

import { buildInterpretation, buildHemingAnalysis } from './interpretEngine';

function createSseResponse(fullText) {
  const encoder = new TextEncoder();
  const chunks = fullText.match(/.{1,18}(\s|$)/gs) || [fullText];
  const stream = new ReadableStream({
    async start(controller) {
      for (const piece of chunks) {
        const payload = JSON.stringify({ delta: { text: piece } });
        controller.enqueue(encoder.encode(`data: ${payload}\n\n`));
        await new Promise((r) => setTimeout(r, 12));
      }
      controller.enqueue(encoder.encode('data: [DONE]\n\n'));
      controller.close();
    },
  });
  return new Response(stream, {
    status: 200,
    headers: { 'Content-Type': 'text/event-stream; charset=utf-8' },
  });
}

if (typeof window !== 'undefined' && !window.__hhdFetchPatched) {
  window.__hhdFetchPatched = true;
  const origFetch = window.fetch.bind(window);
  window.fetch = async (input, init) => {
    const url = typeof input === 'string' ? input : input?.url || '';
    if (url.endsWith('/api/interpret') || url.endsWith('/api/heming')) {
      try {
        const res = await origFetch(input, init);
        if (res.ok) return res;
      } catch {}
      try {
        const body = JSON.parse(init?.body || '{}');
        if (url.endsWith('/api/interpret')) {
          const lastUserMsg =
            [...(body.messages || [])].reverse().find((m) => m.role === 'user')?.content ||
            '[TOPIC:overview]';
          return createSseResponse(buildInterpretation(body.chart, lastUserMsg));
        } else {
          return createSseResponse(buildHemingAnalysis(body.chartA, body.chartB, body.question));
        }
      } catch (err) {
        return createSseResponse(`**【Định điệu cốt lõi】**\nHệ thống HHD đang xử lý dữ liệu lá số.`);
      }
    }
    return origFetch(input, init);
  };
}

const BasePathLink = React.forwardRef(function BasePathLink(props, ref) {
  let { href, ...rest } = props;
  if (
    typeof window !== 'undefined' &&
    typeof href === 'string' &&
    href.startsWith('/') &&
    !href.startsWith('/tuvi-hhd') &&
    window.location.pathname.startsWith('/tuvi-hhd')
  ) {
    href = `/tuvi-hhd${href === '/' ? '' : href}`;
  }
  return <Link ref={ref} href={href} {...rest} />;
});

const PatchedNavigation = {
  ...NextNavigation,
  useRouter() {
    const router = NextNavigation.useRouter();
    return React.useMemo(
      () => ({
        ...router,
        push(href, options) {
          if (
            typeof window !== 'undefined' &&
            typeof href === 'string' &&
            href.startsWith('/') &&
            !href.startsWith('/tuvi-hhd') &&
            window.location.pathname.startsWith('/tuvi-hhd')
          ) {
            return router.push(`/tuvi-hhd${href === '/' ? '' : href}`, options);
          }
          return router.push(href, options);
        },
      }),
      [router]
    );
  },
};

const registry = {
  43476: jsxRuntime,
  71645: React,
  18566: PatchedNavigation,
  22016: { default: BasePathLink },
  46932: {
    f: motion,
    useReducedMotion,
    useInView,
    useScroll,
    useTransform,
  },
  88653: {
    f: AnimatePresence,
    M: AnimatePresence,
  },
  18918: { astro },
  49536: { Solar, Lunar, LunarMonth },
};

function runFactory(defaultModId, factory) {
  const ctx = {
    i(id) {
      if (!registry[id]) {
        console.warn(`[HHD Module Loader] Missing module ID: ${id}`);
        return {};
      }
      return registry[id];
    },
    s(pairs, targetModId = defaultModId) {
      if (!registry[targetModId]) {
        registry[targetModId] = {};
      }
      for (let idx = 0; idx < pairs.length; idx += 3) {
        const exportName = pairs[idx];
        const exportVal = pairs[idx + 2];
        registry[targetModId][exportName] = exportVal;
      }
    },
    A(id) {
      if (id === 48503) {
        return import('html2canvas');
      }
      return Promise.resolve(registry[id] || {});
    },
  };
  factory(ctx);
  return registry[defaultModId];
}

// Initialize modules in dependency order
const mod80492 = runFactory(80492, factory80492);
const mod27469 = runFactory(27469, factory27469);
runFactory(53632, factoryZiweiCore); // Registers 29016, 78963, 53163, 24407, 53632
const mod31713 = runFactory(31713, factory31713);
const mod57229 = runFactory(57229, factory57229);
const mod69124 = runFactory(69124, factory69124);
const mod67730 = runFactory(67730, factory67730);
const mod80300 = runFactory(80300, factory80300);

export const ThemeProvider = mod80492.ThemeProvider;
export const useTheme = mod80492.useTheme;
export const ScrollIntroModal = mod27469.f;
export const HomePage = mod31713.default;
export const ChartPage = mod57229.default;
export const HemingPage = mod69124.default;
export const LibrarySearch = mod67730.default;
export const LibrarySearchPage = mod80300.default;
export const calculateChart = registry[53632].P;
export const convertBirthInfo = registry[78963].u;
export const detectPatterns = mod57229.np;
export const translatePalace = mod57229.C;
export const translateStar = mod57229.L;
export const translateSihua = mod57229.f;
export const translateBrightness = mod57229.q;
