var socketIO = require('socket.io');
var jsonfile = require('jsonfile');

var persons = [];

main();
function main() {
    startServer();
    // test();
}

function startServer() {
    
    loadPersons();
    
    console.log('Hello from server');
    const io = socketIO(8090);

    io.on('connection', (socket) => {
        console.log('Connection received, send answer');
        socket.emit('hello');
        subscribe(socket);
    });
}

function loadPersons() {
    jsonfile.readFile('./data.json', (err, obj) => {
        persons = obj.persons;
    });
}

function savePersons() {
    var objectToSave = {persons: persons};
    
    jsonfile.writeFile('./data.json', objectToSave, (err) => {
        if (err) {
            console.log('save failed', err);
        }
    });
}

function subscribe(socket) {
    socket.on('getPersons', () => {
        sendPersons(socket);
    });

    socket.on('createPerson', (person) => {
        addPerson(person);
    });
}

function addPerson(person) {
    persons.push(person);
    savePersons();
}

function sendPersons(socket) {
    socket.emit('persons', persons);
    
    // jsonfile.readFile('./data.json', (err, obj) => {
    //     console.log('Server sends persons');
    //     console.log(obj.persons);
    //     socket.emit('persons', obj.persons);
    // });
}

// function getPersons(cb) {
//     var persons = [];
//     jsonfile.readFile('./data.json', (err, obj) => {
//         console.log(obj.persons);
//         // persons = obj.persons;
//     });
// }

function test() {
    getPersons();
}