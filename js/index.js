$(document).ready(function () {

    GridField.init();
    MarsRover.init();

    $('#fw').on('click', function (e) {
        let new_y = MarsRover.gety() - 1;
        if (MarsRover.gety() == 0)
            new_y = 9;

        if (GridField.checkObstacle(MarsRover.getx(), new_y) == 1) {
            GridField.log('<strong>' + MarsRover.getx() + ', ' + new_y + ': OBSTACLE DETECTED, POSITION RESTORED<strong>');
            MarsRover.init();
        }
        else
            MarsRover.forward();
    });
    $('#bw').on('click', function (e) {
        let new_y = MarsRover.gety() + 1;
        if (MarsRover.gety() == 9)
            new_y = 0;

        if (GridField.checkObstacle(MarsRover.getx(), new_y) == 1) {
            GridField.log('<strong>' + MarsRover.getx() + ', ' + new_y + ': OBSTACLE DETECTED, POSITION RESTORED<strong>');
            MarsRover.init();
        }
        else
            MarsRover.backward();
    });
    $('#lt').on('click', function (e) {
        let new_x = MarsRover.getx() - 1;
        if (MarsRover.getx() == 0)
            new_x = 9;

        if (GridField.checkObstacle(new_x, MarsRover.gety()) == 1) {
            GridField.log('<strong>' + new_x + ', ' +  MarsRover.gety() + ': OBSTACLE DETECTED, POSITION RESTORED<strong>');
            MarsRover.init();
        }
        else
            MarsRover.left();
    });
    $('#rt').on('click', function (e) {
        let new_x = MarsRover.getx() + 1;
        if (MarsRover.getx() == 9)
            new_x = 0;

        if (GridField.checkObstacle(new_x, MarsRover.gety()) == 1) {
            GridField.log('<strong>' + new_x + ', ' +  MarsRover.gety() + ': OBSTACLE DETECTED, POSITION RESTORED<strong>');
            MarsRover.init();
        }
        else
            MarsRover.right();
    });

    $('#rndCmdBtn').on('click', function (e) {
        GridField.generateCommands();
    });
    $('#startBtn').on('click', function (e) {
        GridField.execCommands();
    })
});

$(document).on('coord_changed', function () {
    let log = MarsRover.getx() + ', ' + MarsRover.gety();
    GridField.log('New Coordinates: ' + log);
});
