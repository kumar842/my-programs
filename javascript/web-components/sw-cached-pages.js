const cacheName = 'v1';
const cacheAssets = [
    'index.html',
    'app.js',
    './images/archana.png',
    './images/rajkumar.png',
    './images/icons-192.png',
    './images/icons-512.png'
];
//2 ways to cache, 1 is as above
//but if there are lot of pages, we will cache the whole response

//call install event
self.addEventListener('install', e => {
    console.log(`service worker installed`);
    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log('service worker: caching files');
                cache.addAll(cacheAssets);
            }).then(() => self.skipWaiting())
    );
});

//activate event
self.addEventListener('activate', e => {
    console.log(`service worker activated`);
    //remove unwanted caches
    caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cache => {
                        if(cache !== cacheName) {
                            console.log('service worker clearing old cache');
                            return caches.delete(cache);
                        }
                    })
                )
            })

});


//call fetch event
self.addEventListener('fetch', e => {
    console.log('service worker: fetching');
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)))
})
