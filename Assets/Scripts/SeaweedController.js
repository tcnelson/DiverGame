#pragma strict

private var collider : Collider2D;

function Awake() {
}

function Hit() {
	Shrink();
}

function Shrink() {
	collider.isTrigger = false;
}

function Grow() {
	collider.isTrigger = true;
}