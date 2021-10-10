console.log("find any dragon on the screen and add edit button");

var
	$dragon_info = $("[data-role='dragon_info']");

function showEditableCards(){
	$dragon_info.attr("data-editable", "editable");
}
function saveEditDragon(){
	var 
		$this = $(this),
		dragon_name_str = $this.parent().parent().find("[data-edit_dragon]").attr("data-edit_dragon");
		// debugger;
	//collect all changes
	console.log("Show working and saving, and save changes to " + dragon_name_str);
	//after the save wokred?
	setTimeout(function(){
		$this.parent().parent().attr("data-editing", "not_editing");
	}, 1000 * 1);
	//then hide edirt
}
function hideEditView(current_edit){
	console.log("hide dragon that was edited");
}
function cancelEditDragon(){
	var 
		$this = $(this),
		dragon_name_str = $this.parent().parent().find("[data-edit_dragon]").attr("data-edit_dragon");
	//clearAllFields
	$this.parent().parent().attr("data-editing", "not_editing");
	//collect all changes
	console.log("Cancel all changes to " + dragon_name_str);
}
function setUpEditHandlers(){
	$(document).on("click", "[data-edit_dragon]", editDragon);
	$(document).on("click", "[data-action='save']", saveEditDragon);
	$(document).on("click", "[data-action='cancel']", cancelEditDragon);
}
function editDragon(){
	var 
		$this = $(this),
		dragon_name_str = $this.attr("data-edit_dragon");
	console.log("You wish to edit " + dragon_name_str);
	$this.parent().parent().attr("data-editing", "editing");
}

(function init(){
	//check LS if claiming they are an admin
	setUpEditHandlers();
	showEditableCards();
})();