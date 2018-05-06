import React, { Component } from 'react';
import Translate from 'react-translate-component';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import Select from 'react-select';
import axios from 'axios';
import config from '../config'
import TreatInfo from './TreatInfo';
import 'react-select/dist/react-select.css';


export default class RootCrowdsourcing extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', selectedMun: 'Ariana', visibility: 'hidden', saisirInfo: true, listsInfo: [] }
  }

  getValidationState() {
    const length = this.state.username.length;
    if (length > 4) return 'success';
    else if (length > 2) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }
  handleChange(e) {
    this.setState({ username: e.target.value });
  }
  handleSelectedMun(selectedMun) {
    console.log(selectedMun.value);
    this.setState({ selectedMun: selectedMun.value });
  }
  handleButtonClick() {
    console.log();
    //send get req of the lists
    let qString = config.crowdUrl + "/api/get_lists";
    axios({
      method: 'get',
      url: qString,
      params: {
        nom_fr: this.state.selectedMun
      }
    })
      .then(response => {
        console.log(response.data);
        this.setState({ saisirInfo: false, listsInfo: response.data });
      }
      )
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    let { chosenViz } = this.state;
    const TITLE = <Translate type='text' content='crowdSource.title1' />//please choose Municipality and username
    const TITLEUSERNAME = <Translate type='text' content='crowdSource.title_username' />//please enter Username
    const SELECTMUN = <Translate type='text' content='crowdSource.selectMun' />//please select municipality
    const SUBMIT = <Translate type='text' content='crowdSource.submit' />//submit
    const options = [{ value: "Ariana", label: "Ariana" }, { value: "El Maagoula", label: "El Maagoula" }, { value: "Beja", label: "Beja" }]
    return (
      <div>
        <section >

          {this.state.saisirInfo ?
            <div>
              <div className="site-content">
                <h1 className="site-content__headline">{TITLE}</h1>
              </div>

              <div className='container'>
                <div className='col-md-offset-2 col-md-8'>
                  <FormGroup
                    controlId="formBasicText"
                    validationState={this.getValidationState()}
                  >
                    <ControlLabel>{TITLEUSERNAME}</ControlLabel>
                    <FormControl
                      type="text"
                      value={this.state.username}
                      placeholder="Enter username"
                      onChange={this.handleChange.bind(this)}
                    />
                    <FormControl.Feedback />
                  </FormGroup>
                </div>

                <div className=" col-md-12">
                  <div className=" col-md-8 col-md-offset-2" style={{ zIndex: (this.state.mapZIndex + 2) }}            >
                    <ControlLabel>{SELECTMUN}</ControlLabel>
                    <Select
                      clearable={false}
                      name="gouvernorate_chousing"
                      placeholder={SELECTMUN}
                      value={this.state.selectedMun}
                      options={options}
                      onChange={this.handleSelectedMun.bind(this)}
                      style={{ marginBottom: '5vh' }}
                    />
                  </div>
                </div>
                <div className=" col-md-8 col-md-offset-2">
                  <Button bsStyle="primary" onClick={this.handleButtonClick.bind(this)}  >{SUBMIT}</Button>
                </div>
              </div>
            </div>
            : <TreatInfo lists={this.state.listsInfo} username={this.state.username}  selectedMun={this.state.selectedMun} />}
        </section>
      </div>
    );
  }
}
