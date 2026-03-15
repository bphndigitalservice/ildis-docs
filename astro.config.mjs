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
                    },
                    // Release banner
                    {
                        tag: 'script',
                        content: `
                            (function() {
                                var banner = document.createElement('div');
                                banner.id = 'release-banner';
                                banner.style.cssText = 'display:none;position:fixed;top:0;left:0;right:0;z-index:9999;background:linear-gradient(90deg,#6366f1,#8b5cf6);color:white;padding:0.625rem 1rem;font-size:0.875rem;box-shadow:0 2px 8px rgba(0,0,0,0.15);';
                                banner.innerHTML = '<div style="max-width:1200px;margin:0 auto;display:flex;justify-content:center;align-items:center;gap:1rem;"><span class="banner-text"></span><a href="#" class="banner-link" target="_blank" rel="noopener" style="color:white;text-decoration:underline;font-weight:600;">Lihat Changelog</a></div>';
                                document.body.appendChild(banner);
                                
                                async function loadRelease() {
                                    try {
                                        var res = await fetch('/api/releases.json');
                                        if (!res.ok) return;
                                        var data = await res.json();
                                        banner.querySelector('.banner-text').textContent = 'ILDIS ' + data.tag_name + ' telah dirilis pada ' + new Date(data.published_at).toLocaleDateString('id-ID', {day:'numeric',month:'long',year:'numeric'});
                                        banner.querySelector('.banner-link').href = data.html_url;
                                        banner.style.display = 'block';
                                        document.body.style.marginTop = '40px';
                                    } catch(e) { console.error('Failed to load release:', e); }
                                }
                                loadRelease();
                            })();
                        `,
                    },

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
