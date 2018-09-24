var MarsRover = (function () {

    var x, y;

    function setX(new_val) {
        x = new_val;
    };
    function setY(new_val) {
        y = new_val;
    };
    function getX() {
        return x;
    };
    function getY() {
        return y;
    };

    return {
        getx: getX,
        gety: getY,

        init: function () {
            x = 5;
            y = 5;
            GridField.emptyCommands();
            GridField.updateGrid();
        },
        forward: function () {
            if (getY() == 0)
                setY(9);
            else
                setY(getY() - 1);
            GridField.updateGrid();
        },
        backward: function () {
            if (getY() == 9)
                setY(0);
            else
                setY(getY() + 1);
            GridField.updateGrid();
        },
        left: function () {
            if (getX() == 0)
                setX(9);
            else
                setX(getX() - 1);
            GridField.updateGrid();
        },
        right: function () {
            if (getX() == 9)
                setX(0);
            else
                setX(getX() + 1);
            GridField.updateGrid();
        },
    };
})();
