function PieceList() {
    var that=this;
    this.pieces = [];

    this.add = function(piece) {
        this.pieces.push(piece);
    }
    this.getById = function(id) {
        for(var i = 0; i<this.pieces.length; i++){
            if(i == id){
                return this.pieces[i];
            }
        }
        return null;
    }

    this.getByName = function(name) {
        for(var i = 0; i<this.pieces.length; i++){
            if(this.pieces[i].name == name){
                return this.pieces[i];
            }
        }
        return null;
    }

    this.getAll = function() {
        return this.pieces;
    }

    this.remove = function(piece) {

        let index = that.pieces.indexOf(piece);
        that.pieces.splice(index,1);
    }

    this.disableAll = function() {
        that.pieces.forEach(piece => {
            piece.getPiece().enabled = false;
        })
    }
}