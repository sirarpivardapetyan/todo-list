import { Component } from "react";

class Name extends Component{

    render(){
        const {text} = this.props;
        return (
          <p>{text}</p>
            );
    }
}

export default Name;