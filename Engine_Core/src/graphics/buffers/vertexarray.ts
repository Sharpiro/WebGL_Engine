///<reference path="buffer.ts"/>

import Buffer = Graphics.Buffer;

module Graphics {
    export class VertexArray {

        public buffers: Array<Buffer> = [];

        public addBuffer(buffer: Buffer) {
            buffer.bind();
            gl.enableVertexAttribArray(buffer.shaderAttributeIndex);
            gl.vertexAttribPointer(buffer.shaderAttributeIndex, buffer.componentCount, gl.FLOAT, false, 0, 0);
            buffer.unbind();
            this.buffers.push(buffer);
        }

        public bind() {
            for (let i = 0; i < this.buffers.length; i++) {
                this.buffers[i].bind();
                gl.enableVertexAttribArray(this.buffers[i].shaderAttributeIndex);
                gl.vertexAttribPointer(this.buffers[i].shaderAttributeIndex, this.buffers[i].componentCount, gl.FLOAT, false, 0, 0);
            }
        }

        public unbind() {
            for (let i = 0; i < this.buffers.length; i++) {
                this.buffers[i].unbind();
            }
        }
    }
} 