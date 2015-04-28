///<reference path="./vec3.ts"/>
///<reference path="./functions.ts"/>

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

        public static perspective(fov: number, aspectRatio: number, near: number, far: number) {
            var result = new Mat4(1.0);

            var q = 1.0 / Math.tan(Functions.toRadians(0.5 * fov));
            var a = q / aspectRatio;

            var b = (near + far) / (near - far);
            var c = (2.0 * near * far) / (near - far);

            result.elements[0 + 0 * 4] = a;
            result.elements[1 + 1 * 4] = q;
            result.elements[2 + 2 * 4] = b;
            result.elements[3 + 2 * 4] = -1.0;
            result.elements[2 + 3 * 4] = c;

            return result;
        }

        public translate(translation: Vec3): void {
            this.elements[0 + 3 * 4] = translation.x;
            this.elements[1 + 3 * 4] = translation.y;
            this.elements[2 + 3 * 4] = translation.z;
        }

        public rotate(degrees: number, axis: Vec3): void {
            var r = Functions.toRadians(degrees);
            var c = Math.cos(r);
            var s = Math.sin(r);
            var omc = 1.0 - c;
            
            var x = axis.x;
            var y = axis.y;
            var z = axis.z;

            this.elements[0 + 0 * 4] = x * omc + c;
            this.elements[1 + 0 * 4] = y * x * omc + z * s;
            this.elements[2 + 0 * 4] = x * z * omc - y * s;
            
            this.elements[0 + 1 * 4] = x * y * omc - z * s;
            this.elements[1 + 1 * 4] = y * omc + c;
            this.elements[2 + 1 * 4] = y * z * omc + x * s;
            
            this.elements[0 + 2 * 4] = x * z * omc + y * s;
            this.elements[1 + 2 * 4] = y * z * omc - x * s;
            this.elements[2 + 2 * 4] = z * omc + c;
            console.log("Rotated!");
        }
    }
}