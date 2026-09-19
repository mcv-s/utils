import { createBubbles } from "https://cdn.jsdelivr.net/npm/@hyperplexed/bubbles@0.8.1/+esm";

// Bubble Styling at https://bubbles.hyperplexed.io/

const manager = createBubbles({
    side: "left",
    vertical: 1
});


const icon = document.createElement("div");
icon.innerHTML = '<i class="ph ph-chat"></i>';
icon.style.fontSize = "24px";
icon.style.color = "var(--bg)";


const content = document.createElement("div");
content.innerHTML = `
    <h2>Bubble Example</h2>
    <p>Bubble Contents</p>
  `;


content.style.padding = "20px";

manager.add({
    id: "Chat",
    label: "Chat Bubble",
    icon: icon,
    content
});

