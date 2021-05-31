class Response extends Error {
    constructor(meesage, errorCode) {
        super(message);
        this.code = errorCode;
    }
}