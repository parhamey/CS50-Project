document.querySelector("section").style.opacity = "0";
document.querySelector("#contactus").style.opacity = "0";
document.querySelector("footer").style.opacity = "0";

document.querySelector("#navbar").style.display = "none";
jQuery(window).on("load", function () {
  document.querySelector("#home").scrollIntoView({ behavior: "smooth" });
  setTimeout(() => {
    document.querySelector("footer").style.opacity = "1";

    document.querySelector("#contactus").style.opacity = "1";
    document.querySelector("section").style.opacity = "1";
    document.querySelector("#navbar").style.display = "flex";
    jQuery(".loader").fadeOut("slow");
  }, 1000);
});