#pragma strict

var destroyDelay: float;

function OnTriggerEnter2D (hit : Collider2D) {
	if (hit.transform.tag == "Player") {
		Destroy(gameObject, destroyDelay);
	}	
}