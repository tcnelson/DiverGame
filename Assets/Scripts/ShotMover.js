#pragma strict

var speed: float;

function Start () {
}

function Update () {
	transform.position += transform.up * speed * Time.deltaTime;
}
