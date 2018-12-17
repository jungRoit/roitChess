function Player(name,team) {
    var that = this;
    this.name = name;
    this.team = team;
    this.isChecked = false;
    this.isTurn = false;
    this.castleKingSide = true;
    this.castleQueenSide = true;
    this.canCastleKingSide = false;
    this.canCastleQueenSide = false;
    this.enPassant = [];


    this.checkKingSideCastle = function(pieceList) {
     let king = pieceList.getByTypeAndTeam('king',that.team);
    //  console.log(pieceList);
    }


}