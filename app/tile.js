function Tile(id, file, rank, box) {
    var that = this;
    this.id = id;
    this.file = file;
    this.rank = rank;
    this.box = box;
    this.enabled = true;
    this.enableMove = false;
    this.enableCapture = false;
    this.pieceName = '';
    this.hasPiece = false;

    this.getColor = function() {
        return this.box.style.background;
    }

    this.color = this.getColor();
    

    this.getElement = function() {
        return this.box;
    }

    this.getPiece = function() {
       return this.box.childNodes[0];
    }

    this.setEnabled = function() {
        this.enabled = true;
    }

    this.setDisable = function() {
        this.enabled = false;
    }

    this.getFile = function() {
        return that.file;
    }

    this.getRank = function() {
        return that.rank;
    }

    this.toggleEnabled = function() {
        if(that.enabled){
            that.enabled = false;
            
        }else{
            that.enabled = true;
        }
    }
    
    this.checkEnabled = function() {
        if(that.enableMove) {
           that.getElement().style.background = 'lightblue';
        }else {
            that.getElement().style.background = that.color;
        }
    }

    this.disableMove = function() {
        that.enableMove = false;
    }

   
}

