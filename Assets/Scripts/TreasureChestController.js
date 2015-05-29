#pragma strict

var deleteDelay: float;							// Pause before deleting the treasure chest game object (after it's been opened)

private var animator: Animator; 				// The animator attached to the treasure chest

function Awake () {
	animator = GetComponent(Animator);
}

function Start () {
	animator.SetBool("IsPickedUp", false);		// With the "IsPickedUp" parameter false, the treasure chest will be idle
}

function OnTriggerEnter2D(hit : Collider2D){
	if (hit.transform.tag == "Player" ) {	
		animator.SetBool("IsPickedUp", true);	// Sets "IsPickedUp" to true on contact with player to trigger opening animation
		Destroy(gameObject, deleteDelay);		// Destroy treasure chest game object after a delay
	}
}