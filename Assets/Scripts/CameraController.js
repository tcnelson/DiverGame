#pragma strict

var target : GameObject;
var minDistance : float;
var followDistance : float;

private var offset : Vector3;

function Awake () {
	target = GameObject.FindGameObjectWithTag ("Player");
}

function Start () {
	offset = transform.position - target.transform.position;
}	

function FixedUpdate() {
	// only move x/y
	var posNoZ = transform.position;
	posNoZ.z = target.transform.position.z;

	// identify direction to move
	var targetDirection = (target.transform.position - posNoZ);
	// set velocity
	var interpVelocity = targetDirection.magnitude * 5f;
	// set target position
	var targetPos = transform.position + (targetDirection.normalized * interpVelocity * Time.deltaTime); 

	// move camera 1/4 distance
	transform.position = Vector3.Lerp(transform.position, targetPos, 0.25f);
}