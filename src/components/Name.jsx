import { Component } from "react";

class Name extends Component {
  render() {
    const { text } = this.props;
    return <p>Name: {text}</p>;
  }
}

export default Name;
