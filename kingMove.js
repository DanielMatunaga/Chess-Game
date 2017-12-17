#pragma strict

var click = false;
var moves: RaycastHit[] = [];
public var game : GameObject;
game = GameObject.Find("Game");
var tempTag : String;
var self: RaycastHit[] = [];
var self_check: RaycastHit[] = [];

var king_safe_rock_positive_z: RaycastHit[] = [];
var king_safe_rock_negative_z: RaycastHit[] = [];
var king_safe_rock_positive_x: RaycastHit[] = [];
var king_safe_rock_negative_x: RaycastHit[] = [];

var king_safe_bishop_positive_z: RaycastHit[] = [];
var king_safe_bishop_negative_z: RaycastHit[] = [];
var king_safe_bishop_positive_x: RaycastHit[] = [];
var king_safe_bishop_negative_x: RaycastHit[] = [];

var king_safe_knight: RaycastHit[] = [];

var king_safe_pawn: RaycastHit[] = [];
var king_safe_pawn_captures: RaycastHit[] = [];

var king_safe_king: RaycastHit[] = [];

var king_safe_self: RaycastHit[] = [];

var enemy: String;
var ally : String;
var side : int;

var lineAttack: RaycastHit[] = [];

var firstMove = true;
var castleQueen: RaycastHit[] = [];
var castleKing: RaycastHit[] = [];
var castleCheck: RaycastHit[] = [];

var kingDefense: GameObject[] = [];

var piecesMoves: GameObject[] = [];


function OnMouseDown(){
	if (!(game.GetComponent(gameManager).Draw) && !(game.GetComponent(gameManager).blackCheckMate) && !(game.GetComponent(gameManager).whiteCheckMate) && !(game.GetComponent(gameManager).promotePanel) && (!click) && (!GameObject.FindWithTag("Moving")) && (game.GetComponent(gameManager).whiteTurn) && (transform.tag == "White")) {
		game.GetComponent(gameManager).audioSelect.Play();
		select();
	}
	else{
		if(!(game.GetComponent(gameManager).Draw) && !(game.GetComponent(gameManager).blackCheckMate) && !(game.GetComponent(gameManager).whiteCheckMate) && !(game.GetComponent(gameManager).promotePanel) && (!click) && (!GameObject.FindWithTag("Moving")) && (!game.GetComponent(gameManager).whiteTurn) && (transform.tag == "Black")){
		game.GetComponent(gameManager).audioSelect.Play();
		select();
		}
		else{
			if(click){
			game.GetComponent(gameManager).audioDeselect.Play();
			deselect();
			}
		}
	}
}


public function select(){
	click = true;
 	tempTag = transform.tag;
 	transform.tag = "Moving";
 	
 	self = Physics.RaycastAll(transform.position,new Vector3(0,-1,0), 50F);
if ((!game.GetComponent(gameManager).whiteCheck) && (!game.GetComponent(gameManager).blackCheck)){
		for (var m: int = 0; m < self.Length; m++) {
			if(self[m].transform.GetComponent.<Move>()){
				Render(self, m, "blackSquare", "blackSelfGreen", "whiteSelfGreen");
			}
		}
}

 	//move rocks on positive z
 	
 	if(game.GetComponent(gameManager).whiteTurn){
 	ally = "White";
 	enemy = "Black";
 	} else{
 	ally = "Black";
 	enemy = "White";
 	}
 	
 	if(kingSafe(0,0,5, ally, enemy)){
	moves += Physics.RaycastAll(transform.position + new Vector3(0,0,5),new Vector3(0,-1,0), 50F);
	}
	if(kingSafe(5,0,5, ally, enemy)){
	moves += Physics.RaycastAll(transform.position + new Vector3(5,0,5),new Vector3(0,-1,0), 50F);
	}
	if(kingSafe(5,0,0, ally, enemy)){
	moves += Physics.RaycastAll(transform.position + new Vector3(5,0,0),new Vector3(0,-1,0), 50F);
	}
	if(kingSafe(5,0,-5, ally, enemy)){
	moves += Physics.RaycastAll(transform.position + new Vector3(5,0,-5),new Vector3(0,-1,0), 50F);
	}
	if(kingSafe(0,0,-5, ally, enemy)){
	moves += Physics.RaycastAll(transform.position + new Vector3(0,0,-5),new Vector3(0,-1,0), 50F);
	}
	if(kingSafe(-5,0,-5, ally, enemy)){
	moves += Physics.RaycastAll(transform.position + new Vector3(-5,0,-5),new Vector3(0,-1,0), 50F);
	}
	if(kingSafe(-5,0,0, ally, enemy)){
	moves += Physics.RaycastAll(transform.position + new Vector3(-5,0,0),new Vector3(0,-1,0), 50F);
	}
	if(kingSafe(-5,0,5, ally, enemy)){
	moves += Physics.RaycastAll(transform.position + new Vector3(-5,0,5),new Vector3(0,-1,0), 50F);
	}
	
if(firstMove){

	if(kingSafe(-10,0,0, ally, enemy)){
		if(Castle(-1)){
		castleKing += Physics.RaycastAll(transform.position + new Vector3(-10,10,0),new Vector3(0,-1,0), 50F);
		}
	}
	if(kingSafe(10,0,0, ally, enemy)){
		if(Castle(1)){
		castleQueen += Physics.RaycastAll(transform.position + new Vector3(10,10,0),new Vector3(0,-1,0), 50F);
		}
	}

		for (var i: int = 0; i < castleKing.Length; i++) {
		 	if(castleKing[i].transform.GetComponent.<Move>()) {
				 if((!castleKing[i].transform.GetComponent.<Move>().whiteOccupied) && (!castleKing[i].transform.GetComponent.<Move>().blackOccupied)){
				 	if((!game.GetComponent(gameManager).whiteCheck) && (!game.GetComponent(gameManager).blackCheck)){
				 castleKing[i].transform.GetComponent.<Move>().canMove = true;
				  castleKing[i].transform.GetComponent.<Move>().castleKing = true;
				 Render(castleKing, i, "blackSquare", "blackGreen", "whiteGreen");
				 	}
				 }
			}	
		}
		
		for (i = 0; i < castleQueen.Length; i++) {
		 	if(castleQueen[i].transform.GetComponent.<Move>()) {
				 if((!castleQueen[i].transform.GetComponent.<Move>().whiteOccupied) && (!castleQueen[i].transform.GetComponent.<Move>().blackOccupied)){
				 	if((!game.GetComponent(gameManager).whiteCheck) && (!game.GetComponent(gameManager).blackCheck)){
				 castleQueen[i].transform.GetComponent.<Move>().canMove = true;
				 castleQueen[i].transform.GetComponent.<Move>().castleQueen = true;
				 Render(castleQueen, i, "blackSquare", "blackGreen", "whiteGreen");
				 	}
				 }
			}	
		}


		for (i = 0; i < moves.Length; i++) {
		 	if(moves[i].transform.GetComponent.<Move>()) {
				 if((moves[i].transform.GetComponent.<Move>().whiteOccupied) || (moves[i].transform.GetComponent.<Move>().blackOccupied)){	 	
						limitMove(moves, i, "blackSquare", "blackRed", "whiteRed", true);
				 } else{
				 moves[i].transform.GetComponent.<Move>().canMove = true;
				 Render(moves, i, "blackSquare", "blackGreen", "whiteGreen");
				 }
			}	
		}

} else{

		for (var j: int = 0; j < moves.Length; j++) {
		 	if(moves[j].transform.GetComponent.<Move>()) {
				 if((moves[j].transform.GetComponent.<Move>().whiteOccupied) || (moves[j].transform.GetComponent.<Move>().blackOccupied)){	 	
						limitMove(moves, j, "blackSquare", "blackRed", "whiteRed", true);
				 } else{
				 moves[j].transform.GetComponent.<Move>().canMove = true;
				 Render(moves, j, "blackSquare", "blackGreen", "whiteGreen");
				 }
			}	
		}
}

}

public function deselect(){
click = false;
	transform.tag = tempTag;
	
if((!game.GetComponent(gameManager).whiteCheck) && (!game.GetComponent(gameManager).blackCheck)){
		for (var m: int = 0; m < self.Length; m++) {
			if(self[m].transform.GetComponent.<Move>()){
				Render(self, m, "blackselfGreen", "blackSquare", "whiteSquare");
			}
		}
} 

	
	//move rocks on positive z
		for (var i = 0; i < moves.Length; i++) {
			if(moves[i].transform.GetComponent.<Move>()){
				if((moves[i].transform.GetComponent.<Move>().whiteOccupied) || (moves[i].transform.GetComponent.<Move>().blackOccupied)){
					limitMove(moves, i, "blackRed", "blackSquare", "whiteSquare", false);
				 } else{
				moves[i].transform.GetComponent.<Move>().canMove = false;
				Render(moves, i, "blackGreen", "blackSquare", "whiteSquare");
				}
		}
		}
		
		for (i = 0; i < castleKing.Length; i++) {
		 	if(castleKing[i].transform.GetComponent.<Move>()) {
				 if((!castleKing[i].transform.GetComponent.<Move>().whiteOccupied) && (!castleKing[i].transform.GetComponent.<Move>().blackOccupied)){
				 	if((!game.GetComponent(gameManager).whiteCheck) && (!game.GetComponent(gameManager).blackCheck)){
				 castleKing[i].transform.GetComponent.<Move>().canMove = false;
				  castleKing[i].transform.GetComponent.<Move>().castleKing = false;
				 Render(castleKing, i, "blackGreen", "blackSquare", "whiteSquare");
				 	}
				 }
			}	
		}
		
		for (i = 0; i < castleQueen.Length; i++) {
		 	if(castleQueen[i].transform.GetComponent.<Move>()) {
				 if((!castleQueen[i].transform.GetComponent.<Move>().whiteOccupied) && (!castleQueen[i].transform.GetComponent.<Move>().blackOccupied)){
				 	if((!game.GetComponent(gameManager).whiteCheck) && (!game.GetComponent(gameManager).blackCheck)){
				 castleQueen[i].transform.GetComponent.<Move>().canMove = false;
				 castleQueen[i].transform.GetComponent.<Move>().castleQueen = false;
				 Render(castleQueen, i, "blackGreen", "blackSquare", "whiteSquare");
				 	}
				 }
			}	
		}
		
		castleKing = [];
		castleQueen = [];
		moves = [];
		self = [];
	
}

//--------------------------------------------------------- Check ---------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------

public function Check(ally : String, enemy : String, checkColor : String){

if(!kingSafe(0,0,0,ally,enemy)){
game.GetComponent(gameManager).audioCheck.Play();


if (checkColor == "blackCheck"){
game.GetComponent(gameManager).blackCheck = true;
} else{
game.GetComponent(gameManager).whiteCheck = true;
}

	self_check = Physics.RaycastAll(transform.position,new Vector3(0,-1,0), 50F);
		for (var m: int = 0; m < self_check.Length; m++) {
			if(self_check[m].transform.GetComponent.<Move>()){
				Render(self_check, m, "blackSquare", "blackRed", "whiteRed");
			}
		}
		
if(!kingDoubleCheck(ally,enemy)){
lineAttack = kingCheck(ally,enemy);
	for (var i: int = 0; i < lineAttack.Length; i++) { 
		if((lineAttack[i].transform.GetComponent.<queenMove>()) || (lineAttack[i].transform.GetComponent.<rockMove>()) || (lineAttack[i].transform.GetComponent.<bishopMove>())){
				for ( i = 0; i < lineAttack.Length; i++) { 
								if(lineAttack[i].transform.GetComponent.<Move>()){
									if(!game.GetComponent(gameManager).whiteTurn){
										if((lineAttack[i].transform.GetComponent.<Move>().blackOccupied)){
										lineAttack[i].transform.GetComponent.<Move>().protectKing = true;
									//	Render(lineAttack, i, "blackSquare", "blackSelfGreen", "whiteSelfGreen");
										break;
										} 
										lineAttack[i].transform.GetComponent.<Move>().protectKing = true;
									} else{
										if((lineAttack[i].transform.GetComponent.<Move>().whiteOccupied)){
										lineAttack[i].transform.GetComponent.<Move>().protectKing = true;
									//	Render(lineAttack, i, "blackSquare", "blackSelfGreen", "whiteSelfGreen");
										break;
										} 
										lineAttack[i].transform.GetComponent.<Move>().protectKing = true;
									}
								}
				}
		break;
		}
		if((lineAttack[i].transform.GetComponent.<knightMove>()) || (lineAttack[i].transform.GetComponent.<pawnMove>()))	
		{
				for ( i = 0; i < lineAttack.Length; i++) { 
							if(lineAttack[i].transform.GetComponent.<Move>()){
								if(!game.GetComponent(gameManager).whiteTurn){
									if((lineAttack[i].transform.GetComponent.<Move>().blackOccupied)){
									lineAttack[i].transform.GetComponent.<Move>().protectKing = true;
									break;
									}
									lineAttack[i].transform.GetComponent.<Move>().protectKing = true;
								}else{
									if((lineAttack[i].transform.GetComponent.<Move>().whiteOccupied)){
									lineAttack[i].transform.GetComponent.<Move>().protectKing = true;
									break;
									}
									lineAttack[i].transform.GetComponent.<Move>().protectKing = true;
								}
							}
				}
		break;
		}
								
	}
}					

} else{
if (checkColor == "blackCheck"){
game.GetComponent(gameManager).blackCheck = false;
} else{
game.GetComponent(gameManager).whiteCheck = false;
}
	
		for (m = 0; m < self_check.Length; m++) {
			if(self_check[m].transform.GetComponent.<Move>()){
				Render(self_check, m, "blackRed", "blackSquare", "whiteSquare");
			}
		}
	self_check = [];
	
	if(!kingDoubleCheck(ally,enemy)){
	
				for ( i = 0; i < lineAttack.Length; i++) {
							if(lineAttack[i].transform.GetComponent.<Move>()){
								if(game.GetComponent(gameManager).whiteTurn){
									if((lineAttack[i].transform.GetComponent.<Move>().blackOccupied)){
									lineAttack[i].transform.GetComponent.<Move>().protectKing = false;
									break;
									}
									lineAttack[i].transform.GetComponent.<Move>().protectKing = false;
								}else{
									if((lineAttack[i].transform.GetComponent.<Move>().whiteOccupied)){
									lineAttack[i].transform.GetComponent.<Move>().protectKing = false;
									break;
									}
									lineAttack[i].transform.GetComponent.<Move>().protectKing = false;
								}
							}
				}
	lineAttack = [];
	}
}
}

//--------------------------------------------------------- KingCheck ---------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------

function checkDirectionsRock(king_safe : RaycastHit[],ally : String, enemy : String) : boolean{
				for (var i: int = 0; i < king_safe.Length; i++) {
			if(king_safe[i].transform.gameObject.tag == ally){
			break;
			}
			if(king_safe[i].transform.gameObject.tag == enemy){
				if((king_safe[i].transform.GetComponent.<bishopMove>()) ||
				  (king_safe[i].transform.GetComponent.<knightMove>()) || 
				  (king_safe[i].transform.GetComponent.<pawnMove>()) || 
				  (king_safe[i].transform.GetComponent.<kingMove>()) ){
				break;
				} else{
				if((king_safe[i].transform.GetComponent.<queenMove>()) || (king_safe[i].transform.GetComponent.<rockMove>())){
						return true;
				}
			}
			
		}
	}
	return false;
}

function checkDirectionsBishop(king_safe : RaycastHit[],ally : String, enemy : String) : boolean{
		for (var i: int = 0; i < king_safe.Length; i++) {
			if(king_safe[i].transform.gameObject.tag == ally){
			break;
			}
			if(king_safe[i].transform.gameObject.tag == enemy){
				if((king_safe[i].transform.GetComponent.<rockMove>()) || 
				  (king_safe[i].transform.GetComponent.<knightMove>()) || 
				  (king_safe[i].transform.GetComponent.<pawnMove>()) || 
				  (king_safe[i].transform.GetComponent.<kingMove>()) ){
				break;
				} else{
				if((king_safe[i].transform.GetComponent.<queenMove>()) || (king_safe[i].transform.GetComponent.<bishopMove>())){
				return true;
				}
			}
		}
	}
	return false;
	
	}

function kingCheck(ally : String, enemy : String) : RaycastHit[]{


//---------------------------------------------------------Rock Moves ---------------------------------------------------------------

king_safe_rock_positive_z = [];
king_safe_rock_negative_z = [];
king_safe_rock_positive_x = [];	
king_safe_rock_negative_x = [];	
	
	
	for(var n: int = 5; n < 40; n = n+5){
	king_safe_rock_positive_z += Physics.RaycastAll(transform.position + new Vector3(0,10,n),new Vector3(0,-1,0), 50F);
	king_safe_rock_negative_z += Physics.RaycastAll(transform.position + new Vector3(0,10,-n),new Vector3(0,-1,0), 50F);
	king_safe_rock_positive_x += Physics.RaycastAll(transform.position + new Vector3(n,10,0),new Vector3(0,-1,0), 50F);
	king_safe_rock_negative_x += Physics.RaycastAll(transform.position + new Vector3(-n,10,0),new Vector3(0,-1,0), 50F);
	}

	if(checkDirectionsRock(king_safe_rock_positive_z, ally, enemy)){
	return king_safe_rock_positive_z;
	}
		
	if(checkDirectionsRock(king_safe_rock_negative_z, ally, enemy)){
	return king_safe_rock_negative_z;
	}
	
	if(checkDirectionsRock(king_safe_rock_positive_x, ally, enemy)){
	return king_safe_rock_positive_x;
	}
	
	if(checkDirectionsRock(king_safe_rock_negative_x, ally, enemy)){
	return king_safe_rock_negative_x;
	}

//---------------------------------------------------------Bishop Moves ---------------------------------------------------------------

	king_safe_bishop_positive_z = [];
	king_safe_bishop_negative_z = [];
	king_safe_bishop_positive_x = [];
	king_safe_bishop_negative_x = [];
	
	for(var m: int = 5; m < 40; m = m+5){
	king_safe_bishop_positive_z += Physics.RaycastAll(transform.position + new Vector3(m,10,m),new Vector3(0,-1,0), 50F);
	king_safe_bishop_negative_z += Physics.RaycastAll(transform.position + new Vector3(-m,10,m),new Vector3(0,-1,0), 50F);
	king_safe_bishop_positive_x += Physics.RaycastAll(transform.position + new Vector3(m,10,-m),new Vector3(0,-1,0), 50F);
	king_safe_bishop_negative_x += Physics.RaycastAll(transform.position + new Vector3(-m,10,-m),new Vector3(0,-1,0), 50F);
	}
		
	if(checkDirectionsBishop(king_safe_bishop_positive_z, ally, enemy)){
	return king_safe_bishop_positive_z;
	}
	
	if(checkDirectionsBishop(king_safe_bishop_negative_z, ally, enemy)){
	return king_safe_bishop_negative_z;
	}
	
	if(checkDirectionsBishop(king_safe_bishop_positive_x, ally, enemy)){
	return king_safe_bishop_positive_x;
	}
	
	if(checkDirectionsBishop(king_safe_bishop_negative_x, ally, enemy)){
	return king_safe_bishop_negative_x;
	}
		
//---------------------------------------------------------Knight Moves ---------------------------------------------------------------

	king_safe_knight = [];

	king_safe_knight += Physics.RaycastAll(transform.position + new Vector3(-10,10,5),new Vector3(0,-1,0), 50F);
	king_safe_knight += Physics.RaycastAll(transform.position + new Vector3(-5,10,10),new Vector3(0,-1,0), 50F);
	king_safe_knight += Physics.RaycastAll(transform.position + new Vector3(5,10,10),new Vector3(0,-1,0), 50F);
	king_safe_knight += Physics.RaycastAll(transform.position + new Vector3(10,10,5),new Vector3(0,-1,0), 50F);
	king_safe_knight += Physics.RaycastAll(transform.position + new Vector3(5,10,-10),new Vector3(0,-1,0), 50F);
	king_safe_knight += Physics.RaycastAll(transform.position + new Vector3(10,10,-5),new Vector3(0,-1,0), 50F);
	king_safe_knight += Physics.RaycastAll(transform.position + new Vector3(-10,10,-5),new Vector3(0,-1,0), 50F);
	king_safe_knight += Physics.RaycastAll(transform.position + new Vector3(-5,10,-10),new Vector3(0,-1,0), 50F);
	
	for (var i : int = 0; i < king_safe_knight.Length; i++) {
			if(king_safe_knight[i].transform.gameObject.tag == enemy){
				if(king_safe_knight[i].transform.GetComponent.<knightMove>()){
				return king_safe_knight;
				}
			}
		}
		
//---------------------------------------------------------Pawn Moves -----------------------------------------------------------------

	king_safe_pawn = [];
	
	if(ally == "White"){
	side = 1;
	} else{
	side = -1;
	}

	king_safe_pawn += Physics.RaycastAll(transform.position + new Vector3(5,10,side*-5),new Vector3(0,-1,0), 50F);
	king_safe_pawn += Physics.RaycastAll(transform.position + new Vector3(-5,10,side*-5),new Vector3(0,-1,0), 50F);
	
	for (i = 0; i < king_safe_pawn.Length; i++) {
			if(king_safe_pawn[i].transform.gameObject.tag == enemy){
				if(king_safe_pawn[i].transform.GetComponent.<pawnMove>()){
				return king_safe_pawn;
				}
			}
		}
		
return [];
}

//--------------------------------------------------------- kingDoubleCheck ---------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------

function kingDoubleCheck(ally : String, enemy : String) : boolean{
var count: int = 0;

//---------------------------------------------------------Rock Moves ---------------------------------------------------------------

king_safe_rock_positive_z = [];
king_safe_rock_negative_z = [];
king_safe_rock_positive_x = [];	
king_safe_rock_negative_x = [];	
	
	
	for(var n: int = 5; n < 40; n = n+5){
	king_safe_rock_positive_z += Physics.RaycastAll(transform.position + new Vector3(0,10,n),new Vector3(0,-1,0), 50F);
	king_safe_rock_negative_z += Physics.RaycastAll(transform.position + new Vector3(0,10,-n),new Vector3(0,-1,0), 50F);
	king_safe_rock_positive_x += Physics.RaycastAll(transform.position + new Vector3(n,10,0),new Vector3(0,-1,0), 50F);
	king_safe_rock_negative_x += Physics.RaycastAll(transform.position + new Vector3(-n,10,0),new Vector3(0,-1,0), 50F);
	}

	if(checkDirectionsRock(king_safe_rock_positive_z, ally, enemy)){
	count ++;
	}
		
	if(checkDirectionsRock(king_safe_rock_negative_z, ally, enemy)){
	count ++;
	}
	
	if(checkDirectionsRock(king_safe_rock_positive_x, ally, enemy)){
	count ++;
	}
	
	if(checkDirectionsRock(king_safe_rock_negative_x, ally, enemy)){
	count ++;
	}

//---------------------------------------------------------Bishop Moves ---------------------------------------------------------------

	king_safe_bishop_positive_z = [];
	king_safe_bishop_negative_z = [];
	king_safe_bishop_positive_x = [];
	king_safe_bishop_negative_x = [];
	
	for(var m: int = 5; m < 40; m = m+5){
	king_safe_bishop_positive_z += Physics.RaycastAll(transform.position + new Vector3(m,10,m),new Vector3(0,-1,0), 50F);
	king_safe_bishop_negative_z += Physics.RaycastAll(transform.position + new Vector3(-m,10,m),new Vector3(0,-1,0), 50F);
	king_safe_bishop_positive_x += Physics.RaycastAll(transform.position + new Vector3(m,10,-m),new Vector3(0,-1,0), 50F);
	king_safe_bishop_negative_x += Physics.RaycastAll(transform.position + new Vector3(-m,10,-m),new Vector3(0,-1,0), 50F);
	}
		
	if(checkDirectionsBishop(king_safe_bishop_positive_z, ally, enemy)){
	count ++;;
	}
	
	if(checkDirectionsBishop(king_safe_bishop_negative_z, ally, enemy)){
	count ++;
	}
	
	if(checkDirectionsBishop(king_safe_bishop_positive_x, ally, enemy)){
	count ++;
	}
	
	if(checkDirectionsBishop(king_safe_bishop_negative_x, ally, enemy)){
	count ++;
	}
		
//---------------------------------------------------------Knight Moves ---------------------------------------------------------------

	king_safe_knight = [];

	king_safe_knight += Physics.RaycastAll(transform.position + new Vector3(-10,10,5),new Vector3(0,-1,0), 50F);
	king_safe_knight += Physics.RaycastAll(transform.position + new Vector3(-5,10,10),new Vector3(0,-1,0), 50F);
	king_safe_knight += Physics.RaycastAll(transform.position + new Vector3(5,10,10),new Vector3(0,-1,0), 50F);
	king_safe_knight += Physics.RaycastAll(transform.position + new Vector3(10,10,5),new Vector3(0,-1,0), 50F);
	king_safe_knight += Physics.RaycastAll(transform.position + new Vector3(5,10,-10),new Vector3(0,-1,0), 50F);
	king_safe_knight += Physics.RaycastAll(transform.position + new Vector3(10,10,-5),new Vector3(0,-1,0), 50F);
	king_safe_knight += Physics.RaycastAll(transform.position + new Vector3(-10,10,-5),new Vector3(0,-1,0), 50F);
	king_safe_knight += Physics.RaycastAll(transform.position + new Vector3(-5,10,-10),new Vector3(0,-1,0), 50F);
	
	for (var i : int = 0; i < king_safe_knight.Length; i++) {
			if(king_safe_knight[i].transform.gameObject.tag == enemy){
				if(king_safe_knight[i].transform.GetComponent.<knightMove>()){
				count ++;
				}
			}
		}
		
//---------------------------------------------------------Pawn Moves -----------------------------------------------------------------

	king_safe_pawn = [];
	
	if(ally == "White"){
	side = 1;
	} else{
	side = -1;
	}

	king_safe_pawn += Physics.RaycastAll(transform.position + new Vector3(5,10,side*-5),new Vector3(0,-1,0), 50F);
	king_safe_pawn += Physics.RaycastAll(transform.position + new Vector3(-5,10,side*-5),new Vector3(0,-1,0), 50F);
	
	for (i = 0; i < king_safe_pawn.Length; i++) {
			if(king_safe_pawn[i].transform.gameObject.tag == enemy){
				if(king_safe_pawn[i].transform.GetComponent.<pawnMove>()){
				count ++;
				}
			}
		}
if(count == 2){
return true;
} else{
return false;
}
		
}

//--------------------------------------------------------- Checkmate ---------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------

public function checkmateDirections(king_safe : RaycastHit[]) : boolean{
		for (var i: int = 0; i < king_safe.Length; i++) {
			if(king_safe[i].transform.GetComponent.<Move>()){//se esta em check
					if(king_safe[i].transform.GetComponent.<Move>().protectKing) {
						if(!game.GetComponent(gameManager).whiteTurn){  //se e o turno das pretas
							if(king_safe[i].transform.GetComponent.<Move>().whiteOccupied){
							break;  //para o for, pois achou uma peca
							} else{
								if(king_safe[i].transform.GetComponent.<Move>().blackOccupied){  //se esta ocupado pelo preto
								return false;  //pode comer a peca preta
								} 
							}
						} 
						else{  //se e o turno das pretas
							if(king_safe[i].transform.GetComponent.<Move>().whiteOccupied){  //se esta ocupado pelas brancas
							return false;   //pode comer a peca branca
							} else{  //se esta ocupado pelas pretas
								if(king_safe[i].transform.GetComponent.<Move>().blackOccupied){  //se esta ocupado pelas pretas
								break;  //para o for
								}
							}
						}	
						//se nao achar uma peca
					return false; 
					}
					if((king_safe[i].transform.GetComponent.<Move>().whiteOccupied)  || (king_safe[i].transform.GetComponent.<Move>().blackOccupied)){ //se tiver alguma peca no caminho ate o protectKing
					break;  //para o for
					 }
			}
		}
		return true;
}

function Checkmate(ally : String, enemy : String){
kingDefense = GameObject.FindGameObjectsWithTag(ally);
var i : int;
for (var j: int = 0; j < kingDefense.Length; j++) {

//--------------------------------------------------------- Pawn ---------------------------------------------------------------

	if (kingDefense[j].transform.GetComponent.<pawnMove>()){
	
	
	king_safe_pawn = [];
	king_safe_pawn_captures = [];
	if(ally == "White"){
	side = 1;
	} else{
	side = -1;
	}
	
	 	if (kingDefense[j].transform.GetComponent.<pawnMove>().firstMove) {
 	
 	king_safe_pawn += Physics.RaycastAll(kingDefense[j].transform.position + new Vector3(0,10,side * -5),new Vector3(0,-1,0), 50F);
	king_safe_pawn += Physics.RaycastAll(kingDefense[j].transform.position + new Vector3(0,10,side * -10),new Vector3(0,-1,0), 50F);
	
	if(side==1){
		if(!kingDefense[j].transform.GetComponent.<pawnMove>().defendingKingBishopZ){
		king_safe_pawn_captures += Physics.RaycastAll(kingDefense[j].transform.position + new Vector3(5,10,side * -5),new Vector3(0,-1,0), 50F);
		}
		if(!kingDefense[j].transform.GetComponent.<pawnMove>().defendingKingBishopX){
		king_safe_pawn_captures += Physics.RaycastAll(kingDefense[j].transform.position + new Vector3(-5,10,side * -5),new Vector3(0,-1,0), 50F);
		}
	} else{
		if(!kingDefense[j].transform.GetComponent.<pawnMove>().defendingKingBishopX){
		king_safe_pawn_captures += Physics.RaycastAll(kingDefense[j].transform.position + new Vector3(5,10,side * -5),new Vector3(0,-1,0), 50F);
		}
		if(!kingDefense[j].transform.GetComponent.<pawnMove>().defendingKingBishopZ){
		king_safe_pawn_captures += Physics.RaycastAll(kingDefense[j].transform.position + new Vector3(-5,10,side * -5),new Vector3(0,-1,0), 50F);
		}
	}
	
	if(!kingDefense[j].transform.GetComponent.<pawnMove>().defendingKingRockX){
	if((!kingDefense[j].transform.GetComponent.<pawnMove>().defendingKingBishopZ) && (!kingDefense[j].transform.GetComponent.<pawnMove>().defendingKingBishopX)){
		for (i = 0; i < king_safe_pawn.Length; i++) {
			if(king_safe_pawn[i].transform.GetComponent.<Move>()){
						if(king_safe_pawn[i].transform.GetComponent.<Move>().protectKing) { 
							if((king_safe_pawn[i].transform.GetComponent.<Move>().whiteOccupied) || (king_safe_pawn[i].transform.GetComponent.<Move>().blackOccupied)){
							break; //retorna true se achar uma peca. Pinta de vermelho se for inimigo. Nao pinta se for amigo.
							} else{
							return false;
							}
							//se nao achar uma peca
							}
							if((king_safe_pawn[i].transform.GetComponent.<Move>().whiteOccupied) || (king_safe_pawn[i].transform.GetComponent.<Move>().blackOccupied)){
							break; //retorna true se achar uma peca. Pinta de vermelho se for inimigo. Nao pinta se for amigo.
							} 	
			}
		}
		}
		
	if(!kingDefense[j].transform.GetComponent.<pawnMove>().defendingKingRockZ){	
		for (i = 0; i < king_safe_pawn_captures.Length; i++) {
			if(king_safe_pawn_captures[i].transform.GetComponent.<Move>()){	
					if(king_safe_pawn_captures[i].transform.GetComponent.<Move>().protectKing) {
						if(!game.GetComponent(gameManager).whiteTurn){
							if(king_safe_pawn_captures[i].transform.GetComponent.<Move>().blackOccupied){
							return false;
							}
						} else {
							if(king_safe_pawn_captures[i].transform.GetComponent.<Move>().whiteOccupied){
							return false;
							}
						}
					}
			}
		}
		}
		}
		
	}
	else{
	
	king_safe_pawn += Physics.RaycastAll(kingDefense[j].transform.position + new Vector3(0,10,side * -5),new Vector3(0,-1,0), 50F);
	
		if(side==1){
		if(!kingDefense[j].transform.GetComponent.<pawnMove>().defendingKingBishopZ){
		king_safe_pawn_captures += Physics.RaycastAll(kingDefense[j].transform.position + new Vector3(5,10,side * -5),new Vector3(0,-1,0), 50F);
		}
		if(!kingDefense[j].transform.GetComponent.<pawnMove>().defendingKingBishopX){
		king_safe_pawn_captures += Physics.RaycastAll(kingDefense[j].transform.position + new Vector3(-5,10,side * -5),new Vector3(0,-1,0), 50F);
		}
	} else{
		if(!kingDefense[j].transform.GetComponent.<pawnMove>().defendingKingBishopX){
		king_safe_pawn_captures += Physics.RaycastAll(kingDefense[j].transform.position + new Vector3(5,10,side * -5),new Vector3(0,-1,0), 50F);
		}
		if(!kingDefense[j].transform.GetComponent.<pawnMove>().defendingKingBishopZ){
		king_safe_pawn_captures += Physics.RaycastAll(kingDefense[j].transform.position + new Vector3(-5,10,side * -5),new Vector3(0,-1,0), 50F);
		}
	}
	
	if(!kingDefense[j].transform.GetComponent.<pawnMove>().defendingKingRockX){
	if((!kingDefense[j].transform.GetComponent.<pawnMove>().defendingKingBishopZ) && (!kingDefense[j].transform.GetComponent.<pawnMove>().defendingKingBishopX)){
			for (i = 0; i < king_safe_pawn.Length; i++) {
			if(king_safe_pawn[i].transform.GetComponent.<Move>()){
						if(king_safe_pawn[i].transform.GetComponent.<Move>().protectKing) { 
							if((king_safe_pawn[i].transform.GetComponent.<Move>().whiteOccupied) || (king_safe_pawn[i].transform.GetComponent.<Move>().blackOccupied)){
							break; //retorna true se achar uma peca. Pinta de vermelho se for inimigo. Nao pinta se for amigo.
							} else{
							return false;
							}
							//se nao achar uma peca
							}
							if((king_safe_pawn[i].transform.GetComponent.<Move>().whiteOccupied) || (king_safe_pawn[i].transform.GetComponent.<Move>().blackOccupied)){
							break; //retorna true se achar uma peca. Pinta de vermelho se for inimigo. Nao pinta se for amigo.
							} 	
			}
		}
		}
		
	if(!kingDefense[j].transform.GetComponent.<pawnMove>().defendingKingRockZ){	
		for (i = 0; i < king_safe_pawn_captures.Length; i++) {
			if(king_safe_pawn_captures[i].transform.GetComponent.<Move>()){
					if(king_safe_pawn_captures[i].transform.GetComponent.<Move>().protectKing) {
						if(!game.GetComponent(gameManager).whiteTurn){
							if(king_safe_pawn_captures[i].transform.GetComponent.<Move>().blackOccupied){
							return false;
							}
						} else {
							if(king_safe_pawn_captures[i].transform.GetComponent.<Move>().whiteOccupied){
							return false;
							}
						}
					}	
			}
		}
		}
		}
		
	}
	
	}

//--------------------------------------------------------- Rock ---------------------------------------------------------------
			
if (kingDefense[j].transform.GetComponent.<rockMove>()){
king_safe_rock_positive_z = [];
king_safe_rock_negative_z = [];
king_safe_rock_positive_x = [];	
king_safe_rock_negative_x = [];	
	
	
	for(var n: int = 5; n < 40; n = n+5){
	king_safe_rock_positive_z += Physics.RaycastAll(kingDefense[j].transform.position + new Vector3(0,10,n),new Vector3(0,-1,0), 50F);
	king_safe_rock_negative_z += Physics.RaycastAll(kingDefense[j].transform.position + new Vector3(0,10,-n),new Vector3(0,-1,0), 50F);
	king_safe_rock_positive_x += Physics.RaycastAll(kingDefense[j].transform.position + new Vector3(n,10,0),new Vector3(0,-1,0), 50F);
	king_safe_rock_negative_x += Physics.RaycastAll(kingDefense[j].transform.position + new Vector3(-n,10,0),new Vector3(0,-1,0), 50F);
	}

	//move rocks on positive z
	if((!kingDefense[j].transform.GetComponent.<rockMove>().defendingKingBishopZ) && 
	(!kingDefense[j].transform.GetComponent.<rockMove>().defendingKingBishopX)){
	if(!kingDefense[j].transform.GetComponent.<rockMove>().defendingKingRockX){
		if(!checkmateDirections(king_safe_rock_positive_z)){
		return false;
		}		
		//move rocks on negative z	
		if(!checkmateDirections(king_safe_rock_negative_z)){
		return false;
		}		
	}
	if(!kingDefense[j].transform.GetComponent.<rockMove>().defendingKingRockZ){
		//move rocks on positive x	
		if(!checkmateDirections(king_safe_rock_positive_x)){
		return false;
		}				
		//move rocks on negative x		
		if(!checkmateDirections(king_safe_rock_negative_x)){
		return false;
		}
	}
	}
		
}

//--------------------------------------------------------- Bishop ---------------------------------------------------------------
		
if (kingDefense[j].transform.GetComponent.<bishopMove>()){
king_safe_bishop_positive_z = [];
king_safe_bishop_negative_z = [];
king_safe_bishop_positive_x = [];
king_safe_bishop_negative_x = [];
	
for(var m: int = 5; m < 40; m = m+5){
	king_safe_bishop_positive_z += Physics.RaycastAll(kingDefense[j].transform.position + new Vector3(m,10,m),new Vector3(0,-1,0), 50F);
	king_safe_bishop_negative_z += Physics.RaycastAll(kingDefense[j].transform.position + new Vector3(-m,10,m),new Vector3(0,-1,0), 50F);
	king_safe_bishop_positive_x += Physics.RaycastAll(kingDefense[j].transform.position + new Vector3(m,10,-m),new Vector3(0,-1,0), 50F);
	king_safe_bishop_negative_x += Physics.RaycastAll(kingDefense[j].transform.position + new Vector3(-m,10,-m),new Vector3(0,-1,0), 50F);
}

//move rocks on positive z
	if((!kingDefense[j].transform.GetComponent.<bishopMove>().defendingKingRockZ) && 
	(!kingDefense[j].transform.GetComponent.<bishopMove>().defendingKingRockX)){
	if(!kingDefense[j].transform.GetComponent.<bishopMove>().defendingKingBishopX){
		if(!checkmateDirections(king_safe_bishop_positive_z)){
		return false;
		}	
		//move rocks on negative z	
		if(!checkmateDirections(king_safe_bishop_negative_x)){
		return false;
		}
	}
	if(!kingDefense[j].transform.GetComponent.<bishopMove>().defendingKingBishopZ){
		//move rocks on positive x		
		if(!checkmateDirections(king_safe_bishop_positive_x)){
		return false;
		}	
		//move rocks on negative x	
		if(!checkmateDirections(king_safe_bishop_negative_z)){
		return false;
		}
	}
	}
		
	}
	
//--------------------------------------------------------- King ---------------------------------------------------------------
		
	if (kingDefense[j].transform.GetComponent.<kingMove>()){
	
	 if(kingSafe(0,0,5, ally, enemy)){
	return false;
	}
	if(kingSafe(5,0,5, ally, enemy)){
	return false;
	}
	if(kingSafe(5,0,0, ally, enemy)){
	return false;
	}
	if(kingSafe(5,0,-5, ally, enemy)){
	return false;
	}
	if(kingSafe(0,0,-5, ally, enemy)){
	return false;
	}
	if(kingSafe(-5,0,-5, ally, enemy)){
	return false;
	}
	if(kingSafe(-5,0,0, ally, enemy)){
	return false;
	}
	if(kingSafe(-5,0,5, ally, enemy)){
	return false;
	}
	
	}
		
//--------------------------------------------------------- Knight ---------------------------------------------------------------
		
	if (kingDefense[j].transform.GetComponent.<knightMove>()){
	
	king_safe_knight = [];

	king_safe_knight += Physics.RaycastAll(kingDefense[j].transform.position + new Vector3(-10,10,5),new Vector3(0,-1,0), 50F);
	king_safe_knight += Physics.RaycastAll(kingDefense[j].transform.position + new Vector3(-5,10,10),new Vector3(0,-1,0), 50F);
	king_safe_knight += Physics.RaycastAll(kingDefense[j].transform.position + new Vector3(5,10,10),new Vector3(0,-1,0), 50F);
	king_safe_knight += Physics.RaycastAll(kingDefense[j].transform.position + new Vector3(10,10,5),new Vector3(0,-1,0), 50F);
	king_safe_knight += Physics.RaycastAll(kingDefense[j].transform.position + new Vector3(5,10,-10),new Vector3(0,-1,0), 50F);
	king_safe_knight += Physics.RaycastAll(kingDefense[j].transform.position + new Vector3(10,10,-5),new Vector3(0,-1,0), 50F);
	king_safe_knight += Physics.RaycastAll(kingDefense[j].transform.position + new Vector3(-10,10,-5),new Vector3(0,-1,0), 50F);
	king_safe_knight += Physics.RaycastAll(kingDefense[j].transform.position + new Vector3(-5,10,-10),new Vector3(0,-1,0), 50F);
	
	if((!kingDefense[j].transform.GetComponent.<knightMove>().defendingKingRockZ) && (!kingDefense[j].transform.GetComponent.<knightMove>().defendingKingRockX)){
	if((!kingDefense[j].transform.GetComponent.<knightMove>().defendingKingBishopZ) && (!kingDefense[j].transform.GetComponent.<knightMove>().defendingKingBishopX)){
		for (i = 0; i < king_safe_knight.Length; i++) {
			if(king_safe_knight[i].transform.GetComponent.<Move>()){
				if(king_safe_knight[i].transform.GetComponent.<Move>().protectKing) {
					if((king_safe_knight[i].transform.GetComponent.<Move>().whiteOccupied) || (king_safe_knight[i].transform.GetComponent.<Move>().blackOccupied)){ 
							if(game.GetComponent(gameManager).whiteTurn){
								if(king_safe_knight[i].transform.GetComponent.<Move>().blackOccupied){
							return false;
								}
							} else {
								if(king_safe_knight[i].transform.GetComponent.<Move>().whiteOccupied){
							return false;
								}	
							} 
							}else{
							return false;
							}
				}
			}
		}
	}
	}

	
	}

//--------------------------------------------------------- Queen ---------------------------------------------------------------

if (kingDefense[j].transform.GetComponent.<queenMove>()){
	
king_safe_rock_positive_z = [];
king_safe_rock_negative_z = [];
king_safe_rock_positive_x = [];	
king_safe_rock_negative_x = [];	
	
	
	for(var o: int = 5; o < 40; o = o+5){
	king_safe_rock_positive_z += Physics.RaycastAll(kingDefense[j].transform.position + new Vector3(0,10,o),new Vector3(0,-1,0), 50F);
	king_safe_rock_negative_z += Physics.RaycastAll(kingDefense[j].transform.position + new Vector3(0,10,-o),new Vector3(0,-1,0), 50F);
	king_safe_rock_positive_x += Physics.RaycastAll(kingDefense[j].transform.position + new Vector3(o,10,0),new Vector3(0,-1,0), 50F);
	king_safe_rock_negative_x += Physics.RaycastAll(kingDefense[j].transform.position + new Vector3(-o,10,0),new Vector3(0,-1,0), 50F);
	}

	if((!kingDefense[j].transform.GetComponent.<queenMove>().defendingKingBishopZ) && 
	(!kingDefense[j].transform.GetComponent.<queenMove>().defendingKingBishopX)){
	if(!kingDefense[j].transform.GetComponent.<queenMove>().defendingKingRockX){
		if(!checkmateDirections(king_safe_rock_positive_z)){
		return false;
		}		
		//move rocks on negative z	
		if(!checkmateDirections(king_safe_rock_negative_z)){
		return false;
		}		
	}
	if(!kingDefense[j].transform.GetComponent.<queenMove>().defendingKingRockZ){
		//move rocks on positive x	
		if(!checkmateDirections(king_safe_rock_positive_x)){
		return false;
		}				
		//move rocks on negative x		
		if(!checkmateDirections(king_safe_rock_negative_x)){
		return false;
		}
	}
	}

	
king_safe_bishop_positive_z = [];
king_safe_bishop_negative_z = [];
king_safe_bishop_positive_x = [];
king_safe_bishop_negative_x = [];
	
for(var p: int = 5; p < 40; p = p+5){
	king_safe_bishop_positive_z += Physics.RaycastAll(kingDefense[j].transform.position + new Vector3(p,10,p),new Vector3(0,-1,0), 50F);
	king_safe_bishop_negative_z += Physics.RaycastAll(kingDefense[j].transform.position + new Vector3(-p,10,p),new Vector3(0,-1,0), 50F);
	king_safe_bishop_positive_x += Physics.RaycastAll(kingDefense[j].transform.position + new Vector3(p,10,-p),new Vector3(0,-1,0), 50F);
	king_safe_bishop_negative_x += Physics.RaycastAll(kingDefense[j].transform.position + new Vector3(-p,10,-p),new Vector3(0,-1,0), 50F);
}

	if((!kingDefense[j].transform.GetComponent.<queenMove>().defendingKingRockZ) && 
	(!kingDefense[j].transform.GetComponent.<queenMove>().defendingKingRockX)){
	if(!kingDefense[j].transform.GetComponent.<queenMove>().defendingKingBishopX){
		if(!checkmateDirections(king_safe_bishop_positive_z)){
		return false;
		}	
		//move rocks on negative z	
		if(!checkmateDirections(king_safe_bishop_negative_x)){
		return false;
		}
	}
	if(!kingDefense[j].transform.GetComponent.<queenMove>().defendingKingBishopZ){
		//move rocks on positive x		
		if(!checkmateDirections(king_safe_bishop_positive_x)){
		return false;
		}	
		//move rocks on negative x	
		if(!checkmateDirections(king_safe_bishop_negative_z)){
		return false;
		}
	}
	}
	
	}

}
return true;
}



//--------------------------------------------------------- Draw ---------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------

public function drawDirections(king_safe : RaycastHit[]) : boolean{		
		for (var i: int = 0; i < king_safe.Length; i++) {
			if(king_safe[i].transform.GetComponent.<Move>()){
					if(!game.GetComponent(gameManager).whiteTurn){  //se e o turno das brancas
					if(king_safe[i].transform.GetComponent.<Move>().whiteOccupied){
					break;  //para o for, pois achou uma peca
					} else{
						if(king_safe[i].transform.GetComponent.<Move>().blackOccupied){  //se esta ocupado pelo preto
						return false;
						} 

					}
				} 
				else{  //se e o turno das pretas
					if(king_safe[i].transform.GetComponent.<Move>().whiteOccupied){  //se esta ocupado pelas brancas
					return false;
					} else{  //se esta ocupado pelas pretas
						if(king_safe[i].transform.GetComponent.<Move>().blackOccupied){  //se esta ocupado pelas pretas
						break;;  //para o for
						}
					}
				}
				return false;
			}
		}
		return true;
}

function Draw(ally : String, enemy : String){
piecesMoves = GameObject.FindGameObjectsWithTag(ally);
var i : int;
for (var j: int = 0; j < piecesMoves.Length; j++) {

//--------------------------------------------------------- Pawn ---------------------------------------------------------------

	if (piecesMoves[j].transform.GetComponent.<pawnMove>()){
	
	
	king_safe_pawn = [];
	king_safe_pawn_captures = [];
	if(ally == "White"){
	side = 1;
	} else{
	side = -1;
	}
	
	 	if (piecesMoves[j].transform.GetComponent.<pawnMove>().firstMove) {
 	
 	king_safe_pawn += Physics.RaycastAll(piecesMoves[j].transform.position + new Vector3(0,10,side * -5),new Vector3(0,-1,0), 50F);
	king_safe_pawn += Physics.RaycastAll(piecesMoves[j].transform.position + new Vector3(0,10,side * -10),new Vector3(0,-1,0), 50F);
	
	if(side==1){
		if(!piecesMoves[j].transform.GetComponent.<pawnMove>().defendingKingBishopZ){
		king_safe_pawn_captures += Physics.RaycastAll(piecesMoves[j].transform.position + new Vector3(5,10,side * -5),new Vector3(0,-1,0), 50F);
		}
		if(!piecesMoves[j].transform.GetComponent.<pawnMove>().defendingKingBishopX){
		king_safe_pawn_captures += Physics.RaycastAll(piecesMoves[j].transform.position + new Vector3(-5,10,side * -5),new Vector3(0,-1,0), 50F);
		}
	} else{
		if(!piecesMoves[j].transform.GetComponent.<pawnMove>().defendingKingBishopX){
		king_safe_pawn_captures += Physics.RaycastAll(piecesMoves[j].transform.position + new Vector3(5,10,side * -5),new Vector3(0,-1,0), 50F);
		}
		if(!piecesMoves[j].transform.GetComponent.<pawnMove>().defendingKingBishopZ){
		king_safe_pawn_captures += Physics.RaycastAll(piecesMoves[j].transform.position + new Vector3(-5,10,side * -5),new Vector3(0,-1,0), 50F);
		}
	}
	
	if(!piecesMoves[j].transform.GetComponent.<pawnMove>().defendingKingRockX){
	if((!piecesMoves[j].transform.GetComponent.<pawnMove>().defendingKingBishopZ) && (!piecesMoves[j].transform.GetComponent.<pawnMove>().defendingKingBishopX)){
		for (i = 0; i < king_safe_pawn.Length; i++) {
			if(king_safe_pawn[i].transform.GetComponent.<Move>()){
					 if((king_safe_pawn[i].transform.GetComponent.<Move>().whiteOccupied) || (king_safe_pawn[i].transform.GetComponent.<Move>().blackOccupied)){
					 break;
					 } else{
					 return false;
					 }
			}
		}
		}
		
	if(!piecesMoves[j].transform.GetComponent.<pawnMove>().defendingKingRockZ){	
		for (i = 0; i < king_safe_pawn_captures.Length; i++) {
			if(king_safe_pawn_captures[i].transform.GetComponent.<Move>()){
					if((king_safe_pawn_captures[i].transform.GetComponent.<Move>().whiteOccupied) || (king_safe_pawn_captures[i].transform.GetComponent.<Move>().blackOccupied)){
			 			if(!game.GetComponent(gameManager).whiteTurn){
							if(king_safe_pawn_captures[i].transform.GetComponent.<Move>().blackOccupied){
							return false;
							}
						} else {
							if(king_safe_pawn_captures[i].transform.GetComponent.<Move>().whiteOccupied){
							return false;
							}
						
						}
					}
			}
		}
		
		}
		}
		
	}
	else{
	
	king_safe_pawn += Physics.RaycastAll(piecesMoves[j].transform.position + new Vector3(0,10,side * -5),new Vector3(0,-1,0), 50F);
	
		if(side==1){
		if(!piecesMoves[j].transform.GetComponent.<pawnMove>().defendingKingBishopZ){
		king_safe_pawn_captures += Physics.RaycastAll(piecesMoves[j].transform.position + new Vector3(5,10,side * -5),new Vector3(0,-1,0), 50F);
		}
		if(!piecesMoves[j].transform.GetComponent.<pawnMove>().defendingKingBishopX){
		king_safe_pawn_captures += Physics.RaycastAll(piecesMoves[j].transform.position + new Vector3(-5,10,side * -5),new Vector3(0,-1,0), 50F);
		}
	} else{
		if(!piecesMoves[j].transform.GetComponent.<pawnMove>().defendingKingBishopX){
		king_safe_pawn_captures += Physics.RaycastAll(piecesMoves[j].transform.position + new Vector3(5,10,side * -5),new Vector3(0,-1,0), 50F);
		}
		if(!piecesMoves[j].transform.GetComponent.<pawnMove>().defendingKingBishopZ){
		king_safe_pawn_captures += Physics.RaycastAll(piecesMoves[j].transform.position + new Vector3(-5,10,side * -5),new Vector3(0,-1,0), 50F);
		}
	}
	
	if(!piecesMoves[j].transform.GetComponent.<pawnMove>().defendingKingRockX){
	if((!piecesMoves[j].transform.GetComponent.<pawnMove>().defendingKingBishopZ) && (!piecesMoves[j].transform.GetComponent.<pawnMove>().defendingKingBishopX)){
			for (i = 0; i < king_safe_pawn.Length; i++) {
			if(king_safe_pawn[i].transform.GetComponent.<Move>()){
					 if((king_safe_pawn[i].transform.GetComponent.<Move>().whiteOccupied) || (king_safe_pawn[i].transform.GetComponent.<Move>().blackOccupied)){
					 break;
					 } else{
					 return false;
					 }
			}
		}
		}
		
	if(!piecesMoves[j].transform.GetComponent.<pawnMove>().defendingKingRockZ){	
		for (i = 0; i < king_safe_pawn_captures.Length; i++) {
			if(king_safe_pawn_captures[i].transform.GetComponent.<Move>()){
					if((king_safe_pawn_captures[i].transform.GetComponent.<Move>().whiteOccupied) || (king_safe_pawn_captures[i].transform.GetComponent.<Move>().blackOccupied)){
			 			if(!game.GetComponent(gameManager).whiteTurn){
							if(king_safe_pawn_captures[i].transform.GetComponent.<Move>().blackOccupied){
							return false;
							}
						} else {
							if(king_safe_pawn_captures[i].transform.GetComponent.<Move>().whiteOccupied){
							return false;
							}
						
						}
					}
			}
		}
		}
		}
		
	}
	
	}

//--------------------------------------------------------- Rock ---------------------------------------------------------------
			
if (piecesMoves[j].transform.GetComponent.<rockMove>()){
king_safe_rock_positive_z = [];
king_safe_rock_negative_z = [];
king_safe_rock_positive_x = [];	
king_safe_rock_negative_x = [];	
	
	
	for(var n: int = 5; n < 40; n = n+5){
	king_safe_rock_positive_z += Physics.RaycastAll(piecesMoves[j].transform.position + new Vector3(0,10,n),new Vector3(0,-1,0), 50F);
	king_safe_rock_negative_z += Physics.RaycastAll(piecesMoves[j].transform.position + new Vector3(0,10,-n),new Vector3(0,-1,0), 50F);
	king_safe_rock_positive_x += Physics.RaycastAll(piecesMoves[j].transform.position + new Vector3(n,10,0),new Vector3(0,-1,0), 50F);
	king_safe_rock_negative_x += Physics.RaycastAll(piecesMoves[j].transform.position + new Vector3(-n,10,0),new Vector3(0,-1,0), 50F);
	}

	//move rocks on positive z
	if((!piecesMoves[j].transform.GetComponent.<rockMove>().defendingKingBishopZ) && 
	(!piecesMoves[j].transform.GetComponent.<rockMove>().defendingKingBishopX)){
	if(!piecesMoves[j].transform.GetComponent.<rockMove>().defendingKingRockX){
		if(!drawDirections(king_safe_rock_positive_z)){
		return false;
		}		
		//move rocks on negative z	
		if(!drawDirections(king_safe_rock_negative_z)){
		return false;
		}		
	}
	if(!piecesMoves[j].transform.GetComponent.<rockMove>().defendingKingRockZ){
		//move rocks on positive x	
		if(!drawDirections(king_safe_rock_positive_x)){
		return false;
		}				
		//move rocks on negative x		
		if(!drawDirections(king_safe_rock_negative_x)){
		return false;
		}
	}
	}
		
}

//--------------------------------------------------------- Bishop ---------------------------------------------------------------
		
if (piecesMoves[j].transform.GetComponent.<bishopMove>()){
king_safe_bishop_positive_z = [];
king_safe_bishop_negative_z = [];
king_safe_bishop_positive_x = [];
king_safe_bishop_negative_x = [];
	
for(var m: int = 5; m < 40; m = m+5){
	king_safe_bishop_positive_z += Physics.RaycastAll(piecesMoves[j].transform.position + new Vector3(m,10,m),new Vector3(0,-1,0), 50F);
	king_safe_bishop_negative_z += Physics.RaycastAll(piecesMoves[j].transform.position + new Vector3(-m,10,m),new Vector3(0,-1,0), 50F);
	king_safe_bishop_positive_x += Physics.RaycastAll(piecesMoves[j].transform.position + new Vector3(m,10,-m),new Vector3(0,-1,0), 50F);
	king_safe_bishop_negative_x += Physics.RaycastAll(piecesMoves[j].transform.position + new Vector3(-m,10,-m),new Vector3(0,-1,0), 50F);
}

//move rocks on positive z
	if((!piecesMoves[j].transform.GetComponent.<bishopMove>().defendingKingRockZ) && 
	(!piecesMoves[j].transform.GetComponent.<bishopMove>().defendingKingRockX)){
	if(!piecesMoves[j].transform.GetComponent.<bishopMove>().defendingKingBishopX){
		if(!drawDirections(king_safe_bishop_positive_z)){
		return false;
		}	
		//move rocks on negative z	
		if(!drawDirections(king_safe_bishop_negative_x)){
		return false;
		}
	}
	if(!piecesMoves[j].transform.GetComponent.<bishopMove>().defendingKingBishopZ){
		//move rocks on positive x		
		if(!drawDirections(king_safe_bishop_positive_x)){
		return false;
		}	
		//move rocks on negative x	
		if(!drawDirections(king_safe_bishop_negative_z)){
		return false;
		}
	}
	}
		
	}
	
//--------------------------------------------------------- King ---------------------------------------------------------------
		
	if (piecesMoves[j].transform.GetComponent.<kingMove>()){
	
	 if(kingSafe(0,0,5, ally, enemy)){
	return false;
	}
	if(kingSafe(5,0,5, ally, enemy)){
	return false;
	}
	if(kingSafe(5,0,0, ally, enemy)){
	return false;
	}
	if(kingSafe(5,0,-5, ally, enemy)){
	return false;
	}
	if(kingSafe(0,0,-5, ally, enemy)){
	return false;
	}
	if(kingSafe(-5,0,-5, ally, enemy)){
	return false;
	}
	if(kingSafe(-5,0,0, ally, enemy)){
	return false;
	}
	if(kingSafe(-5,0,5, ally, enemy)){
	return false;
	}
	
	}
		
//--------------------------------------------------------- Knight ---------------------------------------------------------------
	
	if (piecesMoves[j].transform.GetComponent.<knightMove>()){
	
	king_safe_knight = [];

	king_safe_knight += Physics.RaycastAll(piecesMoves[j].transform.position + new Vector3(-10,10,5),new Vector3(0,-1,0), 50F);
	king_safe_knight += Physics.RaycastAll(piecesMoves[j].transform.position + new Vector3(-5,10,10),new Vector3(0,-1,0), 50F);
	king_safe_knight += Physics.RaycastAll(piecesMoves[j].transform.position + new Vector3(5,10,10),new Vector3(0,-1,0), 50F);
	king_safe_knight += Physics.RaycastAll(piecesMoves[j].transform.position + new Vector3(10,10,5),new Vector3(0,-1,0), 50F);
	king_safe_knight += Physics.RaycastAll(piecesMoves[j].transform.position + new Vector3(5,10,-10),new Vector3(0,-1,0), 50F);
	king_safe_knight += Physics.RaycastAll(piecesMoves[j].transform.position + new Vector3(10,10,-5),new Vector3(0,-1,0), 50F);
	king_safe_knight += Physics.RaycastAll(piecesMoves[j].transform.position + new Vector3(-10,10,-5),new Vector3(0,-1,0), 50F);
	king_safe_knight += Physics.RaycastAll(piecesMoves[j].transform.position + new Vector3(-5,10,-10),new Vector3(0,-1,0), 50F);
	
	if((!piecesMoves[j].transform.GetComponent.<knightMove>().defendingKingRockZ) && (!piecesMoves[j].transform.GetComponent.<knightMove>().defendingKingRockX)){
	if((!piecesMoves[j].transform.GetComponent.<knightMove>().defendingKingBishopZ) && (!piecesMoves[j].transform.GetComponent.<knightMove>().defendingKingBishopX)){
	
		for (i = 0; i < king_safe_knight.Length; i++) {
			if(king_safe_knight[i].transform.GetComponent.<Move>()){
					 if((king_safe_knight[i].transform.GetComponent.<Move>().whiteOccupied) || (king_safe_knight[i].transform.GetComponent.<Move>().blackOccupied)){
						if(!game.GetComponent(gameManager).whiteTurn){
							if(king_safe_knight[i].transform.GetComponent.<Move>().blackOccupied){
							return false;
							}
						} else {
							if(king_safe_knight[i].transform.GetComponent.<Move>().whiteOccupied){
							return false;
							}
						
						}
					 } else{
					 return false;
					 }
			}
		}	
	}
	}

	
	}

//--------------------------------------------------------- Queen ---------------------------------------------------------------

if (piecesMoves[j].transform.GetComponent.<queenMove>()){
	
king_safe_rock_positive_z = [];
king_safe_rock_negative_z = [];
king_safe_rock_positive_x = [];	
king_safe_rock_negative_x = [];	
	
	
	for(var o: int = 5; o < 40; o = o+5){
	king_safe_rock_positive_z += Physics.RaycastAll(piecesMoves[j].transform.position + new Vector3(0,10,o),new Vector3(0,-1,0), 50F);
	king_safe_rock_negative_z += Physics.RaycastAll(piecesMoves[j].transform.position + new Vector3(0,10,-o),new Vector3(0,-1,0), 50F);
	king_safe_rock_positive_x += Physics.RaycastAll(piecesMoves[j].transform.position + new Vector3(o,10,0),new Vector3(0,-1,0), 50F);
	king_safe_rock_negative_x += Physics.RaycastAll(piecesMoves[j].transform.position + new Vector3(-o,10,0),new Vector3(0,-1,0), 50F);
	}

	if((!piecesMoves[j].transform.GetComponent.<queenMove>().defendingKingBishopZ) && 
	(!piecesMoves[j].transform.GetComponent.<queenMove>().defendingKingBishopX)){
	if(!piecesMoves[j].transform.GetComponent.<queenMove>().defendingKingRockX){
		if(!drawDirections(king_safe_rock_positive_z)){
		return false;
		}		
		//move rocks on negative z	
		if(!drawDirections(king_safe_rock_negative_z)){
		return false;
		}		
	}
	if(!piecesMoves[j].transform.GetComponent.<queenMove>().defendingKingRockZ){
		//move rocks on positive x	
		if(!drawDirections(king_safe_rock_positive_x)){
		return false;
		}				
		//move rocks on negative x		
		if(!drawDirections(king_safe_rock_negative_x)){
		return false;
		}
	}
	}

	
king_safe_bishop_positive_z = [];
king_safe_bishop_negative_z = [];
king_safe_bishop_positive_x = [];
king_safe_bishop_negative_x = [];
	
for(var p: int = 5; p < 40; p = p+5){
	king_safe_bishop_positive_z += Physics.RaycastAll(piecesMoves[j].transform.position + new Vector3(p,10,p),new Vector3(0,-1,0), 50F);
	king_safe_bishop_negative_z += Physics.RaycastAll(piecesMoves[j].transform.position + new Vector3(-p,10,p),new Vector3(0,-1,0), 50F);
	king_safe_bishop_positive_x += Physics.RaycastAll(piecesMoves[j].transform.position + new Vector3(p,10,-p),new Vector3(0,-1,0), 50F);
	king_safe_bishop_negative_x += Physics.RaycastAll(piecesMoves[j].transform.position + new Vector3(-p,10,-p),new Vector3(0,-1,0), 50F);
}

	if((!piecesMoves[j].transform.GetComponent.<queenMove>().defendingKingRockZ) && 
	(!piecesMoves[j].transform.GetComponent.<queenMove>().defendingKingRockX)){
	if(!piecesMoves[j].transform.GetComponent.<queenMove>().defendingKingBishopX){
		if(!drawDirections(king_safe_bishop_positive_z)){
		return false;
		}	
		//move rocks on negative z	
		if(!drawDirections(king_safe_bishop_negative_x)){
		return false;
		}
	}
	if(!piecesMoves[j].transform.GetComponent.<queenMove>().defendingKingBishopZ){
		//move rocks on positive x		
		if(!drawDirections(king_safe_bishop_positive_x)){
		return false;
		}	
		//move rocks on negative x	
		if(!drawDirections(king_safe_bishop_negative_z)){
		return false;
		}
	}
	}
	
	}

}
return true;
}



//--------------------------------------------------------- KingSafe ---------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------

function kingSafeDirectionsRock(king_safe : RaycastHit[],ally : String, enemy : String) : boolean{
		for (var i: int = 0; i < king_safe.Length; i++) {
			if(king_safe[i].transform.gameObject.tag == ally){
				if(!king_safe[i].transform.GetComponent.<kingMove>()){
				break;
				}
			}
			if(king_safe[i].transform.gameObject.tag == enemy){
				if((king_safe[i].transform.GetComponent.<bishopMove>()) ||
				  (king_safe[i].transform.GetComponent.<knightMove>()) || 
				  (king_safe[i].transform.GetComponent.<pawnMove>()) || 
				  (king_safe[i].transform.GetComponent.<kingMove>()) ){
				break;
				} else{
					if((king_safe[i].transform.GetComponent.<queenMove>()) || (king_safe[i].transform.GetComponent.<rockMove>())){
					return false;
					}
				}
			}
		}
		return true;
}

function kingSafeDirectionsBishop(king_safe : RaycastHit[],ally : String, enemy : String) : boolean{
		for (var i: int = 0; i < king_safe.Length; i++) {
			if(king_safe[i].transform.gameObject.tag == ally){
				if(!king_safe[i].transform.GetComponent.<kingMove>()){
				break;
				}
			}
			if(king_safe[i].transform.gameObject.tag == enemy){
				if((king_safe[i].transform.GetComponent.<rockMove>()) || 
				  (king_safe[i].transform.GetComponent.<knightMove>()) || 
				  (king_safe[i].transform.GetComponent.<pawnMove>()) || 
				  (king_safe[i].transform.GetComponent.<kingMove>()) ){
				break;
				} else{
					if((king_safe[i].transform.GetComponent.<queenMove>()) || (king_safe[i].transform.GetComponent.<bishopMove>())){
					return false;
					}
				}
			}
		}
		return true;
}

function kingSafe(x : int, y : int, z : int, ally : String, enemy : String) : boolean{
var count: int = 0;
 king_safe_self = Physics.RaycastAll(transform.position + new Vector3(x,y + 10,z),new Vector3(0,-1,0), 50F);
	for (var i: int = 0; i < king_safe_self.Length; i++) {
		if(king_safe_self[i].transform.GetComponent.<Move>()){
		count++;
		}
		if(king_safe_self[i].transform.gameObject.tag == ally){
			if(!king_safe_self[i].transform.GetComponent.<kingMove>()){
				return false;
			}
		}
	}
if (count==0){
return false;
}
//---------------------------------------------------------rock Moves ---------------------------------------------------------------

king_safe_rock_positive_z = [];
king_safe_rock_negative_z = [];
king_safe_rock_positive_x = [];	
king_safe_rock_negative_x = [];	
	
	
	for(var n: int = 5; n < 40; n = n+5){
	king_safe_rock_positive_z += Physics.RaycastAll(transform.position + new Vector3(0,10,n) + new Vector3(x,y,z),new Vector3(0,-1,0), 50F);
	king_safe_rock_negative_z += Physics.RaycastAll(transform.position + new Vector3(0,10,-n) + new Vector3(x,y,z),new Vector3(0,-1,0), 50F);
	king_safe_rock_positive_x += Physics.RaycastAll(transform.position + new Vector3(n,10,0) + new Vector3(x,y,z),new Vector3(0,-1,0), 50F);
	king_safe_rock_negative_x += Physics.RaycastAll(transform.position + new Vector3(-n,10,0) + new Vector3(x,y,z),new Vector3(0,-1,0), 50F);
	}
	
		if(!kingSafeDirectionsRock(king_safe_rock_positive_z, ally, enemy)){
		return false;
		}
		
		if(!kingSafeDirectionsRock(king_safe_rock_negative_z, ally, enemy)){
		return false;
		}
		
		if(!kingSafeDirectionsRock(king_safe_rock_positive_x, ally, enemy)){
		return false;
		}
		
		if(!kingSafeDirectionsRock(king_safe_rock_negative_x, ally, enemy)){
		return false;
		}

//---------------------------------------------------------Bishop Moves ---------------------------------------------------------------

	king_safe_bishop_positive_z = [];
	king_safe_bishop_negative_z = [];
	king_safe_bishop_positive_x = [];
	king_safe_bishop_negative_x = [];
	
	for(var m: int = 5; m < 40; m = m+5){
	king_safe_bishop_positive_z += Physics.RaycastAll(transform.position + new Vector3(m,10,m) + new Vector3(x,y,z),new Vector3(0,-1,0), 50F);
	king_safe_bishop_negative_z += Physics.RaycastAll(transform.position + new Vector3(-m,10,m) + new Vector3(x,y,z),new Vector3(0,-1,0), 50F);
	king_safe_bishop_positive_x += Physics.RaycastAll(transform.position + new Vector3(m,10,-m) + new Vector3(x,y,z),new Vector3(0,-1,0), 50F);
	king_safe_bishop_negative_x += Physics.RaycastAll(transform.position + new Vector3(-m,10,-m) + new Vector3(x,y,z),new Vector3(0,-1,0), 50F);
	}
		
		
		if(!kingSafeDirectionsBishop(king_safe_bishop_positive_z, ally, enemy)){
		return false;
		}
		
		if(!kingSafeDirectionsBishop(king_safe_bishop_negative_z, ally, enemy)){
		return false;
		}
		
		if(!kingSafeDirectionsBishop(king_safe_bishop_positive_x, ally, enemy)){
		return false;
		}
		
		if(!kingSafeDirectionsBishop(king_safe_bishop_negative_x, ally, enemy)){
		return false;
		}
		
//---------------------------------------------------------Knight Moves ---------------------------------------------------------------

	king_safe_knight = [];

	king_safe_knight += Physics.RaycastAll(transform.position + new Vector3(-10,10,5)+ new Vector3(x,y,z),new Vector3(0,-1,0), 50F);
	king_safe_knight += Physics.RaycastAll(transform.position + new Vector3(-5,10,10)+ new Vector3(x,y,z),new Vector3(0,-1,0), 50F);
	king_safe_knight += Physics.RaycastAll(transform.position + new Vector3(5,10,10)+ new Vector3(x,y,z),new Vector3(0,-1,0), 50F);
	king_safe_knight += Physics.RaycastAll(transform.position + new Vector3(10,10,5)+ new Vector3(x,y,z),new Vector3(0,-1,0), 50F);
	king_safe_knight += Physics.RaycastAll(transform.position + new Vector3(5,10,-10)+ new Vector3(x,y,z),new Vector3(0,-1,0), 50F);
	king_safe_knight += Physics.RaycastAll(transform.position + new Vector3(10,10,-5)+ new Vector3(x,y,z),new Vector3(0,-1,0), 50F);
	king_safe_knight += Physics.RaycastAll(transform.position + new Vector3(-10,10,-5)+ new Vector3(x,y,z),new Vector3(0,-1,0), 50F);
	king_safe_knight += Physics.RaycastAll(transform.position + new Vector3(-5,10,-10)+ new Vector3(x,y,z),new Vector3(0,-1,0), 50F);
	
	for (i = 0; i < king_safe_knight.Length; i++) {
			if(king_safe_knight[i].transform.gameObject.tag == enemy){
				if(king_safe_knight[i].transform.GetComponent.<knightMove>()){
				return false;
				}
			}
		}
		
//---------------------------------------------------------Pawn Moves -----------------------------------------------------------------

	king_safe_pawn = [];
	if(ally == "White"){
	side = 1;
	} else{
	side = -1;
	}

	king_safe_pawn += Physics.RaycastAll(transform.position + new Vector3(5,10,side*-5) + new Vector3(x,y,z),new Vector3(0,-1,0), 50F);
	king_safe_pawn += Physics.RaycastAll(transform.position + new Vector3(-5,10,side*-5) + new Vector3(x,y,z),new Vector3(0,-1,0), 50F);
	
	for (i = 0; i < king_safe_pawn.Length; i++) {
			if(king_safe_pawn[i].transform.gameObject.tag == enemy){
				if(king_safe_pawn[i].transform.GetComponent.<pawnMove>()){
				return false;
				}
			}
		}
		
//---------------------------------------------------------King Moves -----------------------------------------------------------------	

	king_safe_king = [];

	king_safe_king += Physics.RaycastAll(transform.position + new Vector3(0,10,5)+ new Vector3(x,y,z),new Vector3(0,-1,0), 50F);
	king_safe_king += Physics.RaycastAll(transform.position + new Vector3(5,10,5)+ new Vector3(x,y,z),new Vector3(0,-1,0), 50F);
	king_safe_king += Physics.RaycastAll(transform.position + new Vector3(5,10,0)+ new Vector3(x,y,z),new Vector3(0,-1,0), 50F);
	king_safe_king += Physics.RaycastAll(transform.position + new Vector3(5,10,-5)+ new Vector3(x,y,z),new Vector3(0,-1,0), 50F);
	king_safe_king += Physics.RaycastAll(transform.position + new Vector3(0,10,-5)+ new Vector3(x,y,z),new Vector3(0,-1,0), 50F);
	king_safe_king += Physics.RaycastAll(transform.position + new Vector3(-5,10,-5)+ new Vector3(x,y,z),new Vector3(0,-1,0), 50F);
	king_safe_king += Physics.RaycastAll(transform.position + new Vector3(-5,10,0)+ new Vector3(x,y,z),new Vector3(0,-1,0), 50F);
	king_safe_king += Physics.RaycastAll(transform.position + new Vector3(-5,10,5)+ new Vector3(x,y,z),new Vector3(0,-1,0), 50F);
	
	for (i = 0; i < king_safe_king.Length; i++) {
			if(king_safe_king[i].transform.gameObject.tag == enemy){
				if(king_safe_king[i].transform.GetComponent.<kingMove>()){
				return false;
				}
			}
		}
		return true;
}

//---------------------------------------------------- defendingKing ---------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------

function kingSafeDirectionsRockZ(king_safe : RaycastHit[],ally : String, enemy : String){
var defense: RaycastHit;
var count : int = 0;
		for (var i: int = 0; i < king_safe.Length; i++) {
			if(king_safe[i].transform.gameObject.tag == ally){
				defense = king_safe[i];
				count ++;
			}
			if(king_safe[i].transform.gameObject.tag == enemy){
				if(count == 0){
				break;
				} else{
					if((king_safe[i].transform.GetComponent.<rockMove>()) ||
					(king_safe[i].transform.GetComponent.<queenMove>())){
						if (defense.transform.GetComponent.<pawnMove>())
						defense.transform.GetComponent.<pawnMove>().defendingKingRockZ = true;
						if (defense.transform.GetComponent.<rockMove>())
						defense.transform.GetComponent.<rockMove>().defendingKingRockZ = true;
						if (defense.transform.GetComponent.<bishopMove>())
						defense.transform.GetComponent.<bishopMove>().defendingKingRockZ = true;
						if (defense.transform.GetComponent.<knightMove>())
						defense.transform.GetComponent.<knightMove>().defendingKingRockZ = true;
						if (defense.transform.GetComponent.<queenMove>())
						defense.transform.GetComponent.<queenMove>().defendingKingRockZ = true;
					}
				break;
				}
			}
			if(count == 2){
			break;
			}
		}
}

function kingSafeDirectionsRockX(king_safe : RaycastHit[],ally : String, enemy : String){
var defense: RaycastHit;
var count : int = 0;
		for (var i: int = 0; i < king_safe.Length; i++) {
			if(king_safe[i].transform.gameObject.tag == ally){
				defense = king_safe[i];
				count ++;
			}
			if(king_safe[i].transform.gameObject.tag == enemy){
				if(count == 0){
				break;
				} else{
					if((king_safe[i].transform.GetComponent.<rockMove>()) ||
					(king_safe[i].transform.GetComponent.<queenMove>())){
						if (defense.transform.GetComponent.<pawnMove>())
						defense.transform.GetComponent.<pawnMove>().defendingKingRockX = true;
						if (defense.transform.GetComponent.<rockMove>())
						defense.transform.GetComponent.<rockMove>().defendingKingRockX = true;
						if (defense.transform.GetComponent.<bishopMove>())
						defense.transform.GetComponent.<bishopMove>().defendingKingRockX = true;
						if (defense.transform.GetComponent.<knightMove>())
						defense.transform.GetComponent.<knightMove>().defendingKingRockX = true;
						if (defense.transform.GetComponent.<queenMove>())
						defense.transform.GetComponent.<queenMove>().defendingKingRockX = true;
					}
				break;
				}
			}
			if(count == 2){
			break;
			}
		}
}

function kingSafeDirectionsBishopZ(king_safe : RaycastHit[],ally : String, enemy : String){
var defense: RaycastHit;
var count : int = 0;
		for (var i: int = 0; i < king_safe.Length; i++) {
			if(king_safe[i].transform.gameObject.tag == ally){
				defense = king_safe[i];
				count ++;
			}
			if(king_safe[i].transform.gameObject.tag == enemy){
				if(count == 0){
				break;
				} else{
					if((king_safe[i].transform.GetComponent.<bishopMove>()) ||
					(king_safe[i].transform.GetComponent.<queenMove>())){
						if (defense.transform.GetComponent.<pawnMove>())
						defense.transform.GetComponent.<pawnMove>().defendingKingBishopZ = true;
						if (defense.transform.GetComponent.<rockMove>())
						defense.transform.GetComponent.<rockMove>().defendingKingBishopZ = true;
						if (defense.transform.GetComponent.<bishopMove>())
						defense.transform.GetComponent.<bishopMove>().defendingKingBishopZ = true;
						if (defense.transform.GetComponent.<knightMove>())
						defense.transform.GetComponent.<knightMove>().defendingKingBishopZ = true;
						if (defense.transform.GetComponent.<queenMove>())
						defense.transform.GetComponent.<queenMove>().defendingKingBishopZ = true;
					}
				break;
				}
			}
			if(count == 2){
			break;
			}
		}
}

function kingSafeDirectionsBishopX(king_safe : RaycastHit[],ally : String, enemy : String){
var defense: RaycastHit;
var count : int = 0;
		for (var i: int = 0; i < king_safe.Length; i++) {
			if(king_safe[i].transform.gameObject.tag == ally){
				defense = king_safe[i];
				count ++;
			}
			if(king_safe[i].transform.gameObject.tag == enemy){
				if(count == 0){
				break;
				} else{
					if((king_safe[i].transform.GetComponent.<bishopMove>()) ||
					(king_safe[i].transform.GetComponent.<queenMove>())){
						if (defense.transform.GetComponent.<pawnMove>())
						defense.transform.GetComponent.<pawnMove>().defendingKingBishopX = true;
						if (defense.transform.GetComponent.<rockMove>())
						defense.transform.GetComponent.<rockMove>().defendingKingBishopX = true;
						if (defense.transform.GetComponent.<bishopMove>())
						defense.transform.GetComponent.<bishopMove>().defendingKingBishopX = true;
						if (defense.transform.GetComponent.<knightMove>())
						defense.transform.GetComponent.<knightMove>().defendingKingBishopX = true;
						if (defense.transform.GetComponent.<queenMove>())
						defense.transform.GetComponent.<queenMove>().defendingKingBishopX = true;
					}
				break;
				}
			}
			if(count == 2){
			break;
			}
		}
}

function reset(ally : String){
var king_safe: GameObject[] = GameObject.FindGameObjectsWithTag(ally);	
	for (var i: int = 0; i < king_safe.Length; i++) {
		if(king_safe[i].transform.gameObject.tag == ally){
			if (king_safe[i].transform.GetComponent.<pawnMove>()){
			king_safe[i].transform.GetComponent.<pawnMove>().defendingKingRockZ = false;
			king_safe[i].transform.GetComponent.<pawnMove>().defendingKingRockX = false;
			king_safe[i].transform.GetComponent.<pawnMove>().defendingKingBishopZ = false;
			king_safe[i].transform.GetComponent.<pawnMove>().defendingKingBishopX = false;
			}
			if (king_safe[i].transform.GetComponent.<rockMove>()){
			king_safe[i].transform.GetComponent.<rockMove>().defendingKingRockZ = false;
			king_safe[i].transform.GetComponent.<rockMove>().defendingKingRockX = false;
			king_safe[i].transform.GetComponent.<rockMove>().defendingKingBishopZ = false;
			king_safe[i].transform.GetComponent.<rockMove>().defendingKingBishopX = false;
			}
			if (king_safe[i].transform.GetComponent.<bishopMove>()){
			king_safe[i].transform.GetComponent.<bishopMove>().defendingKingRockZ = false;
			king_safe[i].transform.GetComponent.<bishopMove>().defendingKingRockX = false;
			king_safe[i].transform.GetComponent.<bishopMove>().defendingKingBishopZ = false;
			king_safe[i].transform.GetComponent.<bishopMove>().defendingKingBishopX = false;
			}
			if (king_safe[i].transform.GetComponent.<knightMove>()){
			king_safe[i].transform.GetComponent.<knightMove>().defendingKingRockZ = false;
			king_safe[i].transform.GetComponent.<knightMove>().defendingKingRockX = false;
			king_safe[i].transform.GetComponent.<knightMove>().defendingKingBishopZ = false;
			king_safe[i].transform.GetComponent.<knightMove>().defendingKingBishopX = false;
			}
			if (king_safe[i].transform.GetComponent.<queenMove>()){
			king_safe[i].transform.GetComponent.<queenMove>().defendingKingRockZ = false;
			king_safe[i].transform.GetComponent.<queenMove>().defendingKingRockX = false;
			king_safe[i].transform.GetComponent.<queenMove>().defendingKingBishopZ = false;
			king_safe[i].transform.GetComponent.<queenMove>().defendingKingBishopX = false;
			}
		}
	}
}

function defendingKing(ally : String, enemy : String){
reset(ally);

king_safe_rock_positive_z = [];
king_safe_rock_negative_z = [];
king_safe_rock_positive_x = [];	
king_safe_rock_negative_x = [];	
	
	
	for(var n: int = 5; n < 40; n = n+5){
	king_safe_rock_positive_z += Physics.RaycastAll(transform.position + new Vector3(0,10,n),new Vector3(0,-1,0), 50F);
	king_safe_rock_negative_z += Physics.RaycastAll(transform.position + new Vector3(0,10,-n),new Vector3(0,-1,0), 50F);
	king_safe_rock_positive_x += Physics.RaycastAll(transform.position + new Vector3(n,10,0),new Vector3(0,-1,0), 50F);
	king_safe_rock_negative_x += Physics.RaycastAll(transform.position + new Vector3(-n,10,0),new Vector3(0,-1,0), 50F);
	}
	
kingSafeDirectionsRockZ(king_safe_rock_positive_z, ally, enemy);
kingSafeDirectionsRockZ(king_safe_rock_negative_z, ally, enemy);
kingSafeDirectionsRockX(king_safe_rock_positive_x, ally, enemy);
kingSafeDirectionsRockX(king_safe_rock_negative_x, ally, enemy);


king_safe_bishop_positive_z = [];
king_safe_bishop_negative_z = [];
king_safe_bishop_positive_x = [];
king_safe_bishop_negative_x = [];
	
	for(var m: int = 5; m < 40; m = m+5){
	king_safe_bishop_positive_z += Physics.RaycastAll(transform.position + new Vector3(m,10,m),new Vector3(0,-1,0), 50F);
	king_safe_bishop_negative_z += Physics.RaycastAll(transform.position + new Vector3(-m,10,m),new Vector3(0,-1,0), 50F);
	king_safe_bishop_positive_x += Physics.RaycastAll(transform.position + new Vector3(m,10,-m),new Vector3(0,-1,0), 50F);
	king_safe_bishop_negative_x += Physics.RaycastAll(transform.position + new Vector3(-m,10,-m),new Vector3(0,-1,0), 50F);
	}

kingSafeDirectionsBishopZ(king_safe_bishop_positive_z, ally, enemy);
kingSafeDirectionsBishopX(king_safe_bishop_negative_z, ally, enemy);
kingSafeDirectionsBishopX(king_safe_bishop_positive_x, ally, enemy);
kingSafeDirectionsBishopZ(king_safe_bishop_negative_x, ally, enemy);

}

//--------------------------------------------------------- Castle ---------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------

function Castle(side : int): boolean{

castleCheck = [];

	for(var n: int = 5; n < 40; n = n+5){
	castleCheck += Physics.RaycastAll(transform.position + new Vector3(n * side,10,0),new Vector3(0,-1,0), 50F);
	}
	
		for (var i: int = 0; i < castleCheck.Length - 1; i++) {
			if(castleCheck[i].transform.GetComponent.<Move>()){
				if((castleCheck[i].transform.GetComponent.<Move>().blackOccupied) || (castleCheck[i].transform.GetComponent.<Move>().whiteOccupied)){
				return false;
				}
			}
		}
		for (i = 0; i < castleCheck.Length; i++) {
			if(castleCheck[i].transform.GetComponent.<rockMove>()){
					if(castleCheck[i].transform.GetComponent.<rockMove>().firstMove){
					return true;
					}
				}
		}
		
	return false;
}

function limitMove(moves : RaycastHit[], i : int, currentBlack : String, afterBlack : String, afterWhite : String, canMove : boolean) {
				if(game.GetComponent(gameManager).whiteTurn){
							if(moves[i].transform.GetComponent.<Move>().blackOccupied){
								moves[i].transform.GetComponent.<Move>().canMove = canMove;
								Render(moves, i, currentBlack,afterBlack,afterWhite);
							}
							
						} else {
							if(moves[i].transform.GetComponent.<Move>().whiteOccupied){
									moves[i].transform.GetComponent.<Move>().canMove = canMove;
									Render(moves, i, currentBlack,afterBlack,afterWhite);
							}
						
						}
}

function Render(moves : RaycastHit[], i : int, currentBlack : String, afterBlack : String, afterWhite : String){
				var rend: Renderer = moves[i].transform.GetComponent.<Renderer>();
					if (rend.material.mainTexture == Resources.Load(currentBlack) as Texture){
					rend.material.mainTexture = Resources.Load(afterBlack) as Texture;
					} else{
					rend.material.mainTexture = Resources.Load(afterWhite) as Texture;
					}
}