#pragma strict

private var playerController : PlayerController;
private var enemyController : EnemyController;

function Awake() {
	var player = GameObject.FindGameObjectWithTag("Player");
	playerController = player.GetComponent(PlayerController);

	enemyController = GetComponentInParent(EnemyController);
}

function OnTriggerStay2D(other : Collider2D) {
	if (!enemyController.isAlive)
		return;

	if (other.transform.tag == "Player") {
		playerController.Damage(10 * Time.deltaTime);
	}
}
