const electron = require('electron')
const remote = require('electron').remote
var MySQLEvents = require('mysql-events');
var dsn = {
  host     : '10.20.0.23',
  user     : 'admin',
  password : 'admin',
  connectionLimit: 50
};
var mysqlEventWatcher = MySQLEvents(dsn);

// Module to control application life.
const app = electron.app
var mainWindow = null;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const path = require('path')
const url = require('url')



var watcher =mysqlEventWatcher.add(
      'inboundapi.data',
      function (oldRow, newRow, event) {
         //row inserted
        if (oldRow === null) {

          // Create the browser window.
          mainWindow = new BrowserWindow({width: 800, height: 600, alwaysOnTop:true, frame: false})

          // and load the index.html of the app.
          mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'index.html'),
            protocol: 'file:',
            alwaysOnTop: true,
            slashes: true
          }))

            console.log('income.');



        }

         //row deleted
        if (newRow === null) {
          //delete code goes here
        }

         //row updated
        if (oldRow !== null && newRow !== null) {
          //update code goes here
        }

        //detailed event information
        //console.log(event)
      },
      'match this string or regex'
    );
;







var watcher2 =mysqlEventWatcher.add(
      'inboundapi3.data',
      function (oldRow, newRow, event) {
         //row inserted
        if (oldRow === null) {

if (mainWindow) {
          mainWindow.close();
          mainWindow = null;
            console.log('11111111111111.');

}

        }

         //row deleted
        if (newRow === null) {
          //delete code goes here
        }

         //row updated
        if (oldRow !== null && newRow !== null) {
          //update code goes here
        }

        //detailed event information
        //console.log(event)
      },
      'match this string or regex'
    );
;

var watcher3 =mysqlEventWatcher.add(
      'inboundapi2.data',
      function (oldRow, newRow, event) {
         //row inserted
        if (oldRow === null) {

if (mainWindow) {
          mainWindow.close();
          mainWindow = null;
            console.log('222222222');

}

        }

         //row deleted
        if (newRow === null) {
          //delete code goes here
        }

         //row updated
        if (oldRow !== null && newRow !== null) {
          //update code goes here
        }

        //detailed event information
        //console.log(event)
      },
      'match this string or regex'
    );
;




  console.log('11111111111111E.');
