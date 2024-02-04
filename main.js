const titleHeaderStages = {
    "elements":
    [
        "Hello",
        "Hello, I'm Luke Kuligowicz",
        "Hello, I'm a "
    ],
    "repeat": false,
    "func_after_rep": "transition_header_title()",
    "func_file": "script.js",
    "cursor_colour": "rgb(228, 225, 221)"
};

async function onLoad() {
    const newCursor = document.createElement("div");
    newCursor.id = "type-cursor";
    document.getElementById("main-header-container").appendChild(newCursor);
    newCursor.style.backgroundColor = titleHeaderStages.cursor_colour;
    await createCurrentTitle(titleHeaderStages, "header-title", false, titleHeaderStages.cursor_colour);
    initialteUpdatingTitle(titleHeaderStages, "header-title", false, titleHeaderStages.cursor_colour);
}