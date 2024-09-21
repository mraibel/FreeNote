import { Modal, Pressable, StyleSheet, Text, View, Alert } from "react-native";
import { useData } from "../Data/DataContext";
import { deleteGrade } from "../../lib/grades";

export const ModalDeleteGrade = ({ visible, hideDeleteModal, grade }) => {

    const { refreshCurrentSemesterData } = useData()

    const del = () => {
        deleteGrade(grade.id).then(() => {
            refreshCurrentSemesterData()
            Alert.alert('Éxito', 'Se eliminó la nota')
            hideDeleteModal()
        })
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={hideDeleteModal}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>¿Está seguro de que desea eliminar esta nota?</Text>
                    <View style={styles.confirmButtons}>
                        <Pressable style={[styles.modalButton, styles.cancelButton]} onPress={hideDeleteModal}>
                            <Text style={styles.modalButtonText}>Cancelar</Text>
                        </Pressable>
                        <Pressable style={[styles.modalButton, styles.deleteButton]} onPress={del}>
                            <Text style={styles.modalButtonText}>Eliminar</Text>
                        </Pressable>
                    </View>
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
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FF8C00',
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
    confirmButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    cancelButton: {
        backgroundColor: '#999',
        flex: 1,
        marginRight: 8,
    },
    deleteButton: {
        backgroundColor: '#FF0000',
        flex: 1,
        marginLeft: 8,
    },
})