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
                let tile = new Tile(index,Files[j],Ranks[i], box);
                tiles.insert(tile);
                index++;

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

        box.addEventListener('click', function () {
           

            let tile = tiles.getTileById(box.id);
           
            if(tile.hasPiece){
                tiles.disableAll();
                tiles.disableAllMoves();
                tiles.getAll().forEach(tile => {
                    tile.checkEnabled();
                });
                
                let name = tile.pieceName;
                let piece = PieceList.getByName(name);
                
               piece.enabled = true;

                tile.setEnabled();
                if(tile.enabled == true){
                    piece.CheckValidMoves(); 
                }
               
            } else{
                tiles.disableAll();
                // tiles.disableAllMoves();
                tiles.getAll().forEach(tile => {
                    tile.checkEnabled();
                });
            }   
        });


    }

    this.setStartingPosition = function () {

        let wp1 = new WhitePawn('wp1','B',1);
        let wp2 = new WhitePawn('wp2','B',2);
        let wp3 = new WhitePawn('wp3','B',3);
        let wp4 = new WhitePawn('wp4','B',4);
        let wp5 = new WhitePawn('wp5','B',5);
        let wp6 = new WhitePawn('wp6','B',6);
        let wp7 = new WhitePawn('wp7','B',7);
        let wp8 = new WhitePawn('wp8','B',8);
        let wR1 = new WhiteRook('wr1','A',1);
        let wR2 = new WhiteRook('wr2','A',8);
        
    }

 

} // wp.enabled = true;
// if(wp.enabled){
//     tile.getElement().appendChild(wp.getElement());