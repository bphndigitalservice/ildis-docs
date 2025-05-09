// @ts-check
import {defineConfig, passthroughImageService} from 'astro/config';
import starlight from '@astrojs/starlight';

import vercel from '@astrojs/vercel';
import starlightThemeNova from 'starlight-theme-nova';

// https://astro.build/config
export default defineConfig({
    site: 'https://ildis.bphn.go.id',
    integrations: [
        starlight({
                title: 'ILDIS v4',
                social: [{icon: 'github', label: 'GitHub', href: 'https://github.com/bphndigitalservice/ildis'}],
                credits: true,
                description: 'Panduan resmi instalasi dan penggunaan Sistem Informasi Dokumentasi Hukum Indonesia (ILDIS)',
                defaultLocale: 'id',
                customCss: ['./src/assets/landing.css'],
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
                        label: 'Integrasi',
                        items: [
                            {label: 'JDIHN.go.id', link: '/integrasi/jdihn'},
                        ],
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
                expressiveCode: {
                    styleOverrides: {borderRadius: '0.5rem'},
                },
                plugins: [starlightThemeNova({
                    nav: [
                        {
                            label: 'Docs',
                            href: '/tentang-ildis',
                        },
                        {
                            label: 'Changelog',
                            href: 'https://github.com/bphndigitalservice/ildis/releases',
                        },
                    ],
                })],
            }
        )],
    image: {service: passthroughImageService(),},
    adapter: vercel(),
});
