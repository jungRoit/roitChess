function Game(player1,player2) {
    var that = this;
    this.playerWhite = player1;
    this.playerBlack = player2;
    this.turn = 'w';
    this.score = 0;


    this.switchTurn = function() {
        if(that.turn == 'w'){
            that.turn = 'b';
            player1.isTurn = false;
            player2.isTurn = true;
            ui.pauseTime('b');
            ui.startTime('b');
        }else {
            that.turn = 'w';
            player1.isTurn = true;
            player2.isTurn = false;
            ui.pauseTime('w');
            ui.startTime('w');
        }

        
 
        
    }


}




