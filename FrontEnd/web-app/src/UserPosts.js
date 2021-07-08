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
        <h1>{user.first_name} is lending</h1>
        <div id="posts">
        <Things />
        </div>
      </section>
    );
  }
}

export default UserPosts;
