#pragma strict

public var whiteTurn = true;
var rotationWhite = Quaternion.identity;
var rotationBlack = Quaternion.identity;
var posWhite = Vector3(0,0,0);
var posBlack = Vector3(0,0,0);
var myCamera : Camera;
myCamera = GameObject.Find("Camera1").GetComponent.<Camera>();

posWhite = Vector3(0, 40, 30);
posBlack = Vector3(0, 40, -30);
rotationWhite.eulerAngles = Vector3(55, 180, 0);
rotationBlack.eulerAngles = Vector3(55, 360, 0);

var blackCheck = false;
var whiteCheck = false;

var blackCheckMate = false;
var whiteCheckMate = false;
var Draw = false;

var promotePanel = false; 

var blackDead = new Vector3(25.4, -2.3, -17.5);
var whiteDead = new Vector3(-25.4, -2.3, 17.5);

var audioSelect: AudioSource;
var audioMove: AudioSource;
var audioCheck: AudioSource;
var audioCheckmate: AudioSource;
var audioDeselect: AudioSource;
var audioDraw: AudioSource;

var firstMovingCameraWhite = true;
var firstMovingCameraBlack = true;

function Update(){
	if (whiteTurn){
			firstMovingCameraBlack = true;
			if(firstMovingCameraWhite){	
			myCamera.transform.rotation = rotationWhite;
			myCamera.transform.position = posWhite;
			firstMovingCameraWhite = false;
			}
			if(Input.GetKey("up")){
				if(myCamera.transform.eulerAngles.x < 80){
				myCamera.transform.RotateAround (Vector3.zero, new Vector3(-1,0,0), 40 * Time.deltaTime);
				}	
			}
			if(Input.GetKey("down")){
				if(myCamera.transform.eulerAngles.x > 10){
				myCamera.transform.RotateAround (Vector3.zero, new Vector3(1,0,0), 40 * Time.deltaTime);	
				}
			}
	}
	else{	
			firstMovingCameraWhite = true;
			if(firstMovingCameraBlack){
				myCamera.transform.rotation = rotationBlack;
				myCamera.transform.position = posBlack;
				firstMovingCameraBlack = false;
			}
			if(Input.GetKey("up")){
				if(myCamera.transform.eulerAngles.x < 80){
				myCamera.transform.RotateAround (Vector3.zero, new Vector3(1,0,0), 40 * Time.deltaTime);
				}	
			}
			if(Input.GetKey("down")){
				if(myCamera.transform.eulerAngles.x > 10){
				myCamera.transform.RotateAround (Vector3.zero, new Vector3(-1,0,0), 40 * Time.deltaTime);	
				}
			}
	}
	
}