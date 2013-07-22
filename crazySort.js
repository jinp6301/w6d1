var readline = require('readline');

var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var compare = function(el1,el2,callback) {
  var answer = 0;
  reader.question(el1 + " >,<,= " + el2,
  function(result) {
    if (result == ">") {
      answer = -1;
    } else if (result == "<") {
      answer = 1;
    };

    callback(answer);
  });

};

var performSortPass = function(arr,callback) {
  var i = 1;

  function performStep() {

    if (arr.length == i) {
      callback(arr);
    };

    compare(arr[i-1],arr[i],function(answer) {
      if (answer == -1) {
        var f = arr[i-1];
        var l = arr[i];
        arr[i-1] = l;
        arr[i] = f;
        console.log(arr);
      };

      i++;
      performStep();
    });
  }

  performStep();


};

var crazyBS = function(arr,callback) {
  var sorted = false;

  function doStep() {

    for (var j=0;j<arr.length-1;j++) {
      if (arr[j] > arr[j+1]) {
        sorted = false;
        break;
      }
      sorted = true;
    };

    if (sorted == true) {
      console.log("sorted");
      return;
    }

    callback(arr,function(newarr) {
      arr = newarr;
      doStep();
    });

  }

  doStep();

}

 crazyBS([1,3,7,2],performSortPass)

// compare(1,2,function(answer) { console.log(answer); });
// performSortPass([1,3,7,2,4]);