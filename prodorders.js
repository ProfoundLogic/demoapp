
function prodorders(req, res) {
  var prodid = req.params.id;
  
  var result = {
    count: 0,
    orders: []
  };
  
  result.orders = pjs.query("SELECT * FROM ORDERS WHERE ORDERPRID = " + prodid);
  result.count = result.orders.length;
 
  res.json(result);
  
}
exports.run = prodorders;