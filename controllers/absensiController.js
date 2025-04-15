const { Absensi } = require('../models');

exports.createAbsensi = async (req, res) => {
  try {
    const absensi = await Absensi.create(req.body);
    res.status(201).json(absensi);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAbsensi = async (req, res) => {
  try {
    const absensi = await Absensi.findAll();
    res.status(200).json(absensi);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};