function GamePiece(piece) {
        var that = this;
        this.name = piece.name
        this.img = piece.img;
        this.value = piece.value;
       
       

        var pic = document.createElement('img');
    
        this.draw = function () {
            let tile = tiles.getTile(piece.file, piece.rank);
            tile.pieceName = piece.name;
            piece.currentPos = tile;
            pic.src = piece.img;
            pic.style.zIndex = '10';
    
    
            tile.getElement().appendChild(pic);
            tile.hasPiece = true;
           
        }
      
        this.CheckValidMoves = function () {
    
            piece.setValidMoves();
            piece.validMovesList.forEach((tile) => {
                tile.enabled = false;
                tile.enableMove = true;
                tile.checkEnabled();
                tile.getElement().addEventListener('click', function () {
                    if (tile.enableMove == true && piece.enabled == true) {
                        that.move(tile);
                    }
    
                });
            });
    
    
        }
    
        this.move = function (tile) {
    
            let initTile = tiles.getTile(piece.file, piece.rank);
            initTile.hasPiece = false;
            
    
                tile.getElement().appendChild(that.getElement());
            
                piece.validMovesList.forEach(t => {
                t.disableMove();
                t.setEnabled();
                t.checkEnabled();
            });
    
            tile.hasPiece = true;
            tile.pieceName = piece.name;
            piece.file = tile.getFile();
            piece.rank = tile.getRank();
            piece.currentPos = tile;
            piece.moved = true;
            piece.enabled = false;
    
        }
    
        this.getElement = function () {
            return pic;
        }

        this.getPiece = function() {
            return piece;
        }
    
    
    
    }