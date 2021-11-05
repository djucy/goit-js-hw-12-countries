import API from './fetchCountries';
import listCountries from '/templates/list-countries.hbs';
import pageCountry from '/templates/country-page.hbs';
import { alert, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/BrightTheme.css';
import {debounce} from 'lodash';
import '../styles.css';

const refs = {
    searchCountryInput: document.querySelector('.form-control'),
    containerCountry: document.querySelector('.country-container'),
};
 
refs.searchCountryInput.addEventListener('input', debounce(onCountrySearch, 500));

function onCountrySearch(evt) {
    refs.containerCountry.innerHTML = ""; 
    let searchCountry = '';
    searchCountry = evt.target.value.trim();
    // if (searchCountry === ' ') {    
    //     return;
    //  }

   API.fetchCountries(searchCountry)
    .then(renderListCountries)
    .catch((error) => {
  return console.error(error);
});   
 }

function renderListCountries(country) {
    const markupListCountries = listCountries(country);
    const markupPageCountry = pageCountry(country[0]);
    
    if (country.length >= 10) {
        alert({
            text: "Too many matches found. Please, enter a more specific query!",
            delay: 2000,
            type:'error',
        });
    }
    else if (country.length >= 2 && country.length < 10) {
        refs.containerCountry.insertAdjacentHTML('beforeend', markupListCountries);  
    }
    else if (country.length === 1) {
        refs.containerCountry.insertAdjacentHTML('beforeend', markupPageCountry);
     }
};



