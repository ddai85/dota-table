import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentWillMount() {
    this.playerRequest(54536288);
  }

  playerRequest(playerId) {
    
    $.ajax({
      url: 'https://api.opendota.com/api/players/' + playerId + '/matches',
      method: 'GET',
      success: (body) => {
        console.log(body);
      },
      error: (err) => {
        console.log('player GET failed ', err);
      }

    })
  }


  render() {
    return (
      <div>
        <p>Select up to 5 players</p>
        
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
