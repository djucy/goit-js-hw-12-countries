
export default { fetchCountries };
import { alert, defaultModules } from '@pnotify/core/dist/PNotify.js';


function fetchCountries(searchQuery) {
    return fetch(`https://restcountries.com/v2/name/${searchQuery}`)
        .then(response => {
            if (response.ok) {
    return response.json();
            }
            else {throw new Error(`HTTP error! status: ${response.status}`);  
            }
            })
            };


 
