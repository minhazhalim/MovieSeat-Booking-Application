const container = document.querySelector('.container');
const seat = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movie = document.getElementById('movie');
let ticketPrice = +movie.value;
function setMovieData(movieIndex,moviePrice){
     localStorage.setItem('selectedMovieIndex',movieIndex);
     localStorage.setItem('selectedMoviePrice',moviePrice);
}
function updateSelectedCount(){
     const selectedSeats = document.querySelectorAll('.row .seat.selected');
     const seatsIndex = [...selectedSeats].map(seats => [...seat].indexOf(seats));
     localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex));
     const selectedSeatsCount = selectedSeats.length;
     count.innerText = selectedSeatsCount;
     total.innerText = selectedSeatsCount * ticketPrice;
     setMovieData(movie.selectedIndex,movie.value);
}
updateSelectedCount();
function populateUI(){
     const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
     if(selectedSeats !== null && selectedSeats.length > 0){
          seat.forEach((seats,index) => {
               if(selectedSeats.indexOf(index) > -1){
                    seats.classList.add('selected');
               }
          });
     }
     const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
     if(selectedMovieIndex !== null){
          movie.selectedIndex = selectedMovieIndex;
     }
}
populateUI();
movie.addEventListener('change',event => {
     ticketPrice = +event.target.value;
     setMovieData(event.target.selectedIndex,event.target.value);
     updateSelectedCount();
});
container.addEventListener('click',event => {
     if(event.target.classList.contains('seat') && !event.target.classList.contains('occupied')){
          event.target.classList.toggle('selected');
          updateSelectedCount();
     }
});