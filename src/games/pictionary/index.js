import React from "react";
import GameComponent from "../../GameComponent.js";
import App from "./App";
import UserApi from "../../UserApi.js";

export default class Pictionary extends GameComponent {
  constructor(props) {
    super(props);
    let players = this.getSessionUserIds();
    this.state = {
      data: null,
      players,
    };
    this.updateFirebase = this.updateFirebase.bind(this);
  }

  onSessionDataChanged(data) {
    console.log(data);
    this.setState({
      data,
    });
  }

  updateFirebase(data) {
    this.getSessionDatabaseRef().update(data);
  }

  render() {
    return (
      <div>
        <App
          data={this.state.data}
          updateFirebase={this.updateFirebase}
          UserApi={UserApi}
          players={this.state.players}
        />
      </div>
    );
  }
}
