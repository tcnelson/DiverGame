﻿#pragma strict

var speed : int;
var health : float;
var startingHealth : float = 100f;

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

private var animator : Animator;

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
	health = startingHealth;
	patrol = iTweenPath.GetPath(pathName);
	Patrol();
	animator.SetInteger("Direction", 0);
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
    
    SetAnimationState ();
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
	score.Add(150);
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
    
    