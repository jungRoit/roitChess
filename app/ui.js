function UI() {
    var that = this;

    this.userOption ={};
    


    var welcomeUI = document.createElement('div');
    var chessBoard = document.getElementById('chessboard');
    gameUI = new GameUI(that.userOption);
    // var gameUI = document.getElementById('gameUI');

    this.createWelcomUI = function() {
        welcomeUI.style.width = '500px';
        welcomeUI.style.height = '600px';
        welcomeUI.style.margin = 'auto';
        welcomeUI.style.textAlign = 'center';
        welcomeUI.style.border = '3px solid black';

        document.body.appendChild(welcomeUI);

        that.createLogo();
        that.createForm();
    }

    this.createLogo = function() {
        var logoDiv = document.createElement('div');
        logoDiv.style.marginTop = '20px';
        var logo = document.createElement('img');
        logo.src = 'img/logo.png';
        logo.style.height = '200px';
        logoDiv.appendChild(logo);
        welcomeUI.appendChild(logoDiv);
    }

    this.createForm = function() {
        var formDiv = document.createElement('div');
        var player1Label = document.createElement('h3');
        player1Label.textContent = 'Player Names';

        var whiteInput = document.createElement('input');
        whiteInput.style.padding = '15px';
        whiteInput.style.fontSize = '25px';
        whiteInput.style.textAlign = 'center';
        whiteInput.value = 'White Player';

        var blackInput = document.createElement('input');
        blackInput.style.background = 'black';
        blackInput.style.color = 'white';
        blackInput.style.padding = '15px';
        blackInput.style.fontSize = '25px';
        blackInput.style.textAlign = 'center';
        blackInput.value = 'Black Player';

        var time = document.createElement('select');
        var mins5 = document.createElement('option');
        var mins10 = document.createElement('option');

        var timeDiv = document.createElement('div');
        timeDiv.textContent = 'Game Time:';
        timeDiv.style.fontSize = '20px';
        timeDiv.style.fontWeight = 'bold';
        timeDiv.style.marginTop = '20px';


        
        time.style.fontSize = '20px';
        time.style.padding = '10px';
        time.style.marginLeft = '10px';


        mins5.textContent = '5 mins';
        mins10.textContent = '10 mins';

        var play = document.createElement('button');
        // play.style.width = '150px';
        // play.style.height = '100px';
        play.style.padding = '15px';
        play.style.background = '#2ECC40'
        play.style.fontSize = '30px'
        play.style.color = 'white';
        play.style.marginTop = '20px';
        play.style.cursor = 'pointer';
        play.textContent = 'PLAY';
        play.style.border = '2px solid black';

        play.addEventListener('click',function(){

           that.userOption.white = whiteInput.value;
           that.userOption.black = blackInput.value;
           that.userOption.time = time.value;
            
            welcomeUI.style.display = 'none';
            chessBoard.style.display = 'inline-block';
            // gameUI.style.display = 'inline-block';
             
            gameUI.createContainer();
           
        })


        time.appendChild(mins5);
        time.appendChild(mins10);
        // timeDiv.appendChild(timeHead);
        timeDiv.appendChild(time);


        formDiv.appendChild(player1Label);
        formDiv.appendChild(whiteInput);
        formDiv.appendChild(blackInput);
        formDiv.appendChild(timeDiv);
        formDiv.appendChild(play);

        welcomeUI.appendChild(formDiv);
    }

    this.getUserOption = function() {
        return that.userOption;
    }

    this.updateGameUI = function(move,team) {
      
        gameUI.updateMove(move,team);
    }

    this.deleteMove = function() {
        gameUI.revertMove();
    }



}