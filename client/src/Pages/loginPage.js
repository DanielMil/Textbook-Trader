import React, {Component} from "react";
import SignUp from './signupPage';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'

import { auth } from '../Services';

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
    signUp: false,
};


const style = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE }
    }

    handleChange = (name, value) => {
        this.setState({ [name]: value });
    }

    handleLogin = (event) => {
        const {
            email,
            password,
        } = this.state;

        auth.doSignInWithEmailAndPassword(email, password)
            .then((c) => {
                console.log(c);
                this.setState({ ...INITIAL_STATE });
            })
            .catch(error => {
                this.setState(this.handleChange('error', error));
            });

        event.preventDefault();
    }

    handleSignUp = () => {
        this.setState({ signUp: !this.state.signUp });
    }

    render() {
        const {
            email,
            password,
            signUp,
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
                  <img></img>
                  <h1>INSERT LOGO HERE</h1>
                </div>
                <div style={styles.seperator} />
                <div style={styles.loginRightPanel}>
                    {
                        signUp ?
                            <SignUp handleSignUp={this.handleSignUp} />
                            :
                            <form onSubmit={this.handleLogin} style={styles.loginForm}>
                            <div>
                            <h1 style={styles.title}>
                              Login
                            </h1>
                            </div>
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
                                <div style={styles.loginRow}>
                                  <Button className={classes.button}>Forgot Password</Button>
                                  <Button variant="contained" type="submit" className={classes.button}>
                                    Sign In
                                  </Button>
                                </div>
                                <h5 style={styles.loginText}>Not a member? <a href="/signup">Register here</a></h5>
                            </form>
                    }

                </div>
            </div>
          </Grid>
        )
    }
}

export default withStyles(style)(LoginPage);


const styles = {
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
    },
    loginForm: {
        width: '300px',
    },
    title: {
      fontSize: '3em',
      marginBottom: '0.25em',
      fontWeight: '200',
      color: '#00b3b3'
    },
    input: {
        width: '100%',
        height: '25px',
        marginBottom: '20px',
    },
    loginRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        marginTop: '20px'
    },
    forgot: {
        fontSize: '0.7rem',
        cursor: 'pointer',
        display: 'inline-block',
    },
    submit: {
        padding: "7px 12px",
        border: '1px solid grey',
        boxShadow: '2px 5px 5px 0px rgba(92,92,92,1)',
        cursor: 'pointer',
        display: 'inline-block',
        fontSize: '0.9em',
    },
    signUp: {
        padding: "7px 12px",
        border: '1px solid grey',
        boxShadow: '2px 5px 5px 0px rgba(92,92,92,1)',
        cursor: 'pointer',
        width: '100%',
        textAlign: 'center',
        fontSize: '0.9em',
    },
    loginText: {
      color: '#696969',

    }
}
