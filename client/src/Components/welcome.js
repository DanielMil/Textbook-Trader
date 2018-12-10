import React, {Component} from 'react'
import { getCurrentUid } from '../helpers/auth';
import { userInfo } from 'os';
import User from '../Queries/getUser';

class Welcome extends Component {


    render() {

        const uid = getCurrentUid();
        return (
            <div>
                {uid ? User.welcome(uid) : 
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