import { Component } from "react";

class Price extends Component{

    render(){
        const {text} = this.props;
        return (
          <p>{text}</p>
            );
    }
}

export default Price;