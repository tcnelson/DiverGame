#pragma strict

var speed : int;

private var player : GameObject;
private var enemySight : EnemySightController;
private var myRigidBody : Rigidbody2D;

function Awake () {

	enemySight = GetComponentInChildren(EnemySightController);
	player = GameObject.FindGameObjectWithTag("Player");
	myRigidBody = GetComponent (Rigidbody2D);
}

function Start () {

}

function Update () {

	// If the player is in sight and is alive...
    if(enemySight.playerInSight)
        Chase();
}

function Chase () {
	var distance : Vector2 = (player.transform.position - transform.position);
    myRigidBody.AddForce(distance * speed);
}

function OnTrigggerEnter2D(other : Collider2D) {



}