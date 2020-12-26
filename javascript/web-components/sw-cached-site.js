const cacheName = 'v2';

//2 ways to cache, 1 is as above
//but if there are lot of pages, we will cache the whole response

//call install event
self.addEventListener('install', e => {
    console.log(`service worker installed site..`);
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
    e.respondWith(
        fetch(e.request)
            .then(res => {
                //make copy/clone of response
                const resColne = res.clone();
                caches
                    .open(cacheName)
                    .then(cache => {
                        //add respomse to cache
                        cache.put(e.request, resColne);
                    })
                    return res;
            }).catch(err => caches.match(e.request).then(res => res))
    );
})
