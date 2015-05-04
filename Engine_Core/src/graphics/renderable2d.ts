///<reference path="./buffers/vertexarray.ts"/>
///<reference path="./shader.ts"/>
///<reference path="../maths/vec2.ts"/>
///<reference path="./buffers/indexbuffer.ts"/>

module Graphics {
    export class Renderable2D {

        public vao: VertexArray;
        public ibo: IndexBuffer;
        protected indices: Array<number>;
        protected vertices: Array<number>;
        protected colors: Array<number>;
        public mvMatrix: Mat4;

        constructor(public position: Vec3, protected size: Vec2, color: Vec4, public shader: Shader) {
            this.mvMatrix = Mat4.identity();
            this.mvMatrix.translate(position);
            //this.vao = new VertexArray();
            //this.vao.addBuffer(new Buffer(vertices, 3), 0);
            //this.vao.addBuffer(new Buffer(colors, 4), 1);

            //this.ibo = new IndexBuffer(indices);
        }
    }
} 