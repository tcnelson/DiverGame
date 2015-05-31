#pragma strict

var isActive : boolean = false;



function Start () {

}

function Update () {

}

function Swing() {
}

function OnCollisionEnter2D(other : Collider2D) {
	if (other.transform.tag == "Seaweed") {
		var controller = other.GetComponent(SeaweedController);
		controller.Hit();
		return;
	}
	
	if (other.transform.tag == "Enemy") {
		var controller = other.GetComponent(EnemyController);
		controller.Damage(20);
		return;
	}
}