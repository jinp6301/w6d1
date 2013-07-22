Function.prototype.myBind = function(obj) {
  var that = this;
  return function() {
    that.apply(obj);
  }
}

function times(num, fun) {
  for (var i = 0; i < num; i++) {
    // call the function
    // console.log(i);
    fun(); // call is made "function-style"
  }
}

var cat = {
  age: 5,

  age_one_year: function () {
    this.age += 1;
    // console.log(this.age);
  }
};

times(10, cat.age_one_year.myBind(cat));

// cat.age_one_year.myBind(cat);
console.log(cat.age);