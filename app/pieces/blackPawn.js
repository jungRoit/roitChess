function BlackPawn(name,file,rank) {
    var that = this;
    this.name = name
    this.img = 'img/bp.png';
    this.value - -1;
    this.validMovesList = [];
    this.currentPos;
    this.file = file;
    this.rank = rank;
    this.enabled = false;
    this.captured = false;
    this.moved = false;

    var pic = document.createElement('img');

    this.draw = function(){
       let tile = tiles.getTile(this.file,this.rank);
       tile.pieceName = that.name;
       that.currentPos = tile;
       pic.src = this.img;
       pic.style.zIndex = '10';

       let validTile = tiles.getTileById(that.currentPos.id +8);
       let validTile2 = tiles.getTileById(that.currentPos.id +16);


       that.validMovesList.push(validTile);
       that.validMovesList.push(validTile2);

       tile.getElement().appendChild(pic);
       tile.hasPiece = true;
       
       
    }

    this.CheckValidMoves = function() {
        that.enabled = true;
        console.log(that.validMovesList);
        if(that.validMovesList != null){
            that.validMovesList.forEach((tile) => {
                tile.toggleEnabled();
                tile.checkEnabled();
               tile.getElement().addEventListener('click',function() {
                   that.move(tile);
                   tiles.disableAll();
                  
               });
            });
        }
        

    }

    this.move = function(tile) {
        // if(that.enabled) {
            let initTile = tiles.getTile(this.file,this.rank);
            initTile.hasPiece = false;
            tile.getElement().appendChild(that.getElement());
            tile.hasPiece = true;
            tile.enabled = true;
            tile.pieceName = that.name;
            that.file = tile.getFile();
            that.rank = tile.getRank();
            that.currentPos = tile;
            that.setValidMoves();

            that.moved = true;
            that.enabled = false;
        // }
        

        
       
    }



    this.setValidMoves = function() {
       that. validMovesList = [];
       if(that.currentPos.file != 'H'){
        var next = tiles.getTileById(that.currentPos.id +8);
       that.validMovesList.push(next);
       }
    
    }


    this.getElement = function() {
        return pic;
    }


}