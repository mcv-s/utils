/* =========================================================
   Liquid Glass
   Automatically turns [liquidGlass] elements into glass.
   
   Usage:
       <script src="liquidGlass.js"></script>

       <div liquidGlass>
           Your content here
       </div>

   Or:
       <div liquidGlass class="my-element">
           ...
       </div>

   Configuration through CSS variables:
       --liquid-glass-bg
       --liquid-glass-highlight
       --liquid-glass-blur
       --liquid-glass-shadow
       --liquid-glass-radius
       --liquid-glass-distortion
   ========================================================= */




/* Mostly for testing atm */


(() => {

    "use strict";


    /* =====================================================
       DEFAULTS
       ===================================================== */

    const DEFAULTS = {
        bg: "rgba(255, 255, 255, 0.25)",
        highlight: "rgba(255, 255, 255, 0.75)",
        blur: "12px",
        shadow:
            "0 6px 6px rgba(0, 0, 0, 0.2), " +
            "0 0 20px rgba(0, 0, 0, 0.1)",
        radius: "2rem",
        distortion: "70"
    };


    /* =====================================================
       SVG FILTER
       ===================================================== */

    function createFilter() {

        if (document.getElementById("liquid-glass-filter")) {
            return;
        }


        const svg =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "svg"
            );


        svg.id = "liquid-glass-svg";

        svg.setAttribute(
            "aria-hidden",
            "true"
        );

        svg.style.position = "absolute";
        svg.style.width = "0";
        svg.style.height = "0";
        svg.style.pointerEvents = "none";


        const filter =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "filter"
            );


        filter.id = "liquid-glass-filter";

        filter.setAttribute(
            "x",
            "0%"
        );

        filter.setAttribute(
            "y",
            "0%"
        );

        filter.setAttribute(
            "width",
            "100%"
        );

        filter.setAttribute(
            "height",
            "100%"
        );


        const turbulence =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "feTurbulence"
            );


        turbulence.setAttribute(
            "type",
            "fractalNoise"
        );

        turbulence.setAttribute(
            "baseFrequency",
            "0.008 0.008"
        );

        turbulence.setAttribute(
            "numOctaves",
            "2"
        );

        turbulence.setAttribute(
            "seed",
            "92"
        );

        turbulence.setAttribute(
            "result",
            "noise"
        );


        const blur =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "feGaussianBlur"
            );


        blur.setAttribute(
            "in",
            "noise"
        );

        blur.setAttribute(
            "stdDeviation",
            "2"
        );

        blur.setAttribute(
            "result",
            "blurred"
        );


        const displacement =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "feDisplacementMap"
            );


        displacement.setAttribute(
            "in",
            "SourceGraphic"
        );

        displacement.setAttribute(
            "in2",
            "blurred"
        );

        displacement.setAttribute(
            "scale",
            DEFAULTS.distortion
        );

        displacement.setAttribute(
            "xChannelSelector",
            "R"
        );

        displacement.setAttribute(
            "yChannelSelector",
            "G"
        );


        filter.appendChild(turbulence);
        filter.appendChild(blur);
        filter.appendChild(displacement);

        svg.appendChild(filter);

        document.body.appendChild(svg);
    }


    /* =====================================================
       CSS
       ===================================================== */

    function createStyles() {

        if (document.getElementById("liquid-glass-styles")) {
            return;
        }


        const style =
            document.createElement("style");


        style.id =
            "liquid-glass-styles";


        style.textContent = `

            [liquidGlass] {

                --liquid-glass-bg:
                    ${DEFAULTS.bg};

                --liquid-glass-highlight:
                    ${DEFAULTS.highlight};

                --liquid-glass-blur:
                    ${DEFAULTS.blur};

                --liquid-glass-shadow:
                    ${DEFAULTS.shadow};

                --liquid-glass-radius:
                    ${DEFAULTS.radius};

                position: relative;

                isolation: isolate;

                overflow: hidden;

                background: transparent;

                border-radius:
                    var(--liquid-glass-radius);

                box-shadow:
                    var(--liquid-glass-shadow);

                backdrop-filter:
                    blur(var(--liquid-glass-blur));

                -webkit-backdrop-filter:
                    blur(var(--liquid-glass-blur));

                transition:
                    transform 0.4s
                    cubic-bezier(
                        0.175,
                        0.885,
                        0.32,
                        2.2
                    ),

                    box-shadow 0.4s ease;

            }


            [liquidGlass]::before {

                content: "";

                position: absolute;

                inset: 0;

                z-index: -2;

                background:
                    var(--liquid-glass-bg);

                pointer-events: none;

            }


            [liquidGlass]::after {

                content: "";

                position: absolute;

                inset: 0;

                z-index: -1;

                border-radius: inherit;

                box-shadow:
                    inset 1px 1px 0
                        var(--liquid-glass-highlight),

                    inset 0 0 5px
                        var(--liquid-glass-highlight);

                pointer-events: none;

            }


            [liquidGlass] > * {

                position: relative;

                z-index: 1;

            }


            [liquidGlass][liquidGlassHover]:hover {

                box-shadow:
                    var(--liquid-glass-shadow),
                    0 0 25px
                    rgba(255, 255, 255, 0.12);

            }


            @supports (
                backdrop-filter: blur(1px)
            ) {

                [liquidGlass] {
                    background: transparent;
                }

            }


            @supports not (
                backdrop-filter: blur(1px)
            ) {

                [liquidGlass] {
                    background:
                        var(--liquid-glass-bg);
                }

            }

        `;


        document.head.appendChild(style);
    }


    /* =====================================================
       ENHANCE ELEMENT
       ===================================================== */

    function enhance(element) {

        if (
            element.hasAttribute(
                "data-liquid-glass"
            )
        ) {
            return;
        }


        element.setAttribute(
            "data-liquid-glass",
            ""
        );


        /*
         * Mark the element as ready.
         */

        element.classList.add(
            "liquid-glass"
        );


        /*
         * Optional distortion.
         *
         * The normal backdrop-filter is kept as
         * the primary effect because it is much more
         * reliable across browsers.
         *
         * Add:
         *
         *     liquidGlassDistort
         *
         * to enable the SVG distortion layer.
         */

        if (
            element.hasAttribute(
                "liquidGlassDistort"
            )
        ) {

            element.style.backdropFilter =
                "blur(var(--liquid-glass-blur)) " +
                "url(#liquid-glass-filter)";

            element.style.webkitBackdropFilter =
                "blur(var(--liquid-glass-blur)) " +
                "url(#liquid-glass-filter)";
        }
    }


    /* =====================================================
       INITIALIZE
       ===================================================== */

    function initialize() {

        createStyles();

        createFilter();


        document
            .querySelectorAll(
                "[liquidGlass]"
            )
            .forEach(enhance);


        /*
         * Watch for elements added later.
         */

        const observer =
            new MutationObserver(
                mutations => {

                    for (
                        const mutation
                        of mutations
                    ) {

                        for (
                            const node
                            of mutation.addedNodes
                        ) {

                            if (
                                node.nodeType !== 1
                            ) {
                                continue;
                            }


                            if (
                                node.matches &&
                                node.matches(
                                    "[liquidGlass]"
                                )
                            ) {
                                enhance(node);
                            }


                            if (
                                node.querySelectorAll
                            ) {

                                node
                                    .querySelectorAll(
                                        "[liquidGlass]"
                                    )
                                    .forEach(enhance);

                            }

                        }

                    }

                }
            );


        observer.observe(
            document.documentElement,
            {
                childList: true,
                subtree: true
            }
        );

    }


    /* =====================================================
       START
       ===================================================== */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initialize,
            {
                once: true
            }
        );

    } else {

        initialize();

    }

})();