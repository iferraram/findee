const { Router } = require('express');
const {handleSignUp, handleSignIn} = require('../controllers/authCOntroller'); // Import the authentication controller
const router = Router(); 

router.post('/signup', handleSignUp);
router.post('/signin', handleSignIn);

module.exports = router; 