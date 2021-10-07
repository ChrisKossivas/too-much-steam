

const request = require('request-promise');

const getSpecificGame = async (req, res) => {
  try {

    const appid = req.params.appid

    return request(
      "https://store.steampowered.com/api/appdetails?appids=" + `${appid}`
    )
      .then((res) => JSON.parse(res))
      .then((specificGame) => {
        res.status(200).json({ status: 200, game: specificGame[appid], message: "specific personal owned game!"})
      })
  }
  catch (err) {
    res.status(500).json({
      status: 500,
      message: "get specific game error",
    });
  }
}

const GetPersonalGames = async (req, res) => {
try {
  const _id = req.params._id

  return request(
    " http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=93B0F23949E72BE7ACA2A771320DB80F&steamid=" +
      `${_id}` +
      "&format=json"
  )
  .then((res) => JSON.parse(res))
  .then((personalGames) => {
    res.status(200).json({ status: 200, data: personalGames.response, message: "all personal owned games! "})
  })
}
catch (err) {
  res.status(500).json({
    status: 500,
    message: "get personal games error",
});
}
}


const getTest = (req, res) => {

  res.status(200).json({status: 200, data: "backend works!"})

}

const getGamesDb = async (req, res) => {
  try {

    const db = req.app.locals.client.db();
    const games  = await db.collection("games").find().toArray()

    res.status(200).json({ status: 200, data: games, message: "all games collection!"})
  }
  catch (err) {
    res.status(500).json({
      status: 500,
      message: "get games error",
  });
}
}

const getTop10GamesDb = async (req, res) => {
  try {
    const db = req.app.locals.client.db();
    
    const topGames  = await db.collection("games").find({}).sort({
      totalLikes : -1,
    }).limit(10).toArray()

    console.log(topGames)
    res.status(200).json({ status: 200, data: topGames, message: "all games collection!"})
  }
  catch (err) {
    res.status(500).json({
      status: 500,
      message: "get games error",
  });
}
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
      message: "get users error",
  });
  }
}

const getUserDbById = async (req, res) => {

  try {
    const _id = req.params._id
    const db = req.app.locals.client.db();
    await db.collection("users").findOne({_id}, async (err, result) => {
      if (result) {
        res.status(200).json({status: 200, data: result, message: "specifc user by Id!"});
        return
      }
      else {
        res.status(404).json({status: 404, message: "user does not exist in database"})
        return
      }
    })
  }


  catch (err) {
    console.log("error!", err);
  }

}

const updateAddLike = async (req, res) => {

  try {

    const _id = req.params._id
    const appid = req.params.appid


    const query = { _id };
    const newValues = { $inc: { totalGamesLiked: 1 }, $push: {totalGamesLikedId: appid} };
    
    const queryAllLikes = {appid: parseInt(appid) }
    const newValAllGames = { $inc: { totalLikes: 1 }}

    const db = req.app.locals.client.db();

    await db.collection("users").findOne({_id}, async (err, result) => {
      if (result) {
        await db.collection("users").updateOne(query, newValues);
        await db.collection("games").updateOne(queryAllLikes, newValAllGames);
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

    const query = { _id };
    const newValues = { $push: {friendList: friendid} };

    const db = req.app.locals.client.db();

    await db.collection("users").findOne({_id}, async (err, result) => {
      try {
        if (result) {
          await db.collection("users").updateOne(query, newValues);
          await res.status(200).json({status: 200, data: result.data.friendList, message: "Added New Friend! " + `${friendid}`});
          return
        }
        else {
          res.status(404).json({status: 404, message: "user does not exist in database"})
          return
        }
      }
      catch (err) {
        console.log("error!", err)
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
  getGamesDb,
  getTop10GamesDb,
  GetPersonalGames,
  getSpecificGame,
}