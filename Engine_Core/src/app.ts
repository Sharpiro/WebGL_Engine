///<reference path="./maths/mat4.ts"/>
///<reference path="./maths/vec3.ts"/>
///<reference path="./graphics/window.ts"/>
module Main {


    import Mat4 = Maths.Mat4;
    import Vec3 = Maths.Vec3;
    import GLWindow = Graphics.GLWindow;
    init();
    import gl = Graphics.gl;

    var glWindow: GLWindow;
    var shaderProgram: WebGLProgram;
    var vertexPositionAttribute: number;
    var vertexBuffer: WebGLBuffer;
    var perspectiveMatrix: any;
    var orthographicMatrix: any;
    var mvMatrix: any;
    var indexBuffer: any;

    main();




    function main() {
        testing();
        loadShaders();
        initBuffers();
        drawScene();
    }


    function testing() {
    }

    function init() {
        glWindow = new GLWindow("WebGL", 960, 540);
        mvMatrix = Maths.Mat4.identity();
        orthographicMatrix = Mat4.orthographic(0, 16, 0, 9, -1, 1);
        perspectiveMatrix = Mat4.perspective(45, 640.0 / 480.0, .1, 100.0);

        mvMatrix.translate(new Vec3(0.0, 0.0, -5.0));
    }

    function loadShaders() {
        var fragmentShader = getShader("shader-fs", "http://localhost/shaders/frag.txt");
        var vertexShader = getShader("shader-vs", "http://localhost/shaders/vert.txt");
  
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
            0.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            1.0, 1.0, 0.0,
            1.0, 0.0, 0.0
        ];

        var indices = [0, 1, 2, 0, 2, 3];
        //vertexBuffer
        vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        //indexbuffer
        indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    }

    function run(time: number) {
        console.log("doing");
        setMatrixUniforms();
        
    }

    function drawScene() {
        try {
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            mvMatrix.rotate(1, new Vec3(0, 1, 0));
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
            gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
            setMatrixUniforms();
            gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
            var error = gl.getError();
            if (error !== gl.NO_ERROR)
                console.log(error);

        } catch (ex) {
            console.log("Error in 'DrawScene':\n %s", ex);
        }
        requestAnimationFrame(drawScene);

    }


    function getRequestSync(url: string) {
        var request = new XMLHttpRequest();
        request.open("GET", url, false);
        request.send();
        return request.responseText;
    }

    function getShader(id: string, url: string) {
        var shaderData = getRequestSync(url);
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

        gl.shaderSource(shader, shaderData);
    
        // Compile the shader program
        gl.compileShader(shader);  
        // See if it compiled successfully
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
            return null;
        }
        return shader;
    }

    function setMatrixUniforms() {
        var pUniform = gl.getUniformLocation(shaderProgram, "pr_matrix");
        gl.uniformMatrix4fv(pUniform, false, new Float32Array(perspectiveMatrix.elements));

        var mvUniform = gl.getUniformLocation(shaderProgram, "mv_Matrix");
        gl.uniformMatrix4fv(mvUniform, false, new Float32Array(mvMatrix.elements));
    }


}
