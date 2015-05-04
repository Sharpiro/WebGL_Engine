///<reference path="./maths/mat4.ts"/>
///<reference path="./graphics/glwindow.ts"/>
///<reference path="./graphics/shader.ts"/>
///<reference path="./graphics/buffers/vertexarray.ts"/>
///<reference path="./graphics/buffers/indexbuffer.ts"/>
///<reference path="./data/constants.ts"/>
///<reference path="./graphics/meshes/quad.ts"/>
///<reference path="./graphics/simple2drenderer.ts"/>
module Main {


    import Mat4 = Maths.Mat4;
    import GLWindow = Graphics.GLWindow;
    import Shader = Graphics.Shader;
    import Constants = Data.Constants;
    import Quad = Graphics.Quad;
    import Simple2DRender = Graphics.Simple2DRenderer;

    let shader: Shader;
    let glWindow: GLWindow;
    let perspectiveMatrix: Mat4;
    let orthographicMatrix: Mat4;
    let animationHandle: number;
    let quad: Quad;
    let quad2: Quad;
    let renderer: Simple2DRender;

    function main() {
        try {
            testing();
            init();
            drawScene(null);
        } catch (ex) {
            console.log("Error:\n%s", ex);
        }
    }


    function testing(): void {

    }

    function init(): void {
        glWindow = new GLWindow("WebGL", 960, 540);
        orthographicMatrix = Mat4.orthographic(0, 16, 0, 9, -1, 1);
        perspectiveMatrix = Mat4.perspective(45, 16 / 9, .1, 100.0);

        //mvMatrix.translate(new Vec3(-2.5, 0.0, -5.0));

        shader = new Shader(Constants.vertexLocation, Constants.fragmentLocation);
        shader.enable();
        shader.setUniformMatrix("prMatrix", orthographicMatrix);

        //perspectiveQuad
        //quad = new Quad(new Vec3(-1, -2, -15), new Vec2(4, 4), shader);
        //orthoQuad
        quad2 = new Quad(new Vec3(4, 4, 0), new Vec2(2, 6), new Vec4(0.0, 1.0, 0.0, 1.0), shader);
        quad = new Quad(new Vec3(0, 0, 0), new Vec2(2, 9), new Vec4(1.0, 0.0, 0.0, 1.0), shader);
        renderer = new Simple2DRender();
    }

    function drawScene(time: number): void {
        try {
            glWindow.clear();

            shader.setUniformVec2("lightPos", GLWindow.mousePosition);
            //shader.setUniformVec2("lightPos", new Vec2(0, 0));

            renderer.submit(quad);
            renderer.submit(quad2);
            renderer.flush();

        } catch (ex) {
            console.log("Error in 'DrawScene':\n %s", ex);
            cancelAnimationFrame(animationHandle);
        }
        requestAnimationFrame(drawScene);
    }

    main();
}
