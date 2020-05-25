importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

importScripts(
  "precache-manifest.0b31c64352b148259d417d50be15b966.js"
);

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
  console.log("precache-manifest.0b31c64352b148259d417d50be15b966.js")
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [

  // {url: '/assets/map/css', revision: null},
  { url: "/assets/map/index.html", revision: null},
  /*
  { url: "/assets/map/js/qgis2web_expressions.js", revision: null},
  { url: "/assets/map/js/leaflet.js", revision: null},
  { url: "/assets/map/js/L.Control.Locate.min.js", revision: null},
  { url: "/assets/map/js/multi-style-layer.js", revision: null},
  { url: "/assets/map/js/leaflet-svg-shape-markers.min.js", revision: null},
  { url: "/assets/map/js/leaflet.rotatedMarker.js", revision: null},
  { url: "/assets/map/js/leaflet.pattern.js", revision: null},
  { url: "/assets/map/js/leaflet-hash.js", revision: null},
  { url: "/assets/map/js/Autolinker.min.js", revision: null},
  { url: "/assets/map/js/rbush.min.js", revision: null},
  { url: "/assets/map/js/labelgun.min.js", revision: null},
  { url: "/assets/map/js/labels.js", revision: null},
  { url: "/assets/map/js/leaflet.markercluster.js", revision: null},
  { url: "/assets/map/data/Baumarten_2.js", revision: null},
  { url: "/assets/map/data/Wasser_3.js", revision: null},
  { url: "/assets/map/data/Wege_4.js", revision: null},
  { url: "/assets/map/data/Stationen_5.js", revision: null},

  { url: '/assets/map/css/leaflet.css', revision: null},
  { url: '/assets/map/css/L.Control.Locate.min.css', revision: null},
  { url: '/assets/map/css/qgis2web.css', revision: null},
  { url: '/assets/map/css/fontawesome-all.min.css', revision: null},
  { url: '/assets/map/css/MarkerCluster.css', revision: null},
  { url: '/assets/map/css/MarkerCluster.Default.css', revision: null},

  { url: "/assets/map/legend/Stationen_5.png", revision: null},
  { url: "/assets/map/legend/Wege_4.png", revision: null},
  { url: "/assets/map/legend/Wasser_3.png", revision: null},
  { url: "/assets/map/legend/Baumarten_2_Rotbuche0.png", revision: null},
  { url: "/assets/map/legend/Baumarten_2_Douglasie1.png", revision: null},
  { url: "/assets/map/legend/Baumarten_2_Stieleiche2.png", revision: null},
  { url: "/assets/map/legend/Baumarten_2_Traubeneiche3.png", revision: null},
  { url: "/assets/map/legend/Baumarten_2_Schwarzerle4.png", revision: null},
  { url: "/assets/map/legend/Baumarten_2_Esche5.png", revision: null},
  { url: "/assets/map/legend/Baumarten_2_Fichte6.png", revision: null},
  { url: "/assets/map/legend/Baumarten_2_Laerche7.png", revision: null},
  { url: "/assets/map/legend/Baumarten_2_Wiese8.png", revision: null},
  { url: "/assets/map/js/qgis2web_expressions.js", revision: null},
  { url: "/assets/map/js/leaflet.js", revision: null},
  { url: "/assets/map/js/L.Control.Locate.min.js", revision: null},
  { url: "/assets/map/js/multi-style-layer.js", revision: null},
  { url: "/assets/map/js/leaflet-svg-shape-markers.min.js", revision: null},
  { url: "/assets/map/js/leaflet.rotatedMarker.js", revision: null},
  { url: "/assets/map/js/leaflet.pattern.js", revision: null},
  { url: "/assets/map/js/leaflet-hash.js", revision: null},
  { url: "/assets/map/js/Autolinker.min.js", revision: null},
  { url: "/assets/map/js/rbush.min.js", revision: null},
  { url: "/assets/map/js/labelgun.min.js", revision: null},
  { url: "/assets/map/js/labels.js", revision: null},
  { url: "/assets/map/js/leaflet.markercluster.js", revision: null},
  { url: "/assets/map/data/Baumarten_2.js", revision: null},
  { url: "/assets/map/data/Wasser_3.js", revision: null},
  { url: "/assets/map/data/Wege_4.js", revision: null},
  { url: "/assets/map/data/Stationen_5.js", revision: null},

  { url: '/assets/map/css/leaflet.css', revision: null},
  { url: '/assets/map/css/L.Control.Locate.min.css', revision: null},
  { url: '/assets/map/css/qgis2web.css', revision: null},
  { url: '/assets/map/css/fontawesome-all.min.css', revision: null},
  { url: '/assets/map/css/MarkerCluster.css', revision: null},
  { url: '/assets/map/css/MarkerCluster.Default.css', revision: null},

  { url: "/assets/map/legend/Stationen_5.png", revision: null},
  { url: "/assets/map/legend/Wege_4.png", revision: null},
  { url: "/assets/map/legend/Wasser_3.png", revision: null},
  { url: "/assets/map/legend/Baumarten_2_Rotbuche0.png", revision: null},
  { url: "/assets/map/legend/Baumarten_2_Douglasie1.png", revision: null},
  { url: "/assets/map/legend/Baumarten_2_Stieleiche2.png", revision: null},
  { url: "/assets/map/legend/Baumarten_2_Traubeneiche3.png", revision: null},
  { url: "/assets/map/legend/Baumarten_2_Schwarzerle4.png", revision: null},
  { url: "/assets/map/legend/Baumarten_2_Esche5.png", revision: null},
  { url: "/assets/map/legend/Baumarten_2_Fichte6.png", revision: null},
  { url: "/assets/map/legend/Baumarten_2_Laerche7.png", revision: null},
  { url: "/assets/map/legend/Baumarten_2_Wiese8.png", revision: null},
  */

].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("/index.html"), {
  
  blacklist: [/^\/_/, /^\/assets\/map\/index/,/\/[^/?]+\.[^/]+$/],
});




