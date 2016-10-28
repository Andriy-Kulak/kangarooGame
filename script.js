"use strict";

$(function(){
$(document).ready(function(){
	
// array of grasshoopers and empty space
var set = [
{id: 1, type: "Orange", image: "orangeK2.png"},
{id: 2, type: "Orange" , image: "orangeK2.png"},
{id: 3, type: "Orange", image: "orangeK2.png"},
{id: 4, type: "Orange", image: "orangeK2.png"},
{id: 5, type: "", image: "grass4.png"},
{id: 6, type: "Green", image: "greenK2.png"},
{id: 7, type: "Green", image: "greenK2.png"},
{id: 8, type: "Green", image: "greenK2.png"},
{id: 9, type: "Green", image: "greenK2.png"},  
];

// lays out the array of kangaroos and empty grass space into a list in UI
for(var i=0;i<set.length;i++){
	$("#kangaroo").append(
		"<li id=" + set[i].id + "><div><img src='./img/"+ set[i].image + "'/></div><div class=''>" + set[i].id  + " " + set[i].type + "</div></li>"
		);                           
}

// method will check if yellow/green kangaroos are all in the opposite sides
function arrayContainsAnotherArray(smallArray, bigArray){
  for(var i = 0; i < smallArray.length; i++){
    if(bigArray.indexOf(smallArray[i]) === -1)
       return false;
  }
  return true;
}

var count = 0; // count is used to keep track of the turn
var greenWinCombo = ["1", "2", "3", "4"]; // the value of id's of the orange kangaroos
var yellowWinCombo = ["6", "7", "8", "9"]; // the value of id's of the green kangaroos

// adds swapable class to all the li elements
$("li").addClass("swapable"); 

$("#1, #2, #6 ,#7 ,#8 ,#9").addClass("unsortable");

// swap method swaps to nodes with each other
// when one li item is dragged on another
function swapNodes(a, b) {
    var aparent= a.parentNode;
    var asibling= a.nextSibling===b? a : a.nextSibling;
    b.parentNode.insertBefore(a, b);
    aparent.insertBefore(b, asibling);
}

// draggable and droppable config for the game
$(".swapable").
draggable({ revert: true }).
droppable({
	drop:function(event,ui){
		// enables the swap feature
		swapNodes($(this).get(0),$(ui.draggable).get(0));

		// array that checks the value of ids on the left side (slots 0-3)
		var leftSideCheck = [
			$("li")[0].attributes.id.value,
			$("li")[1].attributes.id.value,
			$("li")[2].attributes.id.value,
			$("li")[3].attributes.id.value
		];
		// array that checks the value of ids on the left side (slots 5-8)
		var rightSideCheck = [
			$("li")[5].attributes.id.value,
			$("li")[6].attributes.id.value,
			$("li")[7].attributes.id.value,
			$("li")[8].attributes.id.value
		];

		count++; // count is added
		$("#counter").text(count) // modifies counter to current count in UI

		// func checks if number is even
		function isEven(n) {
			return n % 2 == 0;
		}

		// if even/odd, updates the turn in the UI
		if(isEven(count)){
			$("#turn").text("Orange");
		} else {
			$("#turn").text("Green");
		}

		// if player moved all the kangaroos to the opposite sides,
		// a winning message will pop up
		if(arrayContainsAnotherArray(leftSideCheck, yellowWinCombo) && arrayContainsAnotherArray(rightSideCheck,greenWinCombo)){
			alert("You have finished the game in " + (count) + " moves!!!");
			//reloads the page			
			window.location.reload(true);
		}

		// method checks if turn is odd or even and adjusts the classes of
		// orange and green kangaroos depending on whose turn it is
		// enables drag/drop ability of some kangaroos and disables drop/drag of others
		if(isEven(count)){
			$("#1 ,#2 ,#3 ,#4").removeClass("unsortable"); // for greying out effect
			$("#1 ,#2 ,#3 ,#4").draggable("enable").droppable("enable"); // enables drag and drop func
			$("#1 ,#2 ,#3 ,#4").addClass("swapable"); // new
			$("#6 ,#7 ,#8 ,#9").addClass("unsortable"); // for greying out effect
			$("#6 ,#7 ,#8 ,#9").draggable("disable").droppable("disable"); // diasbles drag and drop func
			$("#6 ,#7 ,#8 ,#9").removeClass("swapable ui-draggable ui-draggable-handle ui-droppable ui-droppable-active ui-sortable-handle"); // remove excess classes for clarity
		} else {
			$("#1 ,#2 ,#3 ,#4").addClass("unsortable"); // for greying out effect
			$("#1 ,#2 ,#3 ,#4").draggable("disable").droppable("disable"); // diasbles drag and drop func
			$("#1 ,#2 ,#3 ,#4").removeClass("swapable ui-draggable ui-draggable-handle ui-droppable ui-droppable-active ui-sortable-handle"); // remove excess classes for clarity
			$("#6 ,#7 ,#8 ,#9").removeClass("unsortable"); // for greying out effect
			$("#6 ,#7 ,#8 ,#9").draggable("enable").droppable("enable"); // enables drag and drop func

			$("#6 ,#7 ,#8 ,#9").addClass("swapable"); //new
		}

		// var finds the position of the space grass el.
		var spaceIndex = $( "li" ).index($('#5'));

		console.log("spaceIndex", spaceIndex);
		
		// checks the proximity of kangaroos to the space grass el.
		// only kangaroo el's within two spaces are enabled to drag & drop
		var unsortableCount = 0;
		for(var i = 0; i <= 8; i++){		
			if(i < spaceIndex - 2 || spaceIndex + 2 < i) {
				$( "li" ).eq(i).addClass("unsortable");
				$( "li" ).eq(i).removeClass("swapable ui-draggable ui-draggable-handle ui-droppable ui-sortable-handle");
				$( "li" ).eq(i).draggable("disable").droppable("disable");
				}

			if($( "li" ).eq(i).hasClass('unsortable')) {
				unsortableCount++;
				if(unsortableCount === 8){
					alert("You have entered a stalemate. "+ (isEven(count) ? "Orange" : "Green" ) +" Kangaroos will not have anywhere to go!!!! Refer to Ex. 4 for details. :-( ");		
					setTimeout(window.location.reload(true),3000);
				}
			}
		}

		console.log("unsortableCount", unsortableCount);
	}});

// to start off the game, these element should not be able to be dragged and dropped on the first turn
$("#1, #2, #6 ,#7 ,#8 ,#9").draggable('disable').droppable('disable');
$("#5").draggable("disable"); 

	});
});

