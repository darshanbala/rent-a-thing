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
      //(NEW LOGIC)
      searchRadiusOptions: ['0.5', '1.0', '1.5', '2.0', '2.5', '3.0', '3.5', '4.0', '4.5', '5.0'],
      selectedSearchRadius: '0',
      hasSearchedByRadius: false,
      locationAndRadiusFilteredItems: []
    };
  }

  async componentDidUpdate(PrevProps, PrevState) {
    //console.log("Component Did Update...");
    //console.log("current state:");
    //console.log(this.state.hasSearchedByRadius);
    //console.log("old state:");
    //console.log(PrevState.hasSearchedByRadius);

    const newState = this.state.hasSearchedByRadius;
    const oldState = PrevState.hasSearchedByRadius;
    //console.log(newState);
    //console.log(oldState);

    if (this.props != PrevProps || newState != oldState) {
      //console.log("Calling filterBy() again");
      //this.setState({ hasSearchedByRadius: false });
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
    let cityId = 1;
    try {
      cityId = e.target.value;
    } catch {
      cityId = e;
    }
    //console.log('New cityId: ' + cityId);
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

  //(NEW LOGIC)
  async changeSearchRadius(e) {
    //console.log(e.target.value);
    //console.log("### NEW STUFF ###");
    //console.log("changing hasSearchedByRadius to true");
    //const { name, value } = e.target;
    await this.setState({ selectedSearchRadius: e.target.value, hasSearchedByRadius: true });
    //await this.filterBy();
  }

  async componentDidMount() {
    await this.filterBy()
    //get list of cities for drop down later
    await this.getCities();
    //Check if someone is logged in, in for get their city_id to later filter items
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
      await this.changeCity(1)
    }


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

  //(NEW LOGIC)
  async filterByLocationAndRadius(itemList) {

    //fetch() and get a list of aall the items paired with thir location data (longatute, latitude)
    const response1 = await fetch('http://localhost:8080/itemListLocationData', { method: 'GET', credentials: 'include' });
    const itemListLocationData = await response1.json();

    //fetch() and get the location data (longatute, latitude) of "currentLocation"
    const { currentLocation } = this.state;
    const currentLocationId = currentLocation.id;
    const response2 = await fetch('http://localhost:8080/currentLocationData', { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ currentLocationId }) });
    const currentLocationData = await response2.json();

    //filter "items" into new array depending on if the diffrence in longatute and latitude is <= selectedSearchRadius
    //NEW PLAN:
    //Get first character of currentLocationData.latitude and currentLocationData.longitude
    //console.log(currentLocationData[0].latitude);
    let calculationValue1;
    let calculationValue2;
    const test1 = currentLocationData[0].latitude.slice(0,1);
    const test2 = currentLocationData[0].longitude.slice(0,1);
    //if first character is -, then when doing calculations avoid this and then put it back on at the end.
    //console.log(test1);
    //console.log(test2);
    if(test1 === '-'){
      //console.log("test 1 is minus");
      calculationValue1 = currentLocationData[0].latitude.slice(1);
    }else{
      //console.log("test 1 is NOT minus");
      calculationValue1 = currentLocationData[0].latitude.slice(0); 
    }
    if(test2 === '-'){
      //console.log("test 2 is minus");
      calculationValue2 = currentLocationData[0].longitude.slice(1);
    }else{
      //console.log("test 2 is NOT minus");
      calculationValue2 = currentLocationData[0].longitude.slice(0);
    }
    const { selectedSearchRadius } = this.state;
    //Add parseFloat(selectedSearchRadius) onto parseFloat(currentLocationData.latitude)
    calculationValue1 = parseFloat(calculationValue1) + parseFloat(selectedSearchRadius);
    //Add parseFloat(selectedSearchRadius) onto parseFloat(currentLocationData.longitude)
    calculationValue2 = parseFloat(calculationValue2) + parseFloat(selectedSearchRadius);
    //Now the current location has expanded its latitude and longitube by the size of selected radius
    //console.log("New Latitude and Longitude values for currently select location:");
    //console.log(calculationValue1);
    //console.log(calculationValue2);
    //check and see if each item is within this expanded thing
    let thingsThatPass = [];
    for(let i = 0; i < itemListLocationData.length; i++){

      let innerCalculationValue1;
      let innerCalculationValue2;

      let innerTest1 = itemListLocationData[i].latitude.slice(0,1);
      let innerTest2 = itemListLocationData[i].longitude.slice(0,1);

      if(innerTest1 === '-'){
        //console.log("test 1 is minus");
        innerCalculationValue1 = itemListLocationData[i].latitude.slice(1);
      }else{
        //console.log("test 1 is NOT minus");
        innerCalculationValue1 = itemListLocationData[i].latitude.slice(0); 
      }
      if(innerTest2 === '-'){
        //console.log("test 2 is minus");
        innerCalculationValue2 = itemListLocationData[i].longitude.slice(1);
      }else{
        //console.log("test 2 is NOT minus");
        innerCalculationValue2 = itemListLocationData[i].longitude.slice(0);
      }

      innerCalculationValue1 = parseFloat(innerCalculationValue1);
      innerCalculationValue2 = parseFloat(innerCalculationValue2)

      if(innerCalculationValue1 <= calculationValue1){
        if(innerCalculationValue2 <= calculationValue2){
          thingsThatPass.push(itemListLocationData[i]);
        }
      }
    }

    console.log("Things that passed:");
    console.log(thingsThatPass);
    return thingsThatPass;
    
    //simple
    //console.log("filterByLocationAndRadius");
    //console.log(itemListLocationData);
    //console.log(currentLocationData);
    //What passes Latitude test?
    //const filteredItemsLatitude = itemListLocationData.filter(item => (parseFloat(item.latitude) - parseFloat(currentLocationData.latitude)) < parseFloat(selectedSearchRadius));
    //What passes Longitude test?
    //const filteredItemsLongitude = itemListLocationData.filter(item => (parseFloat(item.longitude) - parseFloat(currentLocationData.longitude)) < parseFloat(selectedSearchRadius));
    //Now what things exist in both reult arrays i.e. they passed both Latitude and Longitude?
    //console.log(filteredItemsLatitude);
    //console.log(filteredItemsLongitude);

    //complex (not working)
    /*
    const filteredItems = itemListLocationData.filter(item => {
      let tempLatitudeDifference = item.latitude - currentLocationData.latitude;
      let tempLongitudeDifference = item.longitude - currentLocationData.longitude;
      if (tempLatitudeDifference < selectedSearchRadius && tempLongitudeDifference < selectedSearchRadius) {
        return item;
      }
    });
    console.log("itemListLocationData:");
    console.log(itemListLocationData);
    console.log("currentLocationData:");
    console.log(currentLocationData);
    console.log("filteredItems:");
    console.log(filteredItems);
    */
    //return filteredItems;
  }

  async filterBy() {
    //console.log("IN FILTER BY")
    const { hasSearchedByRadius } = this.state;
    const { categoryId, searchCriteria, all, locationFilteredItemList } = this.props
    //console.log(this.props)
    let itemList = [];
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
        const locationFilteredItems = await this.filterByLocation(itemList);
        if (hasSearchedByRadius) { //(NEW LOGIC)
          //console.log("### NEW STUFF ###");
          //console.log("in IF");
          //this.setState({ hasSearchedByRadius: false });
          const locationAndRadiusFilteredItems = await this.filterByLocationAndRadius(itemList);
          this.setState({ hasSearchedByRadius: false, locationAndRadiusFilteredItems });
        }
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
      const response = await fetch('http://localhost:8080/items', {
        method: 'GET',
        credentials: 'include'
      })
      //respose is making the request
      itemList = await response.json()
      //console.log(items.items)
      if (await itemList[0]) {
        const locationFilteredItems = await this.filterByLocation(itemList);
        this.setState({ items: await itemList, locationFilteredItemList: locationFilteredItems });
      } else {
        this.setState({ items: [] })
      }
    } else {
      this.setState({ items: [] })
    }

  }

  async

  render() {
    const { items, categoryId, searchParams, date_from, date_to, all, cityOptions, locationFilteredItemList, currentLocation, searchRadiusOptions, selectedSearchRadius, hasSearchedByRadius, locationAndRadiusFilteredItems } = this.state
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
          { locationAndRadiusFilteredItems.length === 0 && <Things items={locationFilteredItemList} cookieCheck={this.props.cookieCheck} /> }
          { locationAndRadiusFilteredItems.length != 0 && <Things items={locationAndRadiusFilteredItems} cookieCheck={this.props.cookieCheck} /> }
        </section>
      )
    }
  }
}


export default ThingsHandler;
