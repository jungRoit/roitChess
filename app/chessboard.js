function ChessBoard() {
    let that = this;

    tiles = new Tiles();
    
    let index = 0;

    // this.clickedBoxes = [];
    // this.clickedIndex = 0;
    // this.possibleMoves = [];

    // this.moveFrom;
    // this.moveTo;

    this.generateContainer = function () {
        boardContainer.style.position = 'relative';
        boardContainer.style.top = '50px';
        boardContainer.style.left = '50px';
        boardContainer.style.width = '480px';
        boardContainer.style.height = '480px';
        boardContainer.style.background = 'bisque';
    }

    this.generateBoard = function () {

        let top = 0;
        let left = 0;

        that.generateContainer();

        for (var i = 7; i >= 0; i--) {
            for (var j = 0; j < 8; j++) {

                let box = document.createElement('div');
                box.style.width = '60px';
                box.style.height = '60px';

                box.style.border = '1px solid black';
                box.style.position = 'absolute';
                box.style.top = top + 'px';
                box.style.left = left + 'px';

                that.switchTilesColor(box, i, j);
                boardContainer.appendChild(box);
                left += 60;
                let tile = new Tile(index, Files[j], Ranks[i], box);
                tiles.insert(tile);
                index++;
                that.tileEvents();

            }

            top += 60;
            left = 0;
        }

    }

    this.switchTilesColor = function (box, i, j) {
        var file = Files[i];
        var rank = Ranks[j];
        var id = file + '-' + rank;
        if (Files.indexOf(file) % 2 == 1) {
            if (Ranks.indexOf(rank) % 2 == 0) {
                box.style.background = Color[0];
            } else {
                box.style.background = Color[1];
            }
        } else {
            if (Ranks.indexOf(rank) % 2 == 0) {
                box.style.background = Color[1];
            } else {
                box.style.background = Color[0];
            }
        }

        box.id = index;
    }

    this.tileEvents = function () {
       
        tiles.getAll().forEach(tile => {

            if (tile.enabled) {

                tile.getElement().addEventListener('click', function () {

                 
                    if (tile.hasPiece) {

                        tiles.disableAllMoves();
                        // tiles.disableAllCapture();
                        tiles.getAll().forEach(tile => {
                            tile.checkEnabled();
                            // tile.checkCaptureLight();
                        });

                        

                        let name = tile.pieceName;
                        let piece = PieceList.getByName(name);
                      

                        PieceList.disableAll();
                        piece.getPiece().enabled = true;
                       

                        if (tile.enabled == true && game.turn == piece.getPiece().team) {
                            
                            piece.CheckValidMoves(PieceList);
                        }

                    } else {

                        if(tile.enableMove == false){
                            tiles.disableAllMoves();
                            // tiles.disableAllCapture();
                            tiles.getAll().forEach(tile => {
                                tile.checkEnabled();
                                // tile.checkCaptureLight();
                            });
                        }
                        
                      
                    }
                });

            }
         
        
        });


    }

    this.setStartingPosition = function () {

        //white pieces initialization
        let wp1 = new GamePiece(new WhitePawn('wp1', 'A', 2));
        that.addToList(wp1);
        let wp2 = new GamePiece(new WhitePawn('wp2', 'B', 2));
        that.addToList(wp2);
        let wp3 = new GamePiece(new WhitePawn('wp3', 'C', 2));
        that.addToList(wp3);
        let wp4 = new GamePiece(new WhitePawn('wp4', 'D', 2));
        that.addToList(wp4);
        let wp5 = new GamePiece(new WhitePawn('wp5', 'E', 2));
        that.addToList(wp5);
        let wp6 = new GamePiece(new WhitePawn('wp6', 'F', 2));
        that.addToList(wp6);
        let wp7 = new GamePiece(new WhitePawn('wp7', 'G', 2));
        that.addToList(wp7);
        let wp8 = new GamePiece(new WhitePawn('wp8', 'H', 2));
        that.addToList(wp8);
        let wR1 = new GamePiece(new WhiteRook('wr1', 'A', 1));
        that.addToList(wR1);
        let wR2 = new GamePiece(new WhiteRook('wr2', 'H', 1));
        that.addToList(wR2);
        let wN1 = new GamePiece(new WhiteKnight('wn1','B',1));
        that.addToList(wN1);
        let wN2 = new GamePiece(new WhiteKnight('wn2','G',1));
        that.addToList(wN2);
        let wB1 = new GamePiece(new WhiteBishop('wb1','C',1));
        that.addToList(wB1);
        let wB2 = new GamePiece(new WhiteBishop('wb2','F',1));
        that.addToList(wB2);
        let wQ1 = new GamePiece(new WhiteQueen('wq','D',1));
        that.addToList(wQ1);
        let wK1 = new GamePiece(new WhiteKing('wk','E',1));
        that.addToList(wK1);

        //black piece initialization
        let bp1 = new GamePiece(new BlackPawn('bp1', 'A', 7));
        that.addToList(bp1);
        let bp2 = new GamePiece(new BlackPawn('bp2', 'B', 7));
        that.addToList(bp2);
        let bp3 = new GamePiece(new BlackPawn('bp3', 'C', 7));
        that.addToList(bp3);
        let bp4 = new GamePiece(new BlackPawn('bp4', 'D', 7));
        that.addToList(bp4);
        let bp5 = new GamePiece(new BlackPawn('bp5', 'E', 7));
        that.addToList(bp5);
        let bp6 = new GamePiece(new BlackPawn('bp6', 'F', 7));
        that.addToList(bp6);
        let bp7 = new GamePiece(new BlackPawn('bp7', 'G', 7));
        that.addToList(bp7);
        let bp8 = new GamePiece(new BlackPawn('bp8', 'H', 7));
        that.addToList(bp8);
        let bR1 = new GamePiece(new BlackRook('br1', 'A', 8));
        that.addToList(bR1);
        let bR2 = new GamePiece(new BlackRook('br2', 'H', 8));
        that.addToList(bR2);
        let bN1 = new GamePiece(new BlackKnight('bn1','B',8));
        that.addToList(bN1);
        let bN2 = new GamePiece(new BlackKnight('bn2','G',8));
        that.addToList(bN2);
        let bB1 = new GamePiece(new BlackBishop('bb1','C',8));
        that.addToList(bB1);
        let bB2 = new GamePiece(new BlackBishop('bb2','F',8));
        that.addToList(bB2);
        let bQ1 = new GamePiece(new BlackQueen('bq','D',8));
        that.addToList(bQ1);
        let bK1 = new GamePiece(new BlackKing('bk','E',8));
        that.addToList(bK1);



       

        PieceList.getAll().forEach(piece => {
            piece.draw();
        });

    }
    this.addToList = function(item) {
        PieceList.add(item);
    }



}