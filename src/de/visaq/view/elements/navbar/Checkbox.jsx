import React from 'react';


export default class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked0: props.isChecked0,
      isChecked1: props.isChecked1,
    };
  }
  toggleChange0 = () => {
    this.setState({
      isChecked0: !this.state.isChecked0,
    });
    if(this.state.isChecked0 !== true)  {
      this.setState({
        isChecked1: false,
      });
    }
  }

  toggleChange1 = () => {
    this.setState({
      isChecked1: !this.state.isChecked1,
    });
    if(this.state.isChecked1 !== true)  {
      this.setState({
        isChecked0: false,
      });
    }
  }
  
  render() {
    return (
    <div>
      <label>
        <input type="checkbox"
          checked={this.state.isChecked0}
          onChange={this.toggleChange0}
        />
        {this.props.name1}
      </label>
       <label>
       <input type="checkbox"
         checked={this.state.isChecked1}
         onChange={this.toggleChange1}
       />
       {this.props.name2}
     </label>
     </div>
    );
  }
}
