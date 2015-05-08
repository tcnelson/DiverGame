#pragma strict

var speed : float = 6f;            // The speed that the player will move at.

private var movement : Vector2;    // The vector to store the direction of the player's movement.
private var playerRigidbody : Rigidbody2D;          // Reference to the player's rigidbody.

function Start () {
	playerRigidbody = GetComponent (Rigidbody2D);
}

function Update () {

}

function FixedUpdate ()
{
    // Store the input axes.
    var h : float = Input.GetAxisRaw ("Horizontal");
    var v : float = Input.GetAxisRaw ("Vertical");

    // Move the player around the scene.
    Move (h, v);
}

function Move (h : float, v : float)
{
    // Set the movement vector based on the axis input.
    movement.Set(h, v);
    
    // Normalise the movement vector and make it proportional to the speed per second.
    movement = movement.normalized * speed * Time.deltaTime;

    // Move the player to it's current position plus the movement. 	
    playerRigidbody.MovePosition (transform.position + movement);
}