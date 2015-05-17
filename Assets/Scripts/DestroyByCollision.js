#pragma strict

function OnCollisionEnter2D(hit : Collision2D){
	//Destroy(gameObject);
}

function OnTriggerEnter2D(hit : Collider2D){
	if (hit.transform.tag == "Player" ) {
		return; 
	}
	else if (hit.transform.tag == "Boundary") {
		return;
	}
	
	Destroy(gameObject);
}