//import hello_world from "./modules/hello-world";

//hello_world("hello,world...");
$(()=>{

  $(".switchBtn").on("click",function(){
    let ang = $(this).data("ang");
    $(".product").each(function(index,val){
      let $product = $(this);
      console.log($product.attr("data-ang") + " and " + ang);
      if($product.attr("data-ang") === ang){
        return;
      }
      $(val).attr("data-ang",ang);
      TweenLite.fromTo($product,0.3,{opacity:0.4},{opacity:1});
    });
  });
});
