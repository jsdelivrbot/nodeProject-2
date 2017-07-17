function getPosts(){
  
	var xmlhttp = new XMLHttpRequest();
	var result = document.getElementById("result");

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
           if (xmlhttp.status == 200) {
            var response = JSON.parse(xmlhttp.responseText);
            console.log(response);
            while (result.hasChildNodes()) {
              result.removeChild(result.firstChild);
            }
            for(var i = 0; i < response.length; i++){
              var d = new Date(Date.parse(response[i].time_stamp)).toUTCString();
              result.innerHTML += "<div id='" + response[i].id + "' class='card'>" + response[i].user_alias + "<br>Post: " + response[i].id + "<span class='date'>" + d +"</span><hr>"
                                +  response[i].content + "<br>" + response[i].image_path 
                                + "<br><span class='replyLink' onclick='setreply(" + response[i].id + ")'>Reply to this post</span>"  + "</div>";
              
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

    xmlhttp.open("GET", "/retrieveInfo", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send();
}

function createPost(){
  var xmlhttp = new XMLHttpRequest();
  var result = document.getElementById("result").value;
  var alias = escape(document.getElementById("alias").value);
  var content = escape(document.getElementById("content").value);
  var imagePath = escape(document.getElementById("imagepath").value);
  var d = new Date()
  var time = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes();
  var params = {
    alias: alias,
    content: content,
    imagePath: imagePath,
    time: time
  }
  console.log(time);

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
           if (xmlhttp.status == 200) {
            clearForm();
            getPosts();

           }
           else if (xmlhttp.status == 400) {
              alert('There was an error 400');
           }
           else {
               alert('something else other than 200 was returned');
           }
        }
    };

    xmlhttp.open("POST", "/createPost", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify(params));
}

function escape(param){
  param = param.replace(/'/g, "''");
  return param;
}

function setreply(postId){
  var content = document.getElementById("content");
  content.innerHTML = "<a href=#" + postId + ">>>" + postId + "</a>";
  content.focus();
}

function clearForm(){
  var content = document.getElementById("content");
  var imagePath = document.getElementById("imagepath");
  var alias = document.getElementById("alias");
  content.value = "";
  imagePath.value = "";
  alias.value = "";
  console.log("Im in ur function");
}

function validate(){
  var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
           if (xmlhttp.status == 200) {
            
            var response = JSON.parse(xmlhttp.responseText);
            console.log(response);
            console.log(response.formSubmit);
              if (response.formSubmit == true){
                createPost(); //
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

    xmlhttp.open("GET", "/validate", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send();

}