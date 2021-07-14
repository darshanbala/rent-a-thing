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
        const { id, name, description, email, number, CVImg, link } = this.props;
        const individualData = { id, name, description, email, number, CVImg, link };
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
                        {/*<h2>{this.props.description}</h2>*/}
                        {/*<h2>{this.props.email}</h2>*/}
                        {/*<h2>{this.props.number}</h2>*/}
                        {/*<h2>{this.props.link}</h2>*/}
                    </div>
                    <div id="img_container">
                        <img id="category_card_img" className='things-page-card-img' src="logo192.png" alt={individualData.name} style={{ height: '310px' }} />
                        {/*<img id="category_card_img" src={"logo192.png"} alt={this.props.id} />*/}
                    </div>
                </div>
            );
        }
    }

}

export default Individual;