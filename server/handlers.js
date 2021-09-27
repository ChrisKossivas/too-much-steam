
const getTest = (req, res) => {

  res.status(200).json({status: 200, data: "backend works!"})

}

module.exports = {
  getTest
}