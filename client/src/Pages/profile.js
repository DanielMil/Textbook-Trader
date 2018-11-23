import React, { Component } from 'react';
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Tabs, Tab } from 'react-bootstrap';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { Row, Col, Grid, Button} from "react-bootstrap";
import "../Styles/profile.css";

const getAllTextbooks = gql` 
  {
    getTextbooks {
      id
      courseCode
    }
  }
`;

class profile extends Component {
  render() {
    const {data: {loading, getTextbooks}} = this.props;
    if (loading) {
      return null;
    }

    return (
        <div>
            <h1>Profile</h1>
            <Tabs className="Tabs" defaultActiveKey={1} animation={false} id="noanim-tab-example">
                <Tab eventKey={1} title="Textbooks">
                    <Grid>
                        <Row>         
                            <div>{getTextbooks.map(textbook => (
                                <Col xs={6} sm={6} md={3}>
                                    <div className="cards">
                                    <Card>
                                        <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                                        <CardBody>
                                            <CardTitle key={`textbook-${textbook.id}`}>Course: {textbook.courseCode}</CardTitle>
                                            <CardSubtitle>Textbook:</CardSubtitle>
                                            <CardSubtitle>Price:</CardSubtitle>
                                            <Button className="btns" bsStyle="primary">Edit</Button>
                                            <Button className="btns" bsStyle="danger">Delete</Button>
                                        </CardBody>
                                    </Card>
                                    </div>
                                </Col>   
                                ))}
                            </div>          
                        </Row>
                    </Grid>
                </Tab>
                <Tab eventKey={2} title="Upload">
                    Tab 2 content
                </Tab>
                <Tab eventKey={3} title="Account Settings">
                    Tab 3 content
                </Tab>
            </Tabs>;
        </div>
    );
  }
}

export default graphql(getAllTextbooks)(profile);

