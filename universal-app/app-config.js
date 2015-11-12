// describe your apps here
things.univs = [ {
  css : 'app.css',
  // describe input fields you
  // like to deal with in your app.
  inputs : [ {
    name : 'name',
    label : 'name of the dish'
  }, {
    name : 'rating',
    label : 'your rating',
    type : 'number',
    pattern : '[0-9]'
  } ],
  // basic adding properties
  _cn : 'dishes',
  _state : 'eaten',
  options : {
    // store things in a timeline or all as new node?
    // @see things.univ._id
    timeline : true
  }
}, {
  // another app
  title : 'grandmothers robbed',
  // describe input fields you
  // like to deal with in your app.
  inputs : [ {
    name : 'name',
    label : 'name of the grandmother'
  }, {
    name : 'offender',
    label : 'describe the offender',
    type : 'text'
  }, {
    name : 'date',
    label : 'robbed on date',
    type : 'date'
  } ],
  // basic adding properties
  _cn : 'grandmothers',
  _state : 'robbed',
  options : {
    // store things in a timeline or all as new node?
    // @see things.univ._id
    timeline : true
  }
} ];