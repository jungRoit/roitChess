function Player(name,team) {
    this.name = name;
    this.team = team;
    this.isChecked = false;
    this.isTurn = false;
    this.castleKingSide = true;
    this.castleQueenSide = true;
    this.enPassant = [];
}