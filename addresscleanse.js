
var USPS = require('usps-webtools');
var usps = new USPS({
  server: 'http://production.shippingapis.com/ShippingAPI.dll',
  userId: '287PROFO3842',
  ttl: 10000
});

var promisify;
if (process.version === '6.11.5')
  promisify = require("promisify-es6"); //Alternative for Node.js 7.x and prior...
else
  promisify = require('util').promisify;  // requires Node.js 8 or above

var verify = promisify(usps.verify).bind(usps);
var runPromise = pjs.fiber.runPromise;


function cleanse(orders) {

  pjs.defineDisplay("display", "AddressCleansingDisplay.json");
  
  display.grid1.addRecords(orders);

  var startTime = new Date();

  // Cleanse order address information
  var list = [];
  for (var i = 0; i < orders.length; i++) {
    var order = orders[i];
    list.push(verify(order));
  }
  list = runPromise(Promise.all(list));

  var endTime = new Date();
  ellapsed = (endTime - startTime) + "ms";

  display.grid2.addRecords(list);
  count = orders.length;
  
  display.screen.execute();
}

exports.run = cleanse;
