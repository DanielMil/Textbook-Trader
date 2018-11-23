import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from "react-router-dom";
import { auth } from '../Services';

const INITIAL_STATE = {
    email: '',
    fname: '',
    lname: '',
    password: '',
    confirmPassword: '',
    error: '',
}

const style = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

class SignupPage extends Component {

    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE }
    }

    handleChange = (name, value) => {
        this.setState({[name]: value});
    }

    cancelSignUp = (e) => {
      return (<Redirect to="/login" />);
    }

    handleSignUp = (e) => {
        const {
            email,
            password,
        } = this.state;
        
        auth.doCreateUserWithEmailAndPassword(email, password)
            .then(authUser => {
                this.setState({ ...INITIAL_STATE });
            }).then(redirect => {
              return (<Redirect to="/" />);
            })
            .catch(error => {
                this.setState(this.handleChange('error', error));
                console.log(error);
            });

            e.preventDefault();
    }

    render() {

        const {
            fname,
            lname,
            email,
            password,
            confirmPassword,
        } = this.state;

        const {
          classes
        } = this.props;

        return <div>
                  <div>
                    <h1>
                      Sign Up
                    </h1>
                  </div>
                  <form onSubmit={this.handleSignUp}>
                  <TextField
                    id="fname"
                    label="First Name"
                    value={fname}
                    onChange={event => this.handleChange('fname', event.target.value)}
                    type="text"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    id="lname"
                    label="Last Name"
                    value={lname}
                    onChange={event => this.handleChange('lname', event.target.value)}
                    type="text"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    id="email"
                    label="Email"
                    value={email}
                    onChange={event => this.handleChange('email', event.target.value)}
                    type="email"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    id="password"
                    label="Password"
                    value={password}
                    onChange={event => this.handleChange('password', event.target.value)}
                    type="password"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    id="confirmPassword"
                    label="Confirm Password"
                    value={confirmPassword}
                    onChange={event => this.handleChange('confirmPassword', event.target.value)}
                    type="password"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    margin="normal"
                  />
                    <div>
                      <Button className={classes.button} onClick={this.cancelSignUp}>Cancel</Button>
                      <Button variant="contained" type="submit" className={classes.button}>
                        Sign Up
                      </Button>
                    </div>
                  </form>
                    
                </div>
    }
}

export default withStyles(style)(SignupPage);
