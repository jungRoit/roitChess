
PieceList = new PieceList();
playerList = new PlayerList();
moveList = [];
capturedPieceList = [];
let chessBoard = new ChessBoard();
player1 = new Player('white','w');
player2 = new Player('black','b');
playerList.add(player1);
playerList.add(player2);


game = new Game(player1,player2);

let ui = new UI();
ui.createWelcomUI();

chessBoard.generateBoard();
chessBoard.setStartingPosition();