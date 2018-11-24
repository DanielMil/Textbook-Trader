import React, {Component} from 'react'

class Welcome extends Component {

    render() {
        return (
            <div>
                {this.props.authID ? <h3>Welcome {this.props.authID}</h3> : 
                <div>
                    <h2>Welcome to Textbook Trader</h2>
                    <p>You must be signed in for complete functionality.</p>
                </div>
                }
            </div>
        );
    }
}

export default Welcome;