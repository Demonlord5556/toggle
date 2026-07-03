// Change the text in the quotes to your exact file name
const soundOn = new Audio('rbd.mpeg'); 
const soundOff = new Audio('rbd.mpeg');


function toggleLight() {
    document.body.classList.toggle('light-on');
    
    if (document.body.classList.contains('light-on')) {
        soundOn.currentTime = 0; 
        soundOn.play();
    } else {
        soundOff.currentTime = 0;
        soundOff.play();
    }
}
