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
        }else {
            that.turn = 'w';
            player1.isTurn = true;
            player2.isTurn = false;
        }
        // console.log(player1.isChecked);
        //  console.log(player2.isChecked);
        
    }


}




