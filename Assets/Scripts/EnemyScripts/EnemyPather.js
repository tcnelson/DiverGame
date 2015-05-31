#pragma strict

var pathName : String;
var pathTime : float;

var enemySight : EnemySight;


function Awake () {

	enemySight = GetComponentInChildren(EnemySight);
}

function Start () {
	iTween.MoveTo(gameObject, iTween.Hash("path", iTweenPath.GetPath(pathName), "time", pathTime, "easeType", "easeInOutSine", "loopType", "pingPong", "delay", .1));
}

function Update () {
	// If the player is in sight and is alive...
    if(enemySight.playerInSight)
        iTween.Pause(gameObject);
    else {
    	iTween.Resume(gameObject);
    }
}