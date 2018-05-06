import React, { Component } from 'react';
import Translate from 'react-translate-component';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Select from 'react-select';
import './treatInfo.css'
import LineCell from './LineCell';
import Button from 'react-bootstrap/lib/Button';
import counterpart from 'counterpart';
import config from '../config'
import axios from 'axios';
import Thanks from './Thanks' ;

export default class TreatInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuStyle: true, chosenViz: 'boxes', mapZIndex: 150, visibility: 'hidden',
      blank: 0, spoiled: 0, canceled: 0, total: 0, number: [], thanksRedirect: false
    }
  }
  openMenu() {
    //this is trigered wheen the user clicks the menu icon
    let visibility = this.state.visibility;
    visibility == 'hidden' ? this.setState({ visibility: 'visible' }) : this.setState({ visibility: 'hidden' })
    let menuStyle = !this.state.menuStyle
    let mapZIndex;
    menuStyle == true ? mapZIndex = 150 : mapZIndex = 100;
    this.setState({ menuStyle, mapZIndex });
  }
  getVizType(e) {
    console.log('dddd', e);
    this.setState({ chosenViz: e })
  }
  getValidationState() {
    const length = this.state.username.length;
    if (length > 6) return 'success';
    else if (length > 4) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }
  handleChange(val, e) {
    console.log(val);
    if (val == 'blank') {
      this.setState({ blank: parseInt(e.target.value) });
    } else if (val == 'spoiled') {
      this.setState({ spoiled: parseInt(e.target.value) });
    } else if (val == 'total') {
      this.setState({ total: parseInt(e.target.value) });
    } else {
      this.setState({ canceled: parseInt(e.target.value) });
    }

  }
  //get numberfrom line cell
  getNumbers(value, id) {
    console.log(value, id);
    let array = this.state.number
    console.log(array);
    array[parseInt(id)] = value
    this.setState({ number: array });
  }
  handleSubmitClick() {
    //create our object {city:'XXX',blank:'',spoiled:'',canceled:'',total:''username:'XXX',data:[{id:0,nom_list_fr:'XXX',number:}{}]};
    let obj = {}, data = [];
    for (let i = 0; i < this.props.lists.length; i++) {
      const element = this.props.lists[i];
      obj.id = i;
      obj.nom_liste_fr = element.nom_liste_fr;
      obj.number = parseInt(this.state.number[i])
      data.push(obj);
      obj = {};
    }
    let qString = config.crowdUrl + "/api/add_submission";
    axios({
      method: 'post',
      url: qString,

      data: {
        city: this.props.selectedMun,
        blank: this.state.blank,
        spoiled: this.state.spoiled,
        canceled: this.state.canceled,
        total: this.state.total,
        username: this.props.username,
        data: data,
      }
    })
      .then(response => {
        //console.log(response.data.data)
        console.log('stat saved');
        this.setState({ thanksRedirect: true });
      }
      )
      .catch(function (error) {
        console.log(error);
      });

  }
  render() {
    let menuStyle = ''; this.state.menuStyle ? menuStyle = '' : menuStyle = 'nav-active'
    let { chosenViz } = this.state;
    const TITLE2 = <Translate type='text' content='crowdSource.title2' />//please fill the form Bellow
    const TITLEUSERNAME = <Translate type='text' content='crowdSource.title_username' />//please enter Username
    const SELECTMUN = <Translate type='text' content='crowdSource.selectMun' />//please enter Username
    const SUBMIT = <Translate type='text' content='crowdSource.submit' />//submit

    return (
      <div >
      {!this.state.thanksRedirect ?
        <div>
        <div className="site-content">
          <h1 className="site-content__headline">{TITLE2}</h1>
        </div>
        
          
            <div className='container'>
              <div className='col-md-12' style={{ textAlign: 'center', marginBottom: '15px' }}>
                <div className='col-md-4'><p className='subtitletreat'>UserName : {this.props.username}</p> </div>
                <div className='col-md-4'><p className='subtitletreat'>Municipality : {this.props.selectedMun} | {this.props.lists[0].nom_ar} </p></div>
                <div className='col-md-4'><p className='subtitletreat'>Number Of Lists : {(this.props.lists).length}</p> </div>
              </div>

            </div>
            <hr />

            {this.props.lists.map((object, i) => {
              return < LineCell getNumbers={this.getNumbers.bind(this)} id={i} key={i} listName={object.nom_liste_ar} listName_fr={object.nom_liste_fr} listType={object.type_liste} />
            })
            }

            <div className='col-md-12'>
              <div className='col-md-3'>
                <ControlLabel>{counterpart.translate('crowdSource.blank')}</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.blank}
                  placeholder={counterpart.translate('crowdSource.blank')}
                  onChange={this.handleChange.bind(this, 'blank')}
                />
                <FormControl.Feedback />
              </div>
              <div className='col-md-3'>
                <ControlLabel>{counterpart.translate('crowdSource.spoiled')}</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.spoiled}
                  placeholder={counterpart.translate('crowdSource.spoiled')}
                  onChange={this.handleChange.bind(this, 'spoiled')}
                />
                <FormControl.Feedback />
              </div>
              <div className='col-md-3'>
                <ControlLabel>{counterpart.translate('crowdSource.canceled')}</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.canceled}
                  placeholder={counterpart.translate('crowdSource.canceled')}
                  onChange={this.handleChange.bind(this, 'canceled')}
                />
                <FormControl.Feedback />
              </div>
              <div className='col-md-3'>
                <ControlLabel>{counterpart.translate('crowdSource.total')}</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.total}
                  placeholder={counterpart.translate('crowdSource.total')}
                  onChange={this.handleChange.bind(this, 'total')}
                />
                <FormControl.Feedback />
              </div>

            </div>
            <div className='col-md-1 col-md-offset-5'>
              <Button bsStyle="primary" onClick={this.handleSubmitClick.bind(this)} style={{ margin: '20px', width: '100%' }}  >{SUBMIT}</Button>
            </div>
          </div>
          : <Thanks username={this.props.username} />}



      </div>
    );
  }
}
