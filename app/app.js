let chessBoard = new ChessBoard();
PieceList = new PieceList();
playerList = new PlayerList();

player1 = new Player('white','w');
player2 = new Player('black','b');
playerList.add(player1);
playerList.add(player2);


game = new Game(player1,player2);


chessBoard.generateBoard();
chessBoard.setStartingPosition();