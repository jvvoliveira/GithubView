import React, { Component } from 'react';
import './Repo.css';
class Repo extends Component {

    render() {
        return (
            <div className="repo">
                <h3>{this.props.name}</h3>
                <p>{this.props.description}</p>
                <a href={this.props.link} target="_blank">acesse o repositório</a>
                <p>Linguagem: {this.props.language}</p>
                <br></br>
            </div>
        );
    }
}

export default Repo;