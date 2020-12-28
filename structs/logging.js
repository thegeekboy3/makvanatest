module.exports = {
    onyx: data => console.log(`[\x1b[36;1mONYX\x1b[0m] ${data}\x1b[0m`),
    request: data => console.log(`[\x1b[33mREQUEST\x1b[0m] ${data}\x1b[0m`)
}