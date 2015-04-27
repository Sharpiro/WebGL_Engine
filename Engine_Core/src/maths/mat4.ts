///<reference path="./vec3.ts"/>

module Maths {
    export class Mat4 {

        public elements: Array<number> = [];

        constructor(diagonal: number) {
            for (var y = 0; y < 4; y++) {
                for (var x = 0; x < 4; x++) {
                    this.elements[x + y * 4] = 0;
                }
            }
            this.elements[0 + 0 * 4] = diagonal;
            this.elements[1 + 1 * 4] = diagonal;
            this.elements[2 + 2 * 4] = diagonal;
            this.elements[3 + 3 * 4] = diagonal;
        }

        public static identity() {
            return new Mat4(1);
        }

        public static orthographic(left: number, right: number, bottom: number, top: number, near: number, far: number) {
            var result = new Mat4(1);

            result.elements[0 + 0 * 4] = 2.0 / (right - left);
            result.elements[1 + 1 * 4] = 2.0 / (top - bottom);
            result.elements[2 + 2 * 4] = 2.0 / (near - far);

            result.elements[0 + 3 * 4] = (left + right) / (left - right);
            result.elements[1 + 3 * 4] = (bottom + top) / (bottom - top);
            result.elements[2 + 3 * 4] = (far + near) / (far - near);

            return result;
        }

        public translate(translation: Vec3): void {
            this.elements[0 + 3 * 4] = translation.x;
            this.elements[1 + 3 * 4] = translation.y;
            this.elements[2 + 3 * 4] = translation.z;
        }
    }
}