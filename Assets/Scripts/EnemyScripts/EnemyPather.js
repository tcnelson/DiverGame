#pragma strict

var pathName : String;
var pathTime : float;

function Start () {
	iTween.MoveTo(gameObject, iTween.Hash("path", iTweenPath.GetPath(pathName), "time", pathTime, "easeType", "easeInOutSine", "loopType", "pingPong", "delay", .1));
}

function Update () {

}