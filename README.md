## Profound.js Example Application

Before setting up the Node.js modules on IBM i, we suggest you try setting up and running this application from your own machine first.

## References

* [Profound.js Overview](http://www.profoundlogic.com/docs/display/PUI/Profound.js+Overview)
* [Installing Prerequisites](http://www.profoundlogic.com/docs/display/PUI/Installing+Prerequisites), [Installing Profound.js](http://www.profoundlogic.com/docs/display/PUI/Installing+Profound.js), [Verifying the Installation](http://www.profoundlogic.com/docs/display/PUI/Verifying+the+Installation)
* [Setting Up Genie on IBM i](http://www.profoundlogic.com/docs/display/PUI/Setting+Up+Genie+on+IBM+i) (how to access Genie & PJSMYIP)
* [Calling Node.js Modules via Proxy Programs](http://www.profoundlogic.com/docs/display/PUI/Calling+Node.js+Modules+via+Proxy+Programs)
* [Profound.js Debugging with VS Code](http://www.profoundlogic.com/docs/display/PUI/Profound.js+Debugging+with+VS+Code)

## Setup

This is a Profound.js application example. You should clone this repository into `profoundjs/modules/yourapp`, where `profoundjs` is your installation directory.

#### ILE setup 

You will need to copy both `ILE/INQ05R.rpgle` and `ILE/INQ05D.dspf` into a source-physical file on IBM i:

```
> CRTSRCPF FILE(YOURAPP/QRPGLESRC) RCDLEN(112)
> CRTSRCPF FILE(YOURAPP/QDDSSRC) RCDLEN(112)

> CPYFRMSTMF FROMSTMF('ILE/INQ05R.rpgle') TOMBR('/QSYS.lib/YOURAPP.lib/QRPGLESRC.file/INQ05R.mbr') MBROPT(*ADD)
> CPYFRMSTMF FROMSTMF('ILE/INQ05D.dspf') TOMBR('/QSYS.lib/YOURAPP.lib/QRPGLESRC.file/INQ05D.mbr') MBROPT(*ADD)
```

You must also create the tables used by the programs in this example on IBM i:
```
> RUNSQLSTM SRCSTMF('ILE/productsp.sql') COMMIT(*NONE) NAMING(*SQL)
> RUNSQLSTM SRCSTMF('ILE/products1l.sql') COMMIT(*NONE) NAMING(*SQL)
> RUNSQLSTM SRCSTMF('ILE/products2l.sql') COMMIT(*NONE) NAMING(*SQL)
> RUNSQLSTM SRCSTMF('ILE/prodfeatp.sql') COMMIT(*NONE) NAMING(*SQL)
> RUNSQLSTM SRCSTMF('ILE/featuresp.sql') COMMIT(*NONE) NAMING(*SQL)
> RUNSQLSTM SRCSTMF('ILE/categp.sql') COMMIT(*NONE) NAMING(*SQL)
> RUNSQLSTM SRCSTMF('ILE/orders.sql') COMMIT(*NONE) NAMING(*SQL)
```

Next, you must

1. compile the Rich Display file (`INQ05D`) from the Profound UI Designer.
2. compile the RPG program (INQ05R) using `CRTBNDRPG PGM(YOURAPP/INQ05R) SRCFILE(YOURAPP/QRPGLESRC)`. For debugging reasons, you could also use the `OPTION(*EVENTF) DBGVIEW(*SOURCE)` parameters.
3. create the proxy object for the PRODDSP Node.js module using `CRTPJSPRXY PGM(YOURAPP/PRODDSP)`

#### Node.js setup

For the document generation, you need to install a Node.js module called [`docx`](https://github.com/dolanmiu/docx). To do this, change your working directory to your Profound.js installation directory and then install it.

1. `cd c:\pjsinstall` - change this depending on where you install Profound.js
2. `npm install docx`

For the web services to work, you will need to modify your `start.js` in the root of your Profound.js installation directory to include calls to `app.get`. It should look similar to the file below:

```
//start.js

// Load Profound.js
var profoundjs = require("profoundjs");

// Process command line arguments
profoundjs.rlog = process.argv.includes("-rlog");
profoundjs.tlog = process.argv.includes("-tlog");

// Apply configuration
var config = require("./config.js");
profoundjs.applyConfig(config);

// Start Profound.js server
var isWorker = profoundjs.server.listen();
if (isWorker) {

  // This is the top-level Express Application.
  // Custom Express coding can be added here.
  var express = profoundjs.server.express;
  var app = profoundjs.server.app;
  app.use(express.json());  // default to use JSON-encoded post data
  
  //Add these two lines for the web services to work.
  app.get("/prodorders/:id", profoundjs.express("yourapp/prodorders"));
  app.get("/genprodinfo/:id", profoundjs.express("yourapp/genprodinfo"));
}

```

## Running the application

If you're running Profound.js on your own machine that is not IBM i, you must use the `PJSMYIP` command to point all Profound.js requests to your local machine.

1. Start your Profound.js server (If you're running on your own machine: `node start`)
2. From Genie: `CALL INQ05R`
3. This program, `INQ05R`, is the RPG application that calls `PRODDSP`.
4. When selecting on a product from the list on the left of the display, it will call `PRODDSP` which is the Node.js application.
