import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../../index.css';
import '../../css/Things.css'

class Category extends Component {

    async componentDidMount() {

    }

    render() {
        return (
            <div className="category" onClick={() => this.props.handleClick(this.props.id)}>
                <div id="info_container">
                  <h2>{this.props.name}</h2>
                  <h2>{this.props.description}</h2>
                </div>
                {/*<h2>{imgurl}</h2>*/}
                <div id="img_container">
                  <img id="category_card_img" src={this.props.imgurl} alt={this.props.id}/>
                </div>
            </div>

        )
    }

}

/*
handleClick(arg) {
    console.log(arg);
}
*/
/*
export default function Category({ id, name, description, imgurl }) {
    //console.log(imgurl);
    return (
        <div className="category" onClick={handleClick(id)}>
            <h2>{name}</h2>
            <h2>{description}</h2>
            <img src={imgurl} alt={id}/>
        </div>

    )

}
*/

export default Category;
