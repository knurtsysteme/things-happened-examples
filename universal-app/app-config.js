// describe your app here
things.univ = {};

// describe input fields you 
// like to deal with in your app.
things.univ.inputs = [{
	name: 'name',
	label: 'name of the dish'
},{
	name: 'rating',
	label: 'your rating',
	type: 'number',
	pattern: '[0-9]'
}];

// basic adding properties
things.univ._cn = 'dishes';
things.univ._state = 'eaten';

// general options
things.univ.options = {};
// store things in a timeline or all as new node?
// @see things.univ._id
things.univ.options.timeline = true;

/* OPTIONAL INPUTS

//static text labels

things.univ.app = {};
things.univ.app.title = 'Dishes eaten';
things.univ.app.date = 'date';
things.univ.app.login = 'login';
things.univ.app.logout = 'logout';
things.univ.app.submit = 'submit';
things.univ.app.showoutput = 'Show all dishes eaten';
things.univ.app.showinput = 'Add a dish eaten';
things.univ.app.titlesecret = 'Your secret';
things.univ.app.showtree = 'show tree';

// optional id add your thing to:
things.univ._id = '542d9674e427aa815c0d9a2b';
*/