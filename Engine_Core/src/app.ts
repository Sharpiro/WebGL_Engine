testing();
initGL();
loadShaders();
initBuffers();
drawScene();

var canvas: HTMLCanvasElement;
var gl: WebGLRenderingContext;
var shaderProgram: WebGLProgram;
var vertexPositionAttribute: number;
var vertexBuffer: WebGLBuffer;
var vertexShaderString: Text;
var fragmentShaderStr


function testing() {
    
}
function initGL() {
    canvas = document.createElement("canvas");
    canvas.id = "testCanvas";
    canvas.width = 960;
    canvas.height = 540;
    canvas.style.border = "1px solid";
    var body = document.getElementsByTagName("body")[0];
    body.appendChild(canvas);
    //canvas = <HTMLCanvasElement>document.getElementById("glcanvas");
    try {
        //gl = canvas.getContext("webgl");
        gl = canvas.getContext("experimental-webgl");
        gl.viewport(0, 0, canvas.width, canvas.height);
    } catch (e) {
        console.log("fail");
    }
    //gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Set clear color to black, fully opaque
    //gl.clearDepth(1.0);                 // Clear everything
    //gl.enable(gl.DEPTH_TEST);           // Enable depth testing
    //gl.depthFunc(gl.LEQUAL);  

    
}

function loadShaders() {
    var fragmentShader = getShader("shader-fs", "http://nodeserver3.azurewebsites.net/shaders/frag");
    var vertexShader = getShader("shader-vs", "http://nodeserver3.azurewebsites.net/shaders/vert");
  
    // Create the shader program
  
    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
  
    // If creating the shader program failed, alert
  
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Unable to initialize the shader program.");
    }

    gl.useProgram(shaderProgram);

    vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(vertexPositionAttribute);
}

function initBuffers() {
    var vertices = [
        1.0, 1.0, 0.0,
        -1.0, 1.0, 0.0,
        1.0, -1.0, 0.0,
        -1.0, -1.0, 0.0
    ];
    vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    //gl.drawElements(gl.TRIANGLES, 4, gl.UNSIGNED_SHORT, null);
}

function drawScene() {
    //gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    perspectiveMatrix = makePerspective(45, 640.0 / 480.0, 0.1, 100.0);

    loadIdentity();
    mvTranslate([-0.0, 0.0, -6.0]);

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
    setMatrixUniforms();
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}

function getShader(id, url) {
    var request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.send();
    var shaderScript = request.responseText;
    var shader: WebGLShader;
    if (id === "shader-fs") {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    }
    else if (id === "shader-vs") {
        shader = gl.createShader(gl.VERTEX_SHADER);
    }
    else {
        // Unknown shader type
        return null;
    }

    gl.shaderSource(shader, shaderScript);
    
    // Compile the shader program
    gl.compileShader(shader);  
    
    // See if it compiled successfully
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
}

//function getShader(gl, id) {
//    var shaderScript, theSource, currentChild, shader;

//    shaderScript = document.getElementById(id);

//    if (!shaderScript) {
//        return null;
//    }

//    theSource = "";
//    currentChild = shaderScript.firstChild;

//    while (currentChild) {
//        if (currentChild.nodeType === currentChild.TEXT_NODE) {
//            theSource += currentChild.textContent;
//        }

//        currentChild = currentChild.nextSibling;
//    }

//    if (shaderScript.type == "x-shader/x-fragment") {
//        shader = gl.createShader(gl.FRAGMENT_SHADER);
//    } else if (shaderScript.type == "x-shader/x-vertex") {
//        shader = gl.createShader(gl.VERTEX_SHADER);
//    } else {
//        // Unknown shader type
//        return null;
//    }

//    gl.shaderSource(shader, theSource);
    
//    // Compile the shader program
//    gl.compileShader(shader);  
    
//    // See if it compiled successfully
//    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
//        alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
//        return null;
//    }

//    return shader;
//}

function loadIdentity() {
    mvMatrix = Matrix.I(4);
}

function multMatrix(m) {
    mvMatrix = mvMatrix.x(m);
}

function mvTranslate(v) {
    multMatrix(Matrix.Translation($V([v[0], v[1], v[2]])).ensure4x4());
}

function setMatrixUniforms() {
    var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
    gl.uniformMatrix4fv(pUniform, false, new Float32Array(perspectiveMatrix.flatten()));

    var mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    gl.uniformMatrix4fv(mvUniform, false, new Float32Array(mvMatrix.flatten()));
}


console.log("logging...");