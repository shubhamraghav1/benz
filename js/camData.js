let data ={
  "cameraAnim":{
     "front"        : {"x" : 0,   "y" : 500, "z" : -1400, "xBox" : 0, "yBox" : 0, "zBox" : 0},
      "side"        : {"x" : -1200, "y" : 400, "z" : 0, "xBox" : 0, "yBox" : 50, "zBox" : 0},
      "top"         : {"x" : -50,  "y" : 1400, "z" : 0, "xBox" : 0, "yBox" : 0, "zBox" : 0},
      "back"        : {"x" : 0,   "y" : 400, "z" : 1400, "xBox" : 0, "yBox" : 0, "zBox" : 0},

      "alloy"       : {"x" : -650,   "y" : 0, "z" : -450, "xBox" : 0, "yBox" : 0, "zBox" : -350},
      "lightBeam"  : {"x" : -400,   "y" : 300, "z" : -1000, "xBox" : 0, "yBox" : 0, "zBox" : 0},
      "sunRoof"     : {"x" : -600,   "y" : 900, "z" : -100, "xBox" : 200, "yBox" : 0, "zBox" : 0},
    
      "reverseCam"  : {"x" : 0,   "y" : 300, "z" : 900, "xBox" : 0, "yBox" : 50, "zBox" : 0},

      "chargingPort": {"x" : 700,   "y" : 450, "z" : -800, "xBox" : 0, "yBox" : 130, "zBox" : 0},
      "typography"  : {"x" : -400,   "y" : 200, "z" : -150, "xBox" : 0, "yBox" : 0, "zBox" : 0},

      "numberPlate" : {"x" : 0,   "y" : 0, "z" : -1200, "xBox" : 0, "yBox" : 0, "zBox" : 0},

      "birdEye"       : {"x" : 700,   "y" : 1000, "z" : 700, "xBox" : 0, "yBox" : 0, "zBox" : 0},
      "tailLight"     : {"x" : 0,   "y" : 400, "z" : 1100, "xBox" : 0, "yBox" : 50, "zBox" : 0},
      "door" : {"x" : -800, "y" : 400, "z" : -600, "xBox" : 0, "yBox" : 50, "zBox" : 0},
      // INTERIOR
      "steering" : {"x":30,"y":330,"z":20,"xBox":60,"yBox":310,"zBox":-30},//"xBox":110,"yBox":310,"zBox":-80
      "upholstery":{"x":20,"y":330,"z":-5,"xBox":70,"yBox":370,"zBox":50},
      "speaker":{"x":-100,"y":370,"z":0,"xBox":-150,"yBox":370,"zBox":-60},
      "airvent":{"x":0,"y":310,"z":0,"xBox":0,"yBox":305,"zBox":-30},
      "ambientlight":{"x":0,"y":400,"z":120,"xBox":0,"yBox":310,"zBox":0},

      "mediaSystem" :{"x":30,"y":340,"z":0,"xBox":30,"yBox":330,"zBox":-50},
      "driverDisplay" :{"x":90,"y":340,"z":0,"xBox":90,"yBox":330,"zBox":-50},        
     //  "airBag" :{"x":-110,"y":370,"z":-10,"xBox":-110,"yBox":330,"zBox":-100},
      "nightMode":{"x" : 1500,"y": 700,"z" : -800, "xBox" : 0, "yBox" : 0, "zBox" : 0}
   },
   "wheelPos":[
         {"x":-170,"y":25,"z":295},
         {"x":-170,"y":25,"z":-240},
         {"x":170,"y":25,"z":-240}
   ],
   "color":{
     "grey":{
        "color":"0x484848", //0x1f1f1f
        "aoInt" :1,
        "clearcoat" : 1,
        "metalness" : 0.8,
        "roughness":.15
     },
     "silver":{
        "color":"0xababab",
        "aoInt" :1,
        "clearcoat" : 1,
        "metalness" : 0.7,
        "roughness":.17
     },
     "white":{
        "color":"0xffffff",
        "aoInt" :.7,
        "clearcoat" : 1,
        "metalness" : 0.61,
        "roughness":.5
     }
   }
}

let resetData = {
  "cameraPosExt":{
     "x" : 1000,
     "y" :500,
     "z" : -1200,
     "boxX" : 0,
     "boxY" : 0,
     "boxZ" : 0
  },
  "material" : {
     "color":"0x484848",
     "aoInt" :1,
     "clearcoat" : 1,
     "metalness" : 0.8,
     "roughness":.15
  }
}

let renderCamera = [
  {  "x":0,"y":500,"z":-1400,"name":"frontCamera","data":"frontImage" },
  {  "x":-1300,"y":400,"z":0,"name":"sideCamera","data":"sideImage"  },
  {  "x":-50,"y":1400,"z":0 ,"name":"topCamera","data":"topImage" },
  {  "x":0,"y":400,"z":1400,"name":"backCamera","data":"backImage" }
]