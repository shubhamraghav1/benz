let baseUrl ="https://request.mercedes-benz.co.in/EQC-Virtual-Experience/";
let init,kitchenLoad,rendCam,refCube,textureCube,carBody,background,carMetal;
let controls,camera,frontCamera,backCamera,renderer,container,scene,camPoint;
let fbxPath = baseUrl + "assets/car.fbx";
let fbxPathWheel = baseUrl + "assets/wheel.fbx";
let fbxPathInterior = baseUrl + "assets/Interior.fbx";
let fbxPathCharger = baseUrl + "assets/charger.fbx";
let fbxPathLightRay = baseUrl + "assets/lightRays.fbx";
let camPointOne;
let manager = new THREE.LoadingManager();
let clock = new THREE.Clock(),mixer,action,carModel,delta;
let tailTexOn,tailTexOff;
let tailLight = false,doorAnim = false,sunRoof = false,charger = false,rCam = false;
let nightMode = false,nightTailLight = false;
let strDownloadMime = "image/octet-stream";
let _percent;
//alert("2");

function getUrlVars()
{
	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('?');
	for(var i = 0; i < hashes.length; i++)
	{
		hash = hashes[i].split('=');
		vars.push(hash[1]);
		vars[hash[0]] = hash[1];
	}
	
	if(vars=='exterior'){
		exterior();
	}else if(vars=='interior'){
		interior();
	}
	
	return vars;
}

$(document).ready(function(){
    let detect = detectWebGL();
    if(detect == 1){
        //alert(detect);
        init = new sceneSetup(65, 1, 10000,1000, 500, -1200, 0x919191,renderCamera);         
    }else if(detect == 0){
        //alert(detect);
        alert("Please Enable WebGL in your Browser.");
    }else if(detect == -1){
        //alert(detect);
        alert("Your device does not support this version. Re-directing you to Mercedes-Benz India website.");

        setTimeout(function(){            
            window.location.href="https://www.mercedes-benz.co.in/";
        },5000); //1000 = 1 second
    }
    /*
    if(!window.WebGLRenderingContext){
        alert("YOUR DEVICE/BROWSER DOESNT SUPPORT WEBGL");
        setTimeout(function(){            
            window.location.href="https://www.mercedes-benz.co.in/";
          },5000); //1000 = 1 second
        
    }else{
        alert("YOUR DEVICE/BROWSER SUPPORTING WEBGL");
        init = new sceneSetup(65, 1, 10000,1000, 500, -1200, 0x919191,renderCamera);        
    }*/
    
    let eqcBlueTex = loadTex (baseUrl + "assets/bumper_c.jpg");
    let aoMapTex = loadTex(baseUrl + "tex/Mtal_Exteroir_1_ao.jpg");
  
    let lightTex = loadTex(baseUrl + "assets/Light_c.jpg");
    let lightTexAO = loadTex(baseUrl + "assets/Light_ao.jpg");
    let chasisTex = loadTex(baseUrl + "assets/chasis_c.jpg");
    let chasisAO = loadTex(baseUrl + "assets/chasis_ao.jpg");
     tailTexOff =  loadTex(baseUrl + "assets/tail_light-off.jpg");
     tailTexOn =  loadTex(baseUrl + "assets/tail_light-on.jpg");
    let tyreTex =  loadTex(baseUrl + "assets/tyre_c.jpg");
    let rimTexAo = loadTex(baseUrl + "assets/Wheel_ao.jpg");
    let rimTex= loadTex(baseUrl + "assets/Wheel_c.jpg");  
    let floorTex = loadTex(baseUrl + "assets/pave-02.jpg");//floor_c
     doorTex = loadTex(baseUrl + "assets/dashBoard-AMBI/Door_c.jpg");
     doorTexRed = loadTex(baseUrl + "assets/dashBoard-AMBI/Door_c-RED.jpg");
     doorTexBlue = loadTex(baseUrl + "assets/dashBoard-AMBI/Door_c-BLUE.jpg");
     doorTexGreen = loadTex(baseUrl + "assets/dashBoard-AMBI/Door_c-GREEN.jpg");
    let doorTexAO = loadTex(baseUrl + "assets/Door_ao.jpg");
    let doorTexNormal = loadTex(baseUrl + "assets/inter-Test/Door_n.jpg");
    let floorTexDome = loadTex(baseUrl + "assets/10.jpg");//09 
    let chargerTex = loadTex(baseUrl + "assets/Charging_Station_Base_C.jpg");
    let chargerTexAO = loadTex(baseUrl + "assets/Charging_Station_Mixed_AO.jpg");
 
    manager.onStart = function(url, itemsLoaded, itemsTotal){
        $(".loaderContainer").show();

        $('.loaderContainer #loader-overlay1').show();
        $(".progress-bar").css('width',  + '0%');

        // var config_video = document.getElementById("video-loader"); 
        // config_video.autoplay = true; 
        // config_video.play();         
                
        var myaudio_b = document.getElementById("audio-benz"); 
        myaudio_b.autoplay = false; 
        myaudio_b.pause();

        var myaudio1 = document.getElementById("audio-speaker"); 
        myaudio1.autoplay = false; 
        myaudio1.pause();
    }   
    manager.onProgress = function ( url, itemsLoaded, itemsTotal ){
        _percent = Math.round(itemsLoaded / itemsTotal * 100, 2);
        $(".progress-bar").css('width', _percent + '%'); 
        
        var w = 0,
        w = Math.round(itemsLoaded / itemsTotal * 100);
        var inner = document.querySelector('.percent-txt');
        inner.textContent = _percent+'%';
        
        var myaudio_b = document.getElementById("audio-benz"); 
        myaudio_b.autoplay = false; 
        myaudio_b.pause();
    }; 
    manager.onLoad = function (){
        //Onload Change the view
        if($(".progress-bar").css('width', '100%')){
            setInterval(function(){ $(".loaderContainer").hide()}, 1000);  
            
            $('.loaderContainer #loader-overlay1').delay(5000).hide();

            setTimeout(function(){
                document.getElementById("audio-benz").play(); 
           }, 3000);
            
        }

        // var config_video = document.getElementById("video-loader"); 
        // config_video.autoplay = false; 
        // config_video.pause();

        getUrlVars();
       
       //$('.mute-audio-mb').trigger('click');      

    }; 
    
    intRefCube = new THREE.CubeTextureLoader()
    .setPath( baseUrl + 'imgs/new/' )					
    .load( [ 'px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png' ] );

    refCube = new THREE.CubeTextureLoader()
    .setPath( baseUrl + 'imgs/10/' )					
    .load( [ 'px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png' ] );
        
      
carBody = new THREE.MeshPhysicalMaterial( { 
   color: 0xababab,//,0xe8e8e8,
   envMap:refCube,
   aoMap:aoMapTex,
   aoMapIntensity:1,
   reflectivity: 1,
   clearcoat:1,
   metalness: 0.7,
   roughness: .17,//.25
   combine: THREE.MixOperation,
   side:THREE.DoubleSide,
   clearcoatRoughness: 0,  
});
normalMapTyre = loadTex(baseUrl + "assets/tyre_n.jpg");
   grillMat = new THREE.MeshPhongMaterial({envMap:refCube,reflectivity: .1,map:eqcBlueTex,aoMap:aoMapTex,aoMapIntensity:1,/*color: 0x3a3a3a,*/combine: THREE.MixOperation,side:THREE.DoubleSide});
   chasisMat = new THREE.MeshPhongMaterial({map : chasisTex,aoMap:chasisAO,aoMapIntensity:1,combine: THREE.MixOperation,side:THREE.DoubleSide});
   skitMat = new THREE.MeshPhongMaterial({color:0x808080,aoMap:aoMapTex,aoMapIntensity:1,combine: THREE.MixOperation,side:THREE.DoubleSide});
   headLightMat = new THREE.MeshPhongMaterial({map : lightTex,aoMap:lightTexAO,aoMapIntensity:2,combine: THREE.MixOperation,side:THREE.DoubleSide});
   logoMat = new THREE.MeshPhongMaterial({envMap:refCube,reflectivity: 1,aoMap:aoMapTex,aoMapIntensity:1,combine: THREE.MixOperation,side:THREE.DoubleSide});
   shadow = new THREE.MeshPhongMaterial({map:loadTex(baseUrl + "tex/Shadow.png"),transparent:true,combine: THREE.MixOperation,side:THREE.DoubleSide}); 
   glassMat= new THREE.MeshPhongMaterial({envMap:refCube,reflectivity: .7,transparent:true,opacity:.3,combine: THREE.MixOperation,side:THREE.DoubleSide});
   frontGlassMat = new THREE.MeshPhongMaterial({envMap:refCube,reflectivity: .5,transparent:true,opacity:.15,combine: THREE.MixOperation,side:THREE.DoubleSide});
   roofGlassMat= new THREE.MeshPhongMaterial({color:0x000000,envMap:refCube,reflectivity: .7,transparent:true,opacity:.8,combine: THREE.MixOperation,side:THREE.DoubleSide});
   tyreMat = new THREE.MeshPhongMaterial({ map:tyreTex,envMap:refCube,reflectivity: .01,aoMap:tyreTex,aoMapIntensity:.5,normalMap: normalMapTyre,normalScale: new THREE.Vector2(.3, .3 ),combine: THREE.MixOperation,side:THREE.DoubleSide});
   tailLightMat =  new THREE.MeshPhongMaterial({map:tailTexOff,envMap:refCube,reflectivity: .2,combine: THREE.MixOperation,side:THREE.DoubleSide});
   rimMat = new THREE.MeshPhongMaterial({envMap:refCube,reflectivity: .14,map:rimTex,aoMap:rimTexAo,aoMapIntensity:.7,combine: THREE.MixOperation,side:THREE.DoubleSide});
 
   floorMat =  new THREE.MeshBasicMaterial({map:floorTex,combine: THREE.MixOperation,side:THREE.DoubleSide});
   domeMat =  new THREE.MeshPhongMaterial({map:floorTexDome,combine: THREE.MultiplyOperation,side:THREE.DoubleSide});
   doorMat =  new THREE.MeshPhysicalMaterial({map:doorTex,envMap:refCube,reflectivity: 1,aoMap:doorTexAO,aoMapIntensity:1,clearcoat:.1,metalness: 0.7,roughness: .3,normalMap: doorTexNormal,normalScale: new THREE.Vector2(.7, .7 ),combine: THREE.MixOperation,side:THREE.DoubleSide,clearcoatRoughness: 0});
   metalMat = new THREE.MeshPhongMaterial({map:doorTex,envMap:refCube,reflectivity: .3,aoMap:doorTexAO,aoMapIntensity:1,combine: THREE.MixOperation,side:THREE.DoubleSide}); 
   standMat = new THREE.MeshPhongMaterial({map:chargerTex,color:0xb0b0b0,envMap:refCube,reflectivity: .1,aoMap:chargerTexAO,aoMapIntensity:1,combine: THREE.MixOperation,side:THREE.DoubleSide});
  
     //INTERIOR MATERIALS
     let seatTex = loadTex(baseUrl + "assets/inter-Test/Seat_c.jpg");
     let seatTexNormal = loadTex(baseUrl + "assets/inter-Test/Seat_n.jpg");
     let seatTexAo = loadTex(baseUrl + "assets/Seat_ao.jpg");
     
     let dashBoardTex = loadTex(baseUrl + "assets/inter-Test/Dash_board_02_c.jpg");
     let dashBoardTexNormal = loadTex(baseUrl + "assets/inter-Test/Dash_board_02_n.jpg");
     let dashBoardTexAO = loadTex(baseUrl + "assets/Dash_board_02_ao.jpg");
      shellTex = loadTex(baseUrl + "assets/dashBoard-AMBI/Interior_01_c.jpg");
      shellTexRed = loadTex(baseUrl + "assets/dashBoard-AMBI/Interior_01_c-RED.jpg");
      shellTexGreen = loadTex(baseUrl + "assets/dashBoard-AMBI/Interior_01_c-GREEN.jpg");
      shellTexBlue = loadTex(baseUrl + "assets/dashBoard-AMBI/Interior_01_c-BLUE.jpg");
     let shellTexAO = loadTex(baseUrl + "assets/Interior_01_ao.jpg");
     let backTex = loadTex(baseUrl + "assets/Interior_02_c.jpg");
     let backTexAo = loadTex(baseUrl + "assets/Interior_02_ao.jpg");
     let steeringTex = loadTex(baseUrl + "assets/inter-Test/Steering_c.jpg");
     let steeringTexAo = loadTex(baseUrl + "assets/Steering_ao.jpg");
     let steeringTexNormal = loadTex(baseUrl + "assets/inter-Test/Steering_n.jpg");

     let audioTex = loadTex(baseUrl + "assets/dashBoard-AMBI/Dassh_board_01_c.jpg");

     let audioTexAo = loadTex(baseUrl + "assets/Dassh_board_01_ao.jpg");
      lineTex = loadTex(baseUrl + "assets/dashBoard-AMBI/LINE-TRANS.png");
     let lineEmissive = loadTex(baseUrl + "assets/dashBoard-AMBI/LINE-Emissive.jpg");
      lineTexRed = loadTex(baseUrl + "assets/dashBoard-AMBI/LINE-RED.png");
      lineTexBlue = loadTex(baseUrl + "assets/dashBoard-AMBI/LINE-BLUE.png");
      lineTexGreen = loadTex(baseUrl + "assets/dashBoard-AMBI/LINE-GREEN.png");

    seatMat =  new THREE.MeshPhysicalMaterial({map:seatTex,envMap:refCube,reflectivity: 1,aoMap:seatTexAo,aoMapIntensity:1,clearcoat:.1,metalness: 0.7,roughness: .3,normalMap: seatTexNormal,normalScale: new THREE.Vector2(.7, .7 ),combine: THREE.MixOperation,side:THREE.DoubleSide,clearcoatRoughness: 0});
    gearBoxMat =  new THREE.MeshPhysicalMaterial({map:audioTex,envMap:refCube,reflectivity: 1,aoMap:audioTexAo,aoMapIntensity:1,clearcoat:.1,metalness: 0.7,roughness: .3,combine: THREE.MixOperation,side:THREE.DoubleSide,clearcoatRoughness: 0});
    steerLeatherMat =  new THREE.MeshPhysicalMaterial({map:steeringTex,envMap:refCube,reflectivity: 1,aoMap:steeringTexAo,aoMapIntensity:1,clearcoat:.1,metalness: 0.7,roughness: .3,normalMap: steeringTexNormal,normalScale: new THREE.Vector2(.7, .7 ),combine: THREE.MixOperation,side:THREE.DoubleSide,clearcoatRoughness: 0});
    
    dashBoardMat =  new THREE.MeshPhongMaterial({map:dashBoardTex,aoMap:dashBoardTexAO,aoMapIntensity:1,normalMap: dashBoardTexNormal,normalScale: new THREE.Vector2(.7, .7 ),combine: THREE.MixOperation,side:THREE.DoubleSide});
    shellMat = new THREE.MeshPhongMaterial({map:shellTex,aoMap:shellTexAO,aoMapIntensity:1,combine: THREE.MixOperation,side:THREE.DoubleSide});
    backMat = new THREE.MeshPhongMaterial({map:backTex,aoMap:backTexAo,aoMapIntensity:1,combine: THREE.MixOperation,side:THREE.DoubleSide}); 
    brakeMat = new THREE.MeshLambertMaterial({map:steeringTex,aoMap:steeringTexAo,aoMapIntensity:1,combine: THREE.MixOperation,side:THREE.DoubleSide}); 
    audioMat = new THREE.MeshPhongMaterial({map:audioTex,  envMap:intRefCube,reflectivity: .3,aoMap:audioTexAo,aoMapIntensity:1,combine: THREE.MixOperation,side:THREE.DoubleSide}); 
    steeringMat = new THREE.MeshPhongMaterial({map:steeringTex,  envMap:intRefCube,reflectivity: .1,aoMap:steeringTexAo,aoMapIntensity:1,combine: THREE.MixOperation,side:THREE.DoubleSide}); 
    lineMat = new THREE.MeshPhongMaterial({map:lineTex,emissive:0xff1205,emissiveMap:lineEmissive, emissiveIntensity:1,transparent:true,opacity:.6,combine: THREE.MixOperation,side:THREE.DoubleSide});  
   glowLight = new THREE.MeshPhongMaterial({
        map : loadTex(baseUrl + "assets/dashBoard-AMBI/light.png"),
        transparent:true,
        opacity:.6,
        emissive:0xffffff,
        combine: THREE.MixOperation,
        side:THREE.DoubleSide
   });
   headLampRay = new THREE.MeshPhongMaterial({
    map : loadTex(baseUrl + "assets/dashBoard-AMBI/HEADLAMP.png"),
    transparent:true,
    opacity:.6,
    emissive:0xababab,
    combine: THREE.MixOperation,
    side:THREE.DoubleSide
});
backLampRay = new THREE.MeshPhongMaterial({
    map : loadTex(baseUrl + "assets/dashBoard-AMBI/HEADLAMP.png"),
    transparent:true,
    opacity:.6,
    //color:0xffff00,
    emissive:0xe8140f,
    combine: THREE.MixOperation,
    side:THREE.DoubleSide
});
mirror = new THREE.MeshPhongMaterial({
    envMap:refCube,
    combine: THREE.MixOperation,
    side:THREE.DoubleSide
});
   
    assetLoad = new objLoad();
    assetLoad.carLoad();
    assetLoad.wheelLoad();
    assetLoad.interiorLoad(manager);
    assetLoad.chargerLoad();
    assetLoad.lightRayLoad();
    
});

let material = {
    cube : new THREE.MeshLambertMaterial({
               color:0xffff00,
               combine: THREE.MixOperation,
               side: THREE.DoubleSide
            }),            
 }
class sceneSetup{
    constructor(FOV,near,far,x,y,z,ambientColor,getData){
        this.container = document.getElementById("canvas");      
        this.scene = new THREE.Scene();
        this.camera(FOV,near,far,x,y,z);
        this.rCam(getData);
        this.ambientLight(ambientColor);     
        this.render();
    }
    rCam(getData){
        let _RC = getData;      
        for(let i=0;i < _RC.length ;i++){
            this.rendCam = new THREE.PerspectiveCamera(60, this.container.offsetWidth / this.container.offsetHeight, 1, 10000); 
            this.rendCam.position.set(_RC[i].x ,_RC[i].y , _RC[i].z );
            this.rendCam.name = _RC[i].name;
            this.rendCam.lookAt(new THREE.Vector3(0,0,0));
            this.scene.add(this.rendCam);
        }
    }
    camera(FOV,near,far,x,y,z){
        this.geoOne = new THREE.BoxBufferGeometry(.01,.01,.01); 
        this.matOne = material.cube;
        this.camPointOne = new THREE.Mesh(this.geoOne,this.matOne);
        this.scene.add(this.camPointOne);
        this.camPointOne.position.set(0,0,0);

        this.cameraMain = new THREE.PerspectiveCamera(FOV, this.container.offsetWidth / this.container.offsetHeight, near, far);
        this.cameraMain.position.set(x,y,z);
    //    this.camPointOne.add(this.cameraMain); 
       // this.cameraMain.lookAt(this.camPointOne.position);
       
        this.rendering();  
    }
    rendering(){
        this.renderer = new THREE.WebGLRenderer({antialias: true,preserveDrawingBuffer: true});
        this.renderer.setClearColor(0xededed);//ededed
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize( this.container.offsetWidth, this. container.offsetHeight );		
        this.container.appendChild( this.renderer.domElement );
        this.controls = new THREE.OrbitControls(this.cameraMain , this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor  =  0.07;
        this.controls.enablePan = false;
        this.controls.target.set(this.camPointOne.position.x,this.camPointOne.position.y,this.camPointOne.position.z);
        this.controls.minDistance = 700;
        this.controls.maxDistance = 1500; 
        this.controls.maxPolarAngle = Math.PI/2 * 105/120;
    }  
    ambientLight(ambientColor){
       this.ambiLight = new THREE.AmbientLight(0xffffff,1);
       this.hemiLight= new THREE.HemisphereLight( 0x8c8c8c, 0x545454, 1 );
       this.scene.add( this.hemiLight );
       this.hemiLight.position.set(0,10,0);
       this.scene.add(this.ambiLight);
    }
    animate(){   
        requestAnimationFrame(this.animate.bind(this)); 
        delta = clock.getDelta();
        if( mixer ){
            mixer.update( delta );
        }                
        this.controls.update();
        this.renderer.render(this.scene, this.cameraMain);  
   }
    render(){             
        this.animate();
   }
}

window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize(){
    init.cameraMain.aspect = init.container.offsetWidth/ init.container.offsetHeight;
    init.renderer.setSize( init.container.offsetWidth, init.container.offsetHeight);
    init.cameraMain.updateProjectionMatrix();
}
class objLoad{
    constructor(){
    }
    carLoad(){       
        this.loader = new THREE.FBXLoader();    
        this.loader.load(fbxPath,function(object){
            carModel = object;
            carModel.name ="carBody";
            mixer = new THREE.AnimationMixer( carModel );
            object.traverse(function(child){
                if(child.name.includes("Body") ){
                    child.material = carBody;
                }else if(child.name.includes("Grill") || child.name.includes("Wiper")||child.name.includes("Bumper")){
                    child.material = grillMat;
                }else if(child.name.includes("Logo")){
                    child.material = logoMat;
                }else if(child.name.includes("Glass")){
                    child.material = glassMat;
                }else if(child.name.includes("RoofG")){
                    child.material = roofGlassMat;
                }else if(child.name.includes("frontG")){
                    child.material = frontGlassMat;
                }else if(child.name.includes("TailL")){
                    child.material = tailLightMat;
                }else if(child.name.includes("Chasis")){
                    child.material = chasisMat;
                }else if(child.name.includes("Skit")){
                    child.material = skitMat;
                }else if(child.name.includes("LightParts")){
                    child.material = headLightMat;
                }else if(child.name.includes("Door")){
                    child.material = doorMat;
                }else if(child.name.includes("Dome")){
                    child.material = domeMat;
                }else if(child.name.includes("Floor")){
                    child.material = floorMat;
                    child.material.map.wrapS = child.material.map.wrapT = THREE.RepeatWrapping;
                    child.material.map.repeat.set( 10, 10 );
                   // child.scale.set(10,10,10);
                }else if(child.name === "Shadow"){
                    child.material = shadow;
                }else if(child.name.includes("Metal")){
                    child.material = metalMat;
                }else if(child.name.includes("outerGlow")){
                    child.material = glowLight;
                }else if(child.name.includes("HEADLAMP")){
                    child.material = headLampRay;
                }else if(child.name.includes("Mirror")){
                    child.material=mirror;
                }
            });           
            init.scene.add(object);
            object.scale.set(.3,.3,.3);
            object.position.set(0,0,0);
            object.rotation.set(0,0,0);
        });
    }
    wheelLoad(){
        this.loader = new THREE.FBXLoader();   
        this.loader.load(fbxPathWheel,function(object){
            object.name ="wheel";
            object.traverse(function(child){
                if(child.name.includes("Tyre") ){
                    child.material = tyreMat;
                }else if(child.name.includes("Wheel") || child.name.includes("Disk") ||
                    child.name.includes("Caliper") || child.name.includes("Backside") ||
                    child.name.includes("Bolt") || child.name.includes("Tlogo")){
                    child.material = rimMat;
                }
            });
            let wBackR = object.clone();
            let wBackL = object.clone();
            let wFrontR = object.clone();
            init.scene.add(object);
            init.scene.add(wBackR);
            init.scene.add(wBackL);
            init.scene.add(wFrontR);
            object.scale.set(.3,.3,.3);
            object.position.set(-240,0,-430);
            object.rotation.set(0,0,0);

            wFrontR.scale.set(.3,.3,.3);
            wFrontR.position.set(240,0,-430);
            wFrontR.rotation.set(0,Math.PI,0);

            wBackR.scale.set(.3,.3,.3);
            wBackR.position.set(240,0,425);
            wBackR.rotation.set(0,Math.PI,0);

            wBackL.scale.set(.3,.3,.3);
            wBackL.position.set(-240,0,425);
            wBackL.rotation.set(0,0,0);
        });
    } 
    interiorLoad(getManager){
        this.loader = new THREE.FBXLoader(getManager);   
        this.loader.load(fbxPathInterior,function(object){
            object.name ="interior";
            object.traverse(function(child){
                if(child.name.includes("seat")){
                    child.material = seatMat;
                }else if(child.name.includes("DashBoard")){
                    child.material = dashBoardMat;
                }else if(child.name.includes("Shell")){
                    child.material = shellMat;
                }else if(child.name.includes("Steering")){
                    child.material = steeringMat;
                }else if(child.name.includes("SteerLeather")){
                    child.material = steerLeatherMat;
                }else if(child.name.includes("Back")){
                    child.material = backMat;
                }else if(child.name.includes("Brake")){
                    child.material = brakeMat;
                }else if(child.name.includes("Line")){
                    child.material = lineMat;
                }else if(child.name.includes("Audio")){
                    child.material = audioMat;
                }else if(child.name.includes("GearBox")){
                    child.material = gearBoxMat;
                }else if(child.name.includes("Logo")){
                    child.material = logoMat;
                }else if(child.name.includes("Mirror")){
                    child.material=mirror;
                }
            })
                init.scene.add(object);
                object.scale.set(.3,.3,.3);
        })
    }
    chargerLoad(){
        this.loader = new THREE.FBXLoader();  
        this.loader.load(fbxPathCharger,function(object){
            object.name ="chargingPort";
            object.traverse(function(child){
                if(child.name.includes("stand") || child.name.includes("wire")){
                    child.material = standMat;
                }
            }) 
                init.scene.add(object);
               object.scale.set(.3,.3,.3);
                object.visible = false;
        }) 
    }
    lightRayLoad(){
        this.loader = new THREE.FBXLoader();  
        this.loader.load(fbxPathLightRay,function(object){
            object.name ="lightRay";
            object.traverse(function(child){
                if(child.name.includes("HEADLAMP")){
                    child.material = headLampRay;
                }else if(child.name.includes("nightBL")){
                    child.material = backLampRay;
                }
            }) 
                init.scene.add(object);
                 object.scale.set(.3,.3,.3);
                object.visible = false;
        }) 
    }
}
function openAnim(num){
       action = mixer.clipAction( carModel.animations[num]); 
        action.reset(); 
        action.timeScale = 1;
        action.setLoop(THREE.LoopOnce);
        action.clampWhenFinished = true;
        action.play();
}
function closeAnim(num){			  
    action = mixer.clipAction( carModel.animations[num]);
    action.paused = false;
    action.timeScale = -1;
    action.setLoop(THREE.LoopOnce);
    action.clampWhenFinished = true;
    action.play();
}
function carColor(code){
   carBody.color.setHex( code.color );
   carBody.aoMapIntensity = code.aoInt;
   carBody.clearcoat = code.clearcoat;
   carBody.metalness = code.metalness;
   carBody.roughness = code.roughness;
   carBody.needsUpdate = true;
}
function camAnimation(xVal, yVal, zVal, xBox, yBox, zBox){  
  //  alert(nightTailLight);
    if(!tailLight || !doorAnim || !sunRoof || !charger){
        tailLightEffects(tailTexOff);
        closeAnim(12); // DOOR CLOSE 
        closeAnim(8); // SUN-ROOF CLOSE
        closeAnim(13); // CHARGER CAP CLOSE
        closeAnim(10);// REVERSE CAMERA CLOSE
        closeAnim(14);// REVERSE CAMERA CLOSE      
        objectVis(false,"chargingPort"); 
        objectVis(false,"lightRay");       
    }       
    TweenMax.to(init.camPointOne.position,2,{x:xBox, y:yBox, z:zBox,onUpdate:function(){}});
        TweenMax.to(init.cameraMain.position,2,{x:xVal, y:yVal, z:zVal,onUpdate:function(){
            init.cameraMain.updateProjectionMatrix();	
            init.controls.target = init.camPointOne.position;				
        },onComplete :function(){
            if(tailLight ){
                tailLightEffects(tailTexOn);               
                tailLight = false;
                if(nightMode){
                    objectVis(true,"lightRay");
                   // nightMode = false;
                }
                objectVis(true,"lightRay");
            }else if(doorAnim){             
               openAnim(12); //0 (LOGO-Inner) 4 (charger)  5(Roof) 7(LOGO-Outer) 9(Door)\
            
                doorAnim = false;
               // objectVis(false,"lightRay");
            }else if(sunRoof){
                openAnim(8); // SUNROOF OPEN
                sunRoof = false;
             //   objectVis(false,"lightRay");
            }
            else if(charger){
                openAnim(13); //CHARGER CAP OPEN
                objectVis(charger,"chargingPort");
                charger = false
              //  objectVis(false,"lightRay");
            }else if(rCam){
                openAnim(10);// REVERSE CAMERA OPEN
                openAnim(14);// REVERSE CAMERA OPEN
                rCam = false;
            }else if(nightMode || nightTailLight){
                objectVis(nightMode,"lightRay");
                nightMode = false;

            }
        }
        
    });       
}

function renderCam(getData){
    let _C = [];
      var strMime = "image/jpeg";
      getData.forEach(element => {
          let _s = init.scene.getObjectByName(element.name);
          init.renderer.render(init.scene, _s);
          let _img = init.renderer.domElement.toDataURL(strMime);
          _C.push(_img);
        //  dataToSave[element.data] = _img;
      });
      return _C;
}

function shareImage(){
    var strMime = "image/jpeg";
    init.renderer.render(init.scene, init.cameraMain);
    let _img = init.renderer.domElement.toDataURL(strMime);
    return _img;
}
function reset(){
    let restInfo = resetData;
    camAnimation(restInfo.cameraPosExt.x,restInfo.cameraPosExt.y,restInfo.cameraPosExt.z,restInfo.cameraPosExt.boxX,restInfo.cameraPosExt.boxY,restInfo.cameraPosExt.boxZ);
    carColor(restInfo.material);
    init.controls.minDistance = 800;
    init.controls.maxDistance = 1500;    
    init.controls.maxPolarAngle = Math.PI/2 * 105/120;
}

function interior(){
    TweenMax.to(init.camPointOne.position,0,{x:0, y:380, z:200,onUpdate:function(){}});
    TweenMax.to(init.cameraMain.position,0,{x:0, y:400, z:280,onUpdate:function(){
        init.cameraMain.updateProjectionMatrix();	
      //  init.controls.target = init.camPointOne.position;	
    }});

    dayScene();
    init.controls.minDistance = 0;
    init.controls.maxDistance = 120;    
  //  init.cameraMain.position.set(0,400,280);
    //init.camPointOne.position.set(0,380,200);
    init.controls.target.set(  init.camPointOne.position.x,init.camPointOne.position.y,init.camPointOne.position.z);
    init.controls.maxPolarAngle = Math.PI/2 * 110/110;
    init.controls.minPolarAngle =Math.PI/2 * 90/180;
}

function loadTex(texturePath){
    let texture = new THREE.TextureLoader().load(texturePath);
    return texture;
   }
function exterior(){ 
    TweenMax.to(init.camPointOne.position,0,{x:0, y:0, z:0,onUpdate:function(){}});
    TweenMax.to(init.cameraMain.position,0,{x:1000, y:500, z:-1200,onUpdate:function(){
        init.cameraMain.updateProjectionMatrix();	
      //  init.controls.target = init.camPointOne.position;	
    }});
    
    init.controls.minDistance = 800;
    init.controls.maxDistance = 1500;    
  //  init.cameraMain.position.set(1000, 500, -1200);
    //init.camPointOne.position.set(0,0,0);
    init.controls.target.set(  init.camPointOne.position.x,init.camPointOne.position.y,init.camPointOne.position.z);
    init.controls.maxPolarAngle = Math.PI/2 * 105/120;
}

function dayScene(){
    nightMode = false;
    init.ambiLight.color.setHex(0xffffff);
    floorMat.color.setHex(0xffffff);
    init.hemiLight.intensity = 1;
    headLightMat.emissive.setHex(0x000000);
    tailLightMat.emissive.setHex(0x000000);        
    objectVis(nightMode,"lightRay");
} 
function nightScene(){
    init.ambiLight.color.setHex(0x303030);
    floorMat.color.setHex(0x3b3b3b);
    init.hemiLight.intensity = .3;
    headLightMat.emissive.setHex(0xababab);
    nightMode = true;
    backLampRay.emissive.setHex(0xe8140f);   
    tailLightMat.emissive.setHex(0x220504);   
}  
    
function downLoadImage(){
    var strMime = "image/jpeg";
    init.renderer.render(init.scene, init.cameraMain);
    let _img = init.renderer.domElement.toDataURL(strMime);
    saveFile(_img.replace(strMime, strDownloadMime), "carImage.jpg");
}
let saveFile = function (strData, filename) {
    var link = document.createElement('a');
    if (typeof link.download === 'string') {
        document.body.appendChild(link); //Firefox requires the link to be in the body
        link.download = filename;
        link.href = strData;
        link.click();
        document.body.removeChild(link); //remove the link when done
    } else {
        location.replace(uri);
    }
}
function detectWebGL(){
    // Check for the WebGL rendering context
    if ( !! window.WebGLRenderingContext) {
        var canvas = document.createElement("canvas"),
            names = ["webgl", "experimental-webgl", "moz-webgl", "webkit-3d"],
            context = false;

        for (var i in names) {
            try {
                context = canvas.getContext(names[i]);
                if (context && typeof context.getParameter === "function") {
                    // WebGL is enabled.
                    return 1;
                }
            } catch (e) {}
        }

        // WebGL is supported, but disabled.
        return 0;
    }

    // WebGL not supported.
    return -1;
};