﻿#pragma strict

function OnTriggerExit2D (hit : Collider2D){
	if (hit.transform.tag == "Shot") 
		Destroy(gameObject);
}