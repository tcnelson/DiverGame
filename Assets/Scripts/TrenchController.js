#pragma strict

private var trench : GameObject;
private var trenchCollider : Collider2D;

private var playerController : PlayerController;

function Awake() {
	trench = GameObject.FindGameObjectWithTag("Trench");
	trenchCollider = trench.GetComponentInChildren(Collider2D);
	playerController = GameObject.FindGameObjectWithTag("Player").GetComponent(PlayerController);
}

function Start () {
	trenchCollider.isTrigger = true;
}

function Update () {

}

function OnTriggerStay2D(other : Collider2D) {
	if (other.transform.tag == "Player") {
		playerController.Die();
	}
}