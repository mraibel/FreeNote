import { useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, View } from "react-native"
import { Controller, useForm } from "react-hook-form";
import { subjectAverage } from "../../../../../utils/subjectAverage"
import { useData } from "../../../../../components/Data/DataContext"

export default function SubjectId() {

    const [subject, setSubject] = useState(null)

    const { currentSubject } = useData()
    
    useEffect(() => {
        setSubject(currentSubject)
    }, [] )

    if (subject === null) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size={100} color={'orange'} />
            </View>
        )
    }

    return (
        <View style={{ flex: 1, margin: 20 }}>
            <View style={{flex:10}}>
                <Text style={{ textAlign: 'center', fontSize: 25 }}>{subject.name}</Text>
                <View style={{ margin: 20 }}>
                    <FlatList
                        data={subject.grades}
                        renderItem={({ item }) => <GradeCard item={item} />}
                        keyExtractor={item => item.id}
                        ItemSeparatorComponent={() => <View style={{ borderWidth: 0.2, marginVertical: 15 }} />}
                    />
                </View>
            </View>
            {
                subject.grades.length > 0 ? (
                    <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingHorizontal:20}}>
                    <Text style={{fontSize:22}}>Promedio</Text>
                    {
                        subject ? 
                            <View 
                                style={styles.squareAverageCard}><Text>{subjectAverage(subject.grades)}</Text></View> 
                                : <ActivityIndicator color={'orange'}/>
                    }
                </View>
                ) : ''
            }
        </View>
    )
}

const GradeCard = ({ item }) => {

    const { description, percentage, value, subgrades } = item
    const { control, handleSubmit, setValue } = useForm({
        defaultValues: {
            percentage: percentage || '',
            value: value || ''
        }
    });

    return (
        <View>
            <View style={styles.mainGradeCard}>
                <View style={styles.descriptionGradeCard}>
                    <Text style={styles.fontSizeCard}>{description}</Text>
                    <Controller
                        control={control}
                        name={`grades[${item.id}].percentage`}
                        defaultValue={percentage || 0}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                value={String(value)}
                                keyboardType="numeric"
                                placeholder="%"
                                onChangeText={onChange}
                            />
                        )}
                    />
                </View>
                <View style={styles.valueGradeCard}>
                    <Controller
                        control={control}
                        name={`grades[${item.id}].value`}
                        defaultValue={value || 0}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                value={String(value)}
                                keyboardType="numeric"
                                placeholder="%"
                                onChangeText={onChange}
                            />
                        )}
                    />
                </View>
            </View>
            <FlatList
                data={subgrades}
                renderItem={({ item }) => <SubGradeCard item={item} />}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={() => <View style={{ borderWidth: 0.1 }} />}
            />
        </View>
    )
}

const SubGradeCard = ({ item }) => {

    const { description, percentage, value } = item
    const { control, handleSubmit, setValue } = useForm({
        defaultValues: {
            percentage: percentage || '',
            value: value || ''
        }
    });

    return (
        <View style={styles.subgradeCard}>
            <View style={styles.descriptionSubGradeCard}>
                <Text style={styles.fontSizeCard}>{description}</Text>
                <Controller
                    control={control}
                    name={`subgrades[${item.id}].percentage`}
                    defaultValue={percentage || 0}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={styles.input}
                            value={String(value)}
                            keyboardType="numeric"
                            placeholder="%"
                            onChangeText={onChange}
                        />
                    )}
                />
            </View>
            <View style={styles.valueGradeCard}>
                <Controller
                    control={control}
                    name={`subgrades[${item.id}].value`}
                    defaultValue={value || 0}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={styles.input}
                            value={String(value)}
                            keyboardType="numeric"
                            onChangeText={onChange}
                        />
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainGradeCard: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    descriptionGradeCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 3
    },
    valueGradeCard: {
        flex: 1
    },
    input: {
        height: 35,
        margin: 5,
        marginHorizontal: 7,
        borderWidth: 1,
        padding: 10,
    },
    subgradeCard: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    descriptionSubGradeCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 3,
        marginLeft: 20
    },
    fontSizeCard: {
        fontSize: 17
    },
    squareAverageCard: {
        padding: 5,
        borderWidth: 1,
        borderColor: 'gray',
        width: 75,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }

})