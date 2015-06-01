#pragma strict

var current : int = 0;

function Start () {
	Reset();
}

function Reset() {
	current = 0;
}

function Add(amount : int) {
	current += amount;
}