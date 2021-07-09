import React from 'react';
import Things from './Things.js'

class ThingsHandler extends React.Component {

  constructor() {
    super();
    this.state = {
        items: null,
        categoryId: null,
        searchCriteria: {
          searchingFor: null,
          date_from: null,
          date_to: null,
          location: null
        },
        all: null
    };
  }

  async componentDidUpdate(PrevProps, PrevState) {
        if(this.props != PrevProps){
          await this.filterBy()
        }
  }


  async componentDidMount() {
    await this.filterBy()
  }

  async filterBy() {
    const { categoryId, searchCriteria, all } = this.props
    //console.log(this.props)

    if(categoryId){
      console.log('category search: '+categoryId)
      const response = await fetch(
          `${process.env.REACT_APP_API_URL}/searchByCategory`,
          {
              method: 'POST',
              credentials: 'include',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ category_id: categoryId })
          }
      );
      const itemList = await response.json();
      if(await itemList) {

        this.setState({items: await itemList})
      }
    }else if (searchCriteria) {
      console.log('searchbar search')
      const response = await fetch(
          `${process.env.REACT_APP_API_URL}/searchByFilter`,
          {
              method: 'POST',
              credentials: 'include',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ searchCriteria: searchCriteria })
          }
      );
      const itemList = await response.json();
      console.log(await itemList)
      if(await itemList[0]) {
        this.setState({items: await itemList})
      }else{
        this.setState({items: null})
      }
    }else if (all) {
      console.log('all search')
    }

  }

  async

  render() {
    const { items, categoryId, searchParams, date_from, date_to, all } = this.state
    console.log(this.props)
    if(!items) {
      return(
        <p>Loading...</p>
      )
    }{
      return(
          <Things items={ items } cookieCheck={this.props.cookieCheck}/>
      )
      }
    }
}


export default ThingsHandler;
