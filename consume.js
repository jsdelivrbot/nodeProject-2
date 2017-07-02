function getPosts(){
	var xmlhttp = new XMLHttpRequest();
	var result = document.getElementById("result");

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
           if (xmlhttp.status == 200) {
				var response = JSON.parse(xmlhttp.responseText);
				console.log("we freaking did it nigga");
				
           }
           else if (xmlhttp.status == 400) {
              alert('There was an error 400');
           }
           else {
               alert('something else other than 200 was returned');
           }
        }
    };

    xmlhttp.open("GET", "localhost:5000/retrieveInfo", true);
    xmlhttp.send();
}