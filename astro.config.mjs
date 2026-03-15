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
                title: 'ILDIS',
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
                    // Version selector styles
                    {
                        tag: 'style',
                        content: `
                            .version-select-wrapper {
                                display: flex;
                                align-items: center;
                                margin-inline-end: 1rem;
                            }
                            .version-select-wrapper select {
                                background: rgba(255,255,255,0.1);
                                border: 1px solid rgba(255,255,255,0.2);
                                border-radius: 0.25rem;
                                color: var(--sl-color-white);
                                padding: 0.25rem 0.5rem;
                                font-size: 0.75rem;
                                cursor: pointer;
                            }
                            .version-select-wrapper select:hover {
                                background: rgba(255,255,255,0.2);
                            }
                        `,
                    },
                    // Version selector script
                    {
                        tag: 'script',
                        content: `
                            document.addEventListener('DOMContentLoaded', function() {
                                var nav = document.querySelector('.nova-header-nav');
                                if (nav) {
                                    var wrapper = document.createElement('div');
                                    wrapper.className = 'version-select-wrapper';
                                    wrapper.innerHTML = '<select id="version-selector"><option value="v4">v4</option><option value="v5">v5</option></select>';
                                    nav.insertBefore(wrapper, nav.firstChild);
                                    
                                    var currentPath = window.location.pathname;
                                    var selector = document.getElementById('version-selector');
                                    
                                    if (currentPath.includes('/v5/')) {
                                        selector.value = 'v5';
                                        updateSidebarContent('v5');
                                    } else {
                                        selector.value = 'v4';
                                        updateSidebarContent('v4');
                                    }
                                    
                                    selector.addEventListener('change', function(e) {
                                        var version = e.target.value;
                                        var currentPath = window.location.pathname;
                                        
                                        var pathParts = currentPath.split('/').filter(Boolean);
                                        
                                        if (pathParts[0] === 'v4' || pathParts[0] === 'v5') {
                                            pathParts.shift();
                                        }
                                        
                                        var docPath = pathParts.join('/');
                                        if (version === 'v5') {
                                            window.location.href = docPath ? '/' + version + '/' + docPath : '/' + version + '/';
                                        } else {
                                            window.location.href = '/' + version + '/' + (docPath || 'tentang-ildis');
                                        }
                                    });
                                }
                                
                                function updateSidebarContent(version) {
                                    // Update sidebar autogenerate directory by triggering page reload with version
                                    var sidebarSection = document.querySelector('[data-has-sidebar]');
                                    if (sidebarSection) {
                                        // Find all sidebar links and update them
                                        var sidebarLinks = document.querySelectorAll('.sidebar-content a');
                                        sidebarLinks.forEach(function(link) {
                                            var href = link.getAttribute('href');
                                            if (href && !href.startsWith('http') && !href.startsWith('/api/')) {
                                                var pathParts = href.split('/').filter(Boolean);
                                                // Remove any existing version
                                                if (pathParts[0] === 'v4' || pathParts[0] === 'v5') {
                                                    pathParts.shift();
                                                }
                                                // Add new version
                                                pathParts.unshift(version);
                                                link.setAttribute('href', '/' + pathParts.join('/'));
                                            }
                                        });
                                    }
                                }
                            });
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
                            {label: 'Tentang ILDIS', link: '/v4/tentang-ildis'},
                            {label: 'Persyaratan Sistem', link: '/v4/persyaratan-sistem'},
                        ],
                    },
                    {
                        label: 'Instalasi & Konfigurasi',
                        items: [
                            {label: 'Instalasi', link: '/v4/instalasi'},
                            {label: 'Struktur Direktori', link: '/v4/struktur-direktori'},
                            {label: 'Deployment', link: '/v4/deployment'},
                            {label: 'Konfigurasi', link: '/v4/konfigurasi'},
                        ]
                    },
                    {
                        label: 'Integrasi',
                        items: [
                            {label: 'JDIHN.go.id', link: '/v4/integrasi/jdihn'},
                        ],
                    },
                    {
                        label: 'Kustomisasi',
                        link: '/v4/kustomisasi',
                    },
                    {
                        label: 'Troubleshooting',
                        autogenerate: {directory: 'v4/troubleshooting/', collapsed: true},
                    },
                    {
                        label: 'Kontribusi',
                        link: '/v4/kontribusi',
                    },
                    {
                        label: 'Dukungan & Komunitas',
                        link: '/v4/dukungan-komunitas',
                    },
                    {
                        label: 'Aplikasi Alternative',
                        link: '/v4/alternative',
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
                            href: '/v4/tentang-ildis',
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
