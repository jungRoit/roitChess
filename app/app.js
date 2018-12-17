

PieceList = new PieceList();
playerList = new PlayerList();
moveList = [];
capturedPieceList = [];

player1 = new Player('white','w');
player2 = new Player('black','b');
playerList.add(player1);
playerList.add(player2);


game = new Game(player1,player2);

ui = new UI();
ui.createWelcomUI();

let chessBoard = new ChessBoard();
chessBoard.generateBoard();
chessBoard.setStartingPosition();
console.log(ui.userOption);
