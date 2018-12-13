function Knight(name, file, rank, team) {
    var that = this;
    this.name = name
    this.validMovesList = [];
    this.canCaptureList = [];
    this.currentPos;
    this.file = file;
    this.rank = rank;
    this.enabled = false;
    this.captured = false;
    this.moved = false;
    this.team = team;

    if(that.team == 'w') {
        this.value = 3;
        this.img = 'img/wN.png';
    }else if(that.team == 'b'){
        this.value = -3;
        this.img = 'img/bN.png';
    }


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

            } else {
                that.validMovesList.push(tile);
            }
           
        }
    }




}