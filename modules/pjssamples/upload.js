
const path = require("path");

function upload() {
  
  pjs.defineDisplay("display", "upload.json", { rrnFields: { winsfl: "rrn" } });
  pjs.define("rrn", { type: "integer", length: 5 });
  
  pjs.define("upload_info", { type: "data structure", qualified: true, elements: {
    "num_files": { type: "zoned", length: 3, decimals: 0 },
    "directory": { type: "char", length: 256 },
    "files": { type: "char", length: 256, dim: 2}
  }});
  
  directory = __dirname;
  
  while (!quit) {

    display.rec.execute();
    if (!quit) {
      
      display.winsfl.clear();
      for (rrn = 1; rrn <= upload_info.num_files; rrn++) {

        uploaded = upload_info.directory.trim() + path.sep + upload_info.files[rrn];
        display.winsfl.write();
       
      }
      display.winctl.execute();
      
    }
   
  }
  
}

module.exports.run = upload;
