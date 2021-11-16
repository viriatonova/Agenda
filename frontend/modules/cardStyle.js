const btnColor = document.querySelectorAll('article'); 
const card = document.querySelector('.card');
const colors = ['bg-yellow-600', 'bg-blue-600', 'bg-purple-600', 'bg-green-600', 'bg-red-600', 'bg-gray-600', 'bg-pink-600'];

btnColor.forEach( (elm) => {
    elm.classList.add(colors[Math.floor(Math.random() * colors.length)]);
});