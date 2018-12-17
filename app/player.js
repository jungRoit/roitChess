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


    this.checkKingSideCastle = function (pieceList) {
        let king = pieceList.getByTypeAndTeam('king', that.team);
        let rook;
        if (that.team == 'w') {
            rook = pieceList.getById(9);
        }else {
            rook = pieceList.getById(25);
        }

        if(king.moved == true || rook.moved == true){
            that.castleKingSide = false;
        }
        
    }

    this.isKingSideCastleAvailable = function(pieceList) {
        let castleTiles = [];
        that.checkKingSideCastle(pieceList);
        if(that.castleKingSide == true) {
            let file = Files[Files.length-1];
            let rank;
            if (that.team == 'w') {
                rank = Ranks[0];
                rookTile = tiles.getTile(Files[Files.indexOf(file)],rank);
                knightTile = tiles.getTile(Files[Files.indexOf(file)-1],rank);
                bishopTile = tiles.getTile(Files[Files.indexOf(file)-2],rank);
                kingTile = tiles.getTile(Files[Files.indexOf(file)-3],rank);

                castleTiles.push(rookTile);
                castleTiles.push(knightTile);
                castleTiles.push(bishopTile);
                castleTiles.push(kingTile);

                if(knightTile.hasPiece == false && bishopTile.hasPiece == false) {
                    that.canCastleKingSide = true;
                    return castleTiles;
                }else {
                    that.canCastleKingSide = false;
                    return null;
                }
                

            }else {

                rank = Ranks[Ranks.length-1];
                rookTile = tiles.getTile(Files[Files.indexOf(file)],rank);
                knightTile = tiles.getTile(Files[Files.indexOf(file)-1],rank);
                bishopTile = tiles.getTile(Files[Files.indexOf(file)-2],rank);
                kingTile = tiles.getTile(Files[Files.indexOf(file)-3],rank);

                castleTiles.push(rookTile);
                castleTiles.push(knightTile);
                castleTiles.push(bishopTile);
                castleTiles.push(kingTile);

                if(knightTile.hasPiece == false && bishopTile.hasPiece == false) {
                    that.canCastleKingSide = true;
                    return castleTiles;
                }else {
                    that.canCastleKingSide = false;
                    return null;
                }
            }

        }
    }






}