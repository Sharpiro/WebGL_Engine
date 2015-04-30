module Graphics {
    export class Buffer {

        private bufferhandle: WebGLBuffer;

        constructor(data: Array<number>, public componentCount: number) {
            this.bufferhandle = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferhandle);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
            gl.bindBuffer(gl.ARRAY_BUFFER, null);
        }

        public bind(): void {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferhandle);
        }

        //public unbind(): void {
        //    gl.bindBuffer(gl.ARRAY_BUFFER, 0);
        //}
    }
}