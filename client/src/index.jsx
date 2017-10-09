import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import PlayerLookup from './PlayerLookup.jsx';
import SelectPlayer from './SelectPlayer.jsx';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentWillMount() {
  }


  render() {
    return (
      <div>
        <PlayerLookup></PlayerLookup>
        <SelectPlayer></SelectPlayer>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
