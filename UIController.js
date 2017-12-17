var timeRemainingWhite : float;
var timeRemainingBlack : float;
timeRemainingWhite = titleController.time;
timeRemainingBlack = titleController.time;
var minutes: int;
var seconds: int;
var timeStr: String;
public var whiteClock: UI.Text;
public var blackClock: UI.Text;
public var game : GameObject;
game = GameObject.Find("Game");
public var whiteImage: UI.Image;
public var blackImage: UI.Image;
public var whiteGreenImage: UI.Image;
public var whiteRedImage: UI.Image;
public var blackGreenImage: UI.Image;
public var blackRedImage: UI.Image;

public var quit: UI.Button;

function Awake(){
minutes = titleController.time/60;
seconds = titleController.time%60;
whiteClock.text = minutes.ToString() + ":" + seconds.ToString("D2");
blackClock.text = minutes.ToString() + ":" + seconds.ToString("D2");
whiteImage.enabled = false;
blackImage.enabled = false;
whiteGreenImage.enabled = false;
whiteRedImage.enabled = false;
blackGreenImage.enabled = false;
blackRedImage.enabled = false;
quit.enabled = false;
quit.GetComponentInChildren.<CanvasRenderer>().SetAlpha(0);
quit.GetComponentInChildren.<UI.Text>().color = Color.clear;
}


function Update(){
if((game.GetComponent(gameManager).whiteTurn) && !(game.GetComponent(gameManager).Draw) && !(game.GetComponent(gameManager).blackCheckMate) && !(game.GetComponent(gameManager).whiteCheckMate)){
	timeRemainingWhite -= Time.deltaTime;
	minutes = timeRemainingWhite/60;
	seconds = timeRemainingWhite%60;
	timeStr = minutes.ToString() + ":" + seconds.ToString("D2");
	whiteClock.text = timeStr;
		if(game.GetComponent(gameManager).whiteCheck){
		whiteRedImage.enabled = true;
		} else{
		whiteImage.enabled = true;
		}
	blackImage.enabled = false;
	blackRedImage.enabled = false;
	} else{
		if((!game.GetComponent(gameManager).whiteTurn) && !(game.GetComponent(gameManager).Draw) && !(game.GetComponent(gameManager).blackCheckMate) && !(game.GetComponent(gameManager).whiteCheckMate)){
	timeRemainingBlack -= Time.deltaTime;
	minutes = timeRemainingBlack/60;
	seconds = timeRemainingBlack%60;
	timeStr = minutes.ToString() + ":" + seconds.ToString("D2");
	blackClock.text = timeStr;
	whiteImage.enabled = false;
	whiteRedImage.enabled = false;
		if(game.GetComponent(gameManager).blackCheck){
		blackRedImage.enabled = true;
		} else{
		blackImage.enabled = true;
		}
	}
	}
	
if(game.GetComponent(gameManager).Draw){
whiteImage.enabled = false;
whiteRedImage.enabled = false;
blackImage.enabled = false;
blackRedImage.enabled = false;
blackRedImage.enabled = true;
whiteRedImage.enabled = true;
quit.enabled = true;
quit.GetComponentInChildren.<CanvasRenderer>().SetAlpha(1);
quit.GetComponentInChildren.<UI.Text>().color = Color.black;
} 

if (game.GetComponent(gameManager).blackCheckMate){
whiteImage.enabled = false;
whiteRedImage.enabled = false;
blackImage.enabled = false;
blackRedImage.enabled = false;
blackRedImage.enabled = true;
whiteGreenImage.enabled = true;
 quit.enabled = true;
quit.GetComponentInChildren.<CanvasRenderer>().SetAlpha(1);
quit.GetComponentInChildren.<UI.Text>().color = Color.black;
}

if (game.GetComponent(gameManager).whiteCheckMate){
whiteImage.enabled = false;
whiteRedImage.enabled = false;
blackImage.enabled = false;
blackRedImage.enabled = false;
blackGreenImage.enabled = true;
whiteRedImage.enabled = true;
quit.enabled = true;
quit.GetComponentInChildren.<CanvasRenderer>().SetAlpha(1);
quit.GetComponentInChildren.<UI.Text>().color = Color.black;
}

}

function blackResign(){
	if(!(game.GetComponent(gameManager).Draw) && !(game.GetComponent(gameManager).blackCheckMate) && !(game.GetComponent(gameManager).whiteCheckMate)){
	game.GetComponent(gameManager).blackCheckMate = true;
	game.GetComponent(gameManager).audioCheckmate.Play();
	}
}

function whiteResign(){
	if(!(game.GetComponent(gameManager).Draw) && !(game.GetComponent(gameManager).blackCheckMate) && !(game.GetComponent(gameManager).whiteCheckMate)){
	game.GetComponent(gameManager).whiteCheckMate = true;
	game.GetComponent(gameManager).audioCheckmate.Play();
	}
}

function Quit(){
Application.LoadLevel("Title");
}