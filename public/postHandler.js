
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyARyBusf3MP8riqnEwO_07W1Rp7MGTIoJQ",
    authDomain: "authproj-bdc97.firebaseapp.com",
    databaseURL: "https://authproj-bdc97.firebaseio.com",
    projectId: "authproj-bdc97",
    storageBucket: "authproj-bdc97.appspot.com",
    messagingSenderId: "758486491303"
  };
  firebase.initializeApp(config);
  

    // Reference to the recommendations object in your Firebase database
  var recommendations = firebase.database().ref("recommendations");

  // Save a new recommendation to the database, using the input in the form
  var submitRecommendation = function () {
  
    // Get input values from each of the form elements
    var title = $("#talkTitle").val();
    var presenter = $("#talkPresenter").val();
    var numberLikes = 0;
    var numberDislikes = 0;
    var comments = "no new comments:((((";
  
    // Push a new recommendation to the database using those values
    recommendations.push({
      
      "title": title,
      "presenter": presenter,
      "likes":numberLikes,
      "dislikes": numberDislikes,
      "comments": comments
    });
  };

  
  // var commentRef = firebase.database().ref("comments");
  
  //   commentRef.on("child_added", newsnap=>{
  //     // newsnap.ref.update({ "newcomments":"changed!!!" })
      
  //     console.log(newsnap.val());
      
  //   });
  
  
  
  recommendations.on("child_added", snap=>{
    
    var title = snap.child("title").val();
    var presenter = snap.child("presenter").val();
    var numLikes = snap.child("likes").val();
    var numDislikes = snap.child("dislikes").val();
    
    var comments = snap.child("comments").val();
    
    // console.log(snap.val());
   
    
    // var newComments = snap.child("comments").child("newcomments").val();
    
    // console.log(comments);
    
    // snap.ref.update({"comments": newComments});
    
    
    
    $("#table_body").append("<tr><td>"+title+"</td><td>"+presenter+"</td><td>"+numLikes+"</td><td>"+numDislikes+"</td><td>"+comments+"</td></tr>");
    
    
    // Create the button like and dislike button
    var likeBtn = document.createElement("button");
    likeBtn.innerHTML = "Like";
    var dislikeBtn = document.createElement("button");
    dislikeBtn.innerHTML = "Dislike";
    
    // appending the buttons to each child of recommendations
    $("#table_body").append(likeBtn, dislikeBtn);
    
    // Add event handler
    likeBtn.addEventListener ("click", function() {
        numLikes += 1;
        console.log(numLikes);
        likeBtn.onclick = window.location.reload();
        snap.ref.update({ "likes":numLikes });
    });
    
    // 3. Add event handler
    dislikeBtn.addEventListener ("click", function() {
      numDislikes += 1;
      console.log(numDislikes);
      dislikeBtn.onclick = window.location.reload();
      snap.ref.update({ "dislikes":numDislikes })
      
    });
    
    
    var commentSubmitBtn  = document.createElement("button");
    commentSubmitBtn.innerHTML = "Submit Comment";
    
    // // var newComment = document.getElementById("newComment");
    
    // var newComment = document.createElement('input'); 
    // newComment.type = "text";
    // newComment.id = "newComment";
   
    
    // append elements to each child
    $("#table_body").append(commentSubmitBtn);

    //submit a comment
      commentSubmitBtn.addEventListener("click", function(){
        
        var thenew = document.getElementById("newComment");
        console.log(thenew.value);
        
        
        // console.log(snap.key);
        //dislikeBtn.onclick = window.location.reload();
        snap.setValue(thenew);
        
        console.log(recommendations);
      
        
    });
    
    
  }); //end snap
  
  
  $(window).load(function () {
    // Find the HTML element with the id recommendationForm, and when the submit
    // event is triggered on that element, call submitRecommendation.
    $("#recommendationForm").submit(submitRecommendation);
  });
  


  
  
 