import { useEffect, useState } from "react"
import { ActivityIndicator, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native"
import { subjectAverage } from "../../../../../utils/subjectAverage"
import { useData } from "../../../../../components/Data/DataContext"
import { LinearGradient } from "expo-linear-gradient"
import { ChevronDown, ChevronUp, Ellipsis, Plus } from "lucide-react-native"
import { Menu, TextInput } from 'react-native-paper'
import { useLocalSearchParams } from "expo-router"
import { ModalCreateGrade } from "../../../../../components/Subject/ModalCreateGrade"
import { ModalDeleteGrade } from "../../../../../components/Subject/ModalDeleteGrade"

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
                    hideModal={hideModal}
                    grades={grades}
                    subject={subject}
                />
            </LinearGradient>
        </SafeAreaView>
    )
}

const GradeItem = ({ grade, onToggleSubgrades, onUpdate }) => {

    // Menu
    const [visibleMenu, setVisibleMenu] = useState(false);
    const openMenu = () => setVisibleMenu(true);
    const closeMenu = () => setVisibleMenu(false);

    // Modal Delete
    const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
    const showModal = () => {
        setVisibleDeleteModal(true)
        closeMenu()
    }
    const hideModal = () => setVisibleDeleteModal(false);

    return (
        <View style={styles.gradeItem}>
            <ModalDeleteGrade 
                visible={visibleDeleteModal}
                hideDeleteModal={hideModal}
                grade={grade}
            />
            <View style={styles.gradeHeader}>
                <Text style={styles.gradeName}>{grade.description}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                    {
                        grade.subgrades && grade.subgrades.length > 0 ? (
                            <Pressable onPress={onToggleSubgrades}>
                                {grade.expanded ? <ChevronUp size={24} color="#FF8C00" /> : <ChevronDown size={24} color="#FF8C00" />}
                            </Pressable>

                        ) : ''
                    }
                    <Menu
                        visible={visibleMenu}
                        onDismiss={closeMenu}
                        anchor={<Ellipsis onPress={openMenu} size={24} color={'gray'} />}>
                        <Menu.Item onPress={() => { }} title="Editar" />
                        <Menu.Item onPress={showModal} title="Eliminar" />
                    </Menu>
                </View>
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