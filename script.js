
//const cities1 = ['Moscow', 'Kraków', 'Suwałki', 'Warsaw', 'Paris', 'Johannesburg', 'Dehli', 'Los Angeles', 'Sao Paulo', 'Montevideo'];

const cities = ['Moscow', 'Kraków', 'Montevideo', 'Honolulu', 'Vien', 'Dehli'];

function first() {

    const all = document.querySelector('.all');
    let boxElem = all.querySelector('section');
    //console.log(boxElem);

    if(!boxElem) {

        maincontainer = document.createElement('div');
        maincontainer.classList.add('main-container');
   
        all.appendChild(maincontainer);
    }

    else {

        all.querySelectorAll('.weather-container')
            .forEach(box => {
                box.remove();
            })
    }

for(let y=0; y<cities.length; y++) {

    let section = document.createElement('section');
    section.classList.add('weather-container');

    maincontainer.appendChild(section);

    let city = document.createElement('div');
        city.classList.add('city');

    section.appendChild(city);

    let img = document.createElement('img');
        img.classList.add('icon');

    section.appendChild(img);

    let flextemp = document.createElement('div'); 
        flextemp.classList.add('flex-temp');

    section.appendChild(flextemp);

        let temper = document.createElement('div');
            temper.classList.add('temp');

    flextemp.appendChild(temper);

    let flexweather = document.createElement('div');
        flexweather.classList.add('flex-weather');

    section.appendChild(flexweather);

        let weatherr = document.createElement('div');
            weatherr.classList.add('weather');

    flexweather.appendChild(weatherr);
}

}



function last() {

    for(let i=0; i<cities.length; i++)
    {

        let chosencity = cities[i];
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${chosencity}&units=metric&APPID=d10be5670d0e6307831a8eccb6cee0ef`;


        fetch(url)
            .then(res => res.json())
            .then((data) => {
            
                let icon = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
                let temp = Math.floor(data.main.temp)+'°C';
                let weather = data.weather[0].main;
                
                let main = document.querySelector(`.main-container > section:nth-child(${i+1})`);

                let name = document.querySelector(`.main-container > section:nth-child(${i+1}) > div`);
                //console.log(name);
                let el = document.createElement('div');
                    el.classList.add('city-name');
                el.textContent = chosencity;
                name.appendChild(el);
            
                main.querySelector('.icon')
                    .setAttribute('src', icon);
                        main.querySelector('.weather')
                            .textContent = weather;
                        main.querySelector('.temp')
                            .textContent = temp;

                //console.log('finished');
            }
        ) 
        .catch(err => { throw err});

    }
}

first();
last();

// Code for searchbox

document.querySelector('.searchbar > .lookup')
    .addEventListener('click', () => {
        checkCity();
    })

function checkCity() {
    const input = document.querySelector('.searchbar > #city');
    let input_v = input.value.toLowerCase();
    let input_value = input_v;

    input_value = input_value.charAt(0).toUpperCase() + input_value.slice(1);

    let url = `http://api.openweathermap.org/data/2.5/weather?q=${input_value}&units=metric&APPID=d10be5670d0e6307831a8eccb6cee0ef`;

    fetch(url)
        .then(res => res.json())
        .then((data) => {

            if(!(Object.values(data).includes(404))) { // => Checking whether the -data Object contains err 404 (key = 'cod' value = '404);
              

                let displayedCityNames = [];
                document.querySelectorAll(`.weather-container > .city`)
                    .forEach(cityName => {
                        let cname = cityName.textContent;
                        displayedCityNames.push(cname);
                    })

                //console.log({displayedCityNames});

                for(cname of displayedCityNames) {
                    if(input_value === cname) {
                        console.log('Visibility change');
                        let notify = document.querySelector('.notification-bar');
                            notify.style = 'visibility: visible;';
                            notify.classList.add('warning');
                        document.querySelector('.notification-bar .text').textContent = `This city is already on the list!`;
                        
                        anime({
                            targets: notify,
                            loop: false,
                            delay: 3000,
                            duration: 3000,
                            opacity: [1, 0],
                        })

                        return;
                    }  
                }

                let icon = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
                let temp = Math.floor(data.main.temp)+'°C';
                let weather = data.weather[0].main;
                    
                //let lastitem = cities[cities.length -1];
                // Update the Array
                
                updateArr(cities, input_value);
                //cities.shift();
                //cities.unshift(input_value);
                //console.log(cities);

                first();
                last();

                let main = document.querySelector(`.main-container > section:nth-child(1)`);

                let name = document.querySelector(`.main-container > section:nth-child(1) > div > div`);
                //console.log(name);

                name.textContent = input_value;
            
                main.querySelector('.icon')
                    .setAttribute('src', icon);
                        main.querySelector('.weather')
                            .textContent = weather;
                        main.querySelector('.temp')
                            .textContent = temp;

            }

        }) 
        .catch(err => {
            alert('City not found'); 
            console.log(err); 
        });
    
}

function updateArr(allCities, val) {

    //console.log(allCities);
    

    for(let x=allCities.length; x<0; x--)
    {
        allCities[x] = allCities[x-1];

    }

    //console.log(allCities);
    allCities.unshift(val);
    allCities.pop();

    return allCities;
}
