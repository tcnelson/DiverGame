#pragma strict

var isActive : boolean = false;

function Start () {

}

function Update () {

}

function Swing() {
}

function OnTriggerStay2D(other : Collider2D) {
	if (!isActive) return;

	if (other.transform.tag == "Seaweed") {
		var seaweedController = other.GetComponent(SeaweedController);
		seaweedController.Hit();
		return;
	}
	
	if (other.transform.tag == "Enemy") {
		var enemyController = other.GetComponent(EnemyController);
		enemyController.Damage(100 * Time.deltaTime);
		return;
	}
}