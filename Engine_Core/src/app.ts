﻿///<reference path="./maths/mat4.ts"/>
///<reference path="./maths/vec3.ts"/>
///<reference path="./graphics/window.ts"/>
///<reference path="./graphics/shader.ts"/>
module Main {


    import Mat4 = Maths.Mat4;
    import Vec3 = Maths.Vec3;
    import GLWindow = Graphics.GLWindow;
    import Shader = Graphics.Shader;
    init();
    import gl = Graphics.gl;

    var glWindow: GLWindow;
    //var shaderProgram: WebGLProgram;
    //var vertexPositionAttribute: number;
    var vertexBuffer: WebGLBuffer;
    var colorBuffer: WebGLBuffer;
    var perspectiveMatrix: any;
    var orthographicMatrix: any;
    var mvMatrix: any;
    var indexBuffer: any;
    var shader: Shader;
    var pUniform: any;
    var mvUniform: any;
    var lightPos: any;
    main();




    function main() {
        testing();
        initBuffers();
        drawScene(null);
    }


    function testing() {

    }

    function init() {
        glWindow = new GLWindow("WebGL", 960, 540);
        mvMatrix = Maths.Mat4.identity();
        orthographicMatrix = Mat4.orthographic(0, 16, 0, 9, -1, 1);
        perspectiveMatrix = Mat4.perspective(45, 640.0 / 480.0, .1, 100.0);

        //mvMatrix.translate(new Vec3(-2.5, 0.0, -5.0));
        shader = new Shader("http://localhost/shaders/vert.txt", "http://localhost/shaders/frag.txt");
        shader.enable();

    }

    function initBuffers() {
        var vertices = [
            0.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            1.0, 1.0, 0.0,
            1.0, 0.0, 0.0
        ];

        var colors = [
            0.2, 0.4, 1.0, 1.0,
            0.2, 0.4, 1.0, 1.0,
            0.2, 0.4, 1.0, 1.0,
            0.2, 0.4, 1.0, 1.0
        ];

        var indices = [0, 1, 2, 0, 2, 3];
        //vertexBuffer
        vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        //colorBuffer
        colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        //indexbuffer
        indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

        pUniform = gl.getUniformLocation(shader.program, "pr_matrix");
        mvUniform = gl.getUniformLocation(shader.program, "mv_Matrix");
        lightPos = gl.getUniformLocation(shader.program, "lightPos");


    }

    function drawScene(time: number) {
        try {
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

            //vertices
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
            var vertexPositionAttribute = gl.getAttribLocation(shader.program, "aVertexPosition");
            gl.enableVertexAttribArray(vertexPositionAttribute);
            gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
            gl.bindBuffer(gl.ARRAY_BUFFER, null);


            //colors
            gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
            var colorPositionAttribute = gl.getAttribLocation(shader.program, "aVertexColor");
            gl.enableVertexAttribArray(colorPositionAttribute);
            gl.vertexAttribPointer(colorPositionAttribute, 4, gl.FLOAT, false, 0, 0);
            gl.bindBuffer(gl.ARRAY_BUFFER, null);

            //mvMatrix.rotate(.25, new Vec3(0, 1, 0));

            gl.uniformMatrix4fv(pUniform, false, new Float32Array(orthographicMatrix.elements));
            gl.uniformMatrix4fv(mvUniform, false, new Float32Array(mvMatrix.elements));
            gl.uniform2f(lightPos, glWindow.mousePosition.x, glWindow.mousePosition.y);
            
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
            gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
            var error = gl.getError();
            //if (error !== gl.NO_ERROR)
            //    console.log(error);

        } catch (ex) {
            console.log("Error in 'DrawScene':\n %s", ex);
        }
        requestAnimationFrame(drawScene);
    }
}
