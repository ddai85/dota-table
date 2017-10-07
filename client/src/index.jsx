import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';


const serverURL = HOSTNAME;


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }


  render() {
    return (
      <div>
        <p>hello world!!!</p>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
