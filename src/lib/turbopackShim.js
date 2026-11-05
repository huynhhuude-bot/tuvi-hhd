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

const registry = {
  43476: jsxRuntime,
  71645: React,
  18566: NextNavigation,
  22016: { default: Link },
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
