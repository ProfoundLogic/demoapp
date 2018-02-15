/* 

  Profound UI File Upload Widget Exit Program

  Provides security for file uploads, see here:

  http://www.profoundlogic.com/docs/display/PUI/Security

*/

const path = require("path");

function puiuplexit(fileInfo, allow, errorMsg) {

  pjs.define("fileInfo", { type: 'data structure', qualified: true, refParm: fileInfo, elements: {
    "widgetId": { type: 'char', length: 256 },
    "directory": { type: 'char', length: 256 },
    "name": { type: 'char', length: 256 },
    "type": { type: 'char', length: 256 },
    "size": { type: 'unsigned integer' },
    "exists": { type: 'boolean' }
  }});
  pjs.define("allow", { type: 'integer', length: 5, decimals: 0, refParm: allow });
  pjs.define("errorMsg", { type: 'char', length: 256, refParm: errorMsg });

  
  // For example...

  // 1. Allow file size up to 10MB...

  // 2. Allow writing files only into the samples directory, do not overwrite existing files.

  var pjssamples = __dirname + path.sep + "pjssamples";
  if (fileInfo.size <= 10485760 && (fileInfo.directory).rtrim() == pjssamples && !fileInfo.exists)
    allow = 1;
  else 
    allow = 0;

  flags["LR"] = true;
  
}

exports.run = puiuplexit;
