const User = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            });
        }
        const isMatch = bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                status: 'fail',
                message: 'Incorrect password'
            });
        }
        const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({
            status: 'success',
            token,
            user
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message
        });
    }
};

exports.payment = async (req, res) => {
    try {
        const { amount, currency } = req.body;
    
        const paymentIntent = await stripe.paymentIntents.create({
          amount,
          currency,
          automatic_payment_methods: {enabled: true},
        });
    
        res.status(200).json({ clientSecret: paymentIntent.client_secret });
      } catch (error) {
        console.error('Stripe error:', error);
        res.status(500).json({ error: 'An error occurred while creating payment intent.' });
      }
};
exports.Plan = async (req, res) => {
    const { user } = req.params.userId;
    console.log(user);
    try {
        const response = await User.findOne( user);   
        console.log(response); 
        if (response) {
            return res.status(200).json({
                status: 'success',
                data: response.plandetails
            });
        }
    }
    catch (error) {
        console.error('Error Getting plan details:', error);
        res.status(500).json({ message: 'An error occurred' });
    }
};
exports.getPlans = async (req, res) => {
    const { selectedPlan, price, isMonthlySelected, id: userId } = req.body;


    try {
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        user.plandetails = {
          name: selectedPlan,
          price: price,
          isMonthlySelected: isMonthlySelected
        };
        await user.save();
        res.status(200).json({ message: 'Plan details saved successfully' });
      } catch (error) {
        console.error('Error saving plan details:', error);
        res.status(500).json({ message: 'An error occurred' });
      }
};

exports.cancel = async (req, res) => {
    const { id: userId } = req.body;
    try {
        const res = await stripe.subscriptions.del(userId);
        console.log(res);
        res.status(200).json({ message: 'Plan Cancelled successfully' });
    } catch (error) {
        console.error('Error cancelling plan details:', error);
        res.status(500).json({ message: 'An error occurred' });
    }
};

exports.signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                status: 'fail',
                message: 'User already exists'
            });
        }
        const hashPassword = await bcrypt.hash(password, 12);
        
        const user = await User.create({
            name,
            email,
            password: hashPassword
        });
        await user.save();
        const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({
            status: 'success',
            token,
            user
        });

    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message
        });
    }
};

