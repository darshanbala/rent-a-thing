import React from 'react';
import Things from '../../products/Things.js';


class UserLookingFor extends React.Component {
  constructor() {
    super();
    this.state = {

    };

  }

  render() {
    const { user } = this.props;
    return(
      <section>
        <h1>{user.first_name} is looking for</h1>
        <div id="posts">

        </div>
      </section>
    );
  }
}

export default UserLookingFor;
