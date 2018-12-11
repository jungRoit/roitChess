function WhitePawn(name, file, rank) {
    var that = this;
    this.name = name
    this.img = 'img/wP.png';
    this.value = 1;
    this.validMovesList = [];
    this.currentPos;
    this.file = file;
    this.rank = rank;
    this.enabled = false;
    this.captured = false;
    this.moved = false;

    var pic = document.createElement('img');

    this.draw = function () {
        let tile = tiles.getTile(this.file, this.rank);
        tile.pieceName = that.name;
        that.currentPos = tile;
        pic.src = this.img;
        pic.style.zIndex = '10';

        let validTile = tiles.getTileById(that.currentPos.id - 8);
        let validTile2 = tiles.getTileById(that.currentPos.id - 16);


        that.validMovesList.push(validTile);
        that.validMovesList.push(validTile2);

        tile.getElement().appendChild(pic);
        tile.hasPiece = true;


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



    this.setValidMoves = function () {
        that.validMovesList = [];
        if (that.currentPos.file != 'H') {
            var next = tiles.getTileById(that.currentPos.id - 8);

            if (!next.hasPiece) that.validMovesList.push(next);
        }

    }


    this.getElement = function () {
        return pic;
    }


}