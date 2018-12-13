function Game() {
    var that = this;

    this.turn = 'w';
    this.score = 0;


    this.switchTurn = function() {
        if(that.turn == 'w'){
            that.turn = 'b';
        }else {
            that.turn = 'w';
        }
    }
}




