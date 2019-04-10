document.getElementById("clickme").addEventListener("click", function() {
    document.getElementById("lightbox").className = "open";
  });
  
  document.getElementById("close").addEventListener("click", function() {
    document.getElementById("lightbox").className = "";
  });
  
  document.getElementById("lightbox").addEventListener("click", function(e) {
    if (e.target.id == "lightbox") {
      document.getElementById("lightbox").className = "";
    }
  });
  