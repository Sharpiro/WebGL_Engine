///<reference path="../maths/vec2.ts"/>

import Vec2 = Maths.Vec2;

module Graphics {

    export var gl: WebGLRenderingContext;

    export class GLWindow {

        public canvas: HTMLCanvasElement;
        public mousePosition: Vec2;

        constructor(public name: string, public width: number, public height: number) {
            this.canvas = document.createElement("canvas");
            this.canvas.id = name;
            this.canvas.width = width;//960;
            this.canvas.height = height;//540;
            this.canvas.style.border = "1px solid";
            this.canvas.style.backgroundColor = "black";
            var body = document.getElementsByTagName("body")[0];
            body.appendChild(this.canvas);
            try {
                //gl = canvas.getContext("webgl");
                gl = this.canvas.getContext("experimental-webgl");
            } catch (ex) {
                console.log("Failed Initializing WebGL Canvas:\n%s", ex);
            }

            //events
            this.canvas.addEventListener("mousemove", this.mouseMoveCallBack);
        }

        private mouseMoveCallBack(event: MouseEvent) {
            this.mousePosition.x = event.clientX * 16 / 960;
            this.mousePosition.x = 9 - event.clientY * 9 / 540;
        }
    }
}