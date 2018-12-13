function BlackKnight(name, file, rank) {
    var that = this;
    this.name = name
    this.img = 'img/bN.png';
    this.value = -3;
    this.validMovesList = [];
    this.canCaptureList = [];
    this.currentPos;
    this.file = file;
    this.rank = rank;
    this.enabled = false;
    this.captured = false;
    this.moved = false;
    this.team = 'b';



    var posTop = 1;
    var posBottom = -1;
    var posLeft = -1;
    var posRight = 1;



    this.setValidMoves = function () {
        that.validMovesList = [];

        // top left and right
        //rank +2 file +1 and -1
        if (that.currentPos.rank < 7) {
            let rankTop = Ranks[Ranks.indexOf(that.currentPos.getRank()) + 2];
            let fileLeft = Files[Files.indexOf(that.currentPos.getFile()) + posLeft];
            let fileRight = Files[Files.indexOf(that.currentPos.getFile()) + posRight];


            let tileTL = tiles.getTile(fileLeft, rankTop);
            if (tileTL != null) {
                if (tileTL.hasPiece) {
                    that.canCaptureList.push(tileTL);
                } else {
                    that.validMovesList.push(tileTL);
                }

            }


            let tileTR = tiles.getTile(fileRight, rankTop);
            if (tileTR != null) {
                if (tileTR.hasPiece) {
                    that.canCaptureList.push(tileTR);
                } else {
                    that.validMovesList.push(tileTR);
                }
            }

        }

        //bottom left and right
        if (that.currentPos.rank > 2) {
            let rankBottom = Ranks[Ranks.indexOf(that.currentPos.getRank()) - 2];
            let fileLeft = Files[Files.indexOf(that.currentPos.getFile()) + posLeft];
            let fileRight = Files[Files.indexOf(that.currentPos.getFile()) + posRight];


            let tileBL = tiles.getTile(fileLeft, rankBottom);
            if (tileBL != null) {
                if (tileBL.hasPiece) {
                    that.canCaptureList.push(tileBL);
                } else {
                    that.validMovesList.push(tileBL);
                }
            }


            let tileBR = tiles.getTile(fileRight, rankBottom);
            if (tileBR != null) {
                if (tileBR.hasPiece) {
                    that.canCaptureList.push(tileBR);
                } else {
                    that.validMovesList.push(tileBR);
                }
            }

        }

        //left top and down
        if (Files.indexOf(that.currentPos.getFile()) > 1) {
            let fileLeft = Files[Files.indexOf(that.currentPos.getFile()) - 2];
            let rankTop = Ranks[Ranks.indexOf(that.currentPos.getRank()) + posTop];
            let rankBottom = Ranks[Ranks.indexOf(that.currentPos.getRank()) + posBottom];

            let tileLT = tiles.getTile(fileLeft, rankTop);
            if (tileLT != null) {
                if (tileLT.hasPiece) {
                    that.canCaptureList.push(tileLT);
                } else {
                    that.validMovesList.push(tileLT);
                }
            }


            let tileLB = tiles.getTile(fileLeft, rankBottom);
            if (tileLB != null) {
                if (tileLB.hasPiece) {
                    that.canCaptureList.push(tileLB);
                } else {
                    that.validMovesList.push(tileLB);
                }
            }

        }

        //right top and down
        if (Files.indexOf(that.currentPos.getFile()) < 8) {
            let fileRight = Files[Files.indexOf(that.currentPos.getFile()) + 2];
            let rankTop = Ranks[Ranks.indexOf(that.currentPos.getRank()) + posTop];
            let rankBottom = Ranks[Ranks.indexOf(that.currentPos.getRank()) + posBottom];

            let tileRT = tiles.getTile(fileRight, rankTop);
            if (tileRT != null) {
                if (tileRT.hasPiece) {
                    that.canCaptureList.push(tileRT);
                } else {
                    that.validMovesList.push(tileRT);
                }
            }


            let tileRB = tiles.getTile(fileRight, rankBottom);
            if (tileRB != null) {
                if (tileRB.hasPiece) {
                    that.canCaptureList.push(tileRB);
                } else {
                    that.validMovesList.push(tileRB);
                }
            }

        }
    }




}