import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../../index.css';
import '../../css/Things.css'

class ChosenIndividual extends Component {

    async componentDidMount() {

    }

    render() {
        return (
            <>
                <button onClick={ () => this.props.backToTeam() }>Back to Team</button>
                <div id="img_container">
                    <img id="category_card_img" src={this.props.chosenIndividual.CVImg} alt={this.props.id} />
                </div>
                <div id="individual_info">
                    <h1>{this.props.chosenIndividual.name}</h1>
                    <h2>{this.props.chosenIndividual.description}</h2>
                    <h2>{this.props.chosenIndividual.email}</h2>
                    <h2>{this.props.chosenIndividual.number}</h2>
                    <h2>{this.props.chosenIndividual.link}</h2>
                </div>
            </>
        )
    }

}

export default ChosenIndividual;
