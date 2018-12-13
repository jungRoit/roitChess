function WhiteKnight(name, file, rank) {
    var that = this;
    this.name = name
    this.img = 'img/wN.png';
    this.value = 3;
    this.validMovesList = [];
    this.canCaptureList = [];
    this.currentPos;
    this.file = file;
    this.rank = rank;
    this.enabled = false;
    this.captured = false;
    this.moved = false;
    this.team = 'w';

    var posTop = 1;
    var posBottom = -1;
    var posLeft = -1;
    var posRight = 1;



    this.setValidMoves = function (pieceList) {
        that.validMovesList = [];
        that.canCaptureList = [];

        // top left and right
        //rank +2 file +1 and -1
        if (that.currentPos.rank < 7) {
            let rankTop = Ranks[Ranks.indexOf(that.currentPos.getRank()) + 2];
            let fileLeft = Files[Files.indexOf(that.currentPos.getFile()) + posLeft];
            let fileRight = Files[Files.indexOf(that.currentPos.getFile()) + posRight];

            that.addToList(pieceList,fileLeft, rankTop);
            that.addToList(pieceList,fileRight, rankTop);
        }

        //bottom left and right
        if (that.currentPos.rank > 2) {
            let rankBottom = Ranks[Ranks.indexOf(that.currentPos.getRank()) - 2];
            let fileLeft = Files[Files.indexOf(that.currentPos.getFile()) + posLeft];
            let fileRight = Files[Files.indexOf(that.currentPos.getFile()) + posRight];

            that.addToList(pieceList,fileLeft, rankBottom);
            that.addToList(pieceList,fileRight, rankBottom);
        }

        //left top and down
        if (Files.indexOf(that.currentPos.getFile()) > 1) {
            let fileLeft = Files[Files.indexOf(that.currentPos.getFile()) - 2];
            let rankTop = Ranks[Ranks.indexOf(that.currentPos.getRank()) + posTop];
            let rankBottom = Ranks[Ranks.indexOf(that.currentPos.getRank()) + posBottom];

            that.addToList(pieceList,fileLeft, rankTop);
            that.addToList(pieceList,fileLeft, rankBottom);
        }

        //right top and down
        if (Files.indexOf(that.currentPos.getFile()) < 8) {
            let fileRight = Files[Files.indexOf(that.currentPos.getFile()) + 2];
            let rankTop = Ranks[Ranks.indexOf(that.currentPos.getRank()) + posTop];
            let rankBottom = Ranks[Ranks.indexOf(that.currentPos.getRank()) + posBottom];

            that.addToList(pieceList,fileRight, rankTop);
            that.addToList(pieceList,fileRight, rankBottom);
        }

    }

    this.addToList = function (pieceList, file, rank) {
        let tile = tiles.getTile(file, rank);
        if (tile != null) {
            if (tile.hasPiece) {
                let tilePiece = pieceList.getByName(tile.pieceName).getPiece();
                if (tilePiece.team != that.team) {
                    that.canCaptureList.push(tile);
                }

            }
            that.validMovesList.push(tile);
        }
    }




}