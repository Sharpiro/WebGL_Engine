///<reference path="buffer.ts"/>

import Buffer = Graphics.Buffer;

module Graphics {
    export class VertexArray {

        public buffers: Array<Buffer> = [];

        public addBuffer(buffer: Buffer) {
            buffer.bind();
            gl.enableVertexAttribArray(buffer.glIndex);
            gl.vertexAttribPointer(buffer.glIndex, buffer.componentCount, gl.FLOAT, false, 0, 0);
            this.buffers.push(buffer);
            //buffer.unbind();
        }

        public bind() {
            for (var i = 0; i < this.buffers.length; i++) {
                this.buffers[i].bind();
                gl.enableVertexAttribArray(this.buffers[i].glIndex);
                gl.vertexAttribPointer(this.buffers[i].glIndex, this.buffers[i].componentCount, gl.FLOAT, false, 0, 0);
            }
        }

        public unbind() {
            for (var i = 0; i < this.buffers.length; i++) {
                this.buffers[i].unbind();
            }
        }
    }
} 