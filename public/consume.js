function getPosts(){
	var xmlhttp = new XMLHttpRequest();
	var result = document.getElementById("result");

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
           if (xmlhttp.status == 200) {
            var response = JSON.parse(xmlhttp.responseText);
            console.log(response);
            for(var i = 0; i < response.length; i++){
          
              result.innerHTML += "<li>" + response[i].content + ", " + response[i].user_alias + ", " + response[i].image_path + "</li>";
              
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

function createPost(){
  var xmlhttp = new XMLHttpRequest();
  var result = document.getElementById("result").value;
  var alias = document.getElementById("alias").value;
  var content = document.getElementById("content").value;
  var imagePath = document.getElementById("imagepath").value;

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
           if (xmlhttp.status == 200) {
            
           }
           else if (xmlhttp.status == 400) {
              alert('There was an error 400');
           }
           else {
               alert('something else other than 200 was returned');
           }
        }
    };

    xmlhttp.open("GET", "http://quiet-crag-95183.herokuapp.com/createPost/" + alias + "/" + content + "/" + imagePath, true);
    //xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send();
}