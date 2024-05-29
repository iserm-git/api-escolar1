const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const filePath = path.join(__dirname, '../data.json');


const readData = () => {
    const jsonData = fs.readFileSync(filePath);
    return JSON.parse(jsonData);
};


const saveData = (data) => {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, jsonData);
};

// Alta de alumno
router.post('/', (req, res) => {
    const { noControl, nombre, edad, carrera } = req.body;
    const alumnos = readData();

    if (alumnos.find(alumno => alumno.noControl === noControl)) {
        return res.status(400).json({ message: 'El No. de control ya existe' });
    }

    const nuevoAlumno = { noControl, nombre, edad, carrera };
    alumnos.push(nuevoAlumno);
    saveData(alumnos);

    res.status(201).json(nuevoAlumno);
});

// GET
router.get('/', (req, res) => {
    const alumnos = readData();
    res.status(200).json(alumnos);
});

// GET por numero de control
router.get('/:noControl', (req, res) => {
    const alumnos = readData();
    const alumno = alumnos.find(alumno => alumno.noControl === req.params.noControl);

    if (!alumno) {
        return res.status(404).json({ message: 'Alumno no encontrado' });
    }

    res.status(200).json(alumno);
});

// ACTUALIZAR
router.put('/:noControl', (req, res) => {
    const { nombre, edad, carrera } = req.body;
    const alumnos = readData();
    const alumnoIndex = alumnos.findIndex(alumno => alumno.noControl === req.params.noControl);

    if (alumnoIndex === -1) {
        return res.status(404).json({ message: 'Alumno no encontrado' });
    }

    const updatedAlumno = { noControl: req.params.noControl, nombre, edad, carrera };
    alumnos[alumnoIndex] = updatedAlumno;
    saveData(alumnos);

    res.status(200).json(updatedAlumno);
});

// BORRAR
router.delete('/:noControl', (req, res) => {
    const alumnos = readData();
    const alumnoIndex = alumnos.findIndex(alumno => alumno.noControl === req.params.noControl);

    if (alumnoIndex === -1) {
        return res.status(404).json({ message: 'Alumno no encontrado' });
    }

    alumnos.splice(alumnoIndex, 1);
    saveData(alumnos);

    res.status(200).json({ message: 'Alumno eliminado' });
});

module.exports = router;
