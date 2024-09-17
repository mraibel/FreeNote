import { useState } from "react"
import { useData } from "../Data/DataContext"
import { insertGrade } from "../../lib/grades"
import { ScrollView, StyleSheet, Text, View } from "react-native"
import { Button, Modal, Portal, TextInput } from "react-native-paper"
import { Minus } from "lucide-react-native"
import { subGradeAverage } from "../../utils/subjectAverage"

export const ModalCreateGrade = ({ visible, hideModal, containerStyle, grades, subject }) => {

    const { refreshCurrentSemesterData } = useData()

    // Iniciar arreglo de notas a guardar
    const [subGrades, setSubgrades] = useState([
        {
            id: 0,
            description: '',
            percentage: '',
            value: ''
        }
    ])

    // Agrega nueva nota en el Modal
    const addSubgrade = () => {
        const subGrade = {
            id: subGrades.length,
            description: '',
            percentage: 0,
            value: ''
        }
        setSubgrades([...subGrades, subGrade])
        if (subGrades.length == 1) {
            alert('Si no asignas porcentaje a todas las subnotas, tendrán el mismo valor todas')
        }
    }

    // Eliminar nota del Modal
    const deleteSubGrade = () => setSubgrades(subGrades.slice(0, -1))

    // Actualiza los campos mientras se escribe
    const updateGrade = (updatedGrade) => {
        const newGrades = subGrades.map(subgrade =>
            subgrade.id === updatedGrade.id ? updatedGrade : subgrade
        )
        setSubgrades(newGrades);
    };

    // Guardar nota en la BD
    const saveGrade = () => {

        // Comprobar que el porcentaje de la nota no sea ingresado
        if (subGrades[0].percentage == 0) {
            if (subGrades.length == 1) {
                alert('Debe asignarle un porcentaje a la nota')
                return
            }
            alert('Debe asignarle un porcentaje a la nota principal')
            return
        }

        // Inicia sumatoria de porcentajes
        let totalPercentage = 0
        // Calcula el procentaje con las notas existentes
        grades.map(grade => {
            totalPercentage += grade.percentage
        })
        // Le suma la que se insertará ahora
        totalPercentage += subGrades[0].percentage

        if (totalPercentage > 100) {
            alert('La suma de los porcentajes no puede superar 100%')
            return
        }

        if (subGrades.length == 1) { // Si solo es una nota a guardar

            // Objeto para insert en BD
            const gradeToSave = new Object()
            gradeToSave.description = subGrades[0].description || 'Nota'
            gradeToSave.value = subGrades[0].value
            gradeToSave.percentage = subGrades[0].percentage
            gradeToSave.id_subject = subject.id

            // Inserta nota en BD
            insertGradeDB(gradeToSave)

        } else { // Si es que es mas de una nota, significa que es una nota con subnotas

            let percentageSubGrades = 0

            // Toma las notas desde la segunda (subnotas) 
            let sliceGrades = subGrades.slice(1)

            const notPercentaje = sliceGrades.find((subgrade) => subgrade.percentage == 0)
            const truePercentaje = sliceGrades.find((subgrade) => subgrade.percentage != 0)

            if (notPercentaje && truePercentaje) {
                alert('Si asignas un porcentaje, todas deben tenerlo')
                return
            }

            sliceGrades.map((subgrade) => {
                percentageSubGrades += subgrade.percentage
            })

            // Preparar objeto

            // Construir arreglo de sub notas
            const subGradesToSave = []
            sliceGrades.map((subgrade, index) => {
                let subGradeToSave = new Object()
                subGradeToSave.description = subgrade.description || `Subnota ${index + 1}`
                subGradeToSave.value = subgrade.value
                subGradeToSave.percentage = subgrade.percentage

                subGradesToSave.push(subGradeToSave)
            })

            // El promedio de las subnotas es el valor de la nota MAIN
            const averageSubGrades = subGradeAverage(sliceGrades)

            // Objeto para insert en BD
            const gradeToSave = new Object()
            gradeToSave.description = subGrades[0].description || 'Nota'
            gradeToSave.value = averageSubGrades
            gradeToSave.percentage = subGrades[0].percentage
            gradeToSave.id_subject = subject.id
            gradeToSave.subgrades = subGradesToSave

            // Inserta nota en BD
            insertGradeDB(gradeToSave)
        }
    }

    const insertGradeDB = (gradeToSave) => {
        insertGrade(gradeToSave).then(() => {
            alert('Nota guardada')
            // Vaciar e inicar las notas del arreglo del modal
            subGrades.splice(0, subGrades.length)
            addSubgrade()
            // Refresca los datos del semestre actual
            refreshCurrentSemesterData()
            // Cerrar ventana modal
            hideModal()
        })
    }


    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={hideModal}
                contentContainerStyle={containerStyle}
            >
                <Text style={{ fontSize: 25, textAlign: 'center' }}>Nueva Nota</Text>
                <ScrollView style={{ marginVertical: 10 }}>
                    {
                        subGrades.map((subgrade, index) => (
                            <NewGradeItem
                                index={index}
                                key={subgrade.id}
                                item={subgrade}
                                updateSubGrade={updateGrade}
                                grades={subGrades}
                            />
                        ))
                    }
                </ScrollView>
                <View style={{ flexDirection: 'row', columnGap: 10, justifyContent: 'center' }}>
                    <Button onPress={addSubgrade} mode='contained' style={{ backgroundColor: '#FF8C00' }}>
                        Sub Nota
                    </Button>
                    {
                        subGrades.length > 1 ? (
                            <Button onPress={deleteSubGrade} mode='contained' style={{ backgroundColor: '#FF8C00' }}>
                                <Minus strokeWidth={4} size={20} color={'#FFFFFF'} />
                            </Button>
                        ) : ''
                    }
                    <Button mode='contained' onPress={saveGrade} style={{ backgroundColor: '#FF8C00' }}>
                        Guardar nota
                    </Button>
                </View>
            </Modal>
        </Portal>
    )
}

const NewGradeItem = ({ item, updateSubGrade, grades, index }) => {
    return (
        <View style={{ flex: 1, flexDirection: 'column', marginVertical: 5, rowGap: 3, width: 'full' }}>
            <TextInput
                style={styles.inputNewGrade}
                label="Descripción"
                value={item.description.toString()}
                onChangeText={(text) => updateSubGrade({ ...item, description: text })}
            />
            <View style={{ flexDirection: 'row', columnGap: 3 }}>
                <TextInput
                    style={[styles.inputNewGrade, { flex: 1 }]}
                    label="Porcentaje"
                    keyboardType="numeric"
                    value={item.percentage.toString()}
                    onChangeText={(text) => updateSubGrade({ ...item, percentage: parseFloat(text) || 0 })}
                />
                {
                    grades.length > 1 && index == 0 ? '' : (
                        <TextInput
                            style={[styles.inputNewGrade, { flex: 1 }]}
                            label="Nota"
                            keyboardType="numeric"
                            value={item.value.toString()}
                            onChangeText={(text) => updateSubGrade({ ...item, value: parseFloat(text) || 0 })}
                        />
                    )
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    inputNewGrade: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 2,
        borderColor: '#FF8C00',
        borderWidth: 1,
    }
})