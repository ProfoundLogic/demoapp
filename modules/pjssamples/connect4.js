
function connect4(parm1) {
  pjs.define("firstTurn", { type: 'char', length: 6, refParm: parm1 });

  var grid = [];
  pjs.defineDisplay("display", "pjssamples/connect4.json");
  
  if (parm1 === undefined)
    initialize("");
  else
    initialize(firstTurn);
  
  while (!exit) {
    sendGrid(); 
    display.game.execute();
    for (var column = 0; column <= 6; column++) {
      if (pjs.get("drop" + column)) drop(column);
    }
  }

  function initialize(firstGo) {
    if (['red', 'yellow'].indexOf(firstGo.trim()) >= 0) {
      turncolor = firstGo;
    } else {
      if (Math.random() > 0.5) {
        turncolor = "yellow";
      }
      else {
        turncolor = "red";
      }
    }
    grid = [];
    for (var i = 0; i <= 5; i++) {
      grid.push(["blank", "blank", "blank", "blank", "blank", "blank", "blank"]);
    }
  }
  
  function switchTurn() {
    if (turncolor.trim() === "red") {
      turncolor = "yellow";
    }
    else {
      turncolor = "red";
    }
  }
  
  function drop(column) {
    var validMove = false;
    for (var row = 5; row >= 0; row = row - 1) {
      if (grid[row][column] === "blank") {
        grid[row][column] = turncolor;
        validMove = true;
        break;
      }
    }
    if (!validMove) return;
    if (fourInARow()) {
      if (turncolor.trim() === "red") {
        redwins++;
      }
      else {
        yellowwins++;
      }
      sendGrid(); 
      display.game.write();
      display.winner.execute();
      initialize("");
    }
    else if (tied()) {
      sendGrid(); 
      display.game.write();
      display.tiegame.execute();
      initialize("");
    }
    else {
      switchTurn();
    }
  }
  
  function fourInARow() {
    for (var row = 0; row < grid.length; row++) {
      for (var column = 0; column < grid[row].length; column++) {
        if (grid[row][column] === "blank") continue;
        // Check horizontal
        if (grid[row][column] === grid[row][column - 1] &&
            grid[row][column] === grid[row][column - 2] &&
            grid[row][column] === grid[row][column - 3]) return true;
        // Check vertical
        if (row >= 3 &&
            grid[row][column] === grid[row - 1][column] &&
            grid[row][column] === grid[row - 2][column] &&
            grid[row][column] === grid[row - 3][column])   return true;
        // Check diagonal
        if (row >= 3 &&
            grid[row][column] === grid[row - 1][column - 1] &&
            grid[row][column] === grid[row - 2][column - 2] &&
            grid[row][column] === grid[row - 3][column - 3]) return true;
        if (row >= 3 &&
            grid[row][column] === grid[row - 1][column + 1] &&
            grid[row][column] === grid[row - 2][column + 2] &&
            grid[row][column] === grid[row - 3][column + 3]) return true;
      }
    }  
    // Nothing found
    return false;
  }
  
  function tied() {
    for (var row = 0; row < grid.length; row++) {
      for (var column = 0; column < grid[row].length; column++) {
        if (grid[row][column] === "blank") return false;
      }
    }
    // no blank squares left -- it's a tie
    return true;
  }
  
  function sendGrid() {
    for (var row = 0; row < grid.length; row++) {
      for (var column = 0; column < grid[row].length; column++) {
        var fieldName = "color_" + row + "_" + column;
        pjs.set(fieldName, grid[row][column]);
      }
    }
    turn = turncolor.trim() + "'s turn";
  }
  
}

module.exports.run = connect4;
