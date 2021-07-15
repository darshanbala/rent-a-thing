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
      categoryOptions: null,
      showMenu: false,
      locationFilteredItemList: '',
      propsLoaded: false
    };
  }

  async componentDidUpdate(PrevProps, PrevState) {
    if (this.props !== PrevProps) {
      if(this.state.propsLoaded === false){
        await this.setState({categoryId: this.props.searchCriteria.categoryId, propsLoaded: true})
        console.log(this.props.searchCriteria.searchingFor)
        try{
        if(this.props.searchCriteria.searchingFor.item){
          await this.setState({searchCriteria: {searchingFor: this.props.searchCriteria.searchingFor.item}})
          console.log(this.props.searchCriteria.searchingFor)
        }
      }catch{}
      }
      await this.filterBy()
    }
    if(this.state.categoryId !== PrevState.categoryId || this.state.searchCriteria.searchingFor !== PrevState.searchCriteria.searchingFor){
      console.log(this.state)
      await this.filterBy();
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
    await this.setState({
      currentLocation: {
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
    await this.getCategories();
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

  async getCategories() {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/categories`, {
        method: 'GET',
        credentials: 'include'
    })
    const categories = await response.json()
    this.setState({ categoryOptions: categories })
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
    const { all, locationFilteredItemList, searchCriteria } = this.props
    //console.log(this.props)
    const { categoryId } = this.state
    console.log(this.state.searchCriteria)
    let searchingFor = '';
    try{
        searchingFor  = this.props.searchCriteria.searchingFor.item
    }catch{}
    let itemList = [];
    console.log('category search: '+categoryId)
    console.log('category type: '+typeof(categoryId))

    if(categoryId && categoryId !== '0'){
      if(this.state.totally_unfiltered) {
        this.setState({totally_unfiltered: false})
      }
      console.log('category search: '+categoryId)
      console.log(searchingFor)
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/searchByCategory`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ category_id: categoryId, searchCriteria: searchingFor })
        }
      );

      let itemList = await response.json();
      console.log(await itemList)
      if (await itemList) {
        const locationFilteredItems = await this.filterByLocation(itemList);
        this.setState({ items: await itemList, locationFilteredItemList: locationFilteredItems });
      }
    } else if (searchingFor) {
      if(this.state.totally_unfiltered) {
        this.setState({totally_unfiltered: false})
      }
      //console.log('searchbar search')
      console.log(searchingFor)
      console.log(categoryId)
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/searchByFilter`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ searchCriteria: searchingFor })
        }
      );
      itemList = await response.json();
      console.log(await itemList)

      if (await itemList[0]) {
        const locationFilteredItems = await this.filterByLocation(itemList);
        this.setState({ items: await itemList, locationFilteredItemList: locationFilteredItems });
      } else {
        this.setState({ items: [] })
      }
    } /*else if (all) {
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
    }*/else{
      this.setState({totally_unfiltered: true})
    }

  }

  async changeCategory(e) {
    e.preventDefault();
    const categoryId = e.target.value
    this.setState({ categoryId: categoryId})
    await this.filterBy();
  }

  render() {
    const { totally_unfiltered, items, categoryId, searchParams, date_from, date_to, all, cityOptions, categoryOptions, locationFilteredItemList, currentLocation } = this.state
    //console.log("Category filtered items:");
    //console.log(items);
    //console.log("Location filtered items:");
    //console.log(locationFilteredItemList);
    //console.log(JSON.stringify(currentLocation))
    console.log(categoryId)
    if (!items) {
      return (
        <p>Loading...</p>
      )
    } {
      return (
        <section>
                    { categoryOptions &&
                      <select name="categories" value={categoryId} onChange={(e) => this.changeCategory(e)}>
                        <option value={0}>All categories</option>
                            {categoryOptions.map(({ id, name }) =>{
                                //console.log(id+'  '+name);
                                return <option key={id} id={id} name={id} value={id}>{name}</option>
                                }
                            )}
                      </select>
                    }
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
          { currentLocation.id && !totally_unfiltered &&
            <Things items={locationFilteredItemList} cookieCheck={this.props.cookieCheck} />
          }
          { !currentLocation.id && !totally_unfiltered &&
            <Things items={items} />
          }
          { totally_unfiltered &&
            <p>Why not search for something?</p>
          }
        </section>
      )
    }
  }
}


export default ThingsHandler;
