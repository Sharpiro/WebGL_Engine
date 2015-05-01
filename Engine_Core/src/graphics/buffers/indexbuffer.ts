module Graphics {
    export class IndexBuffer {

        private bufferhandle: WebGLBuffer;

        constructor(public data: Array<number>) {
            this.bufferhandle = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufferhandle);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(data), gl.STATIC_DRAW);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        }

        public bind(): void {
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufferhandle);
        }

        public unbind(): void {
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        }

        public getCount(): number {
            return this.data.length;
        }
    }
}
