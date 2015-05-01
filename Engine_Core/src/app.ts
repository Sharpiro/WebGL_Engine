///<reference path="./maths/mat4.ts"/>
///<reference path="./maths/vec3.ts"/>
///<reference path="./graphics/glwindow.ts"/>
///<reference path="./graphics/shader.ts"/>
///<reference path="./graphics/buffers/vertexarray.ts"/>
///<reference path="./graphics/buffers/indexbuffer.ts"/>
///<reference path="./data/constants.ts"/>
///<reference path="./graphics/meshes/quad.ts"/>
module Main {


    import Mat4 = Maths.Mat4;
    import GLWindow = Graphics.GLWindow;
    import Shader = Graphics.Shader;
    init();
    import gl = Graphics.gl;
    import Constants = Data.Constants;
    import Quad = Graphics.Quad;

    var shader: Shader;
    var glWindow: GLWindow;
    var perspectiveMatrix: Mat4;
    var orthographicMatrix: Mat4;
    var animationHandle: number;
    var quad: Quad;
    var quad2: Quad;

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
        orthographicMatrix = Mat4.orthographic(0, 16, 0, 9, -1, 1);
        perspectiveMatrix = Mat4.perspective(45, 16 / 9, .1, 100.0);

        //mvMatrix.translate(new Vec3(-2.5, 0.0, -5.0));
    }

    function initBuffers() {
        shader = new Shader(Constants.vertexLocation, Constants.fragmentLocation);
        shader.enable();

        //perspectiveQuad
        //quad = new Quad(new Vec3(-1, -2, -15), new Vec2(4, 4), shader);
        //orthoQuad
        quad2 = new Quad(new Vec3(4, 4, 0), new Vec2(2, 6), new Vec4(0.0, 1.0, 0.0, 1.0), shader);
        quad = new Quad(new Vec3(0, 0, 0), new Vec2(2, 9), new Vec4(1.0, 0.0, 0.0, 1.0), shader);

    }

    function drawScene(time: number): any {
        try {
            //quad2.shader.setUniformMatrix("mvMatrix", quad.mvMatrix.rotate(1, new Vec3(0, 1, 0)));
            //quad.shader.setUniformMatrix("mvMatrix", quad.mvMatrix.rotate(1, new Vec3(0, 1, 0)));
            glWindow.clear();

            shader.setUniformMatrix("prMatrix", orthographicMatrix);
            shader.setUniformVec2("lightPos", GLWindow.mousePosition);
            //shader.setUniformVec2("lightPos", new Vec2(0, 0));



            quad.vao.bind();
            quad.ibo.bind();
            shader.setUniformMatrix("mvMatrix", Mat4.translate(quad.position));
            gl.drawElements(gl.TRIANGLES, quad.ibo.getCount(), gl.UNSIGNED_SHORT, 0);
            quad.ibo.unbind();
            quad.vao.unbind();

            quad2.vao.bind();
            quad2.ibo.bind();
            shader.setUniformMatrix("mvMatrix", Mat4.translate(quad2.position));
            gl.drawElements(gl.TRIANGLES, quad2.ibo.getCount(), gl.UNSIGNED_SHORT, 0);
            quad2.ibo.unbind();
            quad2.vao.unbind();

        } catch (ex) {
            console.log("Error in 'DrawScene':\n %s", ex);
            cancelAnimationFrame(animationHandle);
        }
        requestAnimationFrame(drawScene);
    }
}
