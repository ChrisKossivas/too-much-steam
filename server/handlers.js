
const getTest = (req, res) => {

  res.status(200).json({status: 200, data: "backend works!"})

}

const getUsersDb = async (req, res) => {
  try {
    const db = req.app.locals.client.db();
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

const getUserDbById = async (req, res) => {



}

const updateAddLike = async (req, res) => {

  try {

    const _id = req.params._id
    const appid = req.params.appid


    const query = { _id };
    const newValues = { $inc: { totalGamesLiked: 1 }, $push: {totalGamesLikedId: appid} };
  
    const db = req.app.locals.client.db();
    await db.collection("users").findOne({_id}, async (err, result) => {
      console.log(result)
      if (result) {
        await db.collection("users").updateOne(query, newValues);
        res.status(200).json({status: 200, data: result, message: "Added Total Game Likes + 1!"});
        return
      }
      else {
        res.status(404).json({status: 404, message: "user does not exist in database"})
        return
      }
    })
  }
  catch (err) {
    console.log("error add likes ", err)
  } 
}

const updateAddDislike = async (req, res) => {

  try {
    const _id = req.params._id
    const appid = req.params.appid

    
    const query = { _id };
    const newValues = { $inc: { totalGamesDisliked: 1 }, $push: {totalGamesDislikedId: appid} };

    const db = req.app.locals.client.db();

    await db.collection("users").findOne({_id}, async (err, result) => {
      if (result) {
        await db.collection("users").updateOne(query, newValues);
        res.status(200).json({status: 200, data: result, message: "Added Total Game Dislikes +1!"});
        return
      }
      else {
        res.status(404).json({status: 404, message: "user does not exist in database"})
        return
      }
    })

  }
  catch (err) {
    console.log("error add dislikes ", err)
  } 

}

const updateAddFriend = async (req, res) => {
  try {
    const _id = req.params._id
    const friendid = req.params.friendid

    console.log("logged in user", _id)
    console.log("new friend", friendid)

    const query = { _id };
    const newValues = { $push: {friendList: friendid} };

    const db = req.app.locals.client.db();

    await db.collection("users").findOne({_id}, async (err, result) => {
      if (result) {
        await db.collection("users").updateOne(query, newValues);
        res.status(200).json({status: 200, data: result, message: "Added New Friend! " + `${friendid}`});
        return
      }
      else {
        res.status(404).json({status: 404, message: "user does not exist in database"})
        return
      }
    })
  }
  catch (err) {
    console.log("error add friend ", err)
  } 
}

module.exports = {
  getTest,
  getUsersDb,
  getUserDbById,
  updateAddLike,
  updateAddDislike,
  updateAddFriend,
}