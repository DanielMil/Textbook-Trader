import React from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { Col, Button} from "react-bootstrap";
import DeleteButton from '../Components/deletePost';

const getTextbooks = gql`
    query($authId: String!){
        getUserTextbooks (authId: $authId){
            courseCode
            textbook
            price
            id
        }
    }
`;

const UserTextbooks = (uid) => (
    <Query query={getTextbooks} variables={{authId: uid+""}}>
        {({ loading, error, data }) => {
            if (error) return <h1>Error...</h1>;
            if (loading || !data) return <h1>Loading...</h1>;

            return (
                <div>{data.getUserTextbooks.map(textbook => (
                    <Col xs={6} sm={6} md={3} key={`textbook-${textbook.id}`}>
                        <div className="cards">
                        <Card>
                            <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                            <CardBody>
                                <CardTitle>Course: {textbook.courseCode}</CardTitle>
                                <CardSubtitle>Textbook:{textbook.textbook}</CardSubtitle>
                                <CardSubtitle>Price: {textbook.price}</CardSubtitle>
                                <Button className="btns" bsStyle="primary">Edit</Button>
                                <DeleteButton textbookId={textbook.id}/>
                            </CardBody>
                        </Card>
                        </div>
                    </Col>   
                    ))}
                </div>
                );
        }}
    </Query>
);

export default UserTextbooks;


