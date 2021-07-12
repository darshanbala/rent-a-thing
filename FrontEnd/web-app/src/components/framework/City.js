import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../../index.css';
import '../../css/Things.css'

class City extends Component {

    async componentDidMount() {

    }

    render() {
        return (
            <div id='cityCard' className="category" onClick={() => this.props.handleClick(this.props.id)}>
                <span>{this.props.id}</span>
                <span>{this.props.name}</span>
            </div>

        )
    }

}

export default City;
