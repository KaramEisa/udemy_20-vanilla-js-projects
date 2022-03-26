const container = document.querySelector('.container');
const seats = document.querySelector('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
    // 
const ticketPrice = +movieSelect.value;

    // Update total and count 
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount = selectedSeats.length;
    
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeats * ticketPrice;
}

    // event listener that updates selected seats 
container.addEventListener('click', (e) => {
    // if 
    if(e.target.classList.contains('seat') &&
     !e.target.classList.contains('occupied')
     ){
        e.target.classList.toggle('selected');
    // function up , this is a call  
        updateSelectedCount();
    }
})

