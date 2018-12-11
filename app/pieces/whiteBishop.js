function WhiteBishop(name, file, rank) {
    var that = this;
    this.name = name
    this.img = 'img/wB.png';
    this.value - 5;
    this.validMovesList = [];
    this.currentPos;
    this.file = file;
    this.rank = rank;
    this.enabled = false;
    this.captured = false;
    this.moved = false;

    var posTop = -8;
    var posBottom = 8;
    var posLeft = -1;
    var posRight = 1;


    var pic = document.createElement('img');

    this.draw = function () {
        let tile = tiles.getTile(this.file, this.rank);
        tile.pieceName = that.name;
        that.currentPos = tile;
        pic.src = this.img;
        pic.style.zIndex = '10';


        tile.getElement().appendChild(pic);
        tile.hasPiece = true;
    }

    this.setValidMoves = function () {
        that.validMovesList = [];

        //top right
        for (let i = 1; i <= Ranks.length - that.currentPos.rank; i++) {
            let validTile = tiles.getTileById(that.currentPos.id + (posTop * i) + (posRight * i));

            if (validTile == null) {
                break;
            } else {
                if (that.currentPos.color == validTile.color) {
                    that.validMovesList.push(validTile);
                }
            }
        }

        //top left 
        for (let i = 1; i <= Ranks.length - that.currentPos.rank; i++) {
            let validTile = tiles.getTileById(that.currentPos.id + (posTop * i) + (posLeft * i));
            if (validTile == null) {
                break;
            } else {
                if (that.currentPos.color == validTile.color) {
                    that.validMovesList.push(validTile);
                }
            }
        }

        // bottom right
        for (let i = 1; i <= that.currentPos.rank; i++) {
            let validTile = tiles.getTileById(that.currentPos.id + (posBottom * i) + (posRight * i));
            if (validTile == null) {
                break;
            } else {
                if (that.currentPos.color == validTile.color) {
                    that.validMovesList.push(validTile);
                }
            }
        }

        //bottom left
        for (let i = 1; i <= that.currentPos.rank; i++) {
            let validTile = tiles.getTileById(that.currentPos.id + (posBottom * i) + (posLeft * i));
            if (validTile == null) {
                break;
            } else {
                if (that.currentPos.color == validTile.color) {
                    that.validMovesList.push(validTile);
                }
            }
        }





    }
    this.CheckValidMoves = function () {
     
        // if(that.enabled){
            that.setValidMoves();
            that.validMovesList.forEach((tile) => {
                tile.enabled = false;
                tile.enableMove = true;
                tile.checkEnabled();
                tile.getElement().addEventListener('click', function () {
                    if (tile.enableMove == true) {
                        that.move(tile);
                    }
                    
                });
            });
        
       
    }

    this.move = function (tile) {

        let initTile = tiles.getTile(this.file, this.rank);
        initTile.hasPiece = false;
        if (tile.enableMove == true ) {
            if(that.enabled == true) {
                console.log(that);
                tile.getElement().appendChild(that.getElement());
            }
            
        }
        that.validMovesList.forEach(t => {
            t.disableMove();
            t.setEnabled();
            t.checkEnabled();
        });

        tile.hasPiece = true;
        tile.pieceName = that.name;
        that.file = tile.getFile();
        that.rank = tile.getRank();
        that.currentPos = tile;
        that.moved = true;
        that.enabled = false;

    }

    this.getElement = function () {
        return pic;
    }



}