
// Game object specific functions

const allGameObjects = document.querySelectorAll("[gameObject]");

allGameObjects.forEach(object => {

    object.move = function (x, y) {
        this.style.left = x + "px";
        this.style.top = y + "px";
    };

    object.pos = function () {
        p = [parseFloat(this.style.left) || 0, parseFloat(this.style.top) || 0]
        return p;
    };


    // [DOCS] X and Y position returning




    Object.defineProperty(object, "x", {
        get() {
            return parseFloat(this.style.left) || 0;
        },

        set(value) {
            this.style.left = value + "px";
        }
    });


    Object.defineProperty(object, "y", {
        get() {
            return parseFloat(this.style.top) || 0;
        },

        set(value) {
            this.style.top = value + "px";
        }
    });



});



