module.exports = {
    stars: data => console.log(`[\x1b[36;1mstars\x1b[0m] ${data}\x1b[0m`),
    request: data => console.log(`[\x1b[33mREQUEST\x1b[0m] ${data}\x1b[0m`)
}