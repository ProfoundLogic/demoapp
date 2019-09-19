
// Display Hello World message using a Rich Display File

function hello2() {

  pjs.defineDisplay("display", "pjssamples/hello2.json");
  
  display.screen1.execute();

}

exports.run = hello2;
