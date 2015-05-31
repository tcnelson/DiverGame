#pragma strict

public var fieldOfViewAngle : float = 110f;             // Number of degrees, centred on forward, for the enemy see.
public var playerInSight : boolean;                     // Whether or not the player is currently sighted.
public var personalLastSighting : Vector2;              // Last place this enemy spotted the player.

private var player : GameObject;
private var col : CircleCollider2D;                     // Reference to the circle collider trigger component.
private var layerMask : int;


function Awake () {

	player = GameObject.FindGameObjectWithTag("Player");
	layerMask = 1 << LayerMask.NameToLayer("Player");
	layerMask += 1 << LayerMask.NameToLayer("Environment");
	col = GetComponent(CircleCollider2D);
	
}

function Update () {

}

function OnTriggerStay2D (other : Collider2D)
{
    // If the player has entered the trigger sphere...
    if(other.gameObject != player)
    	return;

    // By default the player is not in sight.
    playerInSight = false;
    
    // Create a vector from the enemy to the player and store the angle between it and forward.
    var myPosition : Vector2 = transform.position;
    var direction : Vector2 = other.transform.position - transform.position;
    var distance : float = Vector2.Distance(transform.position, other.transform.position);
    var angle : float = Vector2.Angle(direction.normalized, transform.up);
    
    // If the angle between forward and where the player is, is less than half the angle of view...
    //if(angle < fieldOfViewAngle * 0.5f)
    //{
        var hit : RaycastHit2D = Physics2D.Raycast(myPosition, direction.normalized, distance, layerMask);
      	// ... and if a raycast towards the player hits something...
        if (hit.collider != null) {
	        // ... and if the raycast hits the player...
	        if(hit.collider.gameObject == player)
	        {
	            // ... the player is in sight.
	            playerInSight = true;
	        }
        }
    //}
}


function OnTriggerExit2D (other : Collider2D)
{
    // If the player leaves the trigger zone...
    if(other.gameObject == player)
        // ... the player is not in sight.
        playerInSight = false;
}