#pragma strict

private var trenchCollider : Collider2D;
private var playerController : PlayerController;
private var playerHealth : PlayerHealth;		// Reference to player health

function Awake() {
	trenchCollider = GetComponentInChildren(Collider2D);
	playerController = GameObject.FindGameObjectWithTag("Player").GetComponent(PlayerController);
	playerHealth = GameObject.FindGameObjectWithTag("GameController").GetComponent(PlayerHealth);
}

function Start () {
}

function Update () {
	if (playerHealth.currentHealth < 20)
		trenchCollider.isTrigger = true;
	else
		trenchCollider.isTrigger = false;
}

function OnTriggerStay2D(other : Collider2D) {
	if (other.transform.tag == "Player") {
		playerController.Die();
	}
}