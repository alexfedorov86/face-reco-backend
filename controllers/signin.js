const handleSignin = (db, bcrypt) => (req, res) => {
  const { email, password} = req.body;
  // check if any of the required fields are missing or empty
  if (!email || !password) {
    return res.status(400).json('Please enter email and password');
  }
  db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db.select('*').from('users')
          .where('email', '=', email)
          .then(user => {
            res.json(user[0])
          })
          .catch(err => res.status(400).json('Unable to get user'))
      }
      res.status(400).json('Wrong email or password');
    })
    .catch(err => res.status(400).json('Wrong email or password'))
}

module.exports = {
  handleSignin: handleSignin
};