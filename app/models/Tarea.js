const {v4: uuid} = require('uuid');
class Tarea{
    id='';
    desc='';
    completadoEn = null;
    constructor(desc) {
        this.id = uuid();
        this.desc = desc;
    }
}

module.exports = Tarea;