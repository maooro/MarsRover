var GridField = (function () {

    var obstacles = [];
    var matrix = [];
    var commands = [];

    return {
        init: function () {
            this.generateObstacles();
            this.createGrid();
            this.updateGrid();
        },
        createGrid: function () {

            for (let i = 0; i < 10; i++)
                matrix[i] = new Array(10);

            for (let i = 0; i < 10; i++) {
                let x, y;
                x = obstacles[i]['x'];
                y = obstacles[i]['y'];

                matrix[x][y] = '1';
            }
            this.log('Grid created');
        },
        updateGrid: function () {
            let x = MarsRover.getx();
            let y = MarsRover.gety();

            let body = document.getElementById('grid-container');
            body.innerHTML = '';

            let tbl = document.createElement('table');
            tbl.style.width = '100%';
            tbl.style.height = '50%';
            tbl.setAttribute('border', '1');
            let tbdy = document.createElement('tbody');
            for (let i = 0; i < 10; i++) {
                let tr = document.createElement('tr');
                for (let j = 0; j < 10; j++) {
                    let td = document.createElement('td');
                    td.appendChild(document.createTextNode('\u0020'))
                    // UPDATE ROVER POSITION
                    if ((i == y) && (j == x)) {
                        td.setAttribute('class', 'roverPosition');
                    }
                    //UPDATE OBSTACLES POSITION
                    if (this.checkObstacle(j, i) == 1) {
                        td.setAttribute('class', 'obstaclePosition');
                    }
                    tr.appendChild(td)
                }
                tbdy.appendChild(tr);
            }
            tbl.appendChild(tbdy);
            body.appendChild(tbl)

            $(document).trigger('coord_changed');
        },
        checkObstacle: function (coordx, coordy) {
            for (let i = 0; i < matrix.length; i++) {
                let x = obstacles[i].x, y = obstacles[i].y;
                if ((coordx == x) && (coordy == y)) {
                    return 1;
                    //break;
                }
            }
        },
        generateObstacles: function () {
            for (let i = 0; i < 10; i++) {
                let rndX = parseInt(Math.random() * (10 - 0));
                let rndY = parseInt(Math.random() * (10 - 0));

                let strArray = [];
                let strX = rndX.toString(), strY = rndY.toString();

                if (rndX == rndY == 5) {
                    i--;
                }
                else {
                    obstacles.push({ 'x': rndX, 'y': rndY })
                    strArray.push(strX + strY);
                }
            }

            console.log(obstacles);
            this.log('Obstacles generated');
        },
        generateCommands: function () {
            let msg = '';
            this.emptyCommands();
            for (let i = 0; i < 10; i++) {
                commands.push(parseInt(Math.random() * 4) + 1);
                switch (commands[i]) {
                    case 1: //FORWARD
                        msg += 'N';
                        break;
                    case 2: //BACKWARD
                        msg += 'S';
                        break;
                    case 3: //LEFT
                        msg += 'W';
                        break;
                    case 4: //RIGHT
                        msg += 'E';
                        break;
                }
            }
            this.log('Directions: ' + msg.split('').join(','));
            $('#startBtn').show();
        },
        execCommands: function () {
            var i = 0;
            var interval = setInterval(function () {
                var cmd = commands[i];
                switch (cmd) {
                    case 1: //FORWARD
                        $('#fw').trigger('click');
                        break;
                    case 2: //BACKWARD
                        $('#bw').trigger('click');
                        break;
                    case 3: //LEFT
                        $('#lt').trigger('click');
                        break;
                    case 4: //RIGHT
                        $('#rt').trigger('click');
                        break;
                }
                i++;
                if (i == 10)
                    clearInterval(interval);
            }, 1000);
            $('#startBtn').hide();
        },
        emptyCommands: function () {
            commands = [];
        },
        log: function (text) {
            $('#log-container').prepend('<p>' + text + '</p>');
        }
    }
})();