const fc = require('fs');
const { boolean } = require('yargs');

let listadoPorhacer = [];

const cargarDB = () => {
    try {
        listadoPorhacer = require('../db/data.json');
    } catch (error) {
        listadoPorhacer = [];
    }
}

const guardarTarea = () => {
    let data = JSON.stringify(listadoPorhacer);
    fc.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err)
    });

}

const crear = (descripcion) => {
    cargarDB();
    let porHacer = {
        descripcion,
        completada: false
    };
    listadoPorhacer.push(porHacer);
    guardarTarea();
}

const getListado = () => {
    cargarDB();
    return listadoPorhacer;
}
const actualizarTarea = (desc, comp = true) => {
    cargarDB();
    let index = listadoPorhacer.findIndex(tarea => tarea.descripcion === desc)
    if (index >= 0) {
        listadoPorhacer[index].completada = comp;
        guardarTarea();
        return console.log(guardarTarea.arguments);
    } else {
        return false;
    }

}

const borrarTarea = (desc) => {
    cargarDB();
    let index = listadoPorhacer.findIndex(tarea => tarea.descripcion === desc);
    if (index >= 0) {
        listadoPorhacer.splice(index, 1);
        guardarTarea();
        return true;
    } else {
        return false;
    }
}

module.exports = {
    crear,
    getListado,
    actualizarTarea,
    borrarTarea
}