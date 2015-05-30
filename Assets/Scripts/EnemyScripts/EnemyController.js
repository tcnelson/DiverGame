#pragma strict

var speed : int;

private var player : GameObject;
private var playerController : PlayerController;

private var enemySight : EnemySightController;
private var myRigidBody : Rigidbody2D;

function Awake () {

	player = GameObject.FindGameObjectWithTag("Player");
	playerController = player.GetComponent(PlayerController);
	
	enemySight = GetComponentInChildren(EnemySightController);
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

function OnTriggerStay2D(other : Collider2D) {
	if (other.transform.tag == "Player") {
		playerController.Damage(1 * Time.deltaTime);
	}
}