import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';
import { Link } from 'react-router-dom';
import { NavBar, Nav, NavItem } from 'react-bootstrap';
import Translate from 'react-translate-component';

export default class Thanks extends Component {
  handleSubmitClick(){
    location.reload();
  }
  render() {
    const THANKSFOR = <Translate type='text' content='crowdSource.thanks' />//thanks for submitting
    const SUBMITANOTHR = <Translate type='text' content='crowdSource.another' />//thanks for submitting
    
    return (
      <div>
        <div className="site-content">
          <h1 className="site-content__headline">{THANKSFOR} {this.props.username}</h1>
        </div>
        <div>
        <div className='col-md-2 col-md-offset-5'>
        <Button bsStyle="primary" onClick={this.handleSubmitClick.bind(this)} style={{ margin: '20px', width: '100%' }}  >{SUBMITANOTHR}</Button>

        </div>
        
        </div>
        
      </div>
          );
        }
      }
      
