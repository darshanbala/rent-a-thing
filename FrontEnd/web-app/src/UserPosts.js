import React from 'react';
import Things from './Things.js';

class UserPosts extends React.Component {
  constructor() {
    super();
    this.state = {

    };

  }

  render() {
    const { user } = this.props;
    return(
      <section>
        <h1>Posts made by {user.first_name}</h1>
        <Things />
      </section>
    );
  }
}

export default UserPosts;
