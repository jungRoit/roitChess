function GameUI(userOptions) {
    var that = this;

    var container = document.createElement('div');
    var moveDiv = document.createElement('div');
    var header = document.createElement('div');
    var whiteDiv = document.createElement('div');
    var whiteTimer = document.createElement('div');
    var blackTimer = document.createElement('div');
    var score = document.createElement('div');
    var blackDiv = document.createElement('div');
    var whiteInterval, blackInterval;

    var i = 1;

    this.createContainer = function () {
        container.style.width = '800px';
        container.style.height = '600px';
        container.style.margin = 'auto';
        container.style.cssFloat = 'right';
        container.style.border = '3px solid black';

        container.id = 'gameUI';

        document.body.appendChild(container);

        that.createHeader();
        that.createMoveDiv();

    }

    this.createHeader = function () {

        header.style.height = '120px';
        header.style.marginTop = '20px';
        header.style.padding = '20px';


        whiteDiv.style.width = '40%';
        whiteDiv.style.cssFloat = 'left';
        whiteDiv.style.fontSize = '40px';
        whiteDiv.textContent = userOptions.white;
        whiteDiv.style.border = '1px solid black';
        whiteDiv.style.padding = '5px';
        whiteDiv.style.textAlign = 'center';

        blackDiv.style.width = '40%';
        blackDiv.style.cssFloat = 'right';
        blackDiv.style.fontSize = '40px';
        blackDiv.style.background = 'black';
        blackDiv.style.color = 'white';
        blackDiv.textContent = userOptions.black;
        blackDiv.style.border = '1px solid black';
        blackDiv.style.padding = '5px';
        blackDiv.style.textAlign = 'center';

        score.style.width = '10%';
        score.style.cssFloat = 'left';
        score.style.fontSize = '40px';
        score.style.border = '1px solid black';
        score.style.textAlign = 'center';
        score.textContent = 0;
        score.style.marginLeft = '30px';

        header.appendChild(whiteDiv);
        header.appendChild(score);
        header.appendChild(blackDiv);

        whiteTimer.style.width = '100px';
        whiteTimer.style.fontSize = '50px';
        whiteTimer.cssFloat = 'left';
        whiteTimer.textContent = parseInt(userOptions.time) + ':00';
        whiteTimer.style.display = 'inline-block';

        blackTimer.style.width = '100px';
        blackTimer.style.fontSize = '50px';
        blackTimer.cssFloat = 'right';
        blackTimer.textContent = parseInt(userOptions.time) + ':00';
        blackTimer.style.display = 'inline-block';

        var timerDIv = document.createElement('div');
        timerDIv.style.display = 'block';
        timerDIv.style.width = '100%';
        whiteDiv.appendChild(whiteTimer);
        blackDiv.appendChild(blackTimer);

        header.appendChild(timerDIv);
        container.appendChild(header);
    }

    this.createMoveDiv = function () {

        moveDiv.style.height = '300px';
        moveDiv.style.border = '1px solid black';
        moveDiv.style.overflow = 'scroll';
        moveDiv.scrollTop = moveDiv.scrollHeight;

        var heading = document.createElement('h2');
        heading.textContent = 'Moves';

        var tableHead = document.createElement('tr');
        var sn = document.createElement('th');
        sn.textContent = 'SN.';
        sn.style.padding = '20px 20px 0 20px';
        var from = document.createElement('th');
        from.textContent = 'From';
        from.style.padding = '20px 20px 0 20px';

        var to = document.createElement('th');
        to.textContent = 'To';
        to.style.padding = '20px 20px 0 20px';

        var turn = document.createElement('th');
        turn.textContent = 'Turn';
        turn.style.padding = '20px 20px 0 20px';

        var piece = document.createElement('th');
        piece.textContent = 'Piece';
        piece.style.padding = '20px 20px 0 20px';

        tableHead.appendChild(sn);
        tableHead.appendChild(from);
        tableHead.appendChild(to);
        tableHead.appendChild(turn);
        tableHead.appendChild(piece);

        moveDiv.appendChild(heading);
        moveDiv.appendChild(tableHead);

        //   that.updateMove();


        container.appendChild(moveDiv);

    }

    this.updateMove = function (move, team) {


        // moveList.forEach(move => {
        var tr = document.createElement('tr');
        var sn = document.createElement('td');
        sn.textContent = i;
        sn.style.padding = '20px 20px 0 20px';
        var from = document.createElement('td');
        from.textContent = move.from.file + '-' + move.from.rank;
        from.style.padding = '20px 20px 0 20px';

        var to = document.createElement('td');
        to.textContent = move.to.file + '-' + move.to.rank;
        to.style.padding = '20px 20px 0 20px';

        var turn = document.createElement('td');
        turn.textContent = team;
        turn.style.padding = '20px 20px 0 20px';

        var piece = document.createElement('td');
        piece.textContent = move.piece.type;
        piece.style.padding = '20px 20px 0 20px';

        tr.appendChild(sn);
        tr.appendChild(from);
        tr.appendChild(to);
        tr.appendChild(turn);
        tr.appendChild(piece);

        i++;
        // moveDiv.scrollTop = moveDiv.scrollHeight;
        moveDiv.scrollIntoView();
        moveDiv.appendChild(tr);

    }

    this.revertMove = function () {
        moveDiv.removeChild(moveDiv.childNodes[moveDiv.childNodes.length - 2]);
        moveDiv.removeChild(moveDiv.childNodes[moveDiv.childNodes.length - 1]);
        i = parseInt(moveDiv.childNodes[moveDiv.childNodes.length - 1].childNodes[0].textContent) + 1;

    }

    this.updateScore = function (s) {
        score.textContent = s;

    }
    var minutesWhite = null;
    var minutesBlack = null;
    var secondsWhite = 00;
    var secondsBlack = 00;
    this.timer = function (team) {
        
        if(!minutesWhite){
            minutesWhite = parseInt(userOptions.time);
        }

        if(!minutesBlack) {
            minutesBlack = parseInt(userOptions.time);
        }
        
        // if (team == 'w') {
            whiteInterval = setInterval(function () {
                if(team == 'w'){
                   
                    whiteTimer.textContent = minutesWhite + ':' + secondsWhite;
                    if (secondsWhite == 0) {
                        secondsWhite = 59;
                        minutesWhite--;
                    }
                    secondsWhite--;
                   
                }else {
                    
                    blackTimer.textContent = minutesBlack + ':' + secondsBlack;
                    if (secondsBlack == 0) {
                        secondsBlack = 59;
                        minutesBlack--;
                        
                    }
                    secondsBlack--;
                   
                }
                

              
                // var promise = new Promise(function(res,err){
                //     if(clearInterval(whiteInterval)){
                       
                //         var current = {
                //             min: minutes,
                //             sec: seconds
                //         }
                //         res(current);
                //     }else {
                //         var error = 'hello';
                //         err(error);
                //     }
                // })
               
            }, 1000);
  
    }

    this.pauseTimer = function (team) {

            clearInterval(whiteInterval);

            // var result = function() {
            //     whiteInterval.then(currrent =>{
            //         console.log(currrent);
            //     });
            // }
            
 // minutes = parseInt(currrent.min);
                    // seconds = currrent.sec;
            
            
        
        
    }



}