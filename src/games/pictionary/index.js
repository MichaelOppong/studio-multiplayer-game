import GameComponent from "../../GameComponent.js";
import React from "react";
import UserApi from "../../UserApi.js";


export default class Pictionary extends GameComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: this.getSessionCreatorUserId()
    };
  }

  onSessionDataChanged(data) {
    this.setState({
      currentUser: data.current_user
    });
  }  

  render() {
    let id = this.getSessionId();
    let users = this.getSessionUserIds().map((user_id) => (
      <li key={user_id}>{user_id}</li>
    ));
    let creator = this.getSessionCreatorUserId();
    return (
      <div>
        <p>Session ID: {id}</p>
        <p>Session creator: {creator}</p>
        <p>Session users:</p>
        <ul>
          {users}
        </ul>
      </div>
    );
  }
 
}
