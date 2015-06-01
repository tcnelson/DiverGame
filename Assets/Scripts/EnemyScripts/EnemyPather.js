#pragma strict

var pathName : String;
var pathTime : float;

var enemySight : EnemySight;

var previousLoc : Vector2;
var velocity : Vector2;

function Awake () {
	enemySight = GetComponentInChildren(EnemySight);
}

function Start () {
	previousLoc = transform.position;
	iTween.MoveTo(gameObject, iTween.Hash("path", iTweenPath.GetPath(pathName), "time", pathTime, "easeType", "easeInOutSine", "loopType", "pingPong", "delay", .1));
}

function Update () {
	var currentLoc = transform.position;
	velocity = (currentLoc - previousLoc) / Time.deltaTime;
	
	previousLoc = currentLoc;

	// If the player is in sight and is alive...
    if(enemySight.playerInSight)
        iTween.Pause(gameObject);
    else {
    	iTween.Resume(gameObject);
    }
}