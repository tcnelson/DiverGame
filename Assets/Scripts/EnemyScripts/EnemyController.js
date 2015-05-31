#pragma strict

var speed : int;
var health : float;
var startingHealth : float = 100f;

var pathName : String;
var pathTime : float;
private var patrol : Vector3[];

private var player : GameObject;
private var playerController : PlayerController;

private var enemySight : EnemySight;
private var chasing : boolean = false;

private var myRigidBody : Rigidbody2D;
private var spriteRenderer : SpriteRenderer;

function Awake () {

	player = GameObject.FindGameObjectWithTag("Player");
	playerController = player.GetComponent(PlayerController);
	
	enemySight = GetComponentInChildren(EnemySight);
	myRigidBody = GetComponent (Rigidbody2D);
	spriteRenderer = GetComponent(SpriteRenderer);
}

function Start () {
	health = startingHealth;
	patrol = iTweenPath.GetPath(pathName);
	Patrol();
}

function Update () {

    if(enemySight.playerInSight && !chasing) {
		// If the player is in sight and is alive...
		// Start Chasing!
		iTween.Stop(gameObject);
        chasing = true;
    } 
    else if (!enemySight.playerInSight && chasing) {
    	// stop chasing!
    	chasing = false;
    	Return();
    }
    
    if (chasing) {
		// gogogo
		Chase();
    }
                
    spriteRenderer.color = Color(1f, 1f, 1f, (health / startingHealth));
}

function Chase () {
	var distance : Vector2 = (player.transform.position - transform.position);
    myRigidBody.AddForce(distance * speed);
}

function Return () {
	var distance : Vector2 = (player.transform.position - transform.position);
	var time = distance.magnitude / 50;
	iTween.MoveTo(gameObject, patrol[0], time);
	
	// trigger patrol when the game object gets back!
	Invoke("Patrol", time);
}

function Patrol() {
	iTween.MoveTo(gameObject, iTween.Hash("path", patrol, "time", pathTime, "easeType", "easeInOutSine", "loopType", "pingPong", "delay", .1));
}

function OnTriggerStay2D(other : Collider2D) {
	if (other.transform.tag == "Player") {
		playerController.Damage(1 * Time.deltaTime);
	}
}

function Damage(amount : float) {
	health -= amount;
	if (health < 0)
		Die();
}

function Die() {
	Destroy(gameObject);
}