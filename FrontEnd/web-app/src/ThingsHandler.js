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
      all: null,
      currentLocationId: null,
      cityOptions: null,
      showMenu: false,
      locationFilteredItemList: ''
    };
  }

  async componentDidUpdate(PrevProps, PrevState) {
    if (this.props != PrevProps) {
      await this.filterBy()
    }
  }

  async getCities() {
    const response = await fetch('http://localhost:8080/cities', {
      method: 'GET',
      credentials: 'include'
    })
    const cityOptions = await response.json()
    this.setState({ cityOptions });
  }

  showMenu(event) {
    event.preventDefault();

    this.setState({
      showMenu: true,
    });
  }

  async changeCity(e) {
    const cityName = e.target.innerHTML;
    //console.log(cityName);
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/getCity`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cityName })
      }
    );
    const cityId = await response.json();
    //console.log(cityId[0].id);
    await this.setState({ currentLocationId: cityId[0].id });

    let { items, locationFilteredItemList } = this.state;
    locationFilteredItemList = await this.filterByLocation(items);
    //console.log("locationFilteredItems:");
    //console.log(locationFilteredItemList);
    this.setState({ locationFilteredItemList });
  }

  async componentDidMount() {
    //get list of cities for drop down later 
    await this.getCities();
    //Check if someone is logged in, in for get their city_id to later filter items
    const response = await fetch(`${process.env.REACT_APP_API_URL}/checkWhoIsSignedIn`, { method: 'GET', credentials: 'include' });
    const user = await response.json();
    if (user) {
      //const response = await fetch(`${process.env.REACT_APP_API_URL}/checkUserLocation`, { method: 'GET', credentials: 'include', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ user }) });
      const userLocation = user.city_id;
      //console.log("User Logged in:");
      //console.log(user);
      //console.log(userLocation);
      this.setState({ currentLocationId: userLocation });
    } else {
      //console.log("User NOT Logged in:");
      this.setState({ currentLocationId: 0 });
    }

    await this.filterBy()
  }

  async filterByLocation(itemList) {
    //console.log("Item List: ");
    //console.log(itemList);
    const { currentLocationId } = await this.state;
    //console.log("Filtering by location id:")
    //console.log(currentLocationId);//[0].id);
    if (currentLocationId) {
      //console.log("Filtering...");
      const filteredItems = itemList.filter(item => item.city_id === currentLocationId);
      return filteredItems;
    } else {
      //console.log("NOT Filtering.");
      return itemList;
    }
  }

  async filterBy() {
    //console.log("IN FILTER BY")
    const { categoryId, searchCriteria, all, locationFilteredItemList } = this.props
    //console.log(this.props)

    if (categoryId) {
      //console.log('category search: '+categoryId)
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
      let itemList = await response.json();
      if (await itemList) {
        //FURTHER FILTER BY LOCATION HERE
        //console.log("ItemList:");
        //console.log(itemList);
        const locationFilteredItems = await this.filterByLocation(itemList);
        //console.log("locationFilteredItems:");
        //console.log(locationFilteredItems);
        this.setState({ items: await itemList, locationFilteredItemList: locationFilteredItems });
      }
    } else if (searchCriteria) {
      //console.log('searchbar search')
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
      //console.log(await itemList)
      if (await itemList[0]) {
        //FURTHER FILTER BY LOCATION HERE
        const locationFilteredItems = await this.filterByLocation(itemList);

        this.setState({ items: await itemList, locationFilteredItemList: locationFilteredItems });
      } else {
        this.setState({ items: null })
      }
    } else if (all) {
      const response = await fetch('http://localhost:8080/items', {
        method: 'GET',
        credentials: 'include'
      })
      //respose is making the request
      const itemList = await response.json()
      //console.log(items.items)
      if (await itemList[0]) {
        //FURTHER FILTER BY LOCATION HERE
        const locationFilteredItems = await this.filterByLocation(itemList);

        this.setState({ items: await itemList, locationFilteredItemList: locationFilteredItems });
      } else {
        this.setState({ items: null })
      }
    }

  }

  async

  render() {
    const { items, categoryId, searchParams, date_from, date_to, all, cityOptions, locationFilteredItemList } = this.state
    console.log("Category filtered items:");
    console.log(items);
    console.log("Location filtered items:");
    console.log(locationFilteredItemList);
    if (!items) {
      return (
        <p>Loading...</p>
      )
    } {
      return (
        <>
          <h1>ThingsHandler.js</h1>
          <h2>category ID: {categoryId}</h2>

          <div>
            <button onClick={(e) => this.showMenu(e)}>
              Show menu
            </button>

            {
              this.state.showMenu
                ? (
                  <div className="menu">
                    {cityOptions.map(({ id, name }) => <span onClick={(e) => this.changeCity(e)} key={id} value={name}>{name}</span>)}
                  </div>
                )
                : (
                  null
                )
            }
          </div>
          <Things items={locationFilteredItemList} cookieCheck={this.props.cookieCheck} />
        </>
      )
    }
  }
}


export default ThingsHandler;
