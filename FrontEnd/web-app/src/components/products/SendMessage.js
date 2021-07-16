import { secondsToMilliseconds } from 'date-fns';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../../index.css';
import ImageUpload from '../framework/ImageUpload'

class SendMessage extends Component {

    state = {
        message: '',
        chatId: 0,

    }

    resetForm() {
        this.setState(this.state)
    }


    async sendChatId(id) {

        const { message, chatId } = this.state;
        console.log(message);
        console.log(chatId);
        let axios = require('axios');
        let data = {

            text: message

        }
        //console.log(this.state.email)


        let config = {
            method: 'post',
            url: `https://api.chatengine.io/chats/${chatId}/messages/`,
            headers: {

                'Project-ID': '738df1f7-4780-4c48-b34f-0938273bcb5d',
                'User-Name': this.props.loggedInUser,
                'User-Secret': this.props.secret

            },
            data: data
        };






        axios(config).then((response) => {
            //console.log(JSON.stringify(response.data.id));

        })


    }


    async handleSubmit(e) {
        //console.log('Submitting on PostItem.js')
        e.preventDefault();
        this.resetForm();



        let axios = require('axios');
        let data = {
            // username: this.state.first_name,
            // secret: this.state.password1,
            //   username: this.state.first_name,
            //   secret: this.state.email,
            //ext: message,
            usernames: [this.props.ownerName],
            // title: "Another Surprise Party!",
            is_direct_chat: true
        }
        //console.log(this.state.email)


        let config = {
            method: 'put',
            url: 'https://api.chatengine.io/chats/',
            headers: {

                'Project-ID': '738df1f7-4780-4c48-b34f-0938273bcb5d',
                'User-Name': this.props.loggedInUser,
                'User-Secret': this.props.secret,

            },
            data: data
        };





        axios(config)
            .then((response) => {
                //   console.log(JSON.stringify(response.data.id));
                const chatId = JSON.stringify(response.data.id)

                //console.log(chatId);
                this.setState({ chatId })
                //console.log(this.state.chatId);
                this.sendChatId(this.state.chatId);


            })



    }




    render() {
        const { message } = this.state;
        const placeholder = `Send a message to ${this.props.loggedInUser}`



        return (




            <form onSubmit={(e) => this.handleSubmit(e)}>
                {/* <label>{this.props.ownerName}<input type='text' name='name' value={this.props.ownerName}></input></label> */}
                <textarea name='message' placeholder={placeholder} value={message}
                    onChange={(e) => this.setState({ message: e.target.value })}></textarea>



                <input type='submit' value='Send' />
            </form>


        );
    }
}

export default SendMessage;