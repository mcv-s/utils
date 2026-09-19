import { createBubbles } from "https://cdn.jsdelivr.net/npm/@hyperplexed/bubbles@0.8.1/+esm";

// Bubble Styling at https://bubbles.hyperplexed.io/

const manager = createBubbles({
    side: "left",
    vertical: 1
});


/* =========================================================
   ICON
   ========================================================= */

const icon = document.createElement("div");

icon.innerHTML = '<i class="ph ph-chat"></i>';
icon.style.fontSize = "24px";
icon.style.color = "var(--bg)";


/* =========================================================
   CONTENT
   ========================================================= */

const content = document.createElement("div");

content.innerHTML = `
    <form class="contact-form">

    Send me a message

        <input
            name="name"
            type="text"
            placeholder="Name"
            autocomplete="name"
            required
        >

        <input
            name="email"
            type="email"
            placeholder="Email"
            autocomplete="email"
            required
        >

        <textarea
            name="message"
            placeholder="Message"
            rows="4"
            required
        ></textarea>

        <button type="submit">
            <i class="ph ph-paper-plane-tilt"></i>
            <span>Send</span>
        </button>

        <div class="contact-status"></div>

    </form>
`;

content.style.padding = "16px";


/* =========================================================
   STYLING
   ========================================================= */

const style = document.createElement("style");

style.textContent = `
    .contact-form {
        width: 100%;

        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .contact-form input,
    .contact-form textarea {
        width: 100%;
        box-sizing: border-box;

        padding: 9px 11px;

        border: 1px solid color-mix(
            in srgb,
            var(--text) 12%,
            transparent
        );

        border-radius: 8px;

        background: color-mix(
            in srgb,
            var(--bg) 35%,
            transparent
        );

        color: var(--text);

        font: inherit;
        font-size: 13px;

        outline: none;

        transition:
            border-color 0.15s ease,
            background 0.15s ease;
    }

    .contact-form input:focus,
    .contact-form textarea:focus {
        border-color: color-mix(
            in srgb,
            var(--text) 30%,
            transparent
        );

        background: color-mix(
            in srgb,
            var(--bg) 50%,
            transparent
        );
    }

    .contact-form input::placeholder,
    .contact-form textarea::placeholder {
        color: color-mix(
            in srgb,
            var(--text) 40%,
            transparent
        );
    }

    .contact-form textarea {
        resize: vertical;
        min-height: 90px;
    }

    .contact-form button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 7px;

        margin-top: 2px;

        padding: 9px;

        border: 0;
        border-radius: 8px;

        background: var(--text);
        color: var(--bg);

        font: inherit;
        font-size: 13px;
        font-weight: 600;

        cursor: pointer;

        transition:
            opacity 0.15s ease,
            transform 0.15s ease;
    }

    .contact-form button:hover {
        opacity: 0.85;
    }

    .contact-form button:active {
        transform: scale(0.98);
    }

    .contact-form button:disabled {
        opacity: 0.5;
        cursor: default;
    }

    .contact-status {
        display: none;

        text-align: center;

        font-size: 12px;
        line-height: 1.4;
    }
`;

document.head.appendChild(style);


/* =========================================================
   FORM SUBMISSION
   ========================================================= */

const form = content.querySelector(".contact-form");
const button = form.querySelector("button");
const status = form.querySelector(".contact-status");

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    button.disabled = true;
    button.querySelector("span").textContent = "Sending...";

    status.style.display = "none";

    const formData = new FormData(form);

    formData.append(
        "access_key",
        "dd615e11-5090-4b1f-b2eb-451c6f7470a0"
    );

    formData.append(
        "subject",
        "New message from your website"
    );

    try {

        const response = await fetch(
            "https://api.web3forms.com/submit",
            {
                method: "POST",
                body: formData
            }
        );

        const result = await response.json();

        if (result.success) {

            form.reset();

            button.querySelector("span").textContent = "Sent!";

            status.textContent = "Message sent successfully.";
            status.style.display = "block";

            setTimeout(() => {
                button.querySelector("span").textContent = "Send";
                status.style.display = "none";
            }, 3000);

        } else {

            throw new Error(result.message);

        }

    } catch (error) {

        button.querySelector("span").textContent = "Send";

        status.textContent =
            "Something went wrong. Please try again.";

        status.style.display = "block";

    } finally {

        button.disabled = false;

    }

});


/* =========================================================
   BUBBLE
   ========================================================= */

manager.add({
    id: "Contact",
    label: "Email Me",
    icon,
    content
});