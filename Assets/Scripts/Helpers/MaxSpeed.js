#pragma strict

var maxSpeed : float = 200f;
 
private var body : Rigidbody2D;
 
function Awake() {
	body = GetComponent(Rigidbody2D);
}
 
function FixedUpdate()
{
     if(body.velocity.magnitude > maxSpeed)
     {
            body.velocity = body.velocity.normalized * maxSpeed;
     }
}