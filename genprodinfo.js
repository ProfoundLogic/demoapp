var docx = require('docx');

function genprodinfo(req, res) {
  var prodid = req.params.id;
  
  console.log(prodid);
  var product = pjs.query("SELECT * FROM PRODUCTSP WHERE PRID = " + prodid);
  product[0].features = pjs.query("select b.FENAME from demolib.PRODFEATP as a, demolib.featuresp as b where a.XPRID = ? and a.XFEID = b.FEID", prodid);
  
  var document = GenerateDocument(product[0]);
  var exporter = new docx.ExpressPacker(document, res);
  exporter.pack(prodid + " Information");
  
}
exports.run = genprodinfo;

function GenerateDocument(prodJson) {
  
  console.log(prodJson);
  
  var doc = new docx.Document();
  var paragraph, text;
  
  paragraph = new docx.Paragraph("Product " + prodJson.prid);
  paragraph.heading1().center();
  doc.addParagraph(paragraph);
  
  text = new docx.TextRun("This document details product " + prodJson.prid + " as of " + (new Date()).toLocaleDateString() + ".").font("Calibri");
  paragraph = new docx.Paragraph(text)
  doc.addParagraph(paragraph);
  
  paragraph = new docx.Paragraph(new docx.TextRun(""));
  doc.addParagraph(paragraph);
  
  text = new docx.TextRun("ID: " + prodJson.prid).font("Calibri");
  paragraph = new docx.Paragraph(text).bullet();
  doc.addParagraph(paragraph);
  
  text = new docx.TextRun("Name: " + prodJson.prname).font("Calibri");
  paragraph = new docx.Paragraph(text).bullet();
  doc.addParagraph(paragraph);
  
  text = new docx.TextRun("Price: " + prodJson.prprice).font("Calibri");
  paragraph = new docx.Paragraph(text).bullet();
  doc.addParagraph(paragraph);
  
  text = new docx.TextRun("Quantity available: " + prodJson.prqty).font("Calibri");
  paragraph = new docx.Paragraph(text).bullet();
  doc.addParagraph(paragraph);
  
  text = new docx.TextRun("The product contains the following features:").font("Calibri").break();
  paragraph = new docx.Paragraph(text);
  doc.addParagraph(paragraph);
  
  for (var i = 0; i < prodJson.features.length; i++) {
    text = new docx.TextRun(prodJson.features[i].fename).font("Calibri");
    paragraph = new docx.Paragraph(text).bullet();
    doc.addParagraph(paragraph);
  }
  
  return doc;
}

