#pragma strict


function Awake () {
	AttachTrenchController();
}

function AttachTrenchController() {
	var trench : GameObject = GameObject.FindGameObjectWithTag("Trench"); 			// find trench
	var trenchCollider : Collider2D = trench.GetComponentInChildren(Collider2D);	// find collider child
	trenchCollider.gameObject.AddComponent(TrenchController);						// attach controller to parent
}