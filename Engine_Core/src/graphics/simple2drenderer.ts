///<reference path="./renderer2d.ts"/>
///<reference path="./renderable2d.ts"/>

module Graphics {
    export class Simple2DRenderer extends Renderer2D {

        private renderQueue: Array<Renderable2D> = [];

        public submit(renderable: Renderable2D): void {
            this.renderQueue.push(renderable);
        }

        public flush(): void {
            while (this.renderQueue.length > 0) {
                const renderable = this.renderQueue.shift();
                renderable.vao.bind();
                renderable.ibo.bind();
                //quad2.shader.setUniformMatrix("mvMatrix", quad.mvMatrix.rotate(1, new Vec3(0, 1, 0)));
                //quad.shader.setUniformMatrix("mvMatrix", quad.mvMatrix.rotate(1, new Vec3(0, 1, 0)));
                renderable.shader.setUniformMatrix("mvMatrix", Mat4.translate(renderable.position));
                gl.drawElements(gl.TRIANGLES, renderable.ibo.getCount(), gl.UNSIGNED_SHORT, 0);
                renderable.ibo.unbind();
                renderable.vao.unbind();
            }
        }

    }
} 