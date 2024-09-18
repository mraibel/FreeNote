import { useState } from "react"
import { useData } from "../Data/DataContext"
import { insertGrade } from "../../lib/grades"
import { StyleSheet, Text, View, Pressable, Modal, TextInput, ScrollView, Alert } from "react-native"
import { Trash, X } from "lucide-react-native"
import { subGradeAverage } from "../../utils/subjectAverage"

export const ModalCreateGrade = ({ visible, hideModal, grades, subject }) => {

    const { refreshCurrentSemesterData } = useData()

    const [newGrade, setNewGrade] = useState({ description: '', value: '', percentage: '', subgrades: [] });

    const insertGradeDB = (newGrade) => {
        insertGrade(newGrade).then(() => {
            alert('Nota guardada')
            // Refresca los datos del semestre actual
            refreshCurrentSemesterData()
            // Cerrar ventana modal
            hideModal()
        })
    }

    const addNewGrade = () => {
        if (newGrade.description && newGrade.percentage) {
            let sum = 0
            let totalPercentage = grades.reduce((accumulator, e) => accumulator + e.percentage, sum)
            totalPercentage += newGrade.percentage
            if (totalPercentage > 100) {
                Alert.alert('Error', 'La suma de los porcentajes no puede superar 100%');
                return
            }
            const newGradeItem = {
                id: Date.now(),
                description: newGrade.description,
                percentage: parseFloat(newGrade.percentage),
                value: newGrade.subgrades.length > 0 ? subGradeAverage(newGrade.subgrades) : parseFloat(newGrade.value || 0),
                subgrades: newGrade.subgrades.length > 0 ? newGrade.subgrades : null,
                expanded: false,
                id_subject: subject.id
            };
            insertGradeDB(newGradeItem)
            setNewGrade({ description: '', value: '', percentage: '', subgrades: [] });
        } else {
            alert('Error', 'Por favor, complete al menos la descripción y el porcentaje');
        }
    };

    const addSubgrade = () => {
        if (newGrade.description && newGrade.percentage) {
            let sum = 0
            let totalPercentage = newGrade.subgrades.reduce((accumulator, e) => accumulator + e.percentage, sum)
            totalPercentage += newGrade.percentage
            if (totalPercentage > 100) {
                Alert.alert('Error', 'La suma de los porcentajes no puede superar 100%');
                return
            }
            const subgrade = {
                id: Date.now(),
                description: newGrade.description,
                value: parseFloat(newGrade.value || 0),
                percentage: parseFloat(newGrade.percentage),
            };
            setNewGrade({
                ...newGrade,
                description: '',
                value: '',
                percentage: '',
                subgrades: [...newGrade.subgrades, subgrade],
            });
        } else {
            Alert.alert('Error', 'Por favor, complete al menos la descripción y el porcentaje');
        }
    };

    const removeSubgrade = (index) => {
        const newSubgrades = newGrade.subgrades.filter((_, i) => i !== index);
        setNewGrade({ ...newGrade, subgrades: newSubgrades });
    };


    return (
        <Modal
            visible={visible}
            transparent={true}
            onRequestClose={hideModal}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Agregar Nueva Nota</Text>
                        <Pressable onPress={hideModal}>
                            <X size={24} color="#FF8C00" />
                        </Pressable>
                    </View>
                    <ScrollView>
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Descripción"
                            value={newGrade.description}
                            onChangeText={(text) => setNewGrade({ ...newGrade, description: text })}
                        />
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Nota"
                            keyboardType="numeric"
                            value={newGrade.value}
                            onChangeText={(text) => setNewGrade({ ...newGrade, value: text })}
                        />
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Porcentaje"
                            keyboardType="numeric"
                            value={newGrade.percentage}
                            onChangeText={(text) => setNewGrade({ ...newGrade, percentage: text })}
                        />
                        <Pressable style={styles.modalButton} onPress={addSubgrade}>
                            <Text style={styles.modalButtonText}>Agregar Subnota</Text>
                        </Pressable>

                        {newGrade.subgrades.length > 0 && (
                            <View style={styles.subgradesList}>
                                <Text style={styles.subgradesTitle}>Subnotas:</Text>
                                {newGrade.subgrades.map((subgrade, index) => (
                                    <View key={subgrade.id} style={styles.subgradeItem}>
                                        <Text style={styles.subgradeName}>{subgrade.name} ({subgrade.percentage}%): {subgrade.value || ''}</Text>
                                        <Pressable onPress={() => removeSubgrade(index)}>
                                            <Trash size={20} color="#FF0000" />
                                        </Pressable>
                                    </View>
                                ))}
                            </View>
                        )}

                        <Pressable style={styles.modalButton} onPress={addNewGrade}>
                            <Text style={styles.modalButtonText}>Agregar Nota Principal</Text>
                        </Pressable>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        width: '90%',
        maxHeight: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FF8C00',
    },
    modalInput: {
        backgroundColor: '#F0F0F0',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        borderColor: '#FF8C00',
        borderWidth: 1,
    },
    modalButton: {
        backgroundColor: '#FF8C00',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 12,
    },
    modalButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    subgradesList: {
        marginTop: 16,
        maxHeight: 150,
        overflow: 'scroll',
    },
    subgradesTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    subgradeItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
        borderRadius: 8,
        padding: 8,
        marginBottom: 8,
    },
    subgradeName: {
        fontSize: 14,
        color: '#333',
    }
})