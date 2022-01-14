$(document).ready(function(){
    $('.cameraAnim').on('click',function(e){
        let _id = e.target.id;
        if(_id === "tailLight"){
            tailLight = true;
        }else if(_id === "door"){
            doorAnim = true;
        }else if(_id === "sunRoof"){
            sunRoof = true;
        }  
        else if(_id === "chargingPort"){
            charger = true;
        }else if(_id === "reverseCam"){
            rCam = true;
        }
       let x =  data.cameraAnim[_id].x;
       let y =  data.cameraAnim[_id].y;
       let z =  data.cameraAnim[_id].z;
       let xB = data.cameraAnim[_id].xBox;
       let yB = data.cameraAnim[_id].yBox;
       let zB = data.cameraAnim[_id].zBox;
       camAnimation(x,y,z,xB,yB,zB);
     
    });

    $('#render').on('click',function(){
        console.log(renderCam(renderCamera));
    });

    $('.color').on('click',function(e){
        let colorData = data.color[e.target.id];      
        carColor(colorData);
    });

    $('#share').on('click',function(){
        console.log(shareImage());
        // let _c = shareImage();
        // $("#share-mail-img").attr('src',_c);
    });
    $('.share-pop').on('click',function(){
        //console.log(shareImage());
        //let _c = shareImage(); 
        //alert(_c);        
        // $("#share-mail-img").attr('src', _c);
        // $('#img-hidden').val(_c);
    });

    $(".download-img").on('click',function(){
        downLoadImage();
    });
    $('.reset').on('click',function(e){        
        reset();
        e.preventDefault();
            setTimeout(function () {
                $('.slider-nav, .slider-nav-mob').slick("slickGoTo", 0);
                $('.option-sublist').hide();
                $(".nav-main-menu .slick-back-btn").removeClass('show-btn');
                $('.nav-main-menu ul li a.active-menu').html(" ");
                $(".nav-section.desk-nav .slider-nav").removeClass('hide-mn');
            }, 1);
    });    
    $('.interior').on('click',function(){
        interior();
        $('.socialIcons a').attr('data-url', 'https://request.mercedes-benz.co.in/EQC-Virtual-Experience/interior.html?page=interior');
    });

    $('.slider-nav-mob').on('afterChange', function() {
        var dataId = $('.slick-current').attr("data-slick-index");    
        //console.log(dataId);
        if(dataId == 0){
            exterior();
            $('.select-cars-parts ul li a').removeClass('active');
            $('.slider-for.mbl-slider-scroll .mCSB_container').css('top', '0');
            
        }
        else if(dataId == 1){
            exterior();
            $('.select-cars-parts ul li a').removeClass('active');
            $('.slider-for.mbl-slider-scroll .mCSB_container').css('top', '0');
        }
        else if(dataId == 2){
            interior();
            $('.select-cars-parts ul li a').removeClass('active');
            $('.slider-for.mbl-slider-scroll .mCSB_container').css('top', '0');
        }
        else if(dataId == 3){
            exterior();
            $('.select-cars-parts ul li a').removeClass('active');
        }
        else if(dataId == 4){
            exterior();
            $('.select-cars-parts ul li a').removeClass('active');
        }

    });

    $('.exterior').on('click',function(){
        exterior();
        $('.socialIcons a').attr('data-url', 'https://request.mercedes-benz.co.in/EQC-Virtual-Experience/exterior.html?page=exterior');
    });
    $(".sideDoorClose").on('click',function(){
        closeAnim(12);      
    });  
    
    //AMBIENT COLOR CHANGE
    $(".redColor").on('click',function(){
        lineMat.map = lineTexRed;
        lineMat.emissive.setHex(0xff1205);       
        doorMat.map = doorTexRed;
        shellMat.map = shellTexRed;
        metalMat.map = doorTexRed;
    });
    $(".blueColor").on('click',function(){
        lineMat.map = lineTexBlue;
        lineMat.emissive.setHex(0x0c0c91);
        doorMat.map = doorTexBlue;
        shellMat.map = shellTexBlue;
        metalMat.map = doorTexBlue;
    });
    $(".greenColor").on('click',function(){
        lineMat.map = lineTexGreen;
        lineMat.emissive.setHex(0x0e910c);
        doorMat.map = doorTexGreen;
        shellMat.map = shellTexGreen;
        metalMat.map = doorTexGreen;
    });
    $(".noColor").on('click',function(){
        lineMat.map = lineTex;
        lineMat.emissive.setHex(0x000000);
        doorMat.map = doorTex;
        shellMat.map = shellTex;
        metalMat.map = doorTex;
    });

    //NIGHT MODE
    $(".nightMode").on('click',function(){
        camAnimation(1500,700,-800,0,0,0);
        nightScene();
    });
    $(".dayMode").on('click',function(){
        dayScene();       
    });
});

function tailLightEffects(getTailTex){ 
    tailLightMat.map = getTailTex;
}
function objectVis(bool,objName){   
    let _obj = init.scene.getObjectByName(objName);
    _obj.visible = bool;   
}
