#pragma strict

var speed : int;
var health : float;
var startingHealth : float = 100f;

private var player : GameObject;
private var playerController : PlayerController;

private var enemySight : EnemySightController;
private var myRigidBody : Rigidbody2D;
private var spriteRenderer : SpriteRenderer;

private var animator : Animator;

function Awake () {

	player = GameObject.FindGameObjectWithTag("Player");
	playerController = player.GetComponent(PlayerController);
	
	enemySight = GetComponentInChildren(EnemySightController);
	myRigidBody = GetComponent (Rigidbody2D);
	spriteRenderer = GetComponent(SpriteRenderer);
	
	animator = GetComponent(Animator);
}

function Start () {
	health = startingHealth;
	animator.SetInteger("Direction", 0);
}

function Update () {

	// If the player is in sight and is alive...
    if(enemySight.playerInSight)
        Chase();
        
    spriteRenderer.color = Color(1f, 1f, 1f, (health / startingHealth));
    
    SetAnimationState ();
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

function Damage(amount : float) {
	health -= amount;
	if (health < 0)
		Die();
}

function Die() {
	Destroy(gameObject);
}

function SetAnimationState () {
    var horizontal = myRigidBody.velocity.x;
    
   	if (horizontal < 0){
   		animator.SetInteger("Direction", 1);  		
 	}
 	else {
 		animator.SetInteger("Direction", 0);
 	}
 	
}
    
    