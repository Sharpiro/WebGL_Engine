module Networking {

    export class Network {

        public static getRequestSync(url: string) {
            var request = new XMLHttpRequest();
            request.open("GET", url, false);
            request.send();
            return request.responseText;
        }

    }
} 

