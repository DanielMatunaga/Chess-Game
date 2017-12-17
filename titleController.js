#pragma strict
public var instuctionsPanel : GameObject;
public var playPanel: GameObject;
static var time;

function Awake(){
instuctionsPanel.SetActive(false);
playPanel.SetActive(false);
}

function Play(){
transform.GetComponent(AudioSource).Play();
playPanel.SetActive(true);
}

function Quit(){
transform.GetComponent(AudioSource).Play();
Application.Quit();
}

function Instructions(){
transform.GetComponent(AudioSource).Play();
instuctionsPanel.SetActive(true);
}

function instructionsHide(){
transform.GetComponent(AudioSource).Play();
instuctionsPanel.SetActive(false);
}

function five(){
transform.GetComponent(AudioSource).Play();
time = 300f;
Application.LoadLevel("Game");
}

function ten(){
transform.GetComponent(AudioSource).Play();
time = 600f;
Application.LoadLevel("Game");
}

function fifteen(){
transform.GetComponent(AudioSource).Play();
time = 900f;
Application.LoadLevel("Game");
}

function thirty(){
transform.GetComponent(AudioSource).Play();
time = 1800f;
Application.LoadLevel("Game");
}

function sixty(){
transform.GetComponent(AudioSource).Play();
time = 3600f;
Application.LoadLevel("Game");
}

function oneTwenty(){
transform.GetComponent(AudioSource).Play();
time = 7200f;
Application.LoadLevel("Game");
}

function playPanelHide(){
transform.GetComponent(AudioSource).Play();
playPanel.SetActive(false);
}