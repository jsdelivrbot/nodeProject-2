function getPosts(){
	var xmlhttp = new XMLHttpRequest();
	var result = document.getElementById("result");

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
           if (xmlhttp.status == 200) {
				    console.log("ahhhhhhhhhhhhhhhhhhhhhhhh");
            var response = JSON.parse(xmlhttp.responseText);
            console.log(response);
            for(var i = 0; i < response.length; i++){
          
              result.innerHTML += "<li>" + response[i].content + "</li>";
              
            }
				
           }
           else if (xmlhttp.status == 400) {
              alert('There was an error 400');
           }
           else {
               alert('something else other than 200 was returned');
           }
        }
    };

    xmlhttp.open("GET", "http://quiet-crag-95183.herokuapp.com/retrieveInfo", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send();
}