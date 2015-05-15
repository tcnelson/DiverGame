#pragma strict

// Destroy other game object when shot hits it
function OnTriggerExit(other : Collider)
{
    Destroy(other.gameObject);
}