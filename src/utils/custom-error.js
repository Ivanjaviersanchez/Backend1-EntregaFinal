export class CustomError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

// GENERA UN OBJETO CON EL MENSAJE DE ERROR
// {message, stack, status}