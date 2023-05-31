const argv = require('./config/yargs').argv
const { boolean } = require('yargs');
const porHacer = require('./por-hacer/por-hacer');
const color = require('colors');


let comando = argv._[0];
switch (comando) {
    case 'Crear':
        let tarea = porHacer.crear(argv.descripcion)
        break;
    case 'Actualizar':
        let actualizar = porHacer.actualizarTarea(argv.descripcion, argv.completada);
        console.log(argv.completada);
        console.log(argv.descripcion);
        //console.log(actualizar);
        break;
    case 'Listar':
        let listado = porHacer.getListado()
        console.log('=====Listado por Hacer===='.green);
        for (let i = 0; i < listado.length; i++) {
            console.log(listado[i].descripcion.cyan);
            let estado = listado[i].completada;
            if (estado) console.log('Tarea Completada'.cyan);
            else console.log('Tarea por Terminar'.cyan);
            console.log('=========================='.green);
        }
        break;
    case 'Borrar':
        let borrar = porHacer.borrarTarea(argv.descripcion);
        console.log(borrar);
        break;
    default:
        console.log('Comando no reconocido');
        break;
}