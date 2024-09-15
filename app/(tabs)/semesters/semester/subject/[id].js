import { useEffect, useState } from "react"
import { ActivityIndicator, FlatList, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native"
import { subGradeAverage, subjectAverage } from "../../../../../utils/subjectAverage"
import { useData } from "../../../../../components/Data/DataContext"
import { LinearGradient } from "expo-linear-gradient";
import { ChevronDown, ChevronUp, Minus, Plus, Save } from "lucide-react-native";
import { Button, Modal, Portal, TextInput } from 'react-native-paper'
import { insertGrade } from "../../../../../lib/grades";
import { getGradesSubjectId } from "../../../../../lib/subject";
import { useLocalSearchParams } from "expo-router";

export default function SubjectId() {

    // Params
    const { id } = useLocalSearchParams()

    // Initial data
    const [subject, setSubject] = useState(null)
    const [grades, setGrades] = useState(null)

    // Data
    const { currentSemester } = useData()

    // Average
    const [average, setAverage] = useState(0)

    //Modal
    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: 'white', padding: 20, margin: 20, borderRadius: 20, maxHeight: '60%' }

    useEffect(() => {
        setSubject(currentSemester.subjects.find((e) => e.id == id))
        setGrades(currentSemester.subjects.find((e) => e.id == id).grades)
        setAverage(subjectAverage(currentSemester.subjects.find((e) => e.id == id).grades))
    }, [currentSemester])

    const updateGrade = (updatedGrade) => {
        const newGrades = grades.map(grade =>
            grade.id === updatedGrade.id ? updatedGrade : grade
        );
        setAverage(subjectAverage(newGrades))
        setGrades(newGrades);
    };

    const toggleSubgrades = (gradeId) => {
        const newGrades = grades.map(grade => {
            if (grade.id === gradeId) {
                return { ...grade, expanded: !grade.expanded };
            }
            return grade;
        });
        setAverage(subjectAverage(newGrades))
        setGrades(newGrades);
    };

    if (subject === null && grades == null) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size={100} color={'orange'} />
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <LinearGradient colors={['#FF8C00', '#FFA500', '#FFD700']} style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <Text style={styles.subjectName}>{subject.name}</Text>
                    {grades.map(grade => (
                        <GradeItem
                            key={grade.id}
                            grade={grade}
                            onUpdate={updateGrade}
                            onToggleSubgrades={() => toggleSubgrades(grade.id)}
                        />
                    ))}
                    <View style={{ flexDirection: 'row', columnGap: 10 }}>
                        <Pressable onPress={showModal} style={styles.newButtonContainer}>
                            <Plus strokeWidth={5} size={20} color={'#FF8C00'} />
                        </Pressable>
                        <View style={styles.averageContainer}>
                            <Text style={styles.averageText}>Promedio: {average}</Text>
                        </View>
                    </View>
                    {/* Boton para guardar si es que hay cambios

                        <Pressable style={styles.saveButton}>
                            <Save size={24} color="#FFFFFF" />
                            <Text style={styles.saveButtonText}>Guardar Notas</Text>
                        </Pressable>

                    */}
                </ScrollView>
                <ModalCreateGrade
                    visible={visible}
                    containerStyle={containerStyle}
                    hideModal={hideModal}
                    grades={grades}
                    setGrades={setGrades}
                    subject={subject}
                    setSubject={setSubject}
                    setAverage={setAverage}
                />
            </LinearGradient>
        </SafeAreaView>
    )
}

const GradeItem = ({ grade, onToggleSubgrades, onUpdate }) => {
    return (
        <View style={styles.gradeItem}>
            <View style={styles.gradeHeader}>
                <Text style={styles.gradeName}>{grade.description}</Text>
                {
                    grade.subgrades && grade.subgrades.length > 0 ? (
                        <Pressable onPress={onToggleSubgrades}>
                            {grade.expanded ? <ChevronUp size={24} color="#FF8C00" /> : <ChevronDown size={24} color="#FF8C00" />}
                        </Pressable>

                    ) : ''
                }
            </View>
            <View style={styles.gradeInputs}>
                <TextInput
                    style={styles.input}
                    label="Porcentaje"
                    keyboardType="numeric"
                    value={grade.percentage.toString()}
                    onChangeText={(text) => onUpdate({ ...grade, percentage: parseFloat(text) || 0 })}
                />
                <TextInput
                    editable={!(grade.subgrades && grade.subgrades.length > 0)}
                    style={styles.input}
                    label="Nota"
                    keyboardType="numeric"
                    value={grade.value.toString()}
                    onChangeText={(text) => onUpdate({ ...grade, value: parseFloat(text) || 0 })}
                />
            </View>
            {grade.subgrades && grade.expanded && (
                <View style={styles.subgradesContainer}>
                    {grade.subgrades.map((subgrade, index) => (
                        <GradeItem
                            key={index}
                            grade={subgrade}
                            onUpdate={(updatedSubgrade) => {
                                const newSubgrades = [...grade.subgrades];
                                newSubgrades[index] = updatedSubgrade;
                                onUpdate({ ...grade, subgrades: newSubgrades });
                            }}
                        />
                    ))}
                </View>
            )}
        </View>
    );
};

const ModalCreateGrade = ({ visible, hideModal, containerStyle, grades, subject }) => {

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
            percentage: '',
            value: ''
        }
        setSubgrades([...subGrades, subGrade])
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
        // Inicia sumatoria de porcentajes
        let totalPercentage = 0

        if (subGrades.length < 2) { // Si solo es una nota a guardar

            grades.map(grade => {
                totalPercentage += grade.percentage
            })
            totalPercentage += subGrades[0].percentage
            if (totalPercentage > 100) {
                console.log(totalPercentage)
                alert('El porcentaje no puede superar 100%')
                return
            }

            // Objeto para insert en BD
            const gradeToSave = new Object()
            gradeToSave.description = subGrades[0].description
            gradeToSave.value = subGrades[0].value
            gradeToSave.percentage = subGrades[0].percentage
            gradeToSave.id_subject = subject.id

            // Inserta nota en BD
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

        } else { // Si es que es mas de una nota, significa que es una nota con subnotas
            let sliceGrades = subGrades.slice(1)
            sliceGrades.map((subgrade) => {
                totalPercentage += subgrade.percentage
            })

            // Las subnotas no pueden superar el 100%
            if (totalPercentage > 100) {
                console.log(totalPercentage)
                alert('El porcentaje no puede superar 100%')
                return
            }

            // El promedio de las subnotas es el valor de la nota MAIN
            const averageSubGrades = subGradeAverage(sliceGrades)
            subGrades[0].value = averageSubGrades


        }
    }

    return (
        <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
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
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        padding: 16,
    },
    subjectName: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 20,
        textAlign: 'center',
    },
    gradeItem: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 12,
        marginBottom: 12,
        padding: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    },
    gradeHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    gradeName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    gradeInputs: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 2,
        width: '48%',
        borderColor: '#FF8C00',
        borderWidth: 1,
        color: '#333'
    },
    inputNewGrade: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 2,
        borderColor: '#FF8C00',
        borderWidth: 1,
    },
    subgradesContainer: {
        marginTop: 8,
        paddingLeft: 16,
    },
    averageContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        flex: 3
    },
    averageText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FF8C00',
    },
    newButtonContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    saveButton: {
        backgroundColor: '#FF8C00',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 8,
        marginTop: 20,
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 8,
    },
});