const db = require('./index.js');

const insertMatch = function (match, callback) {
  let matchObj = {
    match_id: match.match_id,
    duration: match.duration,
    radiant_win: match.radiant_win
  };
	db.Match.upsert(matchObj)
  .then((result) => {
    if (result){
      return db.PlayerMatch.bulkCreate(match.players);
    } else {
      return callback()
    }
  })
  .then(() => {
  	return callback()
  })
  .catch((err) => {
  	if (err) {
  		console.log('there was an error with DB match insertion', err)
  	}
  })
}

const searchMatch = function(callback) {
  console.log('we are searching for a match');

  return db.Match.findAll({
    include: {
      model: db.PlayerMatch, where: {
        player_id: 40034912
      }
    }
  })
  .then ((firstMatches) =>{
    console.log(firstMatches[0].PlayerMatches)
    return db.Match.findAll({
      include: {
        model: db.PlayerMatch, where: {
          player_id: 64751415
        }
      }
    })
    .then ((secondMatches) => {
      console.log(firstMatches.length);
      console.log(secondMatches.length);
      let result = [];
      firstMatches.map((n) => {
        for (let index in secondMatches) {
          if (n.match_id === secondMatches[index].match_id){
            result.push(secondMatches[index]);
          }
        }
      })
      return result;
    })
  })
  .then((result) => {
    callback(result)
  })

}

module.exports = {
  insertMatch,
  searchMatch
}