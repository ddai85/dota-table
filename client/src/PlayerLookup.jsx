import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';



class PlayerLookup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: ''
    };
    this.playerRequest = this.playerRequest.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.parseMatchList = this.parseMatchList.bind(this);
    this.getMatch = this.getMatch.bind(this);
    this.insertDB = this.insertDB.bind(this);
  }

  componentWillMount() {
    //this.getMatch(3487414425)
  }

  playerRequest(playerId) {
    let context = this;
    $.ajax({
      url: 'https://api.opendota.com/api/players/' + playerId + '/matches',
      method: 'GET',
      success: (body) => {
        context.parseMatchList(body)
      },
      error: (err) => {
        console.log('player GET failed ', err);
      }

    })
  }

  parseMatchList(matches) {
    let offset = 0;
    matches.map((match) => {
      //make one request every 333milliseconds
      setTimeout(() => {
        this.getMatch(match.match_id)
      }, 1000 + offset)
      offset += 1000;
    })
  }

  getMatch(matchId) {
    $.ajax({
      url: 'https://api.opendota.com/api/matches/' + matchId,
      method: 'GET',
      success: (body) => {
        this.insertDB(body);
      },
      error: (err) => {
        console.log('match GET failed ', err);
      }
    })
  }

  insertDB(match) {
    let playerArr = [];
    for (let index in match.players) {
      let playerObj = {
        match_id: match.match_id,
        player_id: match.players[index].account_id,
        player_slot: match.players[index].player_slot,
        deaths: match.players[index].deaths,
        hero_id: match.players[index].hero_id,
        hero_kills: match.players[index].kills,
        lane_efficiency: match.players[index].lane_efficiency,
        lane_role: match.players[index].lane_role,
        isRadiant: match.players[index].isRadiant
      }
      playerArr.push(playerObj);
    }

    let matchObj = {
      match_id: match.match_id,
      duration: match.duration,
      radiant_win: match.radiant_win,
      players: playerArr
    }
    let context = this;
    $.ajax({
      url: 'http://127.0.0.1:8888/match',
      method: 'POST',
      data: JSON.stringify(matchObj),
      contentType: 'application/JSON',
      success: (body) => {
        console.log('match insertion success')
        context.setState({player: ''});
      },
      error: (err) => {
        console.log('match POST to DB failed ', err);
      }
    })
  }

  handleChange(e) {
    this.setState({player: e.target.value});
  }
  handleClick() {
    this.playerRequest(this.state.player)
  }

  render() {
    return (
      <div>
        <div>
          <h3>the Dota Table</h3>
        </div>
        <div>
          <p>Insert playerIds below</p>
        </div>
        <div>
          <input value={this.state.player} onChange={e => this.handleChange(e)}></input>
          <button onClick={this.handleClick}>load matches into DB</button>
        </div>
      </div>
    );
  }
}

export default PlayerLookup;
