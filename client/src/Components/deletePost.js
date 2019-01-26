import React, { Component } from 'react';
import { graphql } from "react-apollo";
import { gql } from 'apollo-boost';
import {Button} from "react-bootstrap";


const removeTextbook = gql`
    mutation($id: ID!){
        removeTextbook(id: $id)
    }
`;

class Delete extends Component {

    deletePost = () => {
        console.log('Deleting post '+ this.props.textbookId);
        this.props.mutate({
            variables: {
                id: this.props.textbookId
            }
        }).then(deleted => {
            if (deleted)
                console.log("Your Textbook has been deleted!");
            else console.log("Could not delete Textbook.");
        });
    }

    render() {

        return (
            <Button className="btns" bsStyle="danger" onClick={this.deletePost}>Delete</Button>
            );
    }
}

export default graphql(removeTextbook)(Delete);
