///<reference path="../renderable2d.ts"/>
///<reference path="../../maths/vec3.ts"/>
///<reference path="../../maths/vec4.ts"/>

import Vec3 = Maths.Vec3;
import Vec4 = Maths.Vec4;
module Graphics {
    export class Quad extends Renderable2D {

        constructor(position: Vec3, size: Vec2, color: Vec4, shader: Shader) {
            super(position, size, color, shader);

            const vertices = [
                0.0, 0.0, 0.0,
                0.0, size.y, 0.0,
                size.x, size.y, 0.0,
                size.x, 0.0, 0.0
            ];

            const colors = [
                color.x, color.y, color.z, color.w,
                color.x, color.y, color.z, color.w,
                color.x, color.y, color.z, color.w,
                color.x, color.y, color.z, color.w
            ];

            const indices = [
                0, 1, 2,
                0, 2, 3
            ];

            this.vao = new VertexArray();
            this.vao.addBuffer(new Buffer(vertices, 3, 0));
            this.vao.addBuffer(new Buffer(colors, 4, 1));
            this.ibo = new IndexBuffer(indices);

        }
    }
}