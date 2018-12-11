let chessBoard = new ChessBoard();

chessBoard.generateBoard();

PieceList = new PieceList();

//  wp = new WhitePawn('wp1',"B",2);
//  wp2 = new WhitePawn('wp2',"F",2);

//  bp = new BlackPawn('bp1','B',7);
//  bp.draw();

// PieceList.add(wp);
// PieceList.add(wp2);
// PieceList.add(bp);

// console.log(PieceList.getAll());

// wp.draw();
// wp2.draw();

wk = new WhiteBishop('wk','H',4);
wk.draw();

let wp8 = new WhitePawn('wp8','H',2);
// let wR1 = new WhiteRook('wr1','A',1);
// let wR2 = new WhiteRook('wr2','H',1);
// wp8.draw();
// wR1.draw();
// wR2.draw();

bk = new BlackKing('bk','E',8);
bk.draw();

PieceList.add(wk);
PieceList.add(bk);
// PieceList.add(wp8);
// PieceList.add(wR1);
// PieceList.add(wR2);
// console.log(PieceList.getAll());


