const bcrypt = require("bcryptjs");
const { User } = require("../models");

exports.createUser = async (req, res) => {
  try {
    const { nama, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      nama,
      email,
      password: hashedPassword,
      role: role || "karyawan",
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal membuat user" });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User  not found" });
    }

    await user.destroy();
    return res.status(200).json({ message: "User  deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getallUser = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal mengambil data user" });
  }
};


exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { nama, email, password, role } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (nama) user.nama = nama;
    if (email) user.email = email;
    if (role) user.role = role;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal mengupdate user" });
  }
};


