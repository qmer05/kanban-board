<template>
    <v-col cols="12" md="4" offset-md="4">
        <v-card class="pa-6 elevation-8">
            <v-text-field v-model="title" label="Titel" class="mb-3" density="compact" />
            <v-text-field v-model="description" label="Beskrivelse" class="mb-3" density="compact" />
            <v-select v-model="selectedColumn" :items="columns" item-title="title" item-value="id" label="Vælg kolonne"
                class="mb-4" />
            <v-btn @click="handleSubmit" color="primary" block>
                Tilføj kort
            </v-btn>
        </v-card>
    </v-col>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Column } from '../types/Column'

const props = defineProps<{
    columns: Column[]
}>()

const emit = defineEmits<{
    (e: 'add', columnId: string, title: string, description: string): void
}>()

const title = ref('')
const description = ref('')
const selectedColumn = ref(props.columns[0].id)

function handleSubmit() {
    if (!title.value.trim() || !description.value.trim()) return

    emit('add', selectedColumn.value, title.value, description.value)

    title.value = ''
    description.value = ''
}
</script>