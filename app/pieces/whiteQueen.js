function WhiteQueen(name, file, rank) {
    var that = this;
    this.name = name
    this.img = 'img/wQ.png';
    this.value = 9;
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
        //top valid moves
        for (let i = 1; i <= Ranks.length - that.currentPos.rank; i++) {
            let validTile = tiles.getTileById(that.currentPos.id + posTop * i);
            that.validMovesList.push(validTile);
        }

        for (let i = 1; i < that.currentPos.rank; i++) {
            let validTile = tiles.getTileById(that.currentPos.id + posBottom * i);
            that.validMovesList.push(validTile);
        }

        for (let i = 1; i < Files.length - Files.indexOf(that.currentPos.file); i++) {
            let validTile = tiles.getTileById(that.currentPos.id + posRight * i);
            that.validMovesList.push(validTile);
        }

        for (let i = 1; i <= Files.indexOf(that.currentPos.file); i++) {
            let validTile = tiles.getTileById(that.currentPos.id + posLeft * i);
            that.validMovesList.push(validTile);
        }

              //top right
              for (let i = 1; i <= Ranks.length - that.currentPos.rank; i++) {
                let validTile = tiles.getTileById(that.currentPos.id + (posTop * i) + (posRight * i));
    
                if (validTile == null) {
                    break;
                }
                if (that.currentPos.color == validTile.color) {
                    that.validMovesList.push(validTile);
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

        that.setValidMoves();
        that.validMovesList.forEach((tile) => {
            tile.enabled = false;
            tile.enableMove = true;
            tile.checkEnabled();
            tile.getElement().addEventListener('click', function () {
                if (tile.enableMove == true && that.enabled == true) {
                    that.move(tile);
                }
            });
        });
    }

    this.move = function (tile) {
        let initTile = tiles.getTile(this.file, this.rank);
        initTile.hasPiece = false;
        
            tile.getElement().appendChild(that.getElement());
        
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

    }

    this.getElement = function () {
        return pic;
    }



}