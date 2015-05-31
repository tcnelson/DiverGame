#pragma strict

private var animator: Animator;
private var myRigidbody: Rigidbody2D;

function Awake () {
	animator = GetComponent (Animator);
	myRigidbody = GetComponent (Rigidbody2D);
}
function Start () {
	animator.SetInteger("Direction", 0);
}

function Update () {
	SetAnimationState ();
}

function SetAnimationState () {
	var horizontal = myRigidbody.velocity.x;
	
	if (horizontal < 0){
		animator.SetInteger("Direction", 1);
	}
	else {
		animator.SetInteger("Direction", 0);
	}
}