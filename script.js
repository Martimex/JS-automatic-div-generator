
const cities1 = ['Moscow', 'Kraków', 'Suwałki', 'Warsaw', 'Paris', 'Johannesburg', 'Dehli', 'Los Angeles', 'Sao Paulo', 'Montevideo'];

const cities = ['Moscow', 'Kraków', 'Montevideo', 'Honolulu', 'Vien', 'Dehli', 'Władysławowo', 'Gdynia', 'Petersburg'];

function first() {

    let maincontainer = document.createElement('div');
        maincontainer.classList.add('main-container');
   
    document.body.appendChild(maincontainer);

for(let y=0; y<cities.length; y++) {

    console.log('iter');

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
                console.log(name);
                let el = document.createElement('div');
                el.textContent = chosencity;
                name.appendChild(el);
            
                main.querySelector('.icon')
                    .setAttribute('src', icon);
                        main.querySelector('.weather')
                            .textContent = weather;
                        main.querySelector('.temp')
                            .textContent = temp;

                console.log('finished');
            }
        ) 
        .catch(err => { throw err});

    }
}

first();
last();