window.onload = function() {
	$("#unique-string").click(validate); 
	$("#remove-from-string").click(removeDuplicates);
	$("#check-anagrams").click(checkAnagram);
}


// function that checks to see if the characters in a string
// are unique
// RT: O(N)
function validate() {
	var str = $("#valid-string").val();
	var bool = new Array(256);	
	var temp_str = "<p>The string contains unique characters? ";
	for(var i = 0; i < str.length; i++) {
		if(bool[str.charAt(i)]) {
			$("#valid-string-output").html(temp_str + false + "</p>");
			return false;
		}
		bool[str.charAt(i)] = true;
	}
	$("#valid-string-output").append(temp_str + true + "</p>");
	return true;
}

// function that removes duplicate characters in a string
// RT: O(N^2)
function removeDuplicates() {
	var str = $("#remove-string").val().split("");
	var temp = str.join("");
	for(var i = 0; i < str.length; i++) {
		for(var j = i + 1; j < str.length; j++) {
			if(str[i] == str[j]) {				
				str.splice(j, 1);					
				j--		
			}
		}
	}	
	$("#remove-string-output").append("<p>The string \""  + temp 
		+ "\" without the duplicates is \"" + str.join("") + "\"</p>");
}

// function that checks to see if two strings are anagrams of each other
function checkAnagram() {	
	var first_str, second_str, first_temp, second_temp;
	first_str = $("#anagram-a").val();
	first_temp = first_str;
	second_str = $("#anagram-b").val();
	second_temp = second_str
	if(first_str.length != second_str.length) {
		$("#anagram-output").append("<p>\"" + first_str + "\" and \"" 
			+ second_str + "\" are not anagrams for each other</p>");
		return;
	}
	first_str = first_str.split("").sort().join("");
	second_str = second_str.split("").sort().join("");
	for(var i = 0; i < first_str.length; i++) {
		if(first_str[i] != second_str[i]) {
			$("#anagram-output").append("<p>\"" + first_temp + "\" and \"" 
			+ second_temp + "\" are not anagrams for each other</p>");
			return;
		}
	}
	$("#anagram-output").append("<p>\"" + first_temp + "\" and \"" 
			+ second_temp + "\" are anagrams for each other</p>");
}