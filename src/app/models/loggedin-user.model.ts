export class LoggedInUser {
    constructor(
        public userId : string,
        public _token : string,
        public roles : string
    ){}

    get token(){
        return this._token;
    }

}