const jwt = require('jsonwebtoken');
const { User } = require('../models/user')


const authControl = {

    async loginUser(req, res) {
        const { username, password } = req.body;
const user = await User.findOne({ where: { username } });
  if (!user) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  const token = jwt.sign({ userId: user.id, role: user.role }, 'your-secret-key', { expiresIn: '1h' });
  return res.status(200).json({ token });
    }


}




module.exports = authControl;

