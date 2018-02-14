
var USPS = require('usps-webtools');
var usps = new USPS({
  server: 'http://production.shippingapis.com/ShippingAPI.dll',
  userId: '287PROFO3842',
  ttl: 10000
});
var runPromise = pjs.fiber.runPromise;
var promisify = require('util').promisify;
var verify = promisify(usps.verify).bind(usps);


function cleanse(orders) {

  pjs.defineDisplay("display", "addresscleanse.json");
  
  display.grid1.addRecords(orders);

  var startTime = new Date();

  // Cleanse order address information
  var list = [];
  for (var i = 0; i < orders.length; i++) {
    var order = orders[i];
    //var cleansedAddress = runPromise(verify(order));
    //list.push(cleansedAddress);
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
