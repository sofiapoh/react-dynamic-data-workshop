import React from "react";

export default class App extends React.Component {
  state = {
    hello:
      "Let's get started! You can delete this state as you won't need it going forward."
  };

  render() {
    return <div>{this.state.hello}</div>;
  }
}
