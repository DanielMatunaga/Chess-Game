#pragma strict

public var promotePanel : GameObject;
public var piece : GameObject;	
var userInput = false;
public var game : GameObject;
game = GameObject.Find("Game");
//resolver promotePanel, whitequeen as prefab and etc.

function Awake(){
promotePanel.SetActive(false);
}

function Activate(){
promotePanel.SetActive(true);
}

function Queen(){
transform.GetComponent(AudioSource).Play();
promotePanel.SetActive(false);
var whiteQueen = Resources.Load("whiteQueen") as GameObject;
var blackQueen = Resources.Load("blackQueen") as GameObject;
piece.transform.GetComponent.<pawnMove>().deselect();
if (game.GetComponent(gameManager).whiteTurn){
GameObject.Instantiate(whiteQueen, new Vector3(piece.transform.position.x, piece.transform.position.y + 0.4, piece.transform.position.z ), Quaternion.identity);
} else{
GameObject.Instantiate(blackQueen, new Vector3(piece.transform.position.x, piece.transform.position.y + 0.4, piece.transform.position.z ), Quaternion.identity);
}
if(game.GetComponent(gameManager).whiteTurn){
	piece.transform.position.x = game.GetComponent(gameManager).whiteDead.x;
	piece.transform.position.y = piece.transform.position.y + game.GetComponent(gameManager).whiteDead.y;
	piece.transform.position.z = game.GetComponent(gameManager).whiteDead.z;
	game.GetComponent(gameManager).whiteDead.z = game.GetComponent(gameManager).whiteDead.z - 5;
		if(game.GetComponent(gameManager).whiteDead.z < 17.5 - 35){
		game.GetComponent(gameManager).whiteDead.z = 17.5;
		game.GetComponent(gameManager).whiteDead.x = game.GetComponent(gameManager).whiteDead.x - 5;
		}
} else{
	piece.transform.position.x = game.GetComponent(gameManager).blackDead.x;
	piece.transform.position.y = piece.transform.position.y + game.GetComponent(gameManager).blackDead.y;
	piece.transform.position.z = game.GetComponent(gameManager).blackDead.z;
	game.GetComponent(gameManager).blackDead.z = game.GetComponent(gameManager).blackDead.z + 5;
		if(game.GetComponent(gameManager).blackDead.z > -17.5 + 35){
		game.GetComponent(gameManager).blackDead.z = -17.5;
		game.GetComponent(gameManager).blackDead.x = game.GetComponent(gameManager).blackDead.x + 5;
		}
}
piece.GetComponent.<Collider>().enabled = false;
piece.transform.tag = "Untagged";
Destroy(piece.transform.GetComponent.<pawnMove>());

userInput = true;
}

function Rock(){
transform.GetComponent(AudioSource).Play();
promotePanel.SetActive(false);
var whiteRock = Resources.Load("whiteRock") as GameObject;
var blackRock = Resources.Load("blackRock") as GameObject;
piece.transform.GetComponent.<pawnMove>().deselect();
if (game.GetComponent(gameManager).whiteTurn){
GameObject.Instantiate(whiteRock, new Vector3(piece.transform.position.x, piece.transform.position.y + 0.4, piece.transform.position.z ), Quaternion.identity);
} else{
GameObject.Instantiate(blackRock, new Vector3(piece.transform.position.x, piece.transform.position.y + 0.4, piece.transform.position.z ), Quaternion.identity);
}
if(game.GetComponent(gameManager).whiteTurn){
	piece.transform.position.x = game.GetComponent(gameManager).whiteDead.x;
	piece.transform.position.y = piece.transform.position.y + game.GetComponent(gameManager).whiteDead.y;
	piece.transform.position.z = game.GetComponent(gameManager).whiteDead.z;
	game.GetComponent(gameManager).whiteDead.z = game.GetComponent(gameManager).whiteDead.z - 5;
		if(game.GetComponent(gameManager).whiteDead.z < 17.5 - 35){
		game.GetComponent(gameManager).whiteDead.z = 17.5;
		game.GetComponent(gameManager).whiteDead.x = game.GetComponent(gameManager).whiteDead.x - 5;
		}
} else{
	piece.transform.position.x = game.GetComponent(gameManager).blackDead.x;
	piece.transform.position.y = piece.transform.position.y + game.GetComponent(gameManager).blackDead.y;
	piece.transform.position.z = game.GetComponent(gameManager).blackDead.z;
	game.GetComponent(gameManager).blackDead.z = game.GetComponent(gameManager).blackDead.z + 5;
		if(game.GetComponent(gameManager).blackDead.z > -17.5 + 35){
		game.GetComponent(gameManager).blackDead.z = -17.5;
		game.GetComponent(gameManager).blackDead.x = game.GetComponent(gameManager).blackDead.x + 5;
		}
}
piece.GetComponent.<Collider>().enabled = false;
piece.transform.tag = "Untagged";
Destroy(piece.transform.GetComponent.<pawnMove>());

userInput = true;
}

function Bishop(){
transform.GetComponent(AudioSource).Play();
promotePanel.SetActive(false);
var whiteBishop = Resources.Load("whiteBishop") as GameObject;
var blackBishop = Resources.Load("blackBishop") as GameObject;
piece.transform.GetComponent.<pawnMove>().deselect();
if (game.GetComponent(gameManager).whiteTurn){
GameObject.Instantiate(whiteBishop, new Vector3(piece.transform.position.x, piece.transform.position.y + 1.5, piece.transform.position.z ), Quaternion.identity);
} else{
GameObject.Instantiate(blackBishop, new Vector3(piece.transform.position.x, piece.transform.position.y + 1.5, piece.transform.position.z ), Quaternion.identity);
}
if(game.GetComponent(gameManager).whiteTurn){
	piece.transform.position.x = game.GetComponent(gameManager).whiteDead.x;
	piece.transform.position.y = piece.transform.position.y + game.GetComponent(gameManager).whiteDead.y;
	piece.transform.position.z = game.GetComponent(gameManager).whiteDead.z;
	game.GetComponent(gameManager).whiteDead.z = game.GetComponent(gameManager).whiteDead.z - 5;
		if(game.GetComponent(gameManager).whiteDead.z < 17.5 - 35){
		game.GetComponent(gameManager).whiteDead.z = 17.5;
		game.GetComponent(gameManager).whiteDead.x = game.GetComponent(gameManager).whiteDead.x - 5;
		}
} else{
	piece.transform.position.x = game.GetComponent(gameManager).blackDead.x;
	piece.transform.position.y = piece.transform.position.y + game.GetComponent(gameManager).blackDead.y;
	piece.transform.position.z = game.GetComponent(gameManager).blackDead.z;
	game.GetComponent(gameManager).blackDead.z = game.GetComponent(gameManager).blackDead.z + 5;
		if(game.GetComponent(gameManager).blackDead.z > -17.5 + 35){
		game.GetComponent(gameManager).blackDead.z = -17.5;
		game.GetComponent(gameManager).blackDead.x = game.GetComponent(gameManager).blackDead.x + 5;
		}
}
piece.GetComponent.<Collider>().enabled = false;
piece.transform.tag = "Untagged";
Destroy(piece.transform.GetComponent.<pawnMove>());

userInput = true;
}

function Knight(){
transform.GetComponent(AudioSource).Play();
promotePanel.SetActive(false);
var whiteKnight = Resources.Load("whiteKnight") as GameObject;
var blackKnight = Resources.Load("blackKnight") as GameObject;
piece.transform.GetComponent.<pawnMove>().deselect();
if (game.GetComponent(gameManager).whiteTurn){
GameObject.Instantiate(whiteKnight, new Vector3(piece.transform.position.x, piece.transform.position.y + 1, piece.transform.position.z ), Quaternion.identity);
} else{
GameObject.Instantiate(blackKnight, new Vector3(piece.transform.position.x, piece.transform.position.y + 1, piece.transform.position.z ), Quaternion.identity);
}
if(game.GetComponent(gameManager).whiteTurn){
	piece.transform.position.x = game.GetComponent(gameManager).whiteDead.x;
	piece.transform.position.y = piece.transform.position.y + game.GetComponent(gameManager).whiteDead.y;
	piece.transform.position.z = game.GetComponent(gameManager).whiteDead.z;
	game.GetComponent(gameManager).whiteDead.z = game.GetComponent(gameManager).whiteDead.z - 5;
		if(game.GetComponent(gameManager).whiteDead.z < 17.5 - 35){
		game.GetComponent(gameManager).whiteDead.z = 17.5;
		game.GetComponent(gameManager).whiteDead.x = game.GetComponent(gameManager).whiteDead.x - 5;
		}
} else{
	piece.transform.position.x = game.GetComponent(gameManager).blackDead.x;
	piece.transform.position.y = piece.transform.position.y + game.GetComponent(gameManager).blackDead.y;
	piece.transform.position.z = game.GetComponent(gameManager).blackDead.z;
	game.GetComponent(gameManager).blackDead.z = game.GetComponent(gameManager).blackDead.z + 5;
		if(game.GetComponent(gameManager).blackDead.z > -17.5 + 35){
		game.GetComponent(gameManager).blackDead.z = -17.5;
		game.GetComponent(gameManager).blackDead.x = game.GetComponent(gameManager).blackDead.x + 5;
		}
}
piece.GetComponent.<Collider>().enabled = false;
piece.transform.tag = "Untagged";
Destroy(piece.transform.GetComponent.<pawnMove>());

userInput = true;
}