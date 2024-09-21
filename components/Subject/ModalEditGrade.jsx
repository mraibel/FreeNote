import { X } from "lucide-react-native"
import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native"

export const ModalEditGrade = ({ }) => {

    const [editingGrade, setEditingGrade] = useState(null);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={editModalVisible}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Editar Nota</Text>
                        <Pressable>
                            <X size={24} color="#FF8C00" />
                        </Pressable>
                    </View>
                    <TextInput
                        style={styles.modalInput}
                        placeholder="Descripción"
                        value={editingGrade?.description}
                        onChangeText={(text) => setEditingGrade({ ...editingGrade, description: text })}
                    />
                    <TextInput
                        style={styles.modalInput}
                        placeholder="Nota"
                        keyboardType="numeric"
                        value={editingGrade?.value?.toString()}
                        onChangeText={(text) => setEditingGrade({ ...editingGrade, value: parseFloat(text) || 0 })}
                    />
                    <TextInput
                        style={styles.modalInput}
                        placeholder="Porcentaje"
                        keyboardType="numeric"
                        value={editingGrade?.percentage?.toString()}
                        onChangeText={(text) => setEditingGrade({ ...editingGrade, percentage: parseFloat(text) || 0 })}
                    />
                    <Pressable style={styles.modalButton}>
                        <Text style={styles.modalButtonText}>Guardar Cambios</Text>
                    </Pressable>
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
    }
})