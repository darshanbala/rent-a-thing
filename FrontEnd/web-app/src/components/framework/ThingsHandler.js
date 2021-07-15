import React from 'react';
import Things from '../products/Things.js'

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
      currentLocation: {
        id: null,
        name: null
      },
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
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/cities`,
      {
        method: 'GET',
        credentials: 'include',
      }
    )
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
    let cityId = 0;
    try{
     cityId = e.target.value;
  }catch{
     cityId = e;
  }
  if(cityId === '0') {
    await this.setState({
           currentLocation:
               {
                 id: null,
                 name: null
                }
            });

    return;
  }else{
    cityId = cityId--;
  }
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/getCity`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cityId })
      }
    );
    const city = await response.json();
    const name = city[0].name;
    const id = city[0].id;
    await this.setState({ currentLocation: {
                            id: id,
                            name: name
                            }
                          });

    let { items, locationFilteredItemList } = this.state;
    locationFilteredItemList = await this.filterByLocation(items);
    //console.log("locationFilteredItems:");
    //console.log(locationFilteredItemList);
    this.setState({ locationFilteredItemList });
  }

  async componentDidMount() {
    await this.filterBy()
    //get list of cities for drop down later
    await this.getCities();
    //Check if someone is logged in, in for get their city_id to later filter items
    /*
    const response = await fetch(`${process.env.REACT_APP_API_URL}/checkWhoIsSignedIn`, { method: 'GET', credentials: 'include' });
    const user = await response.json();
    if (user) {
      //const response = await fetch(`${process.env.REACT_APP_API_URL}/checkUserLocation`, { method: 'GET', credentials: 'include', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ user }) });
      const userLocation = await this.changeCity(user.city_id);
      //console.log("User Logged in:");
      //console.log(user);
      //console.log(userLocation);
      this.setState({ currentLocationId: userLocation });
    } else {
      //console.log("User NOT Logged in:");
      await this.changeCity(0)
    }
    */
    this.setState({currentLocation: { name: 'all'}})


  }

  async filterByLocation(itemList) {
    //console.log("Item List: ");
    //console.log(itemList);
    const { currentLocation } = await this.state;
    //console.log("Filtering by location id:")
    //console.log(currentLocation.id);//[0].id);
    if (currentLocation.id) {
      //console.log("Filtering...");
      const filteredItems = itemList.filter(item => item.city_id === currentLocation.id);
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
    let itemList = [];
    if(categoryId){
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
        const locationFilteredItems = await this.filterByLocation(itemList);
        this.setState({ items: await itemList, locationFilteredItemList: locationFilteredItems });
      }
    } else if (searchCriteria && searchCriteria.item) {
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
      itemList = await response.json();
      //console.log(await itemList)

      if (await itemList[0]) {
        const locationFilteredItems = await this.filterByLocation(itemList);
        this.setState({ items: await itemList, locationFilteredItemList: locationFilteredItems });
      } else {
        this.setState({ items: [] })
      }
    } else if (all) {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/items`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
        }
      )
      //respose is making the request
      itemList = await response.json()
      //console.log(items.items)
      if (await itemList[0]) {
        const locationFilteredItems = await this.filterByLocation(itemList);
        this.setState({ items: await itemList, locationFilteredItemList: locationFilteredItems });
      } else {
        this.setState({ items: [] })
      }
    }else{
      this.setState({items: []})
    }

  }

  async

  render() {
    const { items, categoryId, searchParams, date_from, date_to, all, cityOptions, locationFilteredItemList, currentLocation } = this.state
    //console.log("Category filtered items:");
    //console.log(items);
    //console.log("Location filtered items:");
    //console.log(locationFilteredItemList);
    //console.log(JSON.stringify(currentLocation))
    if (!items) {
      return (
        <p>Loading...</p>
      )
    } {
      return (
        <section>
                    { cityOptions &&
                      <select name="cities" value={currentLocation.id} onChange={(e) => this.changeCity(e)}>
                        <option value={0}>All locations</option>
                            {cityOptions.map(({ id, name }) =>{
                                //console.log(id+'  '+name);
                                return <option key={id} id={id} name={currentLocation.id} value={id}>{name}</option>
                                }
                            )}
                      </select>
                    }
          { currentLocation.id &&
            <Things items={locationFilteredItemList} cookieCheck={this.props.cookieCheck} />
          }
          { !currentLocation.id &&
            <Things items={items} />
          }
        </section>
      )
    }
  }
}


export default ThingsHandler;
