const { Token } = require('../models');

exports.createToken = async (req, res) => {
  try {
    const token = await Token.create(req.body);
    res.status(201).json(token);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getTokens = async (req, res) => {
  try {
    const tokens = await Token.findAll();
    res.status(200).json(tokens);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};