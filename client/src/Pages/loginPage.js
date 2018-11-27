import React, { Component } from 'react'
import { login, resetPassword } from '../helpers/auth';
import Icon from 'react-icons-kit';
import {mail} from 'react-icons-kit/entypo/mail';
import {lock} from 'react-icons-kit/fa/lock';
import "../Styles/Login.css";

function setErrorMsg(error) {
  return {
    loginMessage: error
  }
}

export default class Login extends Component {
  state = { loginMessage: null }
  handleSubmit = (e) => {
    e.preventDefault()
    login(this.email.value, this.pw.value)
      .catch((error) => {
          this.setState(setErrorMsg('Invalid username/password.'))
        })
  }
  resetPassword = () => {
    resetPassword(this.email.value)
      .then(() => this.setState(setErrorMsg(`Password reset email sent to ${this.email.value}.`)))
      .catch((error) => this.setState(setErrorMsg(`Email address not found.`)))
  }
  render () {
    return (
      <div className="col-sm-10 col-sm-offset-1 content align-middle">
        <row>

          <div className="col-lg-6">
            <h1>Radl</h1>
            <CardImg top width="75%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap"/>
          </div>

          <div className="col-lg-6">
          <h1 className="contentHeading">Sign in</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label className="inputLabel"><Icon icon={mail} className="icons"/></label>
              <input className="form-control" ref={(email) => this.email = email} placeholder="Email"/>
            </div>
            <div className="form-group">
              <label className="inputLabel"><Icon icon={lock} className="icons"/></label>
              <input type="password" className="form-control" placeholder="Password" ref={(pw) => this.pw = pw} />
            </div>
            {
              this.state.loginMessage &&
              <div className="alert alert-danger" role="alert">
                <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                <span className="sr-only">Error:</span>
                {/* &nbsp;{this.state.loginMessage} <a href="#" onClick={this.resetPassword} className="alert-link">Forgot Password?</a> */}
              </div>
            }
            <button type="submit" className="btn formButton">Login</button>
          </form>
          <div className="col-xs-8 col-xs-offset-2">
          <h4 className="contentText">Not a member? <a href="/register">Sign up now</a></h4>
          </div>
          </div>

        </row>
      </div>
    )
  }
}
