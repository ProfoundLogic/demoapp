var docx = require('docx');

function genprodinfo(req, res) {
  var prodid = req.params.id;
  
  var product = pjs.query("SELECT * FROM PRODUCTSP WHERE PRID = " + prodid);
  product[0].features = pjs.query("SELECT b.FENAME from PRODFEATP as a, FEATURESP as b where a.XPRID = ? and a.XFEID = b.FEID", prodid);
  
  var document = generateDocument(product[0]);
  var exporter = new docx.ExpressPacker(document, res);
  exporter.pack(prodid + " Information");
  
}

exports.run = genprodinfo;


function generateDocument(product) {
  
  var doc = new docx.Document();
  var paragraph, text;
  
  paragraph = new docx.Paragraph("Product " + product.prid);
  paragraph.heading1().center();
  doc.addParagraph(paragraph);
  
  text = new docx.TextRun("This document details product " + product.prid + " as of " + (new Date()).toLocaleDateString("en-US") + ".").font("Calibri");
  paragraph = new docx.Paragraph(text)
  doc.addParagraph(paragraph);
  
  paragraph = new docx.Paragraph(new docx.TextRun(""));
  doc.addParagraph(paragraph);
  
  text = new docx.TextRun("ID: " + product.prid).font("Calibri");
  paragraph = new docx.Paragraph(text).bullet();
  doc.addParagraph(paragraph);
  
  text = new docx.TextRun("Name: " + product.prname).font("Calibri");
  paragraph = new docx.Paragraph(text).bullet();
  doc.addParagraph(paragraph);
  
  text = new docx.TextRun("Price: " + product.prprice).font("Calibri");
  paragraph = new docx.Paragraph(text).bullet();
  doc.addParagraph(paragraph);
  
  text = new docx.TextRun("Quantity available: " + product.prqty).font("Calibri");
  paragraph = new docx.Paragraph(text).bullet();
  doc.addParagraph(paragraph);
  
  text = new docx.TextRun("The product contains the following features:").font("Calibri").break();
  paragraph = new docx.Paragraph(text);
  doc.addParagraph(paragraph);
  
  for (var i = 0; i < product.features.length; i++) {
    text = new docx.TextRun(product.features[i].fename).font("Calibri");
    paragraph = new docx.Paragraph(text).bullet();
    doc.addParagraph(paragraph);
  }
  
  return doc;
}

