
// Display Hello World message using a Rich Display File

function hello2() {

  pjs.defineDisplay("hello2.json");
  
  hello2.screen1.execute();

}

exports.run = hello2;
