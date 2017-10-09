const mysql = require('mysql');
const Sequelize = require('sequelize');
const Op = Sequelize.Op

let dbOptions = {
  dialect: 'mysql',
  logging: false
};

if (process.env.DB_HOST) {
  console.log('setting deployment host');
  dbOptions.host = process.env.DB_HOST;
}

if (process.env.DB_PORT) {
  console.log('setting deployment port');
  dbOptions.port = Number(process.env.DB_PORT);
}

// const db = new Sequelize('gi4gtv1icfdevbnt', 'lbvk1eybxp69zwhb', 'iyif1vfodnwe09x6', {
//   host: 'lmag6s0zwmcswp5w.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
//   port: 3306

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, dbOptions);

//---------SCHEMA DEFINITIONS--------------------


const Match = db.define('Match', {
  match_id: {type: Sequelize.BIGINT, unique: true, primaryKey: true},
  duration: Sequelize.INTEGER,
  radiant_win: Sequelize.BOOLEAN
});

const PlayerMatch = db.define('PlayerMatch', {
  player_match_id: {type: Sequelize.INTEGER, unique: true, primaryKey: true, autoIncrement: true}, 
  match_id: Sequelize.BIGINT,
  player_id: Sequelize.BIGINT,
  player_slot: Sequelize.INTEGER,
  deaths: Sequelize.INTEGER,
  hero_id: Sequelize.INTEGER,
  hero_kills: Sequelize.INTEGER,
  lane_efficiency: Sequelize.DOUBLE,
  lane_role: Sequelize.INTEGER,
  isRadiant: Sequelize.BOOLEAN
})

//---------SEQUELIZE REQUIRES SYNC ON ALL TABLES------------
Match.sync();
PlayerMatch.sync();

//--------------------FOREIGN KEY SETTINGS -----------------

PlayerMatch.belongsTo(Match, {foreignKey: 'match_id', constraints: false});
Match.hasMany(PlayerMatch, {foreignKey: 'match_id'});


module.exports = {
  db: db,
  Match: Match,
  PlayerMatch: PlayerMatch,
  Sequelize: Sequelize,
  Op: Op
}