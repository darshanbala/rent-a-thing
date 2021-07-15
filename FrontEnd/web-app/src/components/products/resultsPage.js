import React from 'react';

class ResultsPage extends React.Component {
  constructor(props) {
    this.state = {
      searchBarParams: {

      }
    }
  }

  render() {
    console.log(this.props)
    return(
      <section>
        <SearchBar />
        <ThingsHandler />
      </section>
    )
  }
}

export default ResultsPage;
