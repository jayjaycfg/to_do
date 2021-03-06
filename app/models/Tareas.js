const Tarea = require('./Tarea');
class Tareas{
    _listado= {};

    get listadoArr(){
        const listado = [];
        Object.keys(this._listado).forEach(key=>{
            const tarea = this._listado[key];
            listado.push(tarea)
        });
        return listado;
    };

    constructor() {
        this._listado ={};
    };

    crearTarea =(desc = '')=>{
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    };

    cargarTareasFromArray=(tareas)=>{
        tareas.map(tarea=>{
            return this._listado[tarea.id] = tarea;
        });
    };

    listadoCompleto=()=>{
        this.listadoArr.forEach((tarea,i)=>{
            const {desc, completadoEn} = tarea;
            const idx = `${i+1}.`.green;
            const estado = completadoEn ? 'Completada'.green :'Pendiente'.red;
            console.log(`${idx} ${desc} :: ${estado}`);
        });
    };

    listarPendientesCompletadas=(completadas=true)=>{
        if(completadas){
            this.listadoArr.filter(tarea=>tarea.completadoEn !== null)
                .map((tarea,i)=>{
                    const { desc, completadoEn} = tarea;
                    const idx = `${i+1}.`.green;
                    const estado = `${completadoEn}`.green;
                    console.log(`${idx} ${desc} :: ${estado}`);
                });
        return;
        }
        this.listadoArr.filter(tarea=>tarea.completadoEn === null)
            .map((tarea,i)=>{
                const { desc} = tarea;
                const idx = `${i+1}.`.green;
                const estado = 'Pendiente'.red;
                console.log(`${idx} ${desc} :: ${estado}`);
            });
    };

    borrarTarea =(id)=>{
        delete this._listado[id];
        console.log('Tarea borrada');
    };

    toggleCompletadas =(ids=[])=>{
            ids.map(id=>{
                const tarea = this._listado[id];
                if(!tarea.completadoEn){
                    tarea.completadoEn = new Date().toISOString();
                }
            });
            this.listadoArr.map(tarea=>{
                if( !ids.includes(tarea.id)){
                    this._listado[tarea.id].completadoEn = null;
                }
            });
    };

}

module.exports = Tareas;