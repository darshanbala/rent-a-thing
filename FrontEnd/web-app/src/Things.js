import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './index.css';

class Things extends Component {
    render() {
        return (
            <h1>{JSON.stringify(this.props.searchCriteria)}</h1>
        );
    }
}

export default Things;