import React from 'react';
import { graphql } from "react-apollo";
import { gql } from 'apollo-boost';
import { getCurrentUid } from '../helpers/auth';


function setErrorMsg (error) {
    return {
        registerError: error.message
    }
}

const createTextbook = gql`
    mutation($courseCode: String!, $textbook: String!, $price: String!, $imgURL: String , $userId: String!){
        createTextbook(courseCode: $courseCode, textbook: $textbook, price: $price, imgURL: $imgURL , userId: $userId) {
            id
        }
    }
`;

class Post extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            postError: null,
            courseCode: '',
            textbook: '',
            price:'',
            imgURL: '',
            userId: ''
        }
    }

    clearForm = () => { 
        this.myFormRef.reset();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.courseCode.length < 3 || this.state.price.length < 1) {
            this.setState(setErrorMsg("Course and Price are both required!"));
        } else {
            let id = getCurrentUid();
            // this.setState({userId: id});
            this.props.mutate({
                variables: {
                    courseCode: this.state.courseCode, 
                    textbook: this.state.textbook, 
                    price: this.state.price,
                    imgURL: this.state.imgURL, 
                    userId: id
                }
            }).then(id => {
                this.clearForm();
                console.log("Your Textbook has been posted!");
            });
        }
    }

    render () {
        return (
        <div className="col-sm-6 col-sm-offset-3">
            <form onSubmit={this.handleSubmit.bind(this)} ref={(el) => this.myFormRef = el}>
                <div className="form-group">
                    <label>Course Code (Sould be auto fill like search bar)</label>
                    <input className="form-control" onChange={(e)=>this.setState({courseCode: e.target.value})} placeholder="Course Code"/>
                </div>
                <div className="form-group">
                    <label>Textbook Title</label>
                    <input className="form-control" onChange={(e)=>this.setState({textbook: e.target.value})} placeholder="Textbook Title"/>
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input className="form-control" onChange={(e)=>this.setState({price: e.target.value})} placeholder="Price"/>
                </div>
                {
                this.state.registerError &&
                <div className="alert alert-danger" role="alert">
                    <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                    <span className="sr-only">Error:</span>
                    &nbsp;{this.state.registerError}
                </div>
                }
                <button type="submit" className="btn btn-primary">Post Textbook</button>
            </form>
        </div>);
    }


}

export default graphql(createTextbook)(Post);