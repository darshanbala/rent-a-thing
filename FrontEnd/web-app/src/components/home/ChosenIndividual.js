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

                    <div class="flex-child teamMemberPic IndividualTeamMemberContainer">
                        <img className='chosenIndividualTeamMembers' src={this.props.chosenIndividual.cv_img} alt={this.props.chosenIndividual.name} />
                    </div>

                    <div class="flex-child teamMemberInfo">
                        <h1 className="underline">{this.props.chosenIndividual.name}</h1>
                        <h2 className="infoBox">{this.props.chosenIndividual.description}</h2>
                        <div className="infoBox">
                            <h2>Email: {this.props.chosenIndividual.email}</h2>
                            <h2>GitHub: <a href={this.props.chosenIndividual.github_link}> {this.props.chosenIndividual.github_link} </a> </h2>
                            <h2>LinkedIn: <a href={this.props.chosenIndividual.linkedin_link}> {this.props.chosenIndividual.linkedin_link} </a> </h2>
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
/*
{this.props.chosenIndividual.name === 'Darshan Balasigngam' && <img className='chosenIndividualTeamMembers' src="https://imagizer.imageshack.com/img922/6269/kNlGPM.jpg" alt={this.props.chosenIndividual.name} />}
{this.props.chosenIndividual.name === 'David Ajayi' && <img className='chosenIndividualTeamMembers' src="https://imagizer.imageshack.com/img924/1387/oU9Kyi.png" alt={this.props.chosenIndividual.name} />}
{this.props.chosenIndividual.name === 'Kyle Pearce' && <img className='chosenIndividualTeamMembers' src="https://imagizer.imageshack.com/img922/6269/kNlGPM.jpg" alt={this.props.chosenIndividual.name} />}
{this.props.chosenIndividual.name === 'Milo Boucher' && <img className='chosenIndividualTeamMembers' src="https://imagizer.imageshack.com/img923/7235/3zJoiU.jpg" alt={this.props.chosenIndividual.name} />}
{this.props.chosenIndividual.name === 'Rob Scholey' && <img className='chosenIndividualTeamMembers' src="https://imagizer.imageshack.com/img922/2968/ExjJCi.png" alt={this.props.chosenIndividual.name} />}
*/
export default ChosenIndividual;
