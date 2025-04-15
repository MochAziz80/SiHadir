const bcrypt = require("bcryptjs");
const { User } = require("../models");

exports.createUser = async (req, res) => {
    try {
      const { nama, email, password, role } = req.body;

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        nama,
        email,
        password: hashedPassword,
        role: role || 'karyawan'
      });

      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Gagal membuat user" });
    }
  }

  // method lain (getAllUsers, getUserById, updateUser, deleteUser) tetap sama tinggal disesuaikan field-nya
