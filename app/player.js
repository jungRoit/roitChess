function Player(name, team) {
    var that = this;
    this.name = name;
    this.team = team;
    this.isChecked = false;
    this.isTurn = false;
    this.castleKingSide = true;
    this.castleQueenSide = true;
    this.canCastleKingSide = false;
    this.canCastleQueenSide = false;
    this.enPassant = [];


    this.checkCastlePermission = function (pieceList) {
        let king = pieceList.getByTypeAndTeam('king', that.team);
        let kingRook, queenRook;
        if (king.moved == true) {
            that.castleKingSide = false;
            that.castleQueenSide = false;
        }

        if (that.team == 'w') {
            kingRook = pieceList.getById(9);
            queenRook = pieceList.getById(8);
        } else {
            kingRook = pieceList.getById(25);
            queenRook = pieceList.getById(24);
        }

        if (kingRook.moved == true) {
            that.castleKingSide = false;
        }

        if (queenRook.moved == true) {
            that.castleQueenSide = false;
        }
    }

    this.isCastleAvailable = function (pieceList, side) {
        let castleTiles = [];
        that.checkCastlePermission(pieceList);
        let file, rank;

        if (side == 'k') {
            file = Files[Files.length - 1];
        } else {
            file = Files[0];
        }

        if(that.team == 'w'){
            rank = Ranks[0];
        }else {
            rank = Ranks[Ranks.length - 1];
        }

        if (that.castleKingSide == true && side == 'k') {

                rookTile = tiles.getTile(Files[Files.indexOf(file)], rank);
                knightTile = tiles.getTile(Files[Files.indexOf(file) - 1], rank);
                bishopTile = tiles.getTile(Files[Files.indexOf(file) - 2], rank);
                kingTile = tiles.getTile(Files[Files.indexOf(file) - 3], rank);

                castleTiles.push(rookTile);
                castleTiles.push(knightTile);
                castleTiles.push(bishopTile);
                castleTiles.push(kingTile);

                if (knightTile.hasPiece == false && bishopTile.hasPiece == false) {
                    that.canCastleKingSide = true;
                    return castleTiles;
                } else {
                    that.canCastleKingSide = false;
                    return null;
                }
        }else {

                rookTile = tiles.getTile(Files[Files.indexOf(file)], rank);
                bishopTile = tiles.getTile(Files[Files.indexOf(file) + 2], rank);
                queenTile = tiles.getTile(Files[Files.indexOf(file) + 3], rank);
                knightTile = tiles.getTile(Files[Files.indexOf(file) + 1], rank);
                kingTile = tiles.getTile(Files[Files.indexOf(file) + 4], rank);

                castleTiles.push(rookTile);
                castleTiles.push(bishopTile);
                castleTiles.push(queenTile);
                castleTiles.push(knightTile);
                castleTiles.push(kingTile);

                if (knightTile.hasPiece == false && bishopTile.hasPiece == false && queenTile.hasPiece == false) {
                    that.canCastleQueenSide = true;
                    return castleTiles;
                } else {
                    that.canCastleQueenSide = false;
                    return null;
                }
        }

    }






}