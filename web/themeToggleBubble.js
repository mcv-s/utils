import { createBubbles } from "https://cdn.jsdelivr.net/npm/@hyperplexed/bubbles@0.8.1/+esm";


/* =========================================================
   THEME
   ========================================================= */

const THEME_KEY = "markdown-editor-theme";

const savedTheme =
    localStorage.getItem(THEME_KEY) || "system";


if (savedTheme !== "system") {
    document.documentElement.dataset.theme = savedTheme;
}


/* =========================================================
   ICON
   ========================================================= */

const icon = document.createElement("div");

icon.innerHTML = `
    <i
        class="ph ph-monitor theme-bubble-icon"
        aria-hidden="true"
    ></i>
`;

const bubbleIcon = icon.querySelector(".theme-bubble-icon");


function updateThemeIcon() {

    const theme = getTheme();

    bubbleIcon.className = "theme-bubble-icon";

    if (theme === "light") {

        bubbleIcon.classList.add("ph", "ph-sun");

    } else if (theme === "dark") {

        bubbleIcon.classList.add("ph", "ph-moon");

    } else {

        bubbleIcon.classList.add("ph", "ph-monitor");

    }

}


/* =========================================================
   THEME MENU
   ========================================================= */

const content = document.createElement("div");

content.className = "theme-menu";

content.innerHTML = `
    <div class="theme-menu-title">
        Theme
    </div>

    <div class="theme-selector">

        <button
            class="theme-option"
            data-theme-option="system"
            aria-label="System"
        >
            <svg
                viewBox="0 0 256 256"
                aria-hidden="true"
            >
                <path d="M208,40H48A24,24,0,0,0,24,64V176a24,24,0,0,0,24,24H208a24,24,0,0,0,24-24V64A24,24,0,0,0,208,40Zm8,136a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V64a8,8,0,0,1,8-8H208a8,8,0,0,1,8,8Zm-48,48a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,224Z"/>
            </svg>

            <span>System</span>
        </button>


        <button
            class="theme-option"
            data-theme-option="light"
            aria-label="Light"
        >
            <svg
                viewBox="0 0 256 256"
                aria-hidden="true"
            >
                <path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0-16h24A8,8,0,0,0,240,120Z"/>
            </svg>

            <span>Light</span>
        </button>


        <button
            class="theme-option"
            data-theme-option="dark"
            aria-label="Dark"
        >
            <svg
                viewBox="0 0 256 256"
                aria-hidden="true"
            >
                <path d="M233.54,142.23a8,8,0,0,0-8-2,88.08,88.08,0,0,1-109.8-109.8,8,8,0,0,0-10-10,104.84,104.84,0,0,0-52.91,37A104,104,0,0,0,136,224a103.09,103.09,0,0,0,62.52-20.88,104.84,104.84,0,0,0,37-52.91A8,8,0,0,0,233.54,142.23ZM188.9,190.34A88,88,0,0,1,65.66,67.11a89,89,0,0,1,31.4-26A106,106,0,0,0,96,56,104.11,104.11,0,0,0,200,160a106,106,0,0,0,14.92-1.06A89,89,0,0,1,188.9,190.34Z"/>
            </svg>

            <span>Dark</span>
        </button>

    </div>
`;


/* =========================================================
   STYLES
   ========================================================= */

const themeStyle = document.createElement("style");

themeStyle.textContent = `

    /* Bubble icon */

.theme-bubble-icon {
    font-size: 24px;
    color: var(--bg);
}


    /* Menu */

    .theme-menu {
        padding: 16px;

        color: var(--text);

        font-family: inherit;
    }


    .theme-menu-title {
        font-size: 15px;
        font-weight: 600;

        margin-bottom: 12px;
    }


    /* Selector */

    .theme-selector {
        display: flex;
        gap: 6px;

        padding: 4px;

        border-radius: 12px;

        background: var(--surface);
        border: 1px solid var(--border);
    }


    /* Options */

    .theme-option {
        position: relative;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        gap: 5px;

        width: 33%;
        height: 58px;

        padding: 6px;

        border: 0;
        border-radius: 9px;

        background: transparent;
        color: var(--text);

        cursor: pointer;

        font: inherit;
        font-size: 11px;

        transition:
            background 0.15s ease,
            color 0.15s ease;
    }


    .theme-option:hover {
        background: var(--button-hover);
    }


    .theme-option svg {
        width: 20px;
        height: 20px;

        fill: currentColor;
    }


    /* Selected option */

    .theme-option.active {
        background: var(--button-hover);
        color: var(--text);
    }

`;

document.head.appendChild(themeStyle);


/* =========================================================
   BUBBLE
   ========================================================= */

const manager = createBubbles({
    side: "right",
    vertical: 1,

    /* Let the initial bubble styling follow the current
       saved theme / system preference. */

    theme:
        savedTheme === "system"
            ? "auto"
            : savedTheme
});


manager.add({
    id: "Theme",
    label: "Theme",
    icon,
    content
});


/* =========================================================
   THEME
   ========================================================= */

function getTheme() {

    return localStorage.getItem(THEME_KEY) || "system";

}


function setTheme(theme) {

    /* -----------------------------------------------------
       Page theme
       ----------------------------------------------------- */

    if (theme === "system") {

        document.documentElement
            .removeAttribute("data-theme");

    } else {

        document.documentElement.dataset.theme =
            theme;

    }


    localStorage.setItem(
        THEME_KEY,
        theme
    );


    /* -----------------------------------------------------
       Hyperplexed bubble theme
       -----------------------------------------------------

       "auto" makes Bubbles follow the OS preference.

       "light" / "dark" apply the library's actual
       complete theme presets.

       configure() repaints the EXISTING bubble in place.
       ----------------------------------------------------- */

    manager.configure({

        theme:
            theme === "system"
                ? "auto"
                : theme

    });


    updateThemeSelector();
    updateThemeIcon();

}


/* =========================================================
   SELECT THEME
   ========================================================= */

const options =
    content.querySelectorAll(".theme-option");


function updateThemeSelector() {

    const current = getTheme();

    options.forEach(option => {

        option.classList.toggle(
            "active",
            option.dataset.themeOption === current
        );

    });

}


options.forEach(option => {

    option.addEventListener("click", () => {

        setTheme(
            option.dataset.themeOption
        );

    });

});


updateThemeSelector();
updateThemeIcon();