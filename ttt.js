var readline = require('readline');
var $ = require('./underscore.js');
var board = [["_","_","_"],["_","_","_"],["_","_","_"]];

var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var printBoard = function() {
  board.forEach(function(row,index,array) {
    row.forEach(function(element) {
      process.stdout.write(element + " | ");
    });
    process.stdout.write("\n");
    process.stdout.write("----------");
    process.stdout.write("\n");
  });
};

var checkWin = function(array) {
  var returnVal = false;

  returnVal = checkRow(array);

  var ziparray = $.zip.apply($, array);
  ziparray.forEach(function(row, index, array) {
    if ($.isEqual(row, ["X","X","X"]) || $.isEqual(row, ["O","O","O"])) {
      returnVal = true;
    }
  });
  if (($.isEqual([array[0][0], array[1][1], array[2][2]], ["X","X","X"])) || ($.isEqual([array[0][0], array[1][1], array[2][2]], ["O","O","O"])) ) {
    returnVal = true;
  };
  if (($.isEqual([array[0][2], array[1][1], array[2][0]], ["X","X","X"])) || ($.isEqual([array[0][2], array[1][1], array[2][0]], ["O","O","O"])) ) {
    returnVal = true;
  };

  return returnVal;
};

var checkRow = function(boardArray) {
  retVal = false;
  boardArray.forEach(function(row, index, array) {
    if ($.isEqual(row, ["X","X","X"]) || $.isEqual(row, ["O","O","O"])) {
      retVal = true;
    }
  });
  return retVal;
}

// checkWin([["O","X","O"],["O","X","O"],["X","O","X"]]);
var game = function() {
  var players = [new computerPlayer,new humanPlayer];
  var i = 0;

  function step() {
    printBoard();
    console.log(board);
    console.log(checkWin(board));
    var playerChar = i == 0 ? "X" : "O";
    if (checkWin(board)) {
      playerChar = i == 0 ? "O" : "X";
      console.log(playerChar + " winz");
      return;
    };

    players[i].chooseMove(i,function(coordinates) {
      if (!makeMove(coordinates, playerChar)) {
        console.log("Illegal move. Go to jail.")
        step();
      }

      i = (i+1) % 2;
      step();
    });
  };

  step();
};

function computerPlayer() {
  this.chooseMove = function(turn,callback) {
    sum = turn == 0 ? 2 : 10;
    findMove(sum,callback);
  };
}

var findMove = function(sum,callback) {
  var boardNum = [[0,0,0],[0,0,0],[0,0,0]];
  for (var i = 0; i < board.length;i++) {
    for (var j = 0; j < 3; j++) {
      if ($.isEqual(board[i][j], "X")) {
        boardNum[i][j] = 1;
      };
      if ($.isEqual(board[i][j], "O")) {
        boardNum[i][j] = 5;
      };
    };
  };

  var coordinates = []

  boardNum.forEach(function(row, index) {
     for (var i = 0; i < 3; i++) {
       if ($.contains(row, 0)) {
         coordinates = [index,$.indexOf(row, 0)];
         return;
       };
     };
  });

  console.log(coordinates);


  boardNum.forEach(function(row, index) {
     var sumRow = $.reduce(row, function(memo, num){ return memo + num; }, 0);
     if (sum == sumRow) {
       for (var i = 0; i < 3; i++) {
         if ($.contains(row, 0)) {
           coordinates = [index,$.indexOf(row, 0)];
           return;
         };
       };
     };
  });
  var transposedBoardNum = $.zip.apply($, boardNum);
  transposedBoardNum.forEach(function(row, index) {
     var sumRow = $.reduce(row, function(memo, num){ return memo + num; }, 0);
     if (sum == sumRow) {
       for (var i = 0; i < 3; i++) {
         if ($.contains(row, 0)) {
           coordinates = [$.indexOf(row, 0),index];
           return;
         };
       };
     };
  });

  callback(coordinates);
}

function humanPlayer() {
  this.chooseMove = function(turn,callback) {
    reader.question("Give a pair of coordinates separated by comma:",function(answer) {
      x = parseInt(answer.split(",")[0]);
      y = parseInt(answer.split(",")[1]);
      callback([x,y]);
    });
  };
}

function makeMove(coordinates,char) {
  if (board[coordinates[0]][coordinates[1]] == "_") {
    board[coordinates[0]][coordinates[1]] = char;
    return true;
  } else {
    return false;
  };
}

// findMove(2,function(coordinates) { console.log(coordinates) })
game();