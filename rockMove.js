#pragma strict

var click = false;
var moves_positive_z: RaycastHit[] = [];
var moves_negative_z: RaycastHit[] = [];
var moves_positive_x: RaycastHit[] = [];
var moves_negative_x: RaycastHit[] = [];
var self: RaycastHit[] = [];
public var game : GameObject;
game = GameObject.Find("Game");
var tempTag : String;
var firstMove = true;
var defendingKingRockZ = false;
var defendingKingRockX = false;
var defendingKingBishopZ = false;
var defendingKingBishopX = false;

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
		for (var m: int = 0; m < self.Length; m++) {
			if(self[m].transform.GetComponent.<Move>()){
				Render(self, m, "blackSquare", "whiteSquare" , "blackSelfGreen", "whiteSelfGreen");
			}
		}
		
	for(var n: int = 5; n < 40; n = n+5){
	moves_positive_z += Physics.RaycastAll(transform.position + new Vector3(0,10,n),new Vector3(0,-1,0), 50F);
	moves_negative_z += Physics.RaycastAll(transform.position + new Vector3(0,10,-n),new Vector3(0,-1,0), 50F);
	moves_positive_x += Physics.RaycastAll(transform.position + new Vector3(n,10,0),new Vector3(0,-1,0), 50F);
	moves_negative_x += Physics.RaycastAll(transform.position + new Vector3(-n,10,0),new Vector3(0,-1,0), 50F);
	}
	
		//move rocks on positive z
	if((!defendingKingBishopZ) && (!defendingKingBishopX)){
		if(!defendingKingRockX){
		directionsSelect(moves_positive_z);		
		//move rocks on negative z
		directionsSelect(moves_negative_z);
		}
		//move rocks on positive x
		if(!defendingKingRockZ){
		directionsSelect(moves_positive_x);		
		//move rocks on negative x	
		directionsSelect(moves_negative_x);
		}
	}
	
}

public function directionsSelect(moves : RaycastHit[]){
		for (var i: int = 0; i < moves.Length; i++) {
			if(moves[i].transform.GetComponent.<Move>()){
				if ((game.GetComponent(gameManager).blackCheck) || (game.GetComponent(gameManager).whiteCheck)){ //se esta em check
					if(checkMove(moves, i)){ //retorna true se encontrar uma peca no caminho
					break; //para o for
					}
				} else { // se nao esta em check
					if (normalMove(moves, i)){ //retorna true se encontrar uma peca no caminho
					break; //para o for
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
				Render(self, m, "blackSelfGreen", "whiteSelfGreen" ,"blackSquare", "whiteSquare");
			}
		}
if((!defendingKingBishopZ) && (!defendingKingBishopX)){
	if(!defendingKingRockX){
	//move rocks on positive z
	directionsDeselect(moves_positive_z);
	//move rocks on negative z
	directionsDeselect(moves_negative_z);
	}
	if(!defendingKingRockZ){
	//move rocks on positive x
	directionsDeselect(moves_positive_x);		
	//move rocks on negative x
	directionsDeselect(moves_negative_x);	
	}
}
		
moves_positive_z = [];
moves_negative_z = [];
moves_positive_x = [];
moves_negative_x = [];
self = [];
	
}

public function directionsDeselect(moves : RaycastHit[]){
			for (var i: int = 0; i < moves.Length; i++) {
				if(moves[i].transform.GetComponent.<Move>()){
					if ((game.GetComponent(gameManager).blackCheck) || (game.GetComponent(gameManager).whiteCheck)){ //se esta em check
						if(checkMoveDeselect(moves, i)){ //retorna true se encontrar uma peca no caminho
						break; //para o for
						}
					} else { // se nao esta em check
						if (normalMoveDeselect(moves, i)){ //retorna true se encontrar uma peca no caminho
						break; //para o for
						}
					}
				}
			}
}

function limitMove(moves : RaycastHit[], i : int, currentBlack : String, currentWhite : String , afterBlack : String, afterWhite : String, canMove: boolean) : boolean {
				if(game.GetComponent(gameManager).whiteTurn){  //se e o turno das brancas
					if(moves[i].transform.GetComponent.<Move>().whiteOccupied){
					return true;  //para o for, pois achou uma peca
					} else{
						if(moves[i].transform.GetComponent.<Move>().blackOccupied){  //se esta ocupado pelo preto
							Render(moves, i, currentBlack,currentWhite, afterBlack, afterWhite); //muda cor para vermelho
						moves[i].transform.GetComponent.<Move>().canMove = canMove;  //pode comer a peca preta
						return true; //para o for, pois achou uma peca
						} else{  //se nao esta ocupado nem pelas pretas nem pelas brancas
						return false;  //continua o for
						}
					}
				} 
				else{  //se e o turno das pretas
					if(moves[i].transform.GetComponent.<Move>().whiteOccupied){  //se esta ocupado pelas brancas
							Render(moves, i, currentBlack,currentWhite, afterBlack, afterWhite);  //muda a cor para vermelho
					moves[i].transform.GetComponent.<Move>().canMove = canMove;  //pode comer a peca branca
					return true; //mudar cor para vermelho
					} else{  //se esta ocupado pelas pretas
						if(moves[i].transform.GetComponent.<Move>().blackOccupied){  //se esta ocupado pelas pretas
						return true;  //para o for
						} else{  //se nao esta ocupado nem pelas pretas nem pelas brancas
						return false;  //continua o for
						}
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



function checkMove(moves : RaycastHit[], i: int): boolean{
	if(moves[i].transform.GetComponent.<Move>().protectKing) {  //se tiver protectKing nos quadrados
		if(limitMove(moves, i, "blackSquare", "whiteSquare" , "blackRed", "whiteRed", true)){  //retorna true se achar uma peca. Pinta de vermelho se for inimigo. Nao pinta se for amigo.
		return true;  //para o for
		}
		//se nao achar uma peca
	moves[i].transform.GetComponent.<Move>().canMove = true;  //pode se mover
	Render(moves, i, "blackSquare", "whiteSquare" , "blackGreen", "whiteGreen"); //pinta o quadrado de verde
	}
	if((moves[i].transform.GetComponent.<Move>().whiteOccupied)  || (moves[i].transform.GetComponent.<Move>().blackOccupied)){ //se tiver alguma peca no caminho ate o protectKing
	return true;  //para o for
	 } 			
	return false;
}



function normalMove(moves : RaycastHit[], i: int): boolean{
	if(limitMove(moves, i, "blackSquare", "whiteSquare", "blackRed", "whiteRed", true)){  
	return true;
	}
	moves[i].transform.GetComponent.<Move>().canMove = true;
	Render(moves, i, "blackSquare","whiteSquare", "blackGreen" , "whiteGreen");
	return false;
}



function checkMoveDeselect(moves : RaycastHit[], i: int): boolean{
	if(moves[i].transform.GetComponent.<Move>().protectKing) {
		if(limitMove(moves, i, "blackRed", "whiteRed" , "blackSquare", "whiteSquare", false)){
		return true;
		}
	moves[i].transform.GetComponent.<Move>().canMove = false;
	Render(moves, i, "blackGreen", "whiteGreen" , "blackSquare", "whiteSquare");
	}
	if((moves[i].transform.GetComponent.<Move>().whiteOccupied)  || (moves[i].transform.GetComponent.<Move>().blackOccupied)){
	return true;
	 } 			
	return false;
}



function normalMoveDeselect(moves : RaycastHit[], i: int): boolean{
	if(limitMove(moves, i, "blackRed", "whiteRed", "blackSquare", "whiteSquare", false)){
	return true;
	}
	moves[i].transform.GetComponent.<Move>().canMove = false;
	Render(moves, i, "blackGreen", "whiteGreen" , "blackSquare", "whiteSquare");
	return false;
}