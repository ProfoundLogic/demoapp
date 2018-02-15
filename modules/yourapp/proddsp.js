
// This program displays Product Details

function proddsp(productId) {
  pjs.define("productId", { type: 'packed', length: 5, decimals: 0, refParm: productId });

  pjs.defineDisplay("display", "proddsp.json");
  pjs.defineTable("productsp", { read: true, keyed: true });
  
  while (!exit) {
    // Tab 1: Retrieve Product Information
    productsp.getRecord(productId);

    // Tab 2: Retrieve Features
    var featureList = pjs.query("SELECT b.FENAME from PRODFEATP as a, FEATURESP as b where a.XPRID = ? and a.XFEID = b.FEID", productId);
    display.features.replaceRecords(featureList);

    // Tab 3: Retrieve Product Orders using a Web Service
    var ordersResult = pjs.sendRequest("get", "http://localhost:8081/prodorders/" + productId, {});
    display.orders.replaceRecords(ordersResult.orders);
    
    display.myprod.execute();
    
    if (validaddr) pjs.call("addresscleanse.js", ordersResult.orders);
  }
  
}

exports.run = proddsp;
exports.parms = [
 { type: 'packed', length: 5, decimals: 0 }
]
