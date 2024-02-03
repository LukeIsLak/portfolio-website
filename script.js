const titleNames = {
    "elements":
        [
            "Developer",
            "Leader",
            "Student",
            "Educator",
            "Hobbyist",
        ]
};

const titleHeaderStages = {
    "elements":
    [
        "Hello",
        "Hello, I'm Luke Kuligowicz",
        "Hello, I'm a"
    ],
    "repeat": false
};

let changeBetweenTitle = 5000;
const typeSpeed = 68;
var curTitleElement = 0;
var curTitleLength = 0;

async function onLoad() {
    await createCurrentTitle(titleHeaderStages, "header-title", false);
    initialteUpdatingTitle(titleHeaderStages, "header-title", false);
}

async function initialteUpdatingTitle(arr, container, fancy) {
    await delay(changeBetweenTitle);
    if (fancy) {removeTitlePosition(container)};
    await delay(350);
    curTitleElement = (curTitleElement + 1 >= arr.elements.length)? 0 : curTitleElement + 1;
    if (curTitleElement || arr.repeat) {
        document.getElementById("type-cursor").style.animationName = "none";
        await removeCurrentTitle(arr, container, fancy);
        initialteUpdatingTitle(arr, container, fancy);
    }
    else {
        return new Promise((resolve, reject) => {
            resolve("No longer updating current title");
        })
    }
}

async function removeCurrentTitle(arr, container, fancy) {
    await delay(typeSpeed);
    let prevElement = (curTitleElement - 1 < 0) ? arr.elements.length -1 : curTitleElement - 1;

    if (curTitleLength >= 0 && (arr.elements[prevElement].slice(0, curTitleLength+1) != arr.elements[curTitleElement].slice(0, curTitleLength+1))) {
        let element = document.getElementById(container + curTitleLength);
        if (element == null) {
            await delay(500);
            await createCurrentTitle(arr, container, fancy);
            return new Promise((resolve,reject)=> resolve('Finished removing current title'));
    
        }
        element.remove();
        curTitleLength -= 1;
        removeCurrentTitle(arr, container, fancy);
    }
    else {
        curTitleLength += 1;
        await delay(500);
        await createCurrentTitle(arr, container, fancy);
        return new Promise((resolve,reject)=> resolve('Finished removing current title'));
    }
}
async function createCurrentTitle(arr, container, fancy) {
    if (arr.elements[curTitleElement].length <= curTitleLength) {
        document.getElementById("type-cursor").style.animationName = "text-cursor-blink";
        if (fancy) {applyTitlePosition(container);}
        return new Promise((resolve,reject)=> resolve('Finished creating current title'));
    }

    await delay(typeSpeed);
    let element = document.getElementById(container + curTitleLength)
    if (element) {element.remove();}
    const newLetter = document.createElement("h2");
    newLetter.id = container + curTitleLength;
    newLetter.className = "fancy-text";
    newLetter.innerHTML = arr.elements[curTitleElement][curTitleLength];
    document.getElementById(container).appendChild(newLetter);

    if (curTitleLength < arr.elements[curTitleElement].length-1) {
        curTitleLength ++;
        createCurrentTitle(arr, container, fancy);
    }

    else {
        document.getElementById("type-cursor").style.animationName = "text-cursor-blink";
        if (fancy) {applyTitlePosition(container);}
        return new Promise((resolve,reject)=> resolve('Finished creating current title'));
    }
}

function applyTitlePosition(container) {
    const element = document.getElementById(container);
    const l = element.children.length;
    [].slice.call(element.children).forEach((child, index) => {
        let x = Math.cos(index-l);
        let y = Math.sin(index-l);
        child.style.transform = "translate("+x*10+"%," + y*100 + "%) rotate(" + (x+y)*10 +"deg)";
        child.className = "fancy-text";
    });
}

function removeTitlePosition(container) {
    const element = document.getElementById(container);
    [].slice.call(element.children).forEach((child, index) => {
        child.style.transform = "translate(0%,0%) rotate(0deg)";

    });
}

async function delay(m) {
    let promise = new Promise(function(resolve, reject) {
        setTimeout(() => {
            resolve("Delay Complete!")
        }, m);
    });

    return promise;
}