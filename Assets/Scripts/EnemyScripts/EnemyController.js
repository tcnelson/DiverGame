#pragma strict

var speed : int;
var health : float;
var startingHealth : float = 100f;
var isAlive : boolean = true;

var pathName : String;
var pathTime : float;
private var patrol : Vector3[];

private var player : GameObject;
private var playerController : PlayerController;
private var score : Score;

private var enemySight : EnemySight;
private var chasing : boolean = false;

private var myRigidBody : Rigidbody2D;
private var spriteRenderer : SpriteRenderer;
private var previousLoc : Vector2;
private var velocity : Vector2;

private var animator : Animator;

private var timeLastHit : float;

function Awake () {
	score = GameObject.FindGameObjectWithTag("GameController").GetComponent(Score);
	player = GameObject.FindGameObjectWithTag("Player");
	playerController = player.GetComponent(PlayerController);
	
	enemySight = GetComponentInChildren(EnemySight);
	myRigidBody = GetComponent (Rigidbody2D);
	spriteRenderer = GetComponent(SpriteRenderer);
	
	animator = GetComponent(Animator);
}

function Start () {
	previousLoc = transform.position;
	health = startingHealth;
	patrol = iTweenPath.GetPath(pathName);
	Patrol();
	animator.SetInteger("Direction", 0);
}

function Update () {
	var currentLoc = transform.position;
	velocity = (currentLoc - previousLoc) / Time.deltaTime;
	
	previousLoc = currentLoc;

	if (!isAlive && Time.time - timeLastHit > 10) {
		Resurrect();
	}
	else if (!isAlive) {
		return;
	}


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
    
    var percent = 1 - (startingHealth - health) / startingHealth;
    spriteRenderer.color = Color(1f, percent, percent, 1f);
    
    SetAnimationState ();
}

function Chase () {
	if (!isAlive)
		return;

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

function Resurrect() {
	health = startingHealth;
	isAlive = true;
	spriteRenderer.color = Color(1f, 1f, 1f, 1f);
}

function Damage(amount : float) {
	if (!isAlive)
		return;

	timeLastHit = Time.time;
	
	health -= amount;
	if (health < 0)
		Die();
}

function Die() {
	isAlive = false;
	spriteRenderer.color = Color(1f, 1f, 1f, 0f);
	
	score.Add(150);
}

function SetAnimationState () {
    var horizontal = velocity.x;
    
   	if (horizontal < 0){
   		animator.SetInteger("Direction", 1);  		
 	}
 	else {
 		animator.SetInteger("Direction", 0);
 	}
}
    
    