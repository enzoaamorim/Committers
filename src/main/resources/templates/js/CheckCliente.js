document.addEventListener("DOMContentLoaded", function () {
  const infoElement = document.querySelector(".info");

  document.getElementById("inputBoleto").style.display = "none";
  document.getElementById("inputNum").style.display = "none";
  document.getElementById("inputCod").style.display = "none";
  document.getElementById("inputNom").style.display = "none";
  document.getElementById("inputData").style.display = "none";
  document.getElementById("inputQuan").style.display = "none";

  document.getElementById("forma").addEventListener("change", function (event) {
    var selectedOption = event.target.value;

    document.getElementById("inputBoleto").style.display = "none";
    document.getElementById("inputNum").style.display = "none";
    document.getElementById("inputCod").style.display = "none";
    document.getElementById("inputNom").style.display = "none";
    document.getElementById("inputData").style.display = "none";
    document.getElementById("inputQuan").style.display = "none";

    if (selectedOption === "1") {
      document.getElementById("inputBoleto").style.display = "block";
      infoElement.style.height = "400px";
    } else if (selectedOption === "2") {
      infoElement.style.height = "700px";
      document.getElementById("inputNum").style.display = "block";
      document.getElementById("inputCod").style.display = "block";
      document.getElementById("inputNom").style.display = "block";
      document.getElementById("inputData").style.display = "block";
      document.getElementById("inputQuan").style.display = "block";
    }
  });
});
