function weekly(){
   var checkbox = document.getElementById("Weekly");
   var x = document.getElementById("when");
   if(checkbox.checked == true){
        x.style.display = "block";
         };
   if(checkbox.checked == false){
        x.style.display = "none";
         };
    }