import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { Redirect, Link } from "react-router-dom";
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
      return (<Link to="/login" />);
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

        return (
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
                <div style={styles.loginContainer}>
                    <div style={styles.loginLeftPanel}>
                    <div style={styles.loginForm}>
                              <div>
                                <h1 style={styles.title}>
                                  Sign Up
                                </h1>
                              </div>
                              <form onSubmit={this.handleSignUp} style={styles.fields}>
                              <TextField
                                id="fname"
                                label="First Name"
                                value={fname}
                                onChange={event => this.handleChange('fname', event.target.value)}
                                type="text"
                                fullWidth
                                margin="normal"
                              />
                              <TextField
                                id="lname"
                                label="Last Name"
                                value={lname}
                                onChange={event => this.handleChange('lname', event.target.value)}
                                type="text"
                                fullWidth
                                margin="normal"
                              />
                              <TextField
                                id="email"
                                label="Email"
                                value={email}
                                onChange={event => this.handleChange('email', event.target.value)}
                                type="email"
                                fullWidth
                                margin="normal"
                              />
                              <TextField
                                id="password"
                                label="Password"
                                value={password}
                                onChange={event => this.handleChange('password', event.target.value)}
                                type="password"
                                fullWidth
                                margin="normal"
                              />
                              <TextField
                                id="confirmPassword"
                                label="Confirm Password"
                                value={confirmPassword}
                                onChange={event => this.handleChange('confirmPassword', event.target.value)}
                                type="password"
                                fullWidth
                                margin="normal"
                              />
                                <div style={styles.loginRow}>
                                  <Button className={classes.button} onClick={this.cancelSignUp}>Cancel</Button>
                                  <Button variant="contained" type="submit" className={classes.button}>
                                    Sign Up
                                  </Button>
                                </div>
                              </form>
                          </div>
                    </div>
                    <div style={styles.seperator} />
                    <div style={styles.loginRightPanel}>
                        <h1>INSERT LOGO HERE</h1>
                    </div>
                </div>

              </Grid>
            )
    }
}

export default withStyles(style)(SignupPage);

const styles = {
    cancel: {
        padding: "7px 12px",
        border: '1px solid grey',
        boxShadow: '2px 5px 5px 0px rgba(92,92,92,1)',
        display: 'inline-block',
        marginRight: '10px',
        cursor: 'pointer',
        fontSize: '0.9em',
    },
    submit: {
        padding: "7px 12px",
        border: '1px solid grey',
        boxShadow: '2px 5px 5px 0px #00b3b3',
        cursor: 'pointer',
        display: 'inline-block',
        fontSize: '0.9em',
        color: '#00b3b3'
    },
    input: {
        width: '100%',
        height: '25px',
        marginBottom: '20px',
    },
    loginForm: {
        width: '300px',
    },
    loginRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        marginTop: '20px'
    },
    title: {
      fontSize: '3em',
      marginBottom: '0.25em',
      fontWeight: '200',
      color: '#00b3b3'
    },
    fields: {
      color: '#00b3b3',
      fontSize: '2em'
    },

    loginContainer: {
        position: "relative",
        top: 0, right: 0, left: 0, bottom: 0,
        background: "#FFF",
        display: 'flex',
        alignItems: "center",
    },
    loginLeftPanel: {
        width: 'calc(50% - 1px)',
        position: 'relative',
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: '20px'
    },
    logo: {
        border: "1px solid grey",
        height: '200px',
        width: '200px',
    },
    seperator: {
        backgroundColor: "#000",
        height: '50%',
        width: '2px',
    },
    loginRightPanel: {
        width: 'calc(50% - 1px)',
        position: 'relative',
        boxSizing: "border-box",
        display: 'flex',
        justifyContent: 'center',
        padding: '20px'
    },
}

