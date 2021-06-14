const filesToCache = [
    '/',
    '/build/bundle.js',
    '/build/bundle.css',
    '/favicon.png',
    '/global.css',
    '/reset.css',
]

const staticCacheName = 'static-v1623698904369' // This will get replaced with a timestamp during the build process

self.addEventListener('install', event => {
    self.skipWaiting()
    event.waitUntil(
        caches.open(staticCacheName)
            .then(cache => cache.addAll(filesToCache)),
    )
})

self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request)
            .then(response =>
                caches.open(staticCacheName)
                    .then(cache => {
                        cache.put(event.request.url, response.clone())
                        return response
                    }),
            )
            .catch(() => caches.match(event.request)
        ),
    )
})

self.addEventListener('activate', event => {
    const cacheAllowlist = [staticCacheName]
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheAllowlist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName)
                    }
                }),
            )
        }),
    )
})
