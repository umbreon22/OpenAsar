module.exports = (o, n) => {
  //require('electron').BrowserWindow
  const {BrowserWindow} = require("electron-acrylic-window");
  const options = {
    theme: 'appearance-based',
    effect: 'acrylic',
    useCustomWindowRefreshMethod: true,
    maximumRefreshRate: 144,
    disableOnBlur: true
  };
  const w = new BrowserWindow({
    frame: false,
    resizable: false,
    center: true,
    backgroundColor: '#2f3136',
    webPreferences: {
      preload: require('path').join(__dirname, '..', n, 'preload.js')
    },
    vibrancy: [options],
    ...o
  });

  const c = w.webContents;
  c.once('dom-ready', () => {
    if (oaConfig.themeSync !== false) try {
      c.insertCSS(JSON.parse(require('fs').readFileSync(require('path').join(require('../paths').getUserData(), 'userDataCache.json'), 'utf8')).openasarSplashCSS);
    } catch { }
  });

  w.loadURL('https://cdn.openasar.dev/' + n + '?v=' + oaVersion);
  w.webContents.insertCSS(`html, body { background: transparent !important; }`);
  return w;
};