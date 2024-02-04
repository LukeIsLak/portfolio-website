function applyTitlePosition() {
    const element = document.querySelectorAll(".fancy-text");
    const l = element.length;
    element.forEach((child, index) => {
        let x = Math.cos(index-l);
        let y = Math.sin(index-l);
        child.style.transform = "translate("+x*10+"%," + y*100 + "%) rotate(" + (x+y)*10 +"deg)";
        child.className = "fancy-text";
    });
}

function removeTitlePosition() {
    document.querySelectorAll(".fancy-text").forEach((child, index) => {
         child.style.transform = "translate(0%,0%) rotate(0deg)";

    });
}

function addFancyHoverEffect() {
    document.querySelectorAll(".fancy-text").forEach(element => {
        element.onmouseover = function() {applyTitlePosition()};
        element.onmouseleave= function() {removeTitlePosition()};
    });
}