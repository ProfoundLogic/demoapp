function prodlist() {
  pjs.define("pridOut", { type: 'packed', length: 5, decimals: 0 });
  pjs.defineDisplay("display", "prodlist.json");
  
  var c1; //Cursor
  var productsp = [];
  var searchDesc;
  
  while (!exit) {
    //Notice that ‘searchvalue’ is lowercase.
    searchDesc = searchvalue.trim();
    
    if (searchDesc == "") {
      //If search value is blank: regular fetch all
      c1 = pjs.allocStmt();
      pjs.executeDirect(c1, "select * from productsp");
      
    } else {
      //If not blank, fetch all based on LIKE clause
      searchDesc = '%' + searchDesc + '%';

      c1 = pjs.prepare("select * from productsp where prdesc like ?");
      pjs.bindParameters(c1, [
        [searchDesc, SQL_PARAM_INPUT]
      ]);
      pjs.execute(c1);
    }
    
    productsp = pjs.fetch(c1, SQL_FETCH_ALL);
    pjs.close(c1);

    display.mygrid.replaceRecords(productsp);

    display.mydsp.execute();
    display.mygrid.readChanged();
    
    if (!display.endOfData()) {
      pridOut = prid;
      
      pjs.call("proddsp", pridOut);
    }
  }
}

exports.run = prodlist;