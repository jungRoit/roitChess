function PlayerList() {
    var that = this;
    this.players = [];

    this.getAll = function() {
        return this.players;
    }

    this.add = function(player){
        that.players.push(player);
    }
    this.getByTeam = function(team) {
        for(let i =0 ; i<that.players.length; i++){
            if(that.players[i].team == team) {
                return that.players[i];
            }
        }
        return null;
    }

    this.disableAllIsChecked = function() {
       for(let i=0;i<that.players.length;i++) {
           that.players[i].isChecked = false;
       }
    }
}