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

    var posTop = 1;
    var posBottom = -1;
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

        // top left and right
        //rank +2 file +1 and -1
        if(that.currentPos.rank < 7){
            let rankTop = Ranks[Ranks.indexOf(that.currentPos.getRank())+2];
            let fileLeft = Files[Files.indexOf(that.currentPos.getFile())+ posLeft];
            let fileRight  = Files[Files.indexOf(that.currentPos.getFile()) + posRight];

           
                let tileTL = tiles.getTile(fileLeft,rankTop);
                if(tileTL != null) {
                    if(tileTL.hasPiece) {
                        that.canCaptureList.push(tileTL);
                    }else{
                        that.validMovesList.push(tileTL);
                    }
                
            }
           
            
                let tileTR = tiles.getTile(fileRight,rankTop);
                if(tileTR != null){
                    
                that.validMovesList.push(tileTR);
            }
            
        }

        //bottom left and right
        if(that.currentPos.rank > 2){
            let rankBottom = Ranks[Ranks.indexOf(that.currentPos.getRank()) - 2];
            let fileLeft = Files[Files.indexOf(that.currentPos.getFile())+ posLeft];
            let fileRight  = Files[Files.indexOf(that.currentPos.getFile()) + posRight];

            
                let tileBL = tiles.getTile(fileLeft,rankBottom);
                if(tileBL != null) {
                    if(tileBL.hasPiece) {
                        that.canCaptureList.push(tileBL);
                    }else{
                that.validMovesList.push(tileBL);
                    }
            }
            
          
                let tileBR = tiles.getTile(fileRight,rankBottom);
                if(tileBR != null) {
                    if(tileBR.hasPiece) {
                        that.canCaptureList.push(tileBR);
                    }else{
                that.validMovesList.push(tileBR);
                    }
            }
            
        }

        //left top and down
        if(Files.indexOf(that.currentPos.getFile()) > 1){
            let fileLeft = Files[Files.indexOf(that.currentPos.getFile()) - 2];
            let rankTop = Ranks[Ranks.indexOf(that.currentPos.getRank())+ posTop];
            let rankBottom  = Ranks[Ranks.indexOf(that.currentPos.getRank())+ posBottom];

            let tileLT = tiles.getTile(fileLeft,rankTop);
            if(tileLT != null) {
                if(tileLT.hasPiece) {
                    that.canCaptureList.push(tileLT);
                }else{
                that.validMovesList.push(tileLT);
                }
            }
            

            let tileLB = tiles.getTile(fileLeft,rankBottom);
            if(tileLB != null) {
                if(tileLB.hasPiece) {
                    that.canCaptureList.push(tileLB);
                }else{
                that.validMovesList.push(tileLB);
                }
            }
            
        }

        //right top and down
        if(Files.indexOf(that.currentPos.getFile()) < 8){
            let fileRight = Files[Files.indexOf(that.currentPos.getFile()) + 2];
            let rankTop = Ranks[Ranks.indexOf(that.currentPos.getRank())+ posTop];
            let rankBottom  = Ranks[Ranks.indexOf(that.currentPos.getRank())+ posBottom];

            let tileRT = tiles.getTile(fileRight,rankTop);
            if(tileRT != null) {
                if(tileRT.hasPiece) {
                    that.canCaptureList.push(tileRT);
                }else{
                that.validMovesList.push(tileRT);
                }
            }
            

            let tileRB = tiles.getTile(fileRight,rankBottom);
            if(tileRB != null) {
                if(tileRB.hasPiece) {
                    that.canCaptureList.push(tileRB);
                }else{
                that.validMovesList.push(tileRB);
                }
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
        that.enabled = false;

    }

    this.getElement = function () {
        return pic;
    }



}