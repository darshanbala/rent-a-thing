import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../../index.css';
import '../../css/Things.css'
import '../../css/Card.css';

class Individual extends Component {

    state = {
        individualData: null
    }

    async componentDidMount() {
        const { id, name, cv_img, description, email, github_link, linkedin_link } = this.props;
        const individualData = { id, name, cv_img, description, email, github_link, linkedin_link };
        this.setState({ individualData });
    }

    render() {
        const { individualData } = this.state;
        if (!individualData) {
            return (<h1>Loading...</h1>);
        } else {
            return (
                <div className="category" onClick={() => this.props.handleClick(individualData)}>
                    <div id="info_container">
                        <h2>{individualData.name}</h2>
                    </div>
                    <div id="img_container">
                        <img className='aboutPageTeamMembers' src={individualData.cv_img} alt={individualData.name} />
                    </div>
                </div>
            );
        }
    }

}
/*
{individualData.name === 'Darshan Balasigngam' && <img className='aboutPageTeamMembers' src="https://imagizer.imageshack.com/img922/6269/kNlGPM.jpg" alt={individualData.name} />}
{individualData.name === 'David Ajayi' && <img className='aboutPageTeamMembers' src="https://imagizer.imageshack.com/img924/1387/oU9Kyi.png" alt={individualData.name} />}
{individualData.name === 'Kyle Pearce' && <img className='aboutPageTeamMembers' src="https://imagizer.imageshack.com/img922/6269/kNlGPM.jpg" alt={individualData.name} />}
{individualData.name === 'Milo Boucher' && <img className='aboutPageTeamMembers' src="https://imagizer.imageshack.com/img923/7235/3zJoiU.jpg" alt={individualData.name} />}
{individualData.name === 'Rob Scholey' && <img className='aboutPageTeamMembers' src="https://imagizer.imageshack.com/img922/2968/ExjJCi.png" alt={individualData.name} />}
*/
export default Individual;
