require('colors');
const {inquirerMenu,inquirerPausa} = require('./helpers/inquirer');
const Tarea = require('./models/Tarea');
const Tareas = require('./models/Tareas');

const main = async ()=>{
    console.log('Hola Mundo');
    let opt ='';
    do{
        // opt = await inquirerMenu();
        // if(opt !=='0')await inquirerPausa();

        const tareas = new Tareas();
        const tarea = new Tarea('comprar comida');
        tareas._listado[tarea.id] = tarea;

        console.log(tareas);
        await inquirerPausa();
    }while (opt !=='0')
};

main();