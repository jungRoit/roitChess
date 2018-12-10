function PieceList() {
    this.pieces = [];

    this.add = function(piece) {
        this.pieces.push(piece);
    }

    this.getByName = function(name) {
        for(var i = 0; i<this.pieces.length; i++){
            if(this.pieces[i].name == name){
                return this.pieces[i];
            }
        }
    }

    this.getAll = function() {
        return this.pieces;
    }
}