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
                favicon: '/images/favicon.ico',
                head: [
                    // Add ICO favicon fallback for Safari.
                    {
                        tag: 'link',
                        attrs: {
                            rel: 'icon',
                            href: '/images/favicon.ico',
                            sizes: '32x32',
                        },
                    }

                ],
                social: [{icon: 'github', label: 'GitHub', href: 'https://github.com/bphndigitalservice/ildis'}],
                editLink: {
                    baseUrl: 'https://github.com/bphndigitalservice/ildis-docs/edit/main/',
                },

                description: 'Panduan resmi instalasi dan penggunaan Sistem Informasi Dokumentasi Hukum Indonesia (ILDIS)',
                defaultLocale: 'id',
                components: {
                    Footer: "./src/components/Footer.astro",
                },
                customCss: ['./src/styles/landing.css',],
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
                            {label: 'Struktur Direktori', link: '/struktur-direktori'},
                            {label: 'Deployment', link: '/deployment'},
                            {label: 'Konfigurasi', link: '/konfigurasi'},
                        ]
                    },
                    {
                        label: 'Integrasi',
                        items: [
                            {label: 'JDIHN.go.id', link: '/integrasi/jdihn'},
                        ],
                    },
                    {
                        label: 'Kustomisasi',
                        link: '/kustomisasi',
                    },
                    {
                        label: 'Troubleshooting',
                        autogenerate: {directory: '/troubleshooting/', collapsed: true},
                    },
                    {
                        label: 'Kontribusi',
                        link: '/kontribusi',
                    },
                    {
                        label: 'Dukungan & Komunitas',
                        link: '/dukungan-komunitas',
                    },
                    {
                        label: 'Aplikasi Alternative ',
                        link: '/alternative',
                    }
                ],
                expressiveCode: {
                    useStarlightDarkModeSwitch: true,
                    themes: ['github-dark', 'github-light']
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
                lastUpdated: true,
                titleDelimiter: '-',
                pagination: true,
                tableOfContents: {
                    maxHeadingLevel: 5,
                    minHeadingLevel: 1,

                },
                tagline: 'Panduan resmi instalasi dan penggunaan Indonesia Law Documentation Information System (ILDIS)',
            },
        )],

    image: {service: passthroughImageService(),},
    adapter: vercel(),
});
