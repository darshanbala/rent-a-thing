/*
import { Application } from 'https://deno.land/x/abc@v1.3.1/mod.ts';
import { Client } from 'https://deno.land/x/postgres@v0.11.3/mod.ts';
const client = new Client(Deno.env.get('PG_URL'));
await client.connect();
const PORT = Number(Deno.env.get('PORT'));

const { JqAjaxGetManager, UserInteraction, JsHelper } = require('@uak2020/jquery-ajax');

const userInteraction = new UserInteraction();
const jsHelper = new JsHelper();
const ajaxGetMgr = new JqAjaxGetManager();
*/
/*
ajaxGetMgr.performAjaxGet(
    'https://randomuser.me/api/',
  {
  dataType: 'json',
  success: function(data) {
    console.log(data);
  }
});
*/
const people = []
const numOfPeople = 40
const numOfPeopleArr = [];



function getCity() {
  const rndInt = Math.floor(Math.random() * 20)
  return rndInt
}

for(let i = 0; i<numOfPeople; i++){
  numOfPeopleArr.push(i)
}
  for await(let x of numOfPeopleArr){
  const response = await fetch(
    `https://randomuser.me/api/`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
  const formattedResponse = await response.json()
  const person = formattedResponse.results[0]
  //console.log(person.location.street)
  const formattedPerson = {first_name: person.name.first, last_name: person.name.last, email: person.email, password: '$2a$08$BEA3DvDyoLR938jhe9bsAOS7T136Y8U769Yx7akYhjUf6s1doLUBy', salt: '$2a$08$BEA3DvDyoLR938jhe9bsAO', star_rating: 0, date_of_birth: person.dob.date, phone_number: person.cell, address1: person.location.street.number, address2: person.location.street.name, city: getCity(), postcode: person.location.postcode, created_at: person.registered.date, updated_at: person.registered.date}
  //console.log(await person)
  const seedValue = `INSERT INTO users(first_name, last_name, email, salted_password, salt, date_of_birth, phone_number, address1, address2, city_id, postcode, created_at, updated_at) VALUES ('${formattedPerson.first_name}', '${formattedPerson.last_name}', '${formattedPerson.email}', '$2a$08$BEA3DvDyoLR938jhe9bsAOS7T136Y8U769Yx7akYhjUf6s1doLUBy', '$2a$08$BEA3DvDyoLR938jhe9bsAO', '${formattedPerson.date_of_birth}', '${formattedPerson.phone_number}', '${formattedPerson.address1}',  '${formattedPerson.address2}', '${formattedPerson.city}', '${formattedPerson.postcode}', '${formattedPerson.created_at}', '${formattedPerson.updated_at}');`
  people.push(seedValue)

}
  for(let i of people) {
    console.log(i)
  }
