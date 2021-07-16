import React from 'react';
import Things from '../products/Things.js'

class ThingsHandler extends React.Component {

  constructor() {
    super();
    this.state = {
      items: null,
      categoryId: 0,
      searchCriteria: {
        searchingFor: null,
        date_from: null,
        date_to: null,
        location: null
      },
      all: null,
      currentLocation: {
        id: 0,
        name: null
      },
      cityOptions: null,
      categoryOptions: null,
      showMenu: false,
      locationFilteredItemList: '',
      propsLoaded: false,
      searchRadiusOptions: ['None', '0.5', '1.0', '1.5', '2.0', '2.5', '3.0', '3.5', '4.0', '4.5', '5.0'],
      selectedSearchRadius: 'None',
      locationAndRadiusFilteredItems: []
    };
  }

  async componentDidMount() {
    await this.getCities();
    const response = await fetch(`${process.env.REACT_APP_API_URL}/checkWhoIsSignedIn`, { method: 'GET', credentials: 'include' });
    const user = await response.json();
    if (user) {
      await this.changeCity(user.city_id);
    } else {
      await this.changeCity(1)
    }
    //this.setState({currentLocation: { name: 'all'}})
    await this.filterBy();
  }

  async componentDidUpdate(PrevProps, PrevState) {

    const newStateRadius = this.state.selectedSearchRadius;
    const oldStateRadius = PrevState.selectedSearchRadius;
    const newStateLocation = this.state.currentLocation.id;
    const oldStateLocation = PrevState.currentLocation.id;

    if (this.props !== PrevProps) {
      if(this.state.propsLoaded === false){
        await this.setState({categoryId: this.props.searchCriteria.categoryId, propsLoaded: true})
        //console.log(this.props.searchCriteria.searchingFor)
        try{
        if(this.props.searchCriteria.searchingFor.item){
          await this.setState({searchCriteria: {searchingFor: this.props.searchCriteria.searchingFor.item}})
          //console.log(this.props.searchCriteria.searchingFor)
        }
      }catch{}
      }
      await this.filterBy()
    }
    if(this.state.categoryId !== PrevState.categoryId || this.state.searchCriteria.searchingFor !== PrevState.searchCriteria.searchingFor){
      //console.log(this.state)
      await this.filterBy();
    }

    if(newStateRadius != oldStateRadius || newStateLocation != oldStateLocation) {
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
    await this.setState({ currentLocation: {
                            id: 0
                            },
                          selectedSearchRadius: 'None'
                          });


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
    const { currentLocation } = await this.state;
    if (currentLocation.id) {
      const filteredItems = itemList.filter(item => item.city_id === currentLocation.id);
      return filteredItems;
    } else {
      return itemList;
    }
  }

  async filterByLocationAndRadius(itemList) {
    const { currentLocation, selectedSearchRadius } = this.state;
    let thingsThatPass = [];

    if (selectedSearchRadius !== 'None') {
      const currentLocationId = currentLocation.id;
      const response2 = await fetch(`${process.env.REACT_APP_API_URL}/currentLocationData`, { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ currentLocationId }) });
      const currentLocationData = await response2.json();

      //console.log("Current Location Data: ");
      //console.log(currentLocationData[0].latitude);
      //console.log(currentLocationData[0].longitude);

      let calculationValue1Plus;
      let calculationValue1Minus;
      let calculationValue2Plus;
      let calculationValue2Minus;
      const test1 = currentLocationData[0].latitude.slice(0, 1);
      const test2 = currentLocationData[0].longitude.slice(0, 1);

      if (test1 === '-') {
        calculationValue1Plus = currentLocationData[0].latitude.slice(1);
        calculationValue1Minus = currentLocationData[0].latitude.slice(1);
      } else {
        calculationValue1Plus = currentLocationData[0].latitude.slice(0);
        calculationValue1Minus = currentLocationData[0].latitude.slice(0);
      }
      if (test2 === '-') {
        calculationValue2Plus = currentLocationData[0].longitude.slice(1);
        calculationValue2Minus = currentLocationData[0].longitude.slice(1);
      } else {
        calculationValue2Plus = currentLocationData[0].longitude.slice(0);
        calculationValue2Minus = currentLocationData[0].longitude.slice(0);
      }

      //Need plus and minus for a raduius, not just plus.
      calculationValue1Plus = parseFloat(calculationValue1Plus) + parseFloat(selectedSearchRadius);
      calculationValue1Minus = parseFloat(calculationValue1Minus) - parseFloat(selectedSearchRadius);
      calculationValue2Plus = parseFloat(calculationValue2Plus) + parseFloat(selectedSearchRadius);
      calculationValue2Minus = parseFloat(calculationValue2Minus) - parseFloat(selectedSearchRadius);

      //console.log("Expanded search radius Data: ");
      //console.log("Lat Plus: ");
      //console.log(calculationValue1Plus);
      //console.log("Lat Minus: ");
      //console.log(calculationValue1Minus);
      //console.log("Long Plus: ");
      //console.log(calculationValue2Plus);
      //console.log("Long Minus: ");
      //console.log(calculationValue2Minus);

      itemList.forEach((object) => {
        let innerCalculationValue1;
        let innerCalculationValue2;

        let innerTest1 = object.latitude.slice(0, 1);
        let innerTest2 = object.longitude.slice(0, 1);

        if (innerTest1 === '-') {
          innerCalculationValue1 = object.latitude.slice(1);
        } else {
          innerCalculationValue1 = object.latitude.slice(0);
        }
        if (innerTest2 === '-') {
          innerCalculationValue2 = object.longitude.slice(1);
        } else {
          innerCalculationValue2 = object.longitude.slice(0);
        }

        innerCalculationValue1 = parseFloat(innerCalculationValue1);
        innerCalculationValue2 = parseFloat(innerCalculationValue2)

        if (innerCalculationValue1 < calculationValue1Plus && innerCalculationValue1 > calculationValue1Minus) {
          if (innerCalculationValue2 < calculationValue2Plus && innerCalculationValue2 > calculationValue2Minus) {
            //console.log("Thing that made it: ")
            //console.log("Lat: ")
            //console.log(innerCalculationValue1);
            //console.log("Long: ")
            //console.log(innerCalculationValue2);

            thingsThatPass.push(object);
          }
        }
      });
    } else {
      thingsThatPass = this.filterByLocation(itemList);
    }

    return thingsThatPass;
  }

  async filterBy() {
    //console.log("IN FILTER BY")
    const { all, locationFilteredItemList, searchCriteria } = this.props
    //console.log(this.props)
    const { categoryId } = this.state
    //console.log(this.state.searchCriteria)
    let searchingFor = '';
    try{
        searchingFor  = this.props.searchCriteria.searchingFor.item
    }catch{}
    let itemList = [];
    //console.log('category search: '+categoryId)
    //console.log('category type: '+typeof(categoryId))

    if(categoryId && categoryId !== '0'){
      if(this.state.totally_unfiltered) {
        this.setState({totally_unfiltered: false})
      }
      //console.log('category search: '+categoryId)
      //console.log(searchingFor)
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
      //console.log(await itemList)
      if (await itemList[0]) {
        const locationAndRadiusFilteredItems = await this.filterByLocationAndRadius(itemList);
        this.setState({ locationAndRadiusFilteredItems });
        this.setState({ items: [], locationFilteredItems: [] })
      }
    } else if (searchingFor) {
      if(this.state.totally_unfiltered) {
        this.setState({totally_unfiltered: false})
      }
      //console.log('searchbar search')
      //console.log(searchingFor)
      //console.log(categoryId)
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
      //console.log(await itemList)

      if (await itemList[0]) {
        const locationAndRadiusFilteredItems = await this.filterByLocationAndRadius(itemList);
        this.setState({ items: await itemList, locationAndRadiusFilteredItems: locationAndRadiusFilteredItems });
      } else {
        this.setState({ items: [], locationFilteredItems: [] })
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
      itemList = await response.json()
      if (await itemList[0]) {
        const locationAndRadiusFilteredItems = await this.filterByLocationAndRadius(itemList);
        this.setState({ items: await itemList, locationAndRadiusFilteredItems });
      } else {
        this.setState({ items: [] })
      }
    }*/else{
      this.setState({totally_unfiltered: true})
    }

  }

  async changeSearchRadius(e) {
    await this.setState({ selectedSearchRadius: e.target.value });
  }

  async changeCategory(e) {
    e.preventDefault();
    const categoryId = e.target.value
    this.setState({ categoryId: categoryId})
    await this.filterBy();
  }

  render() {
    const { totally_unfiltered, items, categoryId, searchParams, date_from, date_to, all, cityOptions, categoryOptions, locationFilteredItems, locationFilteredItemList, currentLocation, searchRadiusOptions, selectedSearchRadius, locationAndRadiusFilteredItems } = this.state
    //console.log("Category filtered items:");
    //console.log(items);
    //console.log("Location filtered items:");
    //console.log(locationFilteredItemList);
    //console.log(JSON.stringify(currentLocation))
    //console.log(categoryId)
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

                    {searchRadiusOptions &&
                      <select name="selectedSearchRadius" value={selectedSearchRadius} onChange={(e) => this.changeSearchRadius(e)}>
                        {searchRadiusOptions.map((value) => {
                          //console.log(id+'  '+name);
                          return <option key={value} id={value} name={selectedSearchRadius} value={value}>{value}</option>
                        }
                    )}
                  </select>
                  }

                  { !totally_unfiltered &&
                    <Things items={locationAndRadiusFilteredItems} cookieCheck={this.props.cookieCheck} />
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
