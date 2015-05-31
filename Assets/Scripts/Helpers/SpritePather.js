#pragma strict

var pathName : String;
var pathTime : float;

var previousLoc : Vector2;
var velocity : Vector2;

function Start() {
	previousLoc = transform.position;
	Patrol();
}

function Update(){
	var currentLoc = transform.position;
	velocity = (currentLoc - previousLoc) / Time.deltaTime;
	
	previousLoc = currentLoc;
}

function Patrol(){
	iTween.MoveTo(gameObject, iTween.Hash("path", iTweenPath.GetPath(pathName), "time", pathTime, "easeType", "easeInOutSine", "loopType", "pingPong", "delay", .1));
}