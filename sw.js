// Service Worker for Coders Studio Website
const CACHE_NAME = 'coders-studio-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/demo.html',
    '/robotics-classes-melbourne.html',
    '/coding-classes-melbourne.html',
    '/stem-holiday-camp-melbourne.html',
    '/assets/css/style.css',
    '/assets/js/script.js',
    '/assets/images/logo.png',
    '/assets/images/favicon.ico'
];

// Install event
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

// Helper: generate sitemap.xml content dynamically
function generateSitemapXml() {
    const baseUrl = 'https://www.thecodersstudio.com';
    const urls = [
        { loc: `${baseUrl}/`, changefreq: 'weekly', priority: '1.0' },
        { loc: `${baseUrl}/#about`, changefreq: 'monthly', priority: '0.8' },
        { loc: `${baseUrl}/#courses`, changefreq: 'weekly', priority: '0.9' },
        { loc: `${baseUrl}/#testimonials`, changefreq: 'monthly', priority: '0.7' },
        { loc: `${baseUrl}/#contact`, changefreq: 'monthly', priority: '0.8' },
        { loc: `${baseUrl}/demo.html`, changefreq: 'monthly', priority: '0.4' },
        { loc: `${baseUrl}/coding-classes-melbourne`, changefreq: 'weekly', priority: '0.9' },
        { loc: `${baseUrl}/robotics-classes-melbourne`, changefreq: 'weekly', priority: '0.9' },
        { loc: `${baseUrl}/stem-holiday-camp-melbourne`, changefreq: 'weekly', priority: '0.8' }
    ];

    const lastmod = new Date().toISOString().split('T')[0];

    const urlEntries = urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

// Helper: generate robots.txt content dynamically
function generateRobotsTxt() {
    const sitemapUrl = 'https://www.thecodersstudio.com/sitemap.xml';
    return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${sitemapUrl}

# Crawl-delay
Crawl-delay: 1

# Disallow admin areas (if any)
Disallow: /admin/
Disallow: /private/
`;
}

// Fetch event
self.addEventListener('fetch', function(event) {
    const url = new URL(event.request.url);

    // Dynamic sitemap.xml
    if (url.pathname === '/sitemap.xml') {
        const body = generateSitemapXml();
        event.respondWith(new Response(body, {
            headers: { 'Content-Type': 'application/xml; charset=utf-8' }
        }));
        return;
    }

    // Dynamic robots.txt
    if (url.pathname === '/robots.txt') {
        const body = generateRobotsTxt();
        event.respondWith(new Response(body, {
            headers: { 'Content-Type': 'text/plain; charset=utf-8' }
        }));
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Return cached version or fetch from network
                return response || fetch(event.request);
            })
    );
});

// Activate event
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
