//import { addFancyHoverEffect } from "./fancy-text";

const titleNames = {
    "elements":
        [
            "Developer",
            "Leader",
            "Student",
            "Educator",
            "Hobbyist",
        ],
    "repeat": true,
    "cursor_colour": "rgb(236, 93, 27)"
};

let changeBetweenTitle = 5000;
const typeSpeed = 68;
var curTitleElement = 0;
var curTitleLength = 0;
var offset = 0;

async function transition_header_title() {
    offset = curTitleLength;
    curTitleElement = 0;
    curTitleLength = 0;
    document.getElementById("type-cursor").style.backgroundColor = titleNames.cursor_colour;
    await createCurrentTitle(titleNames, "header-title", true, titleNames.cursor_colour);
    initialteUpdatingTitle(titleNames, "header-title", true, titleNames.cursor_colour);
}

async function initialteUpdatingTitle(arr, container, fancy, colour) {
    await delay(changeBetweenTitle);
    if (fancy) {removeTitlePosition(container)};
    await delay(350);
    curTitleElement = (curTitleElement + 1 >= arr.elements.length)? 0 : curTitleElement + 1;
    if (curTitleElement || arr.repeat) {
        document.getElementById("type-cursor").style.animationName = "none";
        await removeCurrentTitle(arr, container, fancy, colour);
        initialteUpdatingTitle(arr, container, fancy, colour);
    }
    else {
        console.log("End loop");
        eval(arr.func_after_rep);
        return new Promise((resolve, reject) => {
            resolve("No longer updating current title");
        })
    }
}

async function removeCurrentTitle(arr, container, fancy, colour) {
    await delay(typeSpeed);
    let prevElement = (curTitleElement - 1 < 0) ? arr.elements.length -1 : curTitleElement - 1;
    let curOffSet = offset + curTitleLength;
    if (curTitleLength >= 0 && (arr.elements[prevElement].slice(0, curTitleLength+1) != arr.elements[curTitleElement].slice(0, curTitleLength+1))) {
        let element = document.getElementById(container + (curOffSet));
        if (element == null) {
            await delay(500);
            curTitleLength += 1;
            await createCurrentTitle(arr, container, fancy, colour);
            return new Promise((resolve,reject)=> resolve('Finished removing current title'));
    
        }
        element.remove();
        curTitleLength -= 1;
        await removeCurrentTitle(arr, container, fancy, colour);
    }
    else {
        curTitleLength += 1;
        await delay(350);
        await createCurrentTitle(arr, container, fancy, colour);
        return new Promise((resolve,reject)=> resolve('Finished removing current title'));
    }
}
async function createCurrentTitle(arr, container, fancy, colour) {
    if (arr.elements[curTitleElement].length <= curTitleLength) {
        document.getElementById("type-cursor").style.animationName = "text-cursor-blink";
        return new Promise((resolve,reject)=> resolve('Finished creating current title'));
    }

    await delay(typeSpeed);
    const newLetter = document.createElement("h2");
    let element = document.getElementById(container + (offset + curTitleLength));
    if (element) {offset++;}
    newLetter.id = container + (offset + curTitleLength);
    if (fancy) {newLetter.className = "fancy-text";}
    newLetter.innerHTML = arr.elements[curTitleElement][curTitleLength];
    newLetter.style.color = colour;
    document.getElementById(container).appendChild(newLetter);

    if (curTitleLength < arr.elements[curTitleElement].length-1) {
        curTitleLength ++;
        await createCurrentTitle(arr, container, fancy, colour);
    }

    else {
        addFancyHoverEffect();
        document.getElementById("type-cursor").style.animationName = "text-cursor-blink";
        return new Promise((resolve,reject)=> resolve('Finished creating current title'));
    }
}

async function delay(m) {
    let promise = new Promise(function(resolve, reject) {
        setTimeout(() => {
            resolve("Delay Complete!")
        }, m);
    });

    return promise;
}