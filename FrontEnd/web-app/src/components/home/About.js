import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../../index.css';
import '../../css/categories.css';
import '../../css/About.css';
import Individual from './Individual';
import ChosenIndividual from './ChosenIndividual';

class About extends Component {

    state = {
        teamMembers: [],
        hasChosen: false,
        chosenIndividual: null
    }

    async componentDidMount() {
        this.props.cookieCheck();
        const response = await fetch(`${process.env.REACT_APP_API_URL}/teamMembers`, {
            method: 'GET',
            credentials: 'include'
        });
        const teamMembers = await response.json();
        console.log(teamMembers);
        this.setState({ teamMembers });
    }

    handleClick(individualData) {
        console.log(individualData);
        //return (<Redirect to="/"/>);
        this.setState({ chosenIndividual: individualData });
        this.setState({ hasChosen: true });
    }

    backToTeam(){
        this.setState({ hasChosen: false });
    }

    render() {
        const { teamMembers, hasChosen, chosenIndividual } = this.state

        if (hasChosen) {
            //call parent method that goes to things with chosenValue
            return (<ChosenIndividual chosenIndividual={chosenIndividual} backToTeam={(arg) => this.backToTeam(arg)}/>);
        }

        //console.log(categories);
        if (teamMembers.length === 0) {
            return (<p>Loading....</p>)
        } else {
            //console.log(categories[0].imgurl);

            return (
                <>
                    <h1>Meet the team!</h1>
                    <h1>Software Engineers:</h1>
                    <div className='item-list'>
                        {teamMembers.map(({ id, name, cv_img, description, email, github_link, linkedin_link }) =>
                            <Individual key={id} id={id} name={name} cv_img={cv_img} description={description} email={email} github_link={github_link} linkedin_link={linkedin_link} handleClick={(arg) => this.handleClick(arg)} />
                        )}
                    </div>
                </>
            )
        }
    }

} export default About;
