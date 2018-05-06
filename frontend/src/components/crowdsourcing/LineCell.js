import React, { Component } from 'react';
import Translate from 'react-translate-component';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Select from 'react-select';
import './treatInfo.css'
import counterpart from 'counterpart';


export default class TreatInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', selectedMun: '', visibility: 'hidden' }
  }


  handleChange(e) {
    this.setState({ username: e.target.value });

    this.props.getNumbers(e.target.value,this.props.id)

  }

  render() {
    const NUMBERPAPER = <Translate type='text' content='crowdSource.numberPaper' />//please enter paper number
    //console.log(counterpart);
let name = this.props.listName_fr +' | '+this.props.listName  
    return (
      <div >
      <div className='col-md-12'style={{ textAlign: 'center',marginBottom:'15px' }}>
      <div className='col-md-4'>{this.props.listType}  </div>
      <div className='col-md-4'>{name}</div>

      <div className='col-md-4'><FormControl
      type="text"
      value={this.state.username}
      placeholder={counterpart.translate('crowdSource.numberPaper') +' - '+ this.props.listName_fr }
      onChange={this.handleChange.bind(this)}
    />
    <FormControl.Feedback /> </div>
    </div>

      


      </div>
    );
  }
}
