const home = (req, res) => res.render('home', { title: 'Home' });
const about = (req, res) => res.render('about', { title: 'About' });
const signup_get = (req, res) => res.render('signup', { title: 'Sign Up' });

module.exports = { home, about, signup_get };
