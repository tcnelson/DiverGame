#pragma strict

private var animator: Animator;
private var spritePather : SpritePather;

function Awake () {
	animator = GetComponent (Animator);
	spritePather = GetComponent(SpritePather);
}
function Start () {
	animator.SetInteger("Direction", 0);
}

function Update () {
	SetAnimationState ();
}

function SetAnimationState () {
	var horizontal = spritePather.velocity.x;
	
	if (horizontal < 0){
		animator.SetInteger("Direction", 1);
	}
	else {
		animator.SetInteger("Direction", 0);
	}
}