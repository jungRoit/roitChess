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
      
        this.CheckValidMoves = function (pieceList) {
    
            piece.setValidMoves(pieceList);

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

            if(piece.canCaptureList != null) {
                piece.canCaptureList.forEach(tile => {
                    tile.enabled = false;
                    tile.enableCapture = true;
                    // tile.checkCaptureLight();
                    tile.getElement().addEventListener('click', function () {
                        if (tile.enableCapture == true && piece.enabled == true) {
                            that.capture(tile);
                        }
        
                    });
                });
            }
          
    
    
        }
    
        this.move = function (tile) {
    
            let initTile = tiles.getTile(piece.file, piece.rank);
            initTile.hasPiece = false;
        
                tile.getElement().appendChild(that.getElement());
                game.switchTurn();
            
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

        this.capture = function() {
            alert('captured');
            // let initTile = tiles.getTile(piece.file, piece.rank);
            // initTile.hasPiece = false;
            
            // let currentPiece =  pieceList.getByName(tile.pieceName);
            // currentPiece.captured = true;
            // game.score += currentPiece.value;
            // tile.getElement().removeChild(currentPiece.getElement());
    
            //     tile.getElement().appendChild(that.getElement());
               
            
            //     piece.canCaptureList.forEach(t => {
            //     t.disableCapture();
            //     t.setEnabled();
            //     t.checkCaptureLight();
            // });
    
            // tile.hasPiece = true;
            // tile.pieceName = piece.name;
            // piece.file = tile.getFile();
            // piece.rank = tile.getRank();
            // piece.currentPos = tile;
            // piece.moved = true;
            // piece.enabled = false;
            // game.switchTurn();

        }
    
        this.getElement = function () {
            return pic;
        }

        this.getPiece = function() {
            return piece;
        }
    
    
    
    }