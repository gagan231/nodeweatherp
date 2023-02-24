const weatherForm = document.querySelector('form')
const searchEl = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = searchEl.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch('/weather?address='+location).then((response) => {
            response.json().then((data) => {
                if(data.error){
                    // console.log(data.error);
                    messageOne.textContent = data.error;
                }
                else{
                    // console.log(data.forecast)
                    // console.log(data.location)
                    messageOne.textContent = data.location;
                    messageTwo.textContent = data.forecast;
                }
            })
        }
    )
})