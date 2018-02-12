
// This is a simple Web Service to retrieve Orders for a Product

function prodorders(req, res) {
  var productId = req.params.id;

  var result = {};  
  result.orders = pjs.query("SELECT * FROM ORDERS WHERE ORDERPRID = " + productId);
  result.count = result.orders.length;
 
  res.json(result);  
}

exports.run = prodorders;
