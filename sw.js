
const CACHE_NAME='lembre-v2';
self.addEventListener('install', e=>{self.skipWaiting();});
self.addEventListener('activate', e=>{e.waitUntil(clients.claim());});

self.addEventListener('push', function(e){
  const data = e.data ? e.data.text() : '⏰ Lembre por Mim - Hora de lembrar!';
  e.waitUntil(
    self.registration.showNotification('⏰ Lembre por Mim', {
      body: data,
      icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🔔</text></svg>',
      badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🔔</text></svg>',
      vibrate: [500,200,500,200,500,200,500],
      requireInteraction: true,
      tag: 'lembre-bg',
      renotify: true,
      data: {url: '/'}
    })
  );
});

self.addEventListener('notificationclick', function(e){
  e.notification.close();
  e.waitUntil(
    clients.matchAll({type:'window'}).then(clientsArr=>{
      if(clientsArr.length>0){
        return clientsArr[0].focus();
      } else {
        return clients.openWindow('/');
      }
    })
  );
});

// Background sync para re-agendar
self.addEventListener('sync', function(e){
  if(e.tag==='reagendar-lembretes'){
    e.waitUntil(
      // Re-agenda lembretes pendentes
      self.registration.showNotification('Lembre por Mim', {body: 'Verificando lembretes...', silent:true})
    );
  }
});
