module Graphics {

    export var gl: WebGLRenderingContext;

    export class GLWindow {

        public canvas: HTMLCanvasElement;

        constructor(public name: string, public width: number, public height: number) {
            this.canvas = document.createElement("canvas");
            this.canvas.id = name;
            this.canvas.width = width;//960;
            this.canvas.height = height;//540;
            this.canvas.style.border = "1px solid";
            var body = document.getElementsByTagName("body")[0];
            body.appendChild(this.canvas);
            try {
                //gl = canvas.getContext("webgl");
                gl = this.canvas.getContext("experimental-webgl");
            } catch (ex) {
                console.log("Failed Initializing WebGL Canvas:\n%s", ex);
            }
        }
    }
}