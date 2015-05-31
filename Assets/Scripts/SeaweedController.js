#pragma strict

private var myCollider : Collider2D;
private var largeScale : Vector3;

function Awake() {
	myCollider = GetComponent(Collider2D);
	largeScale = transform.localScale;
}

function Hit() {
	Shrink();
}

function Shrink() {
	myCollider.isTrigger = true;				// allow player to walk through
	transform.localScale = largeScale * 0.2;	// make it really small
	
	Invoke("Grow", 10);
}

function Grow() {
	myCollider.isTrigger = false;				// disallow player to walk through
	transform.localScale = largeScale;			// return to normal size
}