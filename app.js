let url = window.location.href;
console.log(url);
let url_segment = url.split('?');
let movieParameter = url_segment[1]; // Extract movie parameter from the URL
console.log(movieParameter);

let play_btn = document.getElementById('play');
let video = document.getElementById('video');

play_btn.addEventListener('click', () => {
    if (play_btn && video) {
        if (video.paused) {
            video.play();
            video.style.display = 'unset';
            play_btn.classList.remove('bi-play-fill');
            play_btn.classList.add('bi-pause');
        } else {
            video.pause();
            video.style.display = 'none';
            play_btn.classList.add('bi-play-fill');
            play_btn.classList.remove('bi-pause');
        }
    }
});

video.addEventListener('ended', () => {
    video.play();
});

let date = new Date();
let main_date = date.getDate();
console.log(main_date);

Array.from(document.getElementsByClassName('date_point')).forEach((el) => {
    if (el.innerText == main_date) {
        el.classList.add('h6_active');
    }
});

let pvr = [
    {
        pvr: 'PVR Vegus',
        movie: 'Jawan',
        loc: 'Dwarka Sector 14 , New Delhi',
        audi: 1,
        type: '4DX',
        series: ['J', 'H', 'F', 'E', 'D', 'C', 'B', 'A'],
        row_section: 3,
        seat: 24,
        j: [2, 6, 24, 23, 7, 16, 17, 18, 19, 13, 12],
        h: [1, 2, 78, 20, 23, 8, 11, 18, 19, 13, 12],
        f: [5, 6, 15, 17, 18],
        e: [2, 7, 8, 17, 18],
        d: [5, 16, 15, 23, 22],
        c: [1, 2, 11, 12, 19],
        b: [8, 5],
        a: [],
        price: [800, 800, 560, 560, 560, 560, 430, 430],
        date: 24,
        img: 'img/jawan.jpg',
        video: 'video/Jawan Official Trailer-(HDvideo9).mp4',
        background: 'img/bg.png',
    },

    {
        
            pvr: 'PVR Vegus',
            movie: 'Jawan',
            loc: 'Dwarka Sector 14 , New Delhi',
            audi: 1,
            type: '4DX',
            series: ['J', 'H', 'F', 'E', 'D', 'C', 'B', 'A'],
            row_section: 3,
            seat: 24,
            j: [2, 6, 24, 23, 7, 16, 17, 18, 19, 13, 12],
            h: [1, 2, 78, 20, 23, 8, 11, 18, 19, 13, 12],
            f: [5, 6, 15, 17, 18],
            e: [2, 7, 8, 17, 18],
            d: [5, 16, 15, 23, 22],
            c: [1, 2, 11, 12, 19],
            b: [8, 5],
            a: [],
            price: [800, 800, 560, 560, 560, 560, 430, 430],
            date: 25,
            img: 'img/jawan.jpg',
            video: 'video/Jawan Official Trailer-(HDvideo9).mp4',
            background: 'img/bg.png',
    }
    // Add other PVR entries here...
];

let bookedSeatsLookup = {
    j: [2, 6, 24, 23, 7, 16, 17, 18, 19, 13, 12],
    h: [1, 2, 78, 20, 23, 8, 11, 18, 19, 13, 12],
    f: [5, 6, 15, 17, 18],
    e: [2, 7, 8, 17, 18],
    d: [5, 16, 15, 23, 22],
    c: [1, 2, 11, 12, 19],
    b: [8, 5],
    a: []
};

let addSeats = (arr) => {
    arr.forEach((el, i) => {
        const { series, row_section, seat, price } = el;

        for (let index = 0; index < series.length; index++) {
            let row = document.createElement('div');
            row.className = 'row';

            let booked_seats = bookedSeatsLookup[series[index].toLowerCase()] || []; // Use the lookup

            for (let seats = 0; seats < seat; seats++) {
                if (seats === 0) {
                    let span = document.createElement('span');
                    span.innerText = series[index];
                    row.appendChild(span);
                }

                let li = document.createElement('li');
                let filter = booked_seats.filter(el => el === seats);

                if (filter.length > 0) {
                    li.className = "seat booked";
                } else {
                    li.className = "seat";
                }

                li.id = series[index] + seats;
                li.setAttribute('book', seats);
                li.setAttribute('sr', series[index]);
                li.innerText = price[index];

                li.onclick = () => {
                    if (li.className === 'seat booked') {
                        li.classList.remove('selected');
                    } else {
                        li.classList.toggle('selected');
                    }
                    let len = Array.from(document.getElementsByClassName('selected')).length;
                    document.getElementById('book_ticket').style.display = len > 0 ? 'unset' : 'none';
                };

                row.appendChild(li);

                if (seats === seat - 1) {
                    let span = document.createElement('span');
                    span.innerText = series[index];
                    row.appendChild(span);
                }
            }

            document.getElementById('chair').appendChild(row);
        }
    });
};

let data = pvr.filter(obj => obj.date === main_date && obj.movie.toLowerCase() === movieParameter.toLowerCase());
console.log(data);

if (data.length > 0) {
    document.getElementById('mpvie').src = data[0].movie;
    document.getElementById('poster').src = data[0].img;
    document.getElementById('video').src = data[0].video;
} else {
    console.error("No matching movie data found for the given date and movie parameter.");
}

let styleElem = document.head.appendChild(document.createElement("style"));
styleElem.innerHTML = `.book .right:before {background: url(${data[0]?.background}) no-repeat center -30px/cover}`;

addSeats(data);

let offDate = () => {
    Array.from(document.getElementsByClassName('date_point')).forEach(el => {
        el.classList.remove('h6_active');
    });
};

Array.from(document.getElementsByClassName('date_point')).forEach(el => {
    el.addEventListener('click', () => {
        if (el.innerText > date.getDate() - 1) {
            offDate();
            el.classList.add('h6_active');
            main_date = +el.innerText;
            document.getElementById('chair').innerHTML = '';
            let data = pvr.filter(obj => obj.date === main_date && obj.movie.toLowerCase() === movieParameter.toLowerCase());
            console.log(data);
            addSeats(data);
        }
    });
});

document.getElementById('book_ticket').addEventListener('click', () => {
    Array.from(document.getElementsByClassName('selected')).forEach(el => {
        let seat_no = el.getAttribute('book');
        let seat_sr = el.getAttribute('sr').toLowerCase();
        let seat_price = el.innerText;

        let getData = pvr.map(obj => {
            if (obj.movie.toLowerCase() === movieParameter.toLowerCase() && obj.date === main_date) {
                obj[seat_sr].push(+seat_no);
            }
            return obj;
        });

        document.getElementById('chair').innerHTML = '';
        let data = getData.filter(obj => obj.date === main_date && obj.movie.toLowerCase() === movieParameter.toLowerCase());
        addSeats(data);

        document.getElementById('screen').style.display = 'none';
        document.getElementById('chair').style.display = 'none';
        document.getElementById('det').style.display = 'none';
        document.getElementById('book_ticket').style.display = 'none';
        document.getElementById('back_ticket').style.display = 'unset';
        document.getElementById('ticket').style.display = 'block';

        let tic = document.createElement('div');
        tic.className ='tic';
        tic.innerHTML = `
                    <div class="barcode">
                        <div class="card">
                            <h6>ROW ${seat_sr.toLocaleUpperCase()}</h6>
                            <h6>${main_date} September 2023</h6>
                        </div>
                        <div class="card">
                            <h6>Seat ${seat_no}</h6>
                            <h6>23:00</h6>
                        </div>

                        <svg id="${seat_sr}${seat_no}barcode"></svg>
                        <h5>VEGUS CINEMA</h5>
                    </div>
                    <div class="tic_details" style=" background: url(${data[0].background})no-repeat center -35px /cover">
                        <div class="type">4DX</div>
                        <h5 class="pvr"><span>Vegus</span> Cinema</h5>
                        <h1>${url_segment[1]}</h1>
                        <div class="seat_det">
                            <div class="seat_cr">
                                <h6>ROW</h6>
                                <h6>${seat_sr.toLocaleUpperCase()}</h6>
                            </div>
                            <div class="seat_cr">
                                <h6>SEAT</h6>
                                <h6>${seat_no}</h6>
                            </div>
                            <div class="seat_cr">
                                <h6>DATE</h6>
                                <h6>${main_date} <sub>sep</sub></h6>
                            </div>
                            <div class="seat_cr">
                                <h6>TIME</h6>
                                <h6>11:30 <sub>pm</sub></h6>
                            </div>
                        </div>
                    </div>
        `
        document.getElementById('ticket').appendChild(tic);

        JsBarcode(`#${seat_sr}${seat_no}barcode`, 
        `${seat_sr.toLocaleUpperCase()}${seat_no}${seat_price}${main_date}92023`);
    })
})


document.getElementById('back_ticket').addEventListener('click', () => {
    document.getElementById('screen').style.display = 'inline-block';
        document.getElementById('chair').style.display = 'block';
        document.getElementById('det').style.display = 'flex';
        document.getElementById('book_ticket').style.display = 'unset';
        document.getElementById('back_ticket').style.display = 'none';
        document.getElementById('ticket').style.display = 'none';
})