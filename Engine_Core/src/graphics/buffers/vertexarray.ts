///<reference path="buffer.ts"/>

import Buffer = Graphics.Buffer;

module Graphics {
    export class VertexArray {

        private buffers: Array<Buffer> = [];
        
        public addBuffer(buffer: Buffer, glIndex: number) {
            buffer.bind();
            gl.enableVertexAttribArray(glIndex);
            gl.vertexAttribPointer(glIndex, buffer.componentCount, gl.FLOAT, false, 0, 0);
            this.buffers.push(buffer);
            //buffer.unbind();
        }
    }
} 