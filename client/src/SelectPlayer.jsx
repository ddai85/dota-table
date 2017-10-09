import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';



class SelectPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: ''
    };
    this.searchMatches = this.searchMatches.bind(this);
    this.handleClick = this.handleClick.bind(this);

  }

  componentWillMount() {
    //this.getMatch(3487414425)
  }

  searchMatches() {
    let context = this;
    $.ajax({
      url: 'http://127.0.0.1:8888/match',
      method: 'GET',
      success: (body) => {
        console.log(body)
      },
      error: (err) => {
        console.log('querying matches ', err);
      }

    })
  }



  handleChange(e) {
    this.setState({player: e.target.value});
  }
  handleClick() {
    this.searchMatches()
  }

  render() {
    return (
      <div>
        <div>
          <p>Click to search</p>
        </div>
        <div>
          <input value={this.state.player} onChange={e => this.handleChange(e)}></input>
          <input value={this.state.player} onChange={e => this.handleChange(e)}></input>
          <input value={this.state.player} onChange={e => this.handleChange(e)}></input>
          <button onClick={this.handleClick}>Search Matches</button>
        </div>
      </div>
    );
  }
}

export default SelectPlayer;
