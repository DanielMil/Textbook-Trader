import React, { Component } from 'react';
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Tabs, Tab } from 'react-bootstrap';
import { Row, Col, Grid, Button} from "react-bootstrap";
import "../../Styles/profile.css";
import Post from '../post';
import UserTextbooks from '../../Queries/getUserTextbooks';
import { getCurrentUid } from '../../helpers/auth';
import User from '../../Queries/getUser';

class profile extends Component {
  render() {
    const uid = getCurrentUid();
    return (
        <div className="container">
            <h1>{User.profile(uid)}</h1>
            <Tabs className="Tabs" defaultActiveKey={1} animation={false} id="noanim-tab-example">
                <Tab eventKey={1} title="Textbooks">
                    <Grid>
                        <Row>         
                            {UserTextbooks(uid)}
                        </Row>
                    </Grid>
                </Tab>
                <Tab eventKey={2} title="Upload">
                    <Post/>
                </Tab>
                <Tab eventKey={3} title="Account Settings">
                    Tab 3 content
                </Tab>
            </Tabs>
        </div>
    );
  }
}

export default (profile);

