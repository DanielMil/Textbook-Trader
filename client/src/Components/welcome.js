import React, {Component} from 'react'
import { getCurrentUid } from '../helpers/auth';


class Welcome extends Component {


    render() {

        const uid = getCurrentUid();
        return (
            <div>
                {uid ? <h3>Welcome {uid}</h3> : 
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