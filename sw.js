// 編集: キャッシュの名前 (サイトごとにユニークな名前にする)
const CACHE_NAME = 'kennosuke-profile-cache-v1';

// 編集: オフライン時に表示させたいファイルのリスト
// 【重要】ここにあるファイルをすべて images フォルダなどに入れておく必要があります
const urlsToCache = [
'/',
'/index.html',
'/styles.css',
'/manifest.json',
'/images/Kennosuke.jpeg',
'/images/Kennosuke.backgroud.jpeg',
'/images/project1.jpg',
'/images/project2.jpg',
'/images/project3.jpg',
'/images/project4.jpg',
'/images/project5.jpg',
'/images/project6.jpg',
'/images/icon_email.png',
'/images/icon_github.png',
'/images/icon_linkedin.png',
'/images/icon_twitter.png',
'/images/icon-192x192.png',
'/images/icon-512x512.png',
'/images/icon-apple-touch.png'
];

// ---- 以下は編集不要です ----

// インストール処理
self.addEventListener('install', (event) => {
event.waitUntil(
caches.open(CACHE_NAME)
.then((cache) => {
console.log('Opened cache');
return cache.addAll(urlsToCache);
})
);
});

// リクエストがあった場合にキャッシュから返す
self.addEventListener('fetch', (event) => {
event.respondWith(
caches.match(event.request)
.then((response) => {
return response || fetch(event.request);
})
);
});

// 古いキャッシュを削除
self.addEventListener('activate', (event) => {
const cacheWhitelist = [CACHE_NAME];
event.waitUntil(
caches.keys().then((cacheNames) => {
return Promise.all(
cacheNames.map((cacheName) => {
if (cacheWhitelist.indexOf(cacheName) === -1) {
return caches.delete(cacheName);
}
})
);
})
);
});
