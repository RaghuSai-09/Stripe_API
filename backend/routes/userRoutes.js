const express = require('express');
const router = express.Router();

const { login, signup,payment, getPlans,Plan } = require('../controllers/userController');

router.post('/login', login);
router.post('/signup', signup);
router.post('/plans', getPlans);
router.post('/create-payment-intent', payment);

router.get('/plan/:userId', Plan);

module.exports = router;