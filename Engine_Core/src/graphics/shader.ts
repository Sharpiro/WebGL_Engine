///<reference path="../networking/network.ts"/>
///<reference path="../maths/mat4.ts"/>

import Network = Networking.Network;
import Mat4 = Maths.Mat4;

module Graphics {
    export class Shader {

        public program: WebGLProgram;

        constructor(public vertSrc: string, public fragSrc: string) {
            var vertShaderData = Network.getRequestSync(vertSrc);
            var fragShaderData = Network.getRequestSync(fragSrc);
            //vertexShader
            var vertexShader: WebGLShader = gl.createShader(gl.VERTEX_SHADER);;
            var fragShader: WebGLShader = gl.createShader(gl.FRAGMENT_SHADER);;

            //compile vert shader
            gl.shaderSource(vertexShader, vertShaderData);
            gl.compileShader(vertexShader);
            if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
                alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(vertexShader));
            }

            //compile frag shader
            gl.shaderSource(fragShader, fragShaderData);
            gl.compileShader(fragShader);
            if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS)) {
                alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(fragShader));
            }

            // Create the shader program
            var shaderProgram = gl.createProgram();
            gl.attachShader(shaderProgram, vertexShader);
            gl.attachShader(shaderProgram, fragShader);
            gl.linkProgram(shaderProgram);
            gl.validateProgram(shaderProgram);
  
            // If creating the shader program failed, alert
            if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
                alert("Unable to initialize the shader program.");
            }
            this.program = shaderProgram;
        }

        public getUniformLocation(name: string): WebGLUniformLocation {
            return gl.getUniformLocation(this.program, name);
        }

        public setUniformVec2(name: string, vector: Vec2) {
            gl.uniform2f(this.getUniformLocation(name), vector.x, vector.y);
        }

        public setUniformMatrix(name: string, data: Mat4) {
            gl.uniformMatrix4fv(this.getUniformLocation(name), false, new Float32Array(data.elements));
        }

        public getAttributeLocation(name: string): number {
            return gl.getAttribLocation(this.program, name);
        }

        public enable() {
            gl.useProgram(this.program);
        }
        public disable() {
            gl.useProgram(null);
        }
    }
}