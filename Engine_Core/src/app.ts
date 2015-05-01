﻿///<reference path="./maths/mat4.ts"/>
///<reference path="./maths/vec3.ts"/>
///<reference path="./graphics/glwindow.ts"/>
///<reference path="./graphics/shader.ts"/>
///<reference path="./graphics/buffers/vertexarray.ts"/>
///<reference path="./graphics/buffers/indexbuffer.ts"/>
///<reference path="./data/constants.ts"/>
module Main {


    import Mat4 = Maths.Mat4;
    import Vec3 = Maths.Vec3;
    import GLWindow = Graphics.GLWindow;
    import Shader = Graphics.Shader;
    init();
    import gl = Graphics.gl;
    import Buffer = Graphics.Buffer;
    import VertexArray = Graphics.VertexArray;
    import IndexBuffer = Graphics.IndexBuffer;
    import Constants = Data.Constants;

    var glWindow: GLWindow;
    var perspectiveMatrix: any;
    var orthographicMatrix: any;
    var mvMatrix: any;
    var pUniform: any;
    var mvUniform: any;
    var lightPos: any;
    var animationHandle: number;
    var indexBuffer: IndexBuffer;
    var shader: Shader;
    main();




    function main() {
        try {
            testing();
            initBuffers();
            drawScene(null);
        } catch (ex) {
            console.log("Error:\n%s", ex);
            console.log();
        }
    }


    function testing() {

    }

    function init() {
        glWindow = new GLWindow("WebGL", 960, 540);
        mvMatrix = Maths.Mat4.identity();
        orthographicMatrix = Mat4.orthographic(0, 16, 0, 9, -1, 1);
        perspectiveMatrix = Mat4.perspective(45, 640.0 / 480.0, .1, 100.0);

        //mvMatrix.translate(new Vec3(-2.5, 0.0, -5.0));
    }

    function initBuffers() {
        var vertices = [
            0.0, 0.0, 0.0,
            0.0, 9.0, 0.0,
            16.0, 9.0, 0.0,
            16.0, 0.0, 0.0
        ];

        var colors = [
            0.0, 1.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0
        ];

        var indices = [
            0, 1, 2,
            0, 2, 3
        ];

        //buffers
        var vertexArray = new VertexArray();
        vertexArray.addBuffer(new Buffer(vertices, 3), 0);
        vertexArray.addBuffer(new Buffer(colors, 4), 1);
        indexBuffer = new IndexBuffer(indices);
        shader = new Shader(Constants.vertexLocation, Constants.fragmentLocation);
        shader.enable();
    }

    function drawScene(time: number): any {
        try {
            glWindow.clear();
            //mvMatrix.rotate(.25, new Vec3(0, 1, 0));

            shader.setUniformMatrix("prMatrix", orthographicMatrix.elements);
            shader.setUniformMatrix("mvMatrix", mvMatrix.elements);
            shader.setUniformVec2("lightPos", GLWindow.mousePosition);

            indexBuffer.bind();
            gl.drawElements(gl.TRIANGLES, indexBuffer.getCount(), gl.UNSIGNED_SHORT, 0);
            indexBuffer.unbind();

        } catch (ex) {
            console.log("Error in 'DrawScene':\n %s", ex);
            cancelAnimationFrame(animationHandle);
        }
        requestAnimationFrame(drawScene);
    }
}
