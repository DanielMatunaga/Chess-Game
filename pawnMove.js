#pragma strict

var click = false;
var moves: RaycastHit[] = [];
var captures: RaycastHit[] = [];
var self: RaycastHit[] = [];
var tempTag : String;
public var game : GameObject;
game = GameObject.Find("Game");
var firstMove = true;
public var promoteSquares : GameObject[];
promoteSquares = GameObject.FindGameObjectsWithTag("promoteSquare");
var defendingKingRockZ = false;
var defendingKingRockX = false;
var defendingKingBishopZ = false;
var defendingKingBishopX = false;

function OnMouseDown(){
		if (!(game.GetComponent(gameManager).Draw) && !(game.GetComponent(gameManager).blackCheckMate) && !(game.GetComponent(gameManager).whiteCheckMate) && !(game.GetComponent(gameManager).promotePanel) && (!click) && (!GameObject.FindWithTag("Moving")) && (game.GetComponent(gameManager).whiteTurn) && (transform.tag == "White")) {
		game.GetComponent(gameManager).audioSelect.Play();
		select(1);
	}
	else{
		if(!(game.GetComponent(gameManager).Draw) && !(game.GetComponent(gameManager).blackCheckMate) && !(game.GetComponent(gameManager).whiteCheckMate) && !(game.GetComponent(gameManager).promotePanel) && (!click) && (!GameObject.FindWithTag("Moving")) && (!game.GetComponent(gameManager).whiteTurn) && (transform.tag == "Black")){
		game.GetComponent(gameManager).audioSelect.Play();
		select(-1);
		}
		else{
			if(!(game.GetComponent(gameManager).promotePanel) && (click)) {
			game.GetComponent(gameManager).audioDeselect.Play();
			deselect();
			}
		}
	}
}

function limitMove(moves : RaycastHit[], i : int, currentBlack : String, currentWhite : String , afterBlack : String, afterWhite : String, canMove: boolean) {
				if(game.GetComponent(gameManager).whiteTurn){
							if(moves[i].transform.GetComponent.<Move>().blackOccupied){
							Render(moves, i, currentBlack,currentWhite, afterBlack, afterWhite);
								moves[i].transform.GetComponent.<Move>().canMove = canMove;
							}
						} else {
							if(moves[i].transform.GetComponent.<Move>().whiteOccupied){
									Render(moves, i, currentBlack,currentWhite, afterBlack, afterWhite);
									moves[i].transform.GetComponent.<Move>().canMove = canMove;
							}
						
						}
}

function Render(moves : RaycastHit[], i : int, currentBlack : String, currentWhite : String , afterBlack : String, afterWhite : String){
				var rend: Renderer = moves[i].transform.GetComponent.<Renderer>();
					if (rend.material.mainTexture == Resources.Load(currentBlack) as Texture){
					rend.material.mainTexture = Resources.Load(afterBlack) as Texture;
					} 
					if (rend.material.mainTexture == Resources.Load(currentWhite) as Texture){
					rend.material.mainTexture = Resources.Load(afterWhite) as Texture;
					}
}  //se a casa for branca pinta com a respectiva cor, se a casa for preta pinta com a respectiva cor

function promote(moves : RaycastHit[], i : int): boolean{
for (var j: int = 0; j < promoteSquares.Length; j++) {
	if(moves[i].collider.gameObject.name == promoteSquares[j].name){
	return true;
	}
}
return false;
}

public function select(side : int){
	click = true;
 	tempTag = transform.tag;
 	transform.tag = "Moving";
 	
 	if (firstMove) {
 	
	self = Physics.RaycastAll(transform.position,new Vector3(0,-1,0), 50F);
		for (var m: int = 0; m < self.Length; m++) {
			if(self[m].transform.GetComponent.<Move>()){
				Render(self, m, "blackSquare", "whiteSquare" , "blackSelfGreen", "whiteSelfGreen");
			}
		}
 	
 	moves += Physics.RaycastAll(transform.position + new Vector3(0,10,side * -5),new Vector3(0,-1,0), 50F);
	moves += Physics.RaycastAll(transform.position + new Vector3(0,10,side * -10),new Vector3(0,-1,0), 50F);
	if(side==1){
		if(!defendingKingBishopZ){
		captures += Physics.RaycastAll(transform.position + new Vector3(5,10,side * -5),new Vector3(0,-1,0), 50F);
		}
		if(!defendingKingBishopX){
		captures += Physics.RaycastAll(transform.position + new Vector3(-5,10,side * -5),new Vector3(0,-1,0), 50F);
		}
	} else{
		if(!defendingKingBishopX){
		captures += Physics.RaycastAll(transform.position + new Vector3(5,10,side * -5),new Vector3(0,-1,0), 50F);
		}
		if(!defendingKingBishopZ){
		captures += Physics.RaycastAll(transform.position + new Vector3(-5,10,side * -5),new Vector3(0,-1,0), 50F);
		}
	}
	
	
	if(!defendingKingRockX){
			if((!defendingKingBishopZ) && (!defendingKingBishopX)){
		for (var i: int = 0; i < moves.Length; i++) {
			if(moves[i].transform.GetComponent.<Move>()){
				if ((game.GetComponent(gameManager).blackCheck) || (game.GetComponent(gameManager).whiteCheck)){ //se esta em check
						if(moves[i].transform.GetComponent.<Move>().protectKing) { 
							if((moves[i].transform.GetComponent.<Move>().whiteOccupied) || (moves[i].transform.GetComponent.<Move>().blackOccupied)){
							break; //retorna true se achar uma peca. Pinta de vermelho se for inimigo. Nao pinta se for amigo.
							} else{
							moves[i].transform.GetComponent.<Move>().canMove = true;
							Render(moves, i, "blackSquare", "whiteSquare" , "blackGreen", "whiteGreen");
							}
							//se nao achar uma peca
							}
							if((moves[i].transform.GetComponent.<Move>().whiteOccupied) || (moves[i].transform.GetComponent.<Move>().blackOccupied)){
							break; //retorna true se achar uma peca. Pinta de vermelho se for inimigo. Nao pinta se for amigo.
							} 	
				} else{
					 if((moves[i].transform.GetComponent.<Move>().whiteOccupied) || (moves[i].transform.GetComponent.<Move>().blackOccupied)){
					 break;
					 } else{
					 moves[i].transform.GetComponent.<Move>().canMove = true;
					Render(moves, i, "blackSquare", "whiteSquare" , "blackGreen", "whiteGreen");
					 }
				 }
			}
		}
		}
		
	if(!defendingKingRockZ){	
		for (i = 0; i < captures.Length; i++) {
			if(captures[i].transform.GetComponent.<Move>()){
				if ((game.GetComponent(gameManager).blackCheck) || (game.GetComponent(gameManager).whiteCheck)){ //se esta em check
					if(captures[i].transform.GetComponent.<Move>().protectKing) {
						limitMove(captures, i, "blackSquare", "whiteSquare" ,"blackRed", "whiteRed",true);
					}
				} else{
					if((captures[i].transform.GetComponent.<Move>().whiteOccupied) || (captures[i].transform.GetComponent.<Move>().blackOccupied)){
			 			limitMove(captures, i, "blackSquare", "whiteSquare" ,"blackRed", "whiteRed",true);
					}
				}	
			}
		}
	}
	}
		
	} else{
	
	self = Physics.RaycastAll(transform.position,new Vector3(0,-1,0), 50F);
		for (var n: int = 0; n < self.Length; n++) {
			if(self[n].transform.GetComponent.<Move>()){
				Render(self, n, "blackSquare", "whiteSquare" , "blackSelfGreen", "whiteSelfGreen");
			}
		}
	
	moves += Physics.RaycastAll(transform.position + new Vector3(0,10,side * -5),new Vector3(0,-1,0), 50F);
	
	if(side==1){
		if(!defendingKingBishopZ){
		captures += Physics.RaycastAll(transform.position + new Vector3(5,10,side * -5),new Vector3(0,-1,0), 50F);
		}
		if(!defendingKingBishopX){
		captures += Physics.RaycastAll(transform.position + new Vector3(-5,10,side * -5),new Vector3(0,-1,0), 50F);
		}
	} else{
		if(!defendingKingBishopX){
		captures += Physics.RaycastAll(transform.position + new Vector3(5,10,side * -5),new Vector3(0,-1,0), 50F);
		}
		if(!defendingKingBishopZ){
		captures += Physics.RaycastAll(transform.position + new Vector3(-5,10,side * -5),new Vector3(0,-1,0), 50F);
		}
	}
	
		if(!defendingKingRockX){
			if((!defendingKingBishopZ) && (!defendingKingBishopX)){
			for (var j: int = 0; j < moves.Length; j++) {
			if(moves[j].transform.GetComponent.<Move>()){
				if ((game.GetComponent(gameManager).blackCheck) || (game.GetComponent(gameManager).whiteCheck)){ //se esta em check
						if(moves[j].transform.GetComponent.<Move>().protectKing) { 
							if((moves[j].transform.GetComponent.<Move>().whiteOccupied) || (moves[j].transform.GetComponent.<Move>().blackOccupied)){
							break; //retorna true se achar uma peca. Pinta de vermelho se for inimigo. Nao pinta se for amigo.
							} else{
							moves[j].transform.GetComponent.<Move>().canMove = true;
							if (promote(moves, j)){
							moves[j].transform.GetComponent.<Move>().Promote = true;
							}
							Render(moves, j, "blackSquare", "whiteSquare" , "blackGreen", "whiteGreen");
							}
							//se nao achar uma peca
							}
							if((moves[j].transform.GetComponent.<Move>().whiteOccupied) || (moves[j].transform.GetComponent.<Move>().blackOccupied)){
							break; //retorna true se achar uma peca. Pinta de vermelho se for inimigo. Nao pinta se for amigo.
							} 	
				} else{
					 if((moves[j].transform.GetComponent.<Move>().whiteOccupied) || (moves[j].transform.GetComponent.<Move>().blackOccupied)){
					 break;
					 } else{
					 moves[j].transform.GetComponent.<Move>().canMove = true;
					 if (promote(moves, j)){
						moves[j].transform.GetComponent.<Move>().Promote = true;
						}
					Render(moves, j, "blackSquare", "whiteSquare" , "blackGreen", "whiteGreen");
					 }
				 }
			}
		}
		}
		
	if(!defendingKingRockZ){
		for (j = 0; j < captures.Length; j++) {
			if(captures[j].transform.GetComponent.<Move>()){
				if ((game.GetComponent(gameManager).blackCheck) || (game.GetComponent(gameManager).whiteCheck)){ //se esta em check
					if(captures[j].transform.GetComponent.<Move>().protectKing) {
						limitMove(captures, j, "blackSquare", "whiteSquare" ,"blackRed", "whiteRed",true);
						if (promote(captures, j)){
						captures[j].transform.GetComponent.<Move>().Promote = true;
						}
					}
				} else{
					if((captures[j].transform.GetComponent.<Move>().whiteOccupied) || (captures[j].transform.GetComponent.<Move>().blackOccupied)){
			 			limitMove(captures, j, "blackSquare", "whiteSquare" ,"blackRed", "whiteRed",true);
			 			if (promote(captures, j)){
						captures[j].transform.GetComponent.<Move>().Promote = true;
						}
					}
				}	
			}
		}
	}
	}
		
	}
}

public function deselect(){
click = false;
	transform.tag = tempTag;
	
		for (var n: int = 0; n < self.Length; n++) {
			if(self[n].transform.GetComponent.<Move>()){
				Render(self, n, "blackSelfGreen", "whiteSelfGreen" , "blackSquare", "whiteSquare");
			}
		}
	
if(!defendingKingRockX){
	if((!defendingKingBishopZ) && (!defendingKingBishopX)){
		for (var i: int = 0; i < moves.Length; i++) {
			if(moves[i].transform.GetComponent.<Move>()){
				if ((game.GetComponent(gameManager).blackCheck) || (game.GetComponent(gameManager).whiteCheck)){ //se esta em check
						if(moves[i].transform.GetComponent.<Move>().protectKing) { 
							if((moves[i].transform.GetComponent.<Move>().whiteOccupied) || (moves[i].transform.GetComponent.<Move>().blackOccupied)){
							break; //retorna true se achar uma peca. Pinta de vermelho se for inimigo. Nao pinta se for amigo.
							} else{
							moves[i].transform.GetComponent.<Move>().canMove = false;
							if (promote(moves, i)){
							moves[i].transform.GetComponent.<Move>().Promote = false;
							}
							Render(moves, i, "blackGreen", "whiteGreen" , "blackSquare", "whiteSquare");
							}
							//se nao achar uma peca
							}
							if((moves[i].transform.GetComponent.<Move>().whiteOccupied) || (moves[i].transform.GetComponent.<Move>().blackOccupied)){
							break; //retorna true se achar uma peca. Pinta de vermelho se for inimigo. Nao pinta se for amigo.
							} 	
				} else{
					 if((moves[i].transform.GetComponent.<Move>().whiteOccupied) || (moves[i].transform.GetComponent.<Move>().blackOccupied)){
					 break;
					 } else{
					 moves[i].transform.GetComponent.<Move>().canMove = false;
					 if (promote(moves, i)){
					 moves[i].transform.GetComponent.<Move>().Promote = false;
					 }
					Render(moves, i, "blackGreen", "whiteGreen" , "blackSquare", "whiteSquare");
					 }
				 }
			}
		}
	}
}
	if(!defendingKingRockZ){
		for (i = 0; i < captures.Length; i++) {
			if(captures[i].transform.GetComponent.<Move>()){
				if ((game.GetComponent(gameManager).blackCheck) || (game.GetComponent(gameManager).whiteCheck)){ //se esta em check
					if(captures[i].transform.GetComponent.<Move>().protectKing) {
					 if (promote(captures, i)){
					 captures[i].transform.GetComponent.<Move>().Promote = false;
					 }
						limitMove(captures, i, "blackRed", "whiteRed" ,"blackSquare", "whiteSquare",false);
					}
				} else{
					if((captures[i].transform.GetComponent.<Move>().whiteOccupied) || (captures[i].transform.GetComponent.<Move>().blackOccupied)){
					 if (promote(captures, i)){
					 captures[i].transform.GetComponent.<Move>().Promote = false;
					 }
			 			limitMove(captures, i, "blackRed", "whiteRed" ,"blackSquare", "whiteSquare",false);
					}
				}	
			}
		}
	}
		
		moves = [];
		captures = [];
		self = [];
}