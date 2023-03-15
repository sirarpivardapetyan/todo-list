import { Component } from "react";

class Description extends Component{

    render(){
        const {text} = this.props;
        return (
          <p>{text}</p>
            );
    }
}

export default Description;