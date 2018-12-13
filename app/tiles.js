function Tiles() {
    var that = this;
    this.tilesList = [];

    this.insert = function(tile) {
        this.tilesList.push(tile);
    }

    this.getAll = function() {
        return this.tilesList;
    }


    this.getTile = function (file, rank) {
        var list = this.getTilesByFile(file);

        for(var i =0;i<list.length; i++){
            if(list[i].rank == rank) {
                return list[i];
            }
        }
        return null;

    }

    this.getTileById = function(id) {
        for(var i = 0 ;i<this.tilesList.length; i++){
            if(this.tilesList[i].id == id){
                return this.tilesList[i];
            }
        }
        return null;
    }


    this.getTilesByFile = function (file) {
        var resultSet = [];

        this.tilesList.forEach((tile) => {
            if (tile.file == file) {
                resultSet.push(tile);
            }
        });
        return resultSet;
    }

    this.getTilesByRank = function (rank) {
        var resultSet = [];
        this.tilesList.forEach(tile => {
            if (tile.rank == rank) {
                resultSet.push(tile);
            }
        });
        return resultSet;
    }

    this.disableAll = function(){
        that.tilesList.forEach(tile => {
            if(tile.enabled){
                tile.enabled = false;
            }
        })
    }


    this.disableAllMoves = function(){
        that.tilesList.forEach(tile => {
            tile.enableMove = false;
        });
    }

    this.disableAllCapture = function() {
        that.tilesList.forEach(tile => {
            tile.enableCapture = false;
        });
    }

    this.enableAll = function(){
        that.tilesList.forEach(tile => {
           
                tile.enabled = true;
            
        })
    }


}