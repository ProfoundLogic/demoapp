
function proddsp(pridIn) {
  pjs.define("pridIn", {
    type: 'packed', length: 5, decimals: 0, refParm: pridIn
  });

  pjs.defineDisplay("display", "proddsp.json");
  pjs.defineTable("productsp", { read: true, keyed: true });

  var portNum = "";
  if (process.platform === 'aix') {
    portNum = "8231";
    wsaddress = "power8:" + portNum;
  } else {
    portNum = "8081"; //Change to something like pjs.getProfound().getPort();
    wsaddress = "localhost:" + portNum;
  }
  
  prid = pridIn;

  while (!exit) {
    productsp.getRecord(prid);
    
    var featureList = pjs.query("select b.FENAME from demolib.PRODFEATP as a, demolib.featuresp as b where a.XPRID = ? and a.XFEID = b.FEID", prid);
    display.features.replaceRecords(featureList);

    var ordersResult = GetOrders(prid);
    ordercount = ordersResult.count;
    display.orders.replaceRecords(ordersResult.orders);
    
    display.myprod.execute();
    
    if (validaddr)
      pjs.call("addresscleanse.js", ordersResult.orders);
  }
  
  return;
  
  function GetOrders(productID) {
    return pjs.sendRequest("get", "http://localhost:" + portNum + "/prodorders/" + productID, {});
  }
}

exports.run = proddsp;
exports.parms = [
 { type: 'packed', length: 5, decimals: 0 }
]
