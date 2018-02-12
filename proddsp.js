
// This program displays Product Details

function proddsp(productId) {
  pjs.define("productId", { type: 'packed', length: 5, decimals: 0, refParm: productId });

  pjs.defineDisplay("display", "proddsp.json");
  pjs.defineTable("productsp", { read: true, keyed: true });
  
  while (!exit) {
    // Retrieve Product Information
    productsp.getRecord(productId);

    // Retrieve Features
    var featureList = pjs.query("select b.FENAME from demolib.PRODFEATP as a, demolib.featuresp as b where a.XPRID = ? and a.XFEID = b.FEID", productId);
    display.features.replaceRecords(featureList);

    // Retrieve Product Orders using a Web Service
    var ordersResult = pjs.sendRequest("get", "http://localhost:8081/prodorders/" + productId, {});
    ordercount = ordersResult.count;
    display.orders.replaceRecords(ordersResult.orders);
    
    display.myprod.execute();
    
    if (validaddr) pjs.call("addresscleanse.js", ordersResult.orders);
  }
  
}

exports.run = proddsp;
exports.parms = [
 { type: 'packed', length: 5, decimals: 0 }
]
