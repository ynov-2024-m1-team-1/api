const express = require('express');
const bodyParser = require('body-parser');
const User = require('./schema/user.schema.js'); 
require('./mongoConnection');

const app = express();

app.use(bodyParser.json());


app.post('/register', async (req, res) => {
  const { lastname, surname, mail, password, adresse, codePostal, ville, telephone } = req.body;

  if (!lastname || !surname || !mail || !password || !adresse || !codePostal || !ville || !telephone) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const existingUser = await User.findOne({ mail });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    const newUser = new User({
      lastname,
      surname,
      mail,
      password,
      adresse,
      codePostal,
      ville,
      telephone,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(() => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
