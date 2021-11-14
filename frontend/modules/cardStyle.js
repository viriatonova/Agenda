const btnColor = document.querySelectorAll('article'); 
const card = document.querySelector('.card');
const colors = ['bg-yellow-400', 'bg-blue-400', 'bg-purple-400', 'bg-green-400', 'bg-red-400', 'bg-gray-400', 'bg-pink-400'];

btnColor.forEach( (elm) => {
    elm.classList.add(colors[Math.floor(Math.random() * colors.length)]);
});