var readline = require('readline');
var $ = require('./underscore.js');

var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


var game = function () {

  var pegs = [[3,2,1],[],[]];

  function step() {
    console.log(pegs);

    if ($.isEqual(pegs[1],[3,2,1]) || $.isEqual(pegs[2],[3,2,1])) {
      console.log("You win!");
      return;
    };

    movePiece(pegs,function(newpegs) {
      pegs = newpegs;
      step();
    });
  }

  step();
}

var movePiece = function(pegs,callback) {
  reader.question("Start peg? ",function(startPeg) {
    reader.question("End peg? ", function(endPeg) {
      startPeg = parseInt(startPeg);
      endPeg = parseInt(endPeg);
      if ($.last(pegs[startPeg])) {
        if ((!$.last(pegs[endPeg])) || ($.last(pegs[endPeg]) > $.last(pegs[startPeg]))) {
          pegs[endPeg].push(pegs[startPeg].pop());
        } else {
          console.log("Illegal move!!!!!!");
        };
      } else {
        console.log("Illegal move!!!!!!");
      };

      callback(pegs);

    });
  });
}

game();