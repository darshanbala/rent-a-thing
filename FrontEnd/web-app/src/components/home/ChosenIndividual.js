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
                <button className='navButton' onClick={() => this.props.backToTeam()}>Back to Team</button>
                <div class="flex-container">

                    <div class="flex-child teamMemberPic">
                        <img src="logo512.png" alt={this.props.id} />
                    </div>

                    <div class="flex-child teamMemberInfo">
                        <h1 className="underline">{this.props.chosenIndividual.name}</h1>
                        <h2 className="infoBox">{this.props.chosenIndividual.description}</h2>
                        <div className="infoBox">
                            <h2>Email: {this.props.chosenIndividual.email}</h2>
                            <h2>Buisness Number: {this.props.chosenIndividual.number}</h2>
                            <h2>Linkedin: <a href={this.props.chosenIndividual.link}> {this.props.chosenIndividual.link} </a> </h2>
                        </div>
                    </div>

                </div>
            </>
        );
    }

}

/*
<>
                <button onClick={() => this.props.backToTeam()}>Back to Team</button>
                <div id="img_container">
                    <img className='things-page-card-img individual_img' src="logo192.png" alt={this.props.id} style={{ height: '192px' }} />
                    <img id="category_card_img" src={"logo192.png"} alt={this.props.id} />
                    </div>
                    <div id="individual_info">
                        <h1>{this.props.chosenIndividual.name}</h1>
                        <h2>{this.props.chosenIndividual.description}</h2>
                        <h2>{this.props.chosenIndividual.email}</h2>
                        <h2>{this.props.chosenIndividual.number}</h2>
                        <h2>{this.props.chosenIndividual.link}</h2>
                    </div>
                </>
*/

export default ChosenIndividual;
