#pragma strict


private var shrunk : boolean = false;
private var myCollider : Collider2D;
private var largeScale : Vector3;

private var score : Score;

function Awake() {
	myCollider = GetComponent(Collider2D);
	largeScale = transform.localScale;
	
	score = GameObject.FindGameObjectWithTag("GameController").GetComponent(Score);
}

function Hit() {
	if (shrunk)
		return;
		
	Shrink();
}

function Shrink() {
	shrunk = true;

	myCollider.isTrigger = true;				// allow player to walk through
	transform.localScale = largeScale * 0.2;	// make it really small
	
	score.Add(1);
	Invoke("Grow", 10);
}

function Grow() {
	shrunk = false;

	myCollider.isTrigger = false;				// disallow player to walk through
	transform.localScale = largeScale;			// return to normal size
}