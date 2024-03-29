/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    return n === undefined ? array[array.length-1] : array.slice(Math.max(array.length-n,0),array.length);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
  // assumes collection is either an array or a generic object
  // if collection is an array do if
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      };
  // else it's a generic object
    } else {
      for (var prop in collection) {
        iterator(collection[prop], prop, collection);
      };
    };
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    // create an array to push all elements that pass
    var resultArray = [];
    for (var i = 0; i < collection.length; i++) {
      // only pass elements that pass the test to resultArray
      // assuming test is a function that returns a bool
      if (test(collection[i])) {
        resultArray.push(collection[i]);
      };
    };
    return resultArray;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    var trues = _.filter(collection, test);
    var fails = [];
    //  for each element in collection, either push to fails, or increment truth counter
    var trueCounter = 0;
    for (var i = 0; i < collection.length; i++) {
      // check to see if it is true else push to fails
      if (trueCounter < trues.length && collection[i] === trues[trueCounter]) {
        trueCounter++;
      } else {
        fails.push(collection[i]);
      };
    };
    return fails;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var uniqs = [];
    for (var i = 0; i < array.length; i++) {
      var matched = false;
      for (var uniqCounter = 0; uniqCounter < uniqs.length; uniqCounter++) {
        if (array[i] === uniqs[uniqCounter]) {
          matched = true;
          break;
        };
      };
      if (matched === false) {
        uniqs.push(array[i]);
      };
    };
    return uniqs;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    // assumes collection is either an array or a generic object
    // if collection is an array do if
    var resultArray = [];
    if (Array.isArray(array)) {
      for (var i = 0; i < array.length; i++) {
        resultArray.push(iterator(array[i], i, array));
      };
      return resultArray;
    // else it's a generic object
    } else {
      for (var prop in array) {
        resultArray.push(iterator(array[prop], prop, array));
      };
      return resultArray;
    };
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(array, function(value){
      return value[propertyName];
    });
  };

  // Calls the method named by methodName on each value in the list.
  // Note: you will nead to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    // create an array to hold the results
    var results = [];
    // determine if functionOrKey is a function, else it is a method
    if (typeof(functionOrKey) === "function") {
      for (var i = 0; i < collection.length; i++) {
        results.push(functionOrKey.apply(collection[i],args));
      };
    } else {
      for (var i =0; i < collection.length; i++) {
        results.push(collection[i][functionOrKey](args));
      };
    };
    return results;
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. If initialValue is not explicitly passed in, it should default to the
  // first element in the collection.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  _.reduce = function(collection, iterator, accumulator) {
    for (var i = 0; i < collection.length; i++) {
      accumulator = iterator(accumulator, collection[i]);
    };
    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // if/else to determine if acting on an array or an object
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    if (Array.isArray(collection)) {
      return _.reduce(collection, function(wasFound, item) {
        if (wasFound) {
          return true;
        }
        return item === target;
      }, false);
    } else {
      // check if target is one of the properties in the object
      for (var prop in collection) {
        if (collection[prop] === target) {
          return true;
        };
      };
      return false;
    };
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
  // if iterator is undefined, compare items in collection
    if (iterator === undefined) {
      var ifIteratorFunc = function (runsum, item) {
        return (runsum && item);
      };
      return _.reduce(collection, ifIteratorFunc, true);
    } else {
    // define the iterator function to use in reduct
        var elseIteratorFunc = function (runsum, item) {
          if (runsum === false) {
            return false;
          } else {
            return (runsum && Boolean(iterator(item)));
          };
        };
        return _.reduce(collection, elseIteratorFunc, true);
      };
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    // providing a default iterator and default result for empty set

    if (iterator === undefined) {
      iterator = function (runsum, item) {
        return (runsum || Boolean(item));
      };
    };

    // check to see if any are true, as soon as one is found end
    for (var i = 0; i < collection.length; i++) {
      if (Boolean(iterator(collection[i])) === true) {
        return true;
      };
    };
    return false;
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    // define the target object
    var target = arguments[0];
    // start overwriting properties
    for ( var i = 1; i < arguments.length; i ++) {
      for (var key in arguments[i]) {
        target[key] = arguments[i][key];
      };
    };
    return target;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    /*
    // extend using 2nd object as target, then overwrite with 1st
    var target = arguments[1];
    var goal = arguments[0];
    // create new arguments for first extend
    var extend1 = [];
    for (var i = 1; i < arguments.length; i++) {
      extend1.push(arguments[i]);
    };

    target = _.extend.apply(this, extend1);
    console.log(target);
    var result = _.extend(target, goal);
    console.log(result);
    return result;
    */
    // invert the list of arguments and pass to extend


    var inverse = []
    // first argument is left alone and not in inverse
    for (var i = arguments.length -1; i > 0; i--) {
      inverse.push(arguments[i]);
    };
    var second = _.extend.apply(this, inverse);
    //var first = arguments[0];
    //return _.extend(second, first);
    // since above is not technically the first argument
    // compare all props in second with first and add new
    for (var key in second) {
      var match = false;
      for (var prop in arguments[0]) {
        if (key === prop) {
          match = true;
        };
      };
      if (!match) {
        arguments[0][key] = second[key];
      };
    };
    return arguments[0];
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // _.memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    // store previously called results as keys in an object
    var resultlist = new Object ();
    return function() {
      // first see if the argument has called before
      for (var key in resultlist) {
        // compare each key in resultlist to arguments
        // if matching, return from resultlist
        if (key === arguments[0]) {
          return resultlist[key];
        };
      };
      // reaching here means no match, add match and return
      resultlist[arguments[0]] = func(arguments[0]);
      return func(arguments[0]);
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    // note that the ordering of the arguments matches setTimeout
    setTimeout.apply(this, arguments);

  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var shuffle = array.slice(0); 
    for (var i = 0; i < shuffle.length; i ++) {
      var holder = shuffle.pop();
      var index = Math.floor(Math.random()*array.length);
      shuffle.splice(index, 0, holder);
    };
    return shuffle;
  };


  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
 
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
  };

}).call(this);
