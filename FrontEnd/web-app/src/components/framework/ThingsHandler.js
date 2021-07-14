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
      locationFilteredItemList: '',
      searchRadiusOptions: ['0.5', '1.0', '1.5', '2.0', '2.5', '3.0', '3.5', '4.0', '4.5', '5.0'],
      selectedSearchRadius: '0',
      hasSearchedByRadius: false,
      locationAndRadiusFilteredItems: []
    };
  }

  async componentDidMount() {
    //await this.filterBy()
    //get list of cities for drop down later
    await this.getCities();
    //Check if someone is logged in, if so get their city_id to later filter items
    const response = await fetch(`${process.env.REACT_APP_API_URL}/checkWhoIsSignedIn`, { method: 'GET', credentials: 'include' });
    const user = await response.json();
    if (user) {
      await this.changeCity(user.city_id);//const userLocation = await this.changeCity(user.city_id);
      //await this.setState({ currentLocation: {id: userLocation, name: ''} });
    } else {
      await this.changeCity(1)
    }
    await this.filterBy();
  }

  async componentDidUpdate(PrevProps, PrevState) {
    const newState = this.state.hasSearchedByRadius;
    const oldState = PrevState.hasSearchedByRadius;
    if (this.props != PrevProps || newState != oldState) {
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
    console.log(itemList);
    //fetch() and get a list of aall the items paired with thir location data (longatute, latitude)
    //const response1 = await fetch('http://localhost:8080/itemListLocationData', { method: 'GET', credentials: 'include' });
    //const itemListLocationData = await response1.json();

    //fetch() and get the location data (longatute, latitude) of "currentLocation"
    const { currentLocation } = this.state;
    //console.log(currentLocation);
    const currentLocationId = currentLocation.id;
    const response2 = await fetch('http://localhost:8080/currentLocationData', { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ currentLocationId }) });
    const currentLocationData = await response2.json();
    //console.log(currentLocationData);

    let calculationValue1;
    let calculationValue2;
    const test1 = currentLocationData[0].latitude.slice(0, 1);
    const test2 = currentLocationData[0].longitude.slice(0, 1);

    if (test1 === '-') {
      calculationValue1 = currentLocationData[0].latitude.slice(1);
    } else {
      calculationValue1 = currentLocationData[0].latitude.slice(0);
    }
    if (test2 === '-') {
      calculationValue2 = currentLocationData[0].longitude.slice(1);
    } else {
      calculationValue2 = currentLocationData[0].longitude.slice(0);
    }
    const { selectedSearchRadius } = this.state;
    calculationValue1 = parseFloat(calculationValue1) + parseFloat(selectedSearchRadius);
    calculationValue2 = parseFloat(calculationValue2) + parseFloat(selectedSearchRadius);

    let thingsThatPass = [];

    //for-each version
    itemList.forEach( (object) => {
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

      if (innerCalculationValue1 <= calculationValue1) {
        if (innerCalculationValue2 <= calculationValue2) {
          thingsThatPass.push(object);
        }
      }
    });

    //for version
    /*
    for (let i = 0; i < itemList.length; i++) {

      let innerCalculationValue1;
      let innerCalculationValue2;

      let innerTest1 = itemList[i].latitude.slice(0, 1);
      let innerTest2 = itemList[i].longitude.slice(0, 1);

      if (innerTest1 === '-') {
        innerCalculationValue1 = itemList[i].latitude.slice(1);
      } else {
        innerCalculationValue1 = itemList[i].latitude.slice(0);
      }
      if (innerTest2 === '-') {
        innerCalculationValue2 = itemList[i].longitude.slice(1);
      } else {
        innerCalculationValue2 = itemList[i].longitude.slice(0);
      }

      innerCalculationValue1 = parseFloat(innerCalculationValue1);
      innerCalculationValue2 = parseFloat(innerCalculationValue2)

      if (innerCalculationValue1 <= calculationValue1) {
        if (innerCalculationValue2 <= calculationValue2) {
          thingsThatPass.push(itemList[i]);
        }
      }
    }
  */
    //console.log("Things that passed:");
    //console.log(thingsThatPass);
    return thingsThatPass;
  }

  async filterBy() {
    const { hasSearchedByRadius } = this.state;
    const { categoryId, searchCriteria, all, locationFilteredItemList } = this.props
    let itemList = [];
    if (categoryId) {
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
      console.log("Items after Category filter");
      console.log(itemList);
      if (await itemList) {
        //const locationFilteredItems = await this.filterByLocation(itemList);
        if (hasSearchedByRadius) {
          const locationAndRadiusFilteredItems = await this.filterByLocationAndRadius(itemList);
          console.log("Items after Category&Radius filter");
          console.log(locationAndRadiusFilteredItems);
          //console.log("locationAndRadiusFilteredItems in filterBy():");
          //console.log(locationAndRadiusFilteredItems);
          this.setState({ locationAndRadiusFilteredItems, hasSearchedByRadius: false });//, hasSearchedByRadius: false });
        }
        this.setState({ items: itemList});//, locationAndRadiusFilteredItems, hasSearchedByRadius: false});//locationFilteredItemList: locationFilteredItems });
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
        const locationAndRadiusFilteredItems = await this.filterByLocationAndRadius(itemList);
        this.setState({ items: await itemList, locationAndRadiusFilteredItems });//locationFilteredItemList: locationFilteredItems });
      } else {
        this.setState({ items: [] })
      }
    } else if (all) {
      const response = await fetch('http://localhost:8080/items', {
        method: 'GET',
        credentials: 'include'
      })
      //respose is making the request
      itemList = await response.json()
      //console.log(items.items)
      if (await itemList[0]) {
        const locationAndRadiusFilteredItems = await this.filterByLocationAndRadius(itemList);
        this.setState({ items: await itemList, locationAndRadiusFilteredItems });//locationFilteredItemList: locationFilteredItems });
      } else {
        this.setState({ items: [] })
      }
    } else {
      this.setState({ items: [] })
    }

  }

  async

  async changeCity(e) {
    let cityId = 1;
    try {
      cityId = e.target.value;
    } catch {
      cityId = e;
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

    //let { items, locationAndRadiusFilteredItems } = this.state;
    //locationAndRadiusFilteredItems = await this.filterByLocationAndRadius(items);
    //this.setState({ locationAndRadiusFilteredItems });
  }

  async changeSearchRadius(e) {
    await this.setState({ selectedSearchRadius: e.target.value, hasSearchedByRadius: true });
  }

  render() {
    const { items, categoryId, searchParams, date_from, date_to, all, cityOptions, locationFilteredItemList, currentLocation, searchRadiusOptions, selectedSearchRadius, locationAndRadiusFilteredItems } = this.state
    //console.log("locationAndRadiusFilteredItems in render():");
    //console.log(locationAndRadiusFilteredItems);
    if (!items) {
      return (
        <p>Loading...</p>
      )
    } {
      return (
        <section>
          {cityOptions &&
            <select name="cities" value={currentLocation.id} onChange={(e) => this.changeCity(e)}>
              {cityOptions.map(({ id, name }) => {
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
          <Things items={locationAndRadiusFilteredItems} cookieCheck={this.props.cookieCheck} />
        </section>
      )
    }
  }
}

/*
{locationAndRadiusFilteredItems.length === 0 && <Things items={locationFilteredItemList} cookieCheck={this.props.cookieCheck} />}
{locationAndRadiusFilteredItems.length !== 0 && <Things items={locationAndRadiusFilteredItems} cookieCheck={this.props.cookieCheck} />}
*/


export default ThingsHandler;
