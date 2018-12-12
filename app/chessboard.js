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

                    //  let tile = tiles.getTileById(box.id);
                    if (tile.hasPiece) {
                        // tiles.disableAll();
                        tiles.disableAllMoves();
                        tiles.getAll().forEach(tile => {
                            tile.checkEnabled();
                        });

                        

                        let name = tile.pieceName;
                        let piece = PieceList.getByName(name);

                        PieceList.disableAll();
                        piece.enabled = true;
                       

                        // tile.setEnabled();
                        if (tile.enabled == true) {
                            
                            piece.CheckValidMoves();
                        }

                    } else {
                        // tiles.enableAll();
                        // tiles.disableAllMoves();
                        // tiles.getAll().forEach(tile => {
                        //     tile.checkEnabled();
                        // });
                    }
                });

            }


        });


    }

    this.setStartingPosition = function () {

        //white pieces initialization
        let wp1 = new WhitePawn('wp1', 'A', 2);
        let wp2 = new WhitePawn('wp2', 'B', 2);
        let wp3 = new WhitePawn('wp3', 'C', 2);
        let wp4 = new WhitePawn('wp4', 'D', 2);
        let wp5 = new WhitePawn('wp5', 'E', 2);
        let wp6 = new WhitePawn('wp6', 'F', 2);
        let wp7 = new WhitePawn('wp7', 'G', 2);
        let wp8 = new WhitePawn('wp8', 'H', 2);
        let wR1 = new WhiteRook('wr1', 'A', 1);
        let wR2 = new WhiteRook('wr2', 'H', 1);
        let wN1 = new WhiteKnight('wn1','B',1);
        let wN2 = new WhiteKnight('wn2','G',1);
        let wB1 = new WhiteBishop('wb1','C',1);
        let wB2 = new WhiteBishop('wb2','F',1);
        let wQ1 = new WhiteQueen('wq','D',1);
        let wK1 = new WhiteKing('wk','E',1);

        let bp1 = new BlackPawn('bp1', 'A', 7);
        let bp2 = new BlackPawn('bp2', 'B', 7);
        let bp3 = new BlackPawn('bp3', 'C', 7);
        let bp4 = new BlackPawn('bp4', 'D', 7);
        let bp5 = new BlackPawn('bp5', 'E', 7);
        let bp6 = new BlackPawn('bp6', 'F', 7);
        let bp7 = new BlackPawn('bp7', 'G', 7);
        let bp8 = new BlackPawn('bp8', 'H', 7);
        let bR1 = new BlackRook('br1', 'A', 8);
        let bR2 = new BlackRook('br2', 'H', 8);
        let bN1 = new BlackKnight('bn1','B',8);
        let bN2 = new BlackKnight('bn2','G',8);
        let bB1 = new BlackBishop('bb1','C',8);
        let bB2 = new BlackBishop('bb2','F',8);
        let bQ1 = new BlackQueen('bq','D',8);
        let bK1 = new BlackKing('bk','E',8);




        PieceList.add(wp1);
        PieceList.add(wp2);
        PieceList.add(wp3);
        PieceList.add(wp4);
        PieceList.add(wp5);
        PieceList.add(wp6);
        PieceList.add(wp7);
        PieceList.add(wp8);
        PieceList.add(wR1);
        PieceList.add(wR2);
        PieceList.add(wN1);
        PieceList.add(wN2);
        PieceList.add(wB1);
        PieceList.add(wB2);
        PieceList.add(wQ1);
        PieceList.add(wK1);

        PieceList.add(bp1);
        PieceList.add(bp2);
        PieceList.add(bp3);
        PieceList.add(bp4);
        PieceList.add(bp5);
        PieceList.add(bp6);
        PieceList.add(bp7);
        PieceList.add(bp8);
        PieceList.add(bR1);
        PieceList.add(bR2);
        PieceList.add(bN1);
        PieceList.add(bN2);
        PieceList.add(bB1);
        PieceList.add(bB2);
        PieceList.add(bQ1);
        PieceList.add(bK1);

        PieceList.getAll().forEach(piece => {
            piece.draw();
        });

    }



} // wp.enabled = true;
// if(wp.enabled){
//     tile.getElement().appendChild(wp.getElement());