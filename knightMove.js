#pragma strict

var click = false;
var moves: RaycastHit[] = [];
var tempTag : String;
public var game : GameObject;
game = GameObject.Find("Game");
var self: RaycastHit[] = [];
var defendingKingRockZ = false;
var defendingKingRockX = false;
var defendingKingBishopZ = false;
var defendingKingBishopX = false;


function OnMouseDown(){
	if (!(game.GetComponent(gameManager).Draw) && !(game.GetComponent(gameManager).blackCheckMate) && !(game.GetComponent(gameManager).whiteCheckMate) && !(game.GetComponent(gameManager).promotePanel)  && (!click) && (!GameObject.FindWithTag("Moving")) && (game.GetComponent(gameManager).whiteTurn) && (transform.tag == "White")) {
		game.GetComponent(gameManager).audioSelect.Play();
		select();
	}
	else{
		if(!(game.GetComponent(gameManager).Draw) && !(game.GetComponent(gameManager).blackCheckMate) && !(game.GetComponent(gameManager).whiteCheckMate) && !(game.GetComponent(gameManager).promotePanel)  && (!click) && (!GameObject.FindWithTag("Moving")) && (!game.GetComponent(gameManager).whiteTurn) && (transform.tag == "Black")){
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


function limitMove(moves : RaycastHit[], i : int, currentBlack : String, currentWhite : String , afterBlack : String, afterWhite : String, canMove: boolean) : boolean {
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

public function select(){
	click = true;
 	tempTag = transform.tag;
 	transform.tag = "Moving";
 	
 	self = Physics.RaycastAll(transform.position,new Vector3(0,-1,0), 50F);
		for (var m: int = 0; m < self.Length; m++) {
			if(self[m].transform.GetComponent.<Move>()){
				Render(self, m, "blackSquare", "whiteSquare" , "blackSelfGreen", "whiteSelfGreen");
			}
		}
 	
 	//move rocks on positive z
	moves += Physics.RaycastAll(transform.position + new Vector3(-10,0,5),new Vector3(0,-1,0), 10F);
	moves += Physics.RaycastAll(transform.position + new Vector3(-5,0,10),new Vector3(0,-1,0), 10F);
	moves += Physics.RaycastAll(transform.position + new Vector3(5,0,10),new Vector3(0,-1,0), 10F);
	moves += Physics.RaycastAll(transform.position + new Vector3(10,0,5),new Vector3(0,-1,0), 10F);
	moves += Physics.RaycastAll(transform.position + new Vector3(5,0,-10),new Vector3(0,-1,0), 10F);
	moves += Physics.RaycastAll(transform.position + new Vector3(10,0,-5),new Vector3(0,-1,0), 10F);
	moves += Physics.RaycastAll(transform.position + new Vector3(-10,0,-5),new Vector3(0,-1,0), 10F);
	moves += Physics.RaycastAll(transform.position + new Vector3(-5,0,-10),new Vector3(0,-1,0), 10F);
	
	if((!defendingKingRockZ) && (!defendingKingRockX)){
	if((!defendingKingBishopZ) && (!defendingKingBishopX)){
		for (var i: int = 0; i < moves.Length; i++) {
			if(moves[i].transform.GetComponent.<Move>()){
				if ((game.GetComponent(gameManager).blackCheck) || (game.GetComponent(gameManager).whiteCheck)){ //se esta em check
						if(moves[i].transform.GetComponent.<Move>().protectKing) { 
							if((moves[i].transform.GetComponent.<Move>().whiteOccupied) || (moves[i].transform.GetComponent.<Move>().blackOccupied)){
							limitMove(moves, i, "blackSquare", "whiteSquare" , "blackRed", "whiteRed", true); //retorna true se achar uma peca. Pinta de vermelho se for inimigo. Nao pinta se for amigo.
							}
							//se nao achar uma peca
						moves[i].transform.GetComponent.<Move>().canMove = true;  //pode se mover
						Render(moves, i, "blackSquare", "whiteSquare" , "blackGreen", "whiteGreen"); //pinta o quadrado de verde
						}
				} else{
					 if((moves[i].transform.GetComponent.<Move>().whiteOccupied) || (moves[i].transform.GetComponent.<Move>().blackOccupied)){
						limitMove(moves, i, "blackSquare", "whiteSquare" , "blackRed", "whiteRed", true);
					 } else{
					 moves[i].transform.GetComponent.<Move>().canMove = true;
					 Render(moves, i, "blackSquare", "whiteSquare" , "blackGreen", "whiteGreen");
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
	
		for (var m: int = 0; m < self.Length; m++) {
			if(self[m].transform.GetComponent.<Move>()){
				Render(self, m, "blackSelfGreen", "whiteSelfGreen" , "blackSquare", "whiteSquare");
			}
		}
	
	if((!defendingKingRockZ) && (!defendingKingRockX)){
		if((!defendingKingBishopZ) && (!defendingKingBishopX)){
	//move rocks on positive z
		for (var i: int = 0; i < moves.Length; i++) {
			if(moves[i].transform.GetComponent.<Move>()){
				if ((game.GetComponent(gameManager).blackCheck) || (game.GetComponent(gameManager).whiteCheck)){ //se esta em check
						if(moves[i].transform.GetComponent.<Move>().protectKing) { 
							if((moves[i].transform.GetComponent.<Move>().whiteOccupied) || (moves[i].transform.GetComponent.<Move>().blackOccupied)){
							limitMove(moves, i, "blackRed", "whiteRed" , "blackSquare", "whiteSquare", false); //retorna true se achar uma peca. Pinta de vermelho se for inimigo. Nao pinta se for amigo.
							}
							//se nao achar uma peca
						moves[i].transform.GetComponent.<Move>().canMove = false;  //pode se mover
						Render(moves, i, "blackGreen", "whiteGreen" , "blackSquare", "whiteSquare"); //pinta o quadrado de verde
						}
				} else{
					 if((moves[i].transform.GetComponent.<Move>().whiteOccupied) || (moves[i].transform.GetComponent.<Move>().blackOccupied)){
						limitMove(moves, i, "blackRed", "whiteRed" , "blackSquare", "whiteSquare", false);
					 } else{
					 moves[i].transform.GetComponent.<Move>().canMove = false;
					 Render(moves, i, "blackGreen", "whiteGreen" , "blackSquare", "whiteSquare");
					 }
				 }
			}
		}
		}
	}
		moves = [];
	self = [];
}