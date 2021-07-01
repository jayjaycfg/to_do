require('colors');
const {
    inquirerMenu,
    inquirerPausa,
    leerInput,
    listadoTareasBorrar,
    confirmar
} = require('./helpers/inquirer');
const {guardarDB, leerDB} = require('./helpers/guardarArchivo');
const Tareas = require('./models/Tareas');

const main = async ()=>{
    let opt ='';
    const tareas = new Tareas();
    const tareasDB = leerDB();

    if(tareasDB){
        tareas.cargarTareasFromArray(tareasDB);
    }
    do{
        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea(desc);
            break;
            case '2':
                tareas.listadoCompleto();
            break;
            case '3':
                tareas.listarPendientesCompletadas();
            break;
            case '4':
                tareas.listarPendientesCompletadas(false);
            break;

            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if(id !==0){
                    const ok = await confirmar('Esta seguro');
                    ok && tareas.borrarTarea(id);
                }
            break;
        }
        guardarDB(tareas.listadoArr);

        if(opt !=='0')await inquirerPausa();
    }while (opt !=='0')
};

main();