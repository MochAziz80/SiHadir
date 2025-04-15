const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../models");
exports.login = async (req, res) => {
  try {
    const { nama, password } = req.body;
    const user = await User.findOne({ where: { nama } });

    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      "00",
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      data: {
        nama: user.nama,
        role: user.role
      },
      token
    });  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
