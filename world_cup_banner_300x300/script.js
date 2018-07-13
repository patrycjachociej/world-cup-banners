var $container = $('.container');
var $ball = $('.ball');
var $left = $('.left');
var $right = $('.right');
var $points = 0;
var $game_over = 0;

$ball.hide();
$('.game-over').hide();
$('.button-try-again').hide();
$('.click-ball').hide();
$('.number, .total, .button-claim-prize, .win, .congrats').hide();

$(".number, .button-try-again, .click-ball, .ball, .total, .button-claim-prize, .win").css("z-index", "3");
$(".congrats").css("z-index", "4");

$container.left = 0;
$container.top = 20;
$container.right = $container.width();
$container.bottom = $container.height();

$ball.width = $ball.width();
$ball.height = $ball.height();

$ball.vel = {};
$ball.vel.x = 0;
$ball.vel.y = 0;

$ball.pos = {};
$ball.pos.x = $container.right / 2;
$ball.pos.y = $container.bottom / 10;

$ball.bounce = -0.58;
$ball.gravity = 0.04;

$ball.friction = {}			
$ball.friction.x = 0.004;
$ball.friction.y = 0.005;

$('.button-start, .ball-start').click(function() {
	$('.ball-start, .note, .note-text, .button-start, .arrow').hide();
	$('.ball').fadeIn();
	$('.click-ball').fadeIn();
});

$('.button-try-again').click(function() {
	$container.top = 20;
	
	$game_over = 0;
	$points = 0;

	$('.game-over').hide();
	$('.button-try-again').hide();
	$('.number, .total, .arrow, .total').hide();


	$ball.vel = {};
	$ball.vel.x = 0;
	$ball.vel.y = 0;

	$ball.pos = {};
	$ball.pos.x = $container.right / 2;
	$ball.pos.y = $container.bottom / 10;

	$('.ball').delay(600).fadeIn();
	$(".number, .total").css("color", "white");
	$('.number, .total').delay(300).fadeIn();

});

$.prototype.calcPhysics = function () {
	
	$ball.vel.y += $ball.gravity;

	var isBounce = false;
	if ($ball.pos.x + $ball.width / 2 > $container.right) {
		$ball.pos.x = $container.right - $ball.width / 2;
		$ball.vel.x *= $ball.bounce;
		isBounce = true;

	} else if ($ball.pos.x - $ball.width / 2 < $container.left) {
		$ball.pos.x = $container.left + $ball.width / 2;
		$ball.vel.x *= $ball.bounce;
		isBounce = true;
	}

	
	if (($points != 10) && ($points != 0) && ($ball.pos.y + $ball.height / 2 > $container.bottom)) {
		$ball.pos.y = $container.bottom - $ball.height / 2;
		$ball.vel.y *= $ball.bounce;
		isBounce = true;
		
		/* GAME OVER */
		$game_over = 1;
		$(".number, .total").css("color", "transparent");
		
		$('.number, .total, .number, .total, .click-ball').hide();
		$('.game-over').fadeIn();
		$('.button-try-again').delay(900).fadeIn();
		
		$points = 0;

	}
	else if ($ball.pos.y + $ball.height / 2 > $container.bottom) {		
		$ball.pos.y = $container.bottom - $ball.height / 2;
		$ball.vel.y *= $ball.bounce;
		isBounce = true;
	}
	else if ($ball.pos.y - $ball.height / 2 < $container.top) {
		$ball.pos.y = $container.top + $ball.height / 2;
		$ball.vel.y *= $ball.bounce;
		isBounce = true;
	}

	if ($ball.vel.x >= 0) {
		$ball.vel.x -= $ball.friction.x;
	} else if ($ball.vel.x <= 0) {
		$ball.vel.x += $ball.friction.x;
	}

	if ($ball.vel.y >= 0) {
		$ball.vel.y -= $ball.friction.y;
	} else if ($ball.vel.y <= 0) {
		$ball.vel.y += $ball.friction.y;
	}

	$ball.pos.x += $ball.vel.x;
	$ball.pos.y += $ball.vel.y;
};

$.prototype.setPos = function (pos) {	
	if (!pos.x) {
		pos.x = pos[0];
	}
	if (!pos.y) {
		pos.y = pos[1];
	}
	$(this).css('top', pos.y);
	$(this).css('left', pos.x);
};

var update = function () {
	$ball.calcPhysics();
	$ball.setPos($ball.pos);
	
	if ($points <= 10) document.getElementById("number").innerHTML = $points;

	requestAnimationFrame(update);
};
if ($points < 10) update();


var win = function () {
	$points = 0;
	
	$(".total, .button-try-again").css("color", "transparent");
	$(".button-try-again").css("background-color", "transparent");
	$(".ball").css("display", "none");
	
	$('.total, .number').delay(500).hide();
	$('.ball, .total, .number, .button-try-again').hide();
	$('.button-claim-prize').delay(900).fadeIn();
	$('.congrats').delay(200).fadeIn();
	$('.win').delay(100).fadeIn();
}

$left.click(function () {
	if ($game_over == 0) {
		if ($points == 0) {
			$('.click-ball').hide();
			$('.number, .total').fadeIn();
		}
		else if ($points == 1) $container.top = 0;

		$ball.vel.x += 0.75;

		if ($ball.vel.y > 0) {			
			$ball.vel.y -= 6;			
		} else if ($ball.vel.y < 0) {	
			$ball.vel.y -= 5;			
		}

		$points++;

		if ($points == 10) win();
	}
	
});

$right.click(function () {
	if ($game_over == 0) {
		if ($points == 0) {
			$('.click-ball').hide();
			$('.number, .total').fadeIn();
		}
		else if ($points == 1) $container.top = 0;


		$ball.vel.x -= 0.75;

		if ($ball.vel.y > 0) {			
			$ball.vel.y -= 6;			
		} else if ($ball.vel.y < 0) {	
			$ball.vel.y -= 5;			
		}

		$points++;

		if ($points == 10) win();
	}
});