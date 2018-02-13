
// This is a simple Web Service to retrieve Orders for a Product

function prodorders(request, response) {
  var result = {};  
  result.orders = pjs.query("SELECT * FROM ORDERS WHERE ORDERPRID = " + request.params.id);
  result.count = result.orders.length;
 
  response.json(result);  
}

exports.run = prodorders;
