// @ts-check
import {defineConfig} from 'astro/config';
import starlight from '@astrojs/starlight';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  integrations: [
      starlight({
          title: 'ILDIS',
          social: [{icon: 'github', label: 'GitHub', href: 'https://github.com/bphndigitalservice/ildis'}],
          tableOfContents: {minHeadingLevel: 2, maxHeadingLevel: 2},
          defaultLocale: 'id',
          locales: {
              root: {
                  label: 'Bahasa Indonesia',
                  lang: 'id', // lang is required for root locales
              },
          },
          sidebar: [
              {
                  label: 'Pendahuluan',
                  items: [
                      {label: 'Tentang ILDIS', link: '/tentang-ildis'},
                      {label: 'Persyaratan Sistem', link: '/persyaratan-sistem'},
                  ],
              },
              {
                  label: 'Instalasi & Konfigurasi',
                  items: [
                      {label: 'Instalasi', link: '/instalasi'},
                      {label: 'Konfigurasi', link: '/konfigurasi'},
                      {label: 'Struktur Direktori', link: '/struktur-direktori'},
                      {label: 'Deployment', link: '/deployment'},
                  ]
              },
              {
                  label: 'Troubleshooting',
                  autogenerate: {directory: '/troubleshooting/', collapsed: true},
              },
              {
                  label: 'Kontribusi',
                  link: '/kontribusi',
              }
          ],
      }),
  ],

  adapter: vercel(),
});