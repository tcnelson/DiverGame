#pragma strict

private var collider : Collider2D;
private var largeScale : Vector3;

function Awake() {
	collider = GetComponent(Collider2D);
	largeScale = transform.localScale;
}

function Hit() {
	Shrink();
}

function Shrink() {
	collider.isTrigger = false;
	transform.localScale = largeScale * 0.2;
	
	Invoke("Grow", 10);
}

function Grow() {
	collider.isTrigger = true;
	transform.localScale = largeScale;
}