const  navDown = document.querySelector('.nav_down')
navDown.addEventListener('click', function(event) {
    console.log('12');
    const selectUl = document.querySelector('.select')
    
    if(selectUl.offsetParent) {
        selectUl.style.display = "none"
    } else {
        selectUl.style.display = "block"
    }
})
