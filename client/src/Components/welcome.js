import React, { Component } from 'react';
import User from './getUser'
import UserTextbooks from './getUserTextbooks'

class Welcome extends Component {

  render() {

    return (
      <div>
        <h1>Welcome Page</h1>
        {User()}
        {UserTextbooks('5bf32900ee77f377257e39f4')}
      </div>
    );
  }
}

export default Welcome; 
