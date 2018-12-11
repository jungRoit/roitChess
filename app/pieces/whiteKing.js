function WhiteKing(name, file, rank) {
    var that = this;
    this.name = name
    this.img = 'img/wK.png';
    this.value = 100;
    this.validMovesList = [];
    this.currentPos;
    this.file = file;
    this.rank = rank;
    this.enabled = false;
    this.captured = false;
    this.moved = false;

    var posTop = -8;
    var postBottom = 8;
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
        if (that.currentPos.file != 'A') {
            let mL = tiles.getTileById(that.currentPos.id + posLeft);
            that.validMovesList.push(mL);
        }

        if (that.currentPos.file != 'H') {
            let mR = tiles.getTileById(that.currentPos.id + posRight);
            that.validMovesList.push(mR);
        }


        if (that.currentPos.rank != 8) {
            let mT = tiles.getTileById(that.currentPos.id + posTop);
            that.validMovesList.push(mT);

            if (that.currentPos.file != 'A') {
                let mTL = tiles.getTileById(that.currentPos.id + posTop + posLeft);
                that.validMovesList.push(mTL);
            }

            if (that.currentPos.file != 'H') {
                let mTR = tiles.getTileById(that.currentPos.id + posTop + posRight);
                that.validMovesList.push(mTR);
            }
        }

        if (that.currentPos.rank != 1) {
            let mB = tiles.getTileById(that.currentPos.id + postBottom);
            that.validMovesList.push(mB);
            if (that.currentPos.file != 'A') {
                let mBL = tiles.getTileById(that.currentPos.id + postBottom + posLeft);
                that.validMovesList.push(mBL);
            }

            if (that.currentPos.file != 'H') {
                let mBR = tiles.getTileById(that.currentPos.id + postBottom + posRight);
                that.validMovesList.push(mBR);
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