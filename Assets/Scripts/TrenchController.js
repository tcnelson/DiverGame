#pragma strict

private var trenchCollider : Collider2D;

private var playerController : PlayerController;

function Awake() {
	trenchCollider = GetComponentInChildren(Collider2D);
	playerController = GameObject.FindGameObjectWithTag("Player").GetComponent(PlayerController);
}

function Start () {
	trenchCollider.isTrigger = true;
}

function Update () {

}

function OnTriggerEnter2D(other : Collider2D) {
	if (other.transform.tag == "Player") {
		playerController.Die();
	}
}