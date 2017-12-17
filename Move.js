#pragma strict
public var canMove = false;
var piece : GameObject;
public var whiteOccupied = false;
public var blackOccupied = false;
public var empty = false;
var target: RaycastHit[] = [];
public var game : GameObject;
game = GameObject.Find("Game");
public var blackKing : GameObject;
blackKing = GameObject.Find("blackKing");
public var whiteKing : GameObject;
whiteKing = GameObject.Find("whiteKing");
public var protectKing = false;

var castleQueen = false;
var castleKing = false;
var rockCastle: RaycastHit[] = [];

var Promote = false;
public var buttonsController: GameObject;
buttonsController = GameObject.Find("buttonsController");

function move(){
		piece.transform.position.x = transform.position.x;
		piece.transform.position.z = transform.position.z;
		game.GetComponent(gameManager).audioMove.Play();
		
			if(castleQueen){
			castleQueen = false;
			rockCastle = Physics.RaycastAll(transform.position + new Vector3(10,0,0),new Vector3(0,1,0), 50F);
				for (var i: int = 0; i < rockCastle.Length; i++) {
					if(rockCastle[i].transform.GetComponent.<rockMove>()){
						rockCastle[i].transform.position.x = transform.position.x - 5;
					}
				}
			}
			if(castleKing){
			castleKing = false;
			rockCastle = Physics.RaycastAll(transform.position + new Vector3(-5,0,0),new Vector3(0,1,0), 50F);
				for (var j: int = 0; j < rockCastle.Length; j++) {
					if(rockCastle[j].transform.GetComponent.<rockMove>()){
						rockCastle[j].transform.position.x = transform.position.x + 5;
					}
				}	
			}
			
		if(Promote){
			buttonsController.transform.GetComponent.<promoteButtons>().Activate();
			buttonsController.transform.GetComponent.<promoteButtons>().piece = piece;
			while(buttonsController.transform.GetComponent.<promoteButtons>().userInput == false){
			game.GetComponent(gameManager).promotePanel = true;
       		yield;
    		}
    		game.GetComponent(gameManager).promotePanel = false;
    		buttonsController.transform.GetComponent.<promoteButtons>().userInput = false;
			//ativa a GUI, destroi o peao e troca pela peca
		}
		
		if (piece.transform.GetComponent.<pawnMove>())
			piece.transform.GetComponent.<pawnMove>().deselect();
		if (piece.transform.GetComponent.<rockMove>())
			piece.transform.GetComponent.<rockMove>().deselect();
		if (piece.transform.GetComponent.<bishopMove>())
			piece.transform.GetComponent.<bishopMove>().deselect();
		if (piece.transform.GetComponent.<kingMove>())
			piece.transform.GetComponent.<kingMove>().deselect();
		if (piece.transform.GetComponent.<knightMove>())
			piece.transform.GetComponent.<knightMove>().deselect();
		if (piece.transform.GetComponent.<queenMove>())
			piece.transform.GetComponent.<queenMove>().deselect();
			
			
		Update();
		
		blackKing.GetComponent(kingMove).defendingKing("Black","White");	
		whiteKing.GetComponent(kingMove).defendingKing("White","Black");
		
		blackKing.GetComponent(kingMove).Check("Black","White","blackCheck");	
		whiteKing.GetComponent(kingMove).Check("White","Black","whiteCheck");
			
		if(game.GetComponent(gameManager).blackCheck){
			if(blackKing.GetComponent(kingMove).Checkmate("Black","White")){
			game.GetComponent(gameManager).blackCheckMate = true;
			game.GetComponent(gameManager).audioCheckmate.Play();
			}
		}
		if(game.GetComponent(gameManager).whiteCheck){
			if(whiteKing.GetComponent(kingMove).Checkmate("White","Black")){
			game.GetComponent(gameManager).whiteCheckMate = true;
			game.GetComponent(gameManager).audioCheckmate.Play();
			}
		}
		
		if(!(game.GetComponent(gameManager).whiteCheckMate) && !(game.GetComponent(gameManager).blackCheckMate)){
			if(game.GetComponent(gameManager).whiteTurn){
				if(blackKing.GetComponent(kingMove).Draw("Black","White")){
				game.GetComponent(gameManager).Draw = true;
				game.GetComponent(gameManager).audioDraw.Play();
				}
			} else{
				if(whiteKing.GetComponent(kingMove).Draw("White","Black")){
				game.GetComponent(gameManager).Draw = true;
				game.GetComponent(gameManager).audioDraw.Play();
				}
			}
		}
		
		game.GetComponent(gameManager).whiteTurn = !game.GetComponent(gameManager).whiteTurn;
}

function Update(){
target = [];
target = Physics.RaycastAll(transform.position,new Vector3(0,1,0), 50F);
	if (Physics.Raycast (transform.position, new Vector3(0,1,0),50F)){
		if (target[0].transform.gameObject.tag == "White"){
		whiteOccupied = true;
		blackOccupied = false;
		empty = false;
		}
		if (target[0].transform.gameObject.tag == "Black"){
		blackOccupied = true;
		whiteOccupied = false;
		empty = false;
		}

	} 
	else{
	empty = true;
	whiteOccupied = false;
	blackOccupied = false;
	}
}

function OnMouseDown(){
	if(game.GetComponent(gameManager).promotePanel == false){
	if ((canMove) && (empty)){
		piece = GameObject.FindWithTag("Moving");
		move();
		if(piece.transform.GetComponent.<pawnMove>()){
			if(piece.transform.GetComponent.<pawnMove>().firstMove == true){
				piece.transform.GetComponent.<pawnMove>().firstMove = false;
			}
		}
		if(piece.transform.GetComponent.<rockMove>()){
			if(piece.transform.GetComponent.<rockMove>().firstMove == true){
				piece.transform.GetComponent.<rockMove>().firstMove = false;
			}
		}
		if(piece.transform.GetComponent.<kingMove>()){
			if(piece.transform.GetComponent.<kingMove>().firstMove == true){
				piece.transform.GetComponent.<kingMove>().firstMove = false;
			}
		}
			
	}
	else{
		if((canMove) && (game.GetComponent(gameManager).whiteTurn) && (blackOccupied)){
			piece = GameObject.FindWithTag("Moving");
			target[0].transform.position.x = game.GetComponent(gameManager).blackDead.x;
			target[0].transform.position.y = target[0].transform.position.y + game.GetComponent(gameManager).blackDead.y;
			target[0].transform.position.z = game.GetComponent(gameManager).blackDead.z;
			game.GetComponent(gameManager).blackDead.z = game.GetComponent(gameManager).blackDead.z + 5;
			if(game.GetComponent(gameManager).blackDead.z > -17.5 + 35){
			game.GetComponent(gameManager).blackDead.z = -17.5;
			game.GetComponent(gameManager).blackDead.x = game.GetComponent(gameManager).blackDead.x + 5;
			}
			target[0].collider.enabled = false;
			target[0].transform.tag = "Untagged";
			
			if (target[0].transform.GetComponent.<pawnMove>())
			Destroy(target[0].transform.GetComponent.<pawnMove>());
			if (target[0].transform.GetComponent.<rockMove>())
			Destroy(target[0].transform.GetComponent.<rockMove>());
			if (target[0].transform.GetComponent.<bishopMove>())
			Destroy(target[0].transform.GetComponent.<bishopMove>());
			if (target[0].transform.GetComponent.<kingMove>())
			Destroy(target[0].transform.GetComponent.<kingMove>());
			if (target[0].transform.GetComponent.<knightMove>())
			Destroy(target[0].transform.GetComponent.<knightMove>());
			if (target[0].transform.GetComponent.<queenMove>())
			Destroy(target[0].transform.GetComponent.<queenMove>());
			
			move();
			if(piece.transform.GetComponent.<pawnMove>()){
				if(piece.transform.GetComponent.<pawnMove>().firstMove == true){
				piece.transform.GetComponent.<pawnMove>().firstMove = false;
				}
			}
			if(piece.transform.GetComponent.<rockMove>()){
				if(piece.transform.GetComponent.<rockMove>().firstMove == true){
					piece.transform.GetComponent.<rockMove>().firstMove = false;
				}
			}
			if(piece.transform.GetComponent.<kingMove>()){
				if(piece.transform.GetComponent.<kingMove>().firstMove == true){
				piece.transform.GetComponent.<kingMove>().firstMove = false;
				}
			}
		} 
		else {
			if((canMove) && (!game.GetComponent(gameManager).whiteTurn) && (whiteOccupied)){
				piece = GameObject.FindWithTag("Moving");
				target[0].transform.position.x = game.GetComponent(gameManager).whiteDead.x;
				target[0].transform.position.y = target[0].transform.position.y + game.GetComponent(gameManager).whiteDead.y;
				target[0].transform.position.z = game.GetComponent(gameManager).whiteDead.z;
				game.GetComponent(gameManager).whiteDead.z = game.GetComponent(gameManager).whiteDead.z - 5;
				if(game.GetComponent(gameManager).whiteDead.z < 17.5 - 35){
				game.GetComponent(gameManager).whiteDead.z = 17.5;
				game.GetComponent(gameManager).whiteDead.x = game.GetComponent(gameManager).whiteDead.x - 5;
				}

				target[0].collider.enabled = false;
				target[0].transform.tag = "Untagged";
				
			if (target[0].transform.GetComponent.<pawnMove>())
			Destroy(target[0].transform.GetComponent.<pawnMove>());
			if (target[0].transform.GetComponent.<rockMove>())
			Destroy(target[0].transform.GetComponent.<rockMove>());
			if (target[0].transform.GetComponent.<bishopMove>())
			Destroy(target[0].transform.GetComponent.<bishopMove>());
			if (target[0].transform.GetComponent.<kingMove>())
			Destroy(target[0].transform.GetComponent.<kingMove>());
			if (target[0].transform.GetComponent.<knightMove>())
			Destroy(target[0].transform.GetComponent.<knightMove>());
			if (target[0].transform.GetComponent.<queenMove>())
			Destroy(target[0].transform.GetComponent.<queenMove>());
			
				move();
				if(piece.transform.GetComponent.<pawnMove>()){
					if(piece.transform.GetComponent.<pawnMove>().firstMove == true){
					piece.transform.GetComponent.<pawnMove>().firstMove = false;
					}
				}
				if(piece.transform.GetComponent.<rockMove>()){
					if(piece.transform.GetComponent.<rockMove>().firstMove == true){
					piece.transform.GetComponent.<rockMove>().firstMove = false;
					}
				}
				if(piece.transform.GetComponent.<kingMove>()){
					if(piece.transform.GetComponent.<kingMove>().firstMove == true){
					piece.transform.GetComponent.<kingMove>().firstMove = false;
					}
				}
			}
			else{
				//nao pode se mexer
			}
		}
		
}
}
}