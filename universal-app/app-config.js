/* describe your app here
 */
things.simpleauth = {};

/* stupid text labels
 */
things.simpleauth.app = {};
things.simpleauth.app.title = 'Dishes eaten';
things.simpleauth.app.date = 'date';
things.simpleauth.app.login = 'login';
things.simpleauth.app.logout = 'logout';
things.simpleauth.app.submit = 'submit';
things.simpleauth.app.showoutput = 'Show all dishes eaten';
things.simpleauth.app.showinput = 'Add a dish eaten';
things.simpleauth.app.titlesecret = 'Your secret';

/* describe input fields you 
 * like to deal with in your app.
 */
things.simpleauth.inputs = [{
	name: 'name',
	label: 'name of the dish'
},{
	name: 'rating',
	label: 'your rating',
	type: 'number',
	pattern: '[0-9]'
}];

/* basic adding properties
 */
things.simpleauth._cn = 'dishes';
things.simpleauth._state = 'eaten';

// optional id add your thing to:
// things.simpleauth._id = '542d9674e427aa815c0d9a2b';