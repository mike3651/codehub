(function() {
	// DEFAULT ADD VALUE
	var DEFAULT_SCORE = 10;

	// valid search terms
	var search_terms = ["string", "array"];

	// valid entities
	//var entities = ["Theta", "Omega", "pi"]	// Enitity cap theta, Ω

	var conversions = {
		"Theta": "&Theta;",
		"Omega": "Ω",
		"pi": "π"
	}

	// CREATES A NODE 
	function node(next, value){
		this.next = next;
		this.value = value;

		// returns the next node
		this.getNext = function() {
			return next;
		};

		// returns the current value of this node
		this.getValue = function() {
			return value;
		};
	}

	// CREATES A LINKED LIST
	function linkedList(node) {
		this.head = new node(null, null);

		// adds a node to the list
		this.addNode = function(data) {
			var newNode = new node(null, data);
			if(this.head.data == null) {
				this.head = newNode;
			}
			var ptr = head;
			while(ptr.next != null) {
				ptr = ptr.next;
			}
			ptr.next = newNode;
		}
	}

	// valid functions 
	// var functions = ["partial-derivative", "square-root"] // ∂, √

	window.onload = function() {
		$("#unique-string").click(validate); 
		$("#remove-from-string").click(removeDuplicates);
		$("#check-anagrams").click(checkAnagram);
		$(".fancybox").fancybox({
			'transitionIn': 'elastic'
		});
		$("#search").click(find);
	}

	// finds the respective section that the user is searching for
	function find() {
		var query = $("#search-query").val();

		// check to see if the query  contains special commands/characters
		convert(query);
		

		findSimilar(query);
	}

	// return contains special commands or keywords ? true + value[s] : false
	function convert(query) {
		var words = query.split(" ");	// array of words in the query

		// loop through all of query after it has been split
		for(var i = 0; i < words.length; i++) {

			// checks for the conversion and then replaces if needed
			if(conversions[words[i]] != null) {
				words[i] = conversions[words[i]];				
			}
			alert(words[i]);
		}
		words = words.join(" ");		
		$("#search-query").val(words);
	}

	// function that finds out what the search query is similar to 
	// param -> query : The query string 
	// return -> The string that is most similar to the query
	function findSimilar(query) {		
		var ranking = {}, i = 0, min_index = 0;

		for(; i < search_terms.length; i++) {	
			// console.log(query);
			// console.log(search_terms[i])				
			ranking[search_terms[i]] = similarity(query, search_terms[i]);	
		}

		// find the min index	
		i = 1;
		for(; i < Object.keys(ranking).length; i++) {

			// This is just used for tracking the similiarity in terms of the query
			console.log("comparing " + search_terms[min_index] + " => " + ranking[search_terms[min_index]] 
				+ " to " + search_terms[i] + " => " + ranking[search_terms[i]]);	

			if(ranking[search_terms[min_index]] > ranking[search_terms[i]]) {
				min_index = i;
			}
		}		
		console.log("The closest string to the search is: " + search_terms[min_index]);
		return search_terms[min_index];
	}


	// function that determines the similiarity of a string to another string
	// very similary to the merge algorithm of merge sort
	// param -> query : The query string
	// param -> testString: The string to test against
	// return -> a double representing the similarity
	function similarity(query, testString) {
		// console.log(query);
		// console.log(testString);

		// ignore case sensitivity		
		query = query.toLowerCase();
		testString = testString.toLowerCase();	
		var i = 0, j = 0, total = 0;
		while(i < query.length && j < testString.length) {			
			total += Math.abs(query.charCodeAt(i) - testString.charCodeAt(j));			
			i++;
			j++;
		}		

		// case: the query string is longer
		while(i < query.length) {
			total += DEFAULT_SCORE;
			i++;
		}

		// case: the testString is longer
		while(j < testString.length) {
			total += DEFAULT_SCORE;
			j++;
		}
		
		return total;
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
				$("#valid-string-output").append(temp_str + false + "</p>");
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

	

})();