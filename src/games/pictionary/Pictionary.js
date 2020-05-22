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
      myID: null,
      players,
    };
    // this.updateFirebase = this.updateFirebase.bind(this);
    // this.whoAmI = this.whoAmI.bind(this);
    // this.onSessionDataChanged = this.onSessionDataChanged.bind(this);
    // this.getSessionDatabaseRef = this.getSessionDatabaseRef.bind(this);
  }

  componentDidMount() {
    this.whoAmI();
  }

  whoAmI() {
    let myID = this.getMyUserId();
    this.setState({
      myID,
    });
  }

  onSessionDataChanged(data) {
    console.log("data from onSessionDataChanged:", data);
    this.setState({
      data,
    });
  }

  updateFirebase(data) {
    console.log("data from updateFirebase", data);
    this.getSessionDatabaseRef().update(data, (error) => {
      if (error) {
        console.error(error);
      }
    });
  }

  render() {
    return (
      <div>
        <App
          data={this.state.data}
          updateFirebase={(data) => {
            console.log("data from updateFirebase", data);
            this.getSessionDatabaseRef().update(data, (error) => {
              if (error) {
                console.error(error);
              }
            });
          }}
          UserApi={UserApi}
          players={this.state.players}
          myID={this.state.myID}
        />
      </div>
    );
  }
}
