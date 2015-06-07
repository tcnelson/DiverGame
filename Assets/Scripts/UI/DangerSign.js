#pragma strict

private var spriteRenderer : SpriteRenderer;

function Awake() {
	spriteRenderer = GetComponent(SpriteRenderer);
}

function Start () {
	Hide();
}

function Update () {
	// fade over 1 second
	var alpha = spriteRenderer.color.a;
	alpha -= Time.deltaTime;
	if (alpha < 0) alpha = 0;

    spriteRenderer.color = Color(1f, 1f, 1f, alpha);
}

function Show() {
	spriteRenderer.color = Color(1f, 1f, 1f, 1f);
}

function Hide() {
	spriteRenderer.color = Color(1f, 1f, 1f, 0);
}