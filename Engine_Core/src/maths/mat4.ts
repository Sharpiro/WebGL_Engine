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

        public multiply(other: Mat4) {
            var result: Array<number> = [];
            for (var y = 0; y < 4; y++) {
                for (var x = 0; x < 4; x++) {
                    var sum = 0;
                    for (var e = 0; e < 4; e++) {
                        sum += this.elements[y + e * 4] * other.elements[e + x * 4];
                    }
                    result[y + x * 4] = sum;
                }
            }
            this.elements = result;
        }

        public static print(matrix: Mat4) {
            for (var y = 0; y < 16; y++) {
                console.log(matrix.elements[y]);
            }
        }

        public static identity() {
            return new Mat4(1);
        }
        public static matrixAscending() {
            var result = new Mat4(1);
            for (var i = 0; i < 16; i++) {
                result.elements[i] = i + 1;
            }
            return result;
        }
        public static matrixDescending() {
            var result = new Mat4(1);
            for (var i = 0; i < 16; i++) {
                result.elements[i] = 16 - i;
            }
            return result;
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
            var rotationMatrix = Mat4.identity();
            var r = Functions.toRadians(degrees);
            var c = Math.cos(r);
            var s = Math.sin(r);
            var omc = 1.0 - c;

            var x = axis.x;
            var y = axis.y;
            var z = axis.z;

            rotationMatrix.elements[0 + 0 * 4] = x * omc + c;
            rotationMatrix.elements[1 + 0 * 4] = y * x * omc + z * s;
            rotationMatrix.elements[2 + 0 * 4] = x * z * omc - y * s;
            
            rotationMatrix.elements[0 + 1 * 4] = x * y * omc - z * s;
            rotationMatrix.elements[1 + 1 * 4] = y * omc + c;
            rotationMatrix.elements[2 + 1 * 4] = y * z * omc + x * s;
            
            rotationMatrix.elements[0 + 2 * 4] = x * z * omc + y * s;
            rotationMatrix.elements[1 + 2 * 4] = y * z * omc - x * s;
            rotationMatrix.elements[2 + 2 * 4] = z * omc + c;
            this.multiply(rotationMatrix);
        }
    }
}