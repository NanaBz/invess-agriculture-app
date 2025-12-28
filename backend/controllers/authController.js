const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });
    await user.save();
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    console.log('🔑 [LOGIN] Request received:', { email: req.body?.email, passwordLength: req.body?.password?.length });
    const { email, password } = req.body;
    console.log('🔑 [LOGIN] Looking for user:', email);
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    console.log('✅ [LOGIN] Token generated, sending response');
    res.json({ token, user: { id: user._id, name: user.name, role: user.role, email: user.email } });
  } catch (err) {
    console.error('❌ [LOGIN] Error:', err.message);
    res.status(400).json({ error: err.message });
  }
};
