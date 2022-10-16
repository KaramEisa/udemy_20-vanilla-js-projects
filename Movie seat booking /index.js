const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

//* calling the functions so the data saved to local storage get loaded to the screen

populateUI();

let ticketPrice = +movieSelect.value;

//* Save selected movied index & price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

//* Update total and count 
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    //! Saving to local storage to save selected seats even when
    //! Refreshing the page
    const seatsIndex = [...selectedSeats].map(function(seat){
        return [...seats].indexOf(seat);
    });
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
    
    
    const selectedSeatsCount = selectedSeats.length;
    
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

//* get data from local storage & populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    console.log(selectedSeats);
    
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    
    if (selectedMovieIndex !== null) {
        movieSelect.seatsIndex = selectedMovieIndex;
        console.log('hello');
    }
}

//* movie price select event 
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex , e.target.value);
    updateSelectedCount();
});
//* event listener that checks if what is clicked 
//* on is an available seat not an occupied one.
container.addEventListener('click', (e) => {
    if(e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
    ){
        e.target.classList.toggle('selected');
        // function up , this is a call  
        updateSelectedCount();
    }
})

//* initial count and total set
updateSelectedCount();

