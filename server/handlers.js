
const getTest = (req, res) => {

  res.status(200).json({status: 200, data: "backend works!"})

}

const getUsersDb = async (req, res) => {
  try {
    const db = req.app.locals.client.db();
    console.log(db);
    const users = await db.collection("users").find().toArray();
    res.status(200).json({
      status: 200,
      data: users,
      message: "all users collection!",
  });
  }
  catch (err) {
    res.status(500).json({
      status: 500,
      data: req.body,
      message: err.message,
  });
  }
}

module.exports = {
  getTest,
  getUsersDb,
}