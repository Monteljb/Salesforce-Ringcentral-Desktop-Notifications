// Client code
var mysql = require('mysql');
var ZongJi = require('zongji');
var getUid = require('get-uid');
const electron = require('electron')
const remote = require('electron').remote
const app = electron.app
var mainWindow = null;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const path = require('path')
const url = require('url')
var zongji = new ZongJi({
  connectionLimit: 100,
  host     : '10.20.0.23',
  user     : 'admin',
  password : 'admin'
});

var zongji2 = new ZongJi({
  connectionLimit: 100,
  host     : '10.20.0.23',
  user     : 'admin',
  password : 'admin'
});

zongji.start({ pool: true, serverId: getUid(), startAtEnd:true, excludeSchema: { 'inboundapi3': true , 'inboundapi2': true},
  includeEvents: ['tablemap', 'writerows', 'updaterows', 'deleterows']
});
console.log('zongji1 started');


zongji2.start({ pool: true, serverId: getUid(), startAtEnd: true, excludeSchema: { 'inboundapi': true },
  includeEvents: ['tablemap', 'writerows', 'updaterows', 'deleterows']
});
console.log('zongji2 started');



zongji.on('binlog', function(evt) {


  if (mainWindow === null) {
            // Create the browser window.
            mainWindow = new BrowserWindow({width: 800, height: 600, alwaysOnTop:true, frame: false})

            // and load the index.html of the app.
            mainWindow.loadURL(url.format({
              pathname: path.join(__dirname, 'index.html'),
              protocol: 'file:',
              alwaysOnTop: true,
              slashes: true
            }))
            console.log('incoming');
  }




});


zongji2.on('binlog', function(evt) {
  if (mainWindow) {
            mainWindow.close();
            mainWindow = null;
              console.log('11111111111111.');

  }
});



process.on('SIGINT', function() {
  console.log('Got SIGINT.');
  zongji2.stop();
  zongji.stop();
  process.exit();
});

app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q

})
