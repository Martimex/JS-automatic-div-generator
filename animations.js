anime({
    targets: ['.searchbar label', '#city', '.lookup'],
    duration: 3000,
    translateY: '4%',
    opacity: [0.2, 1],
    delay: anime.stagger(500),
    autoplay: true,
    loop: false,
})

 anime({
    targets: '.lookup',
    scale: 1,
    opacity: [0.5, 1],
    duration: 3000,
    easing: 'easeInOutSine',
    direction: 'alternate',
    loop:true,
});


let animation = anime({
   // targets: '.progress',
    width: '20%',
    duration: 1000,
    easing: 'easeInOutQuad',
    direction: 'alternate',
    delay: function(el, l, i) {
        return i * 400;
    },
    endDelay: 500,
    loop: true,
});

/////////////////////

const searchbox = document.querySelector('.lookup');

searchbox.addEventListener('click', () => {

    anime({
        targets: '.main-container',  
        duration: 3000,
        delay: 350,
        opacity: function() {
            let opacityCount = 0;
            if(opacityCount !==100) {
                opacityCount += 100;
                return opacity = `${opacityCount}%`;
            }
        },
        loop: false,
    })
     
    anime({ // undone for button loading effect - same as with this bar on bottom page
        targets: '.lookup',
    })
}) 

/////////////////////


// Zrobimy odpowiednik dla translateY z CSS'a na JS

    let weather_boxes = document.querySelector('.all')
    
    weather_boxes.addEventListener('mouseover', (e) => {
        if(e.target.classList.contains('weather-container')) {
            let container = e.target;
            let icon = container.querySelector('.icon');
            // Tu można zadeklarować w podobny sposób zmienne dla temperatury, nazwy miasta, aby potem poddać je animacji
            let cityname = container.querySelector('.city');
            let temp = container.querySelector('.temp'); 
            let weather = container.querySelector('.weather');
            //...
           // console.log('%c Hi', 'color: pink;')
            
            /*anime({
               targets: container,
               duration: 100,
               background: 'radial-gradient(rgba(80, 140, 200, 0.2), rgba(80, 140, 200, 0.2), rgba(200, 255, 255, 0.2), rgba(200, 255, 255, 0.5), rgba(200, 255, 255, 0.65))',
               //filter: 'blur(3px)',
            })
            */
            anime({
                targets: icon,
                translateY: '2.3em',
                duration: 900,
            })


            e.target.addEventListener('mouseleave', (e) => {
               // console.log('catched');
                anime({
                    targets: icon,
                    translateY: '0em',
                    duration: 1100,
                })

                anime({
                    targets: weather,
                    translateY: '0em',
                    duration: 300,
                    opacity: [0, 1],
                })

                anime({
                    targets: container,
                    duration: 250,
                    background: 'rgba(255, 255, 255, 0.1)',
                })
            })
        }    
    })
