<template>
    <v-card class="mb-3 pa-3" hover @click="openEdit = true">
        <!-- Slet-knap -->
        <v-btn icon size="x-small" variant="text" @click.stop="emit('delete')" class="delete-btn">
            <v-icon>mdi-delete</v-icon>
        </v-btn>

        <!-- Titel -->
        <div class="card-title">
            {{ card.title }}
        </div>

        <!-- Beskrivelse -->
        <v-card-text>
            {{ card.description }}
        </v-card-text>
    </v-card>

    <!-- Redigeringsdialog -->
    <v-dialog v-model="openEdit" max-width="500">
        <v-card>
            <v-card-title>Rediger kort</v-card-title>
            <v-card-text>
                <v-text-field v-model="editedTitle" label="Titel" />
                <v-textarea v-model="editedDescription" label="Beskrivelse" />
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn text @click="openEdit = false">Annuller</v-btn>
                <v-btn color="primary" @click="saveChanges">Gem</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue'

const props = defineProps<{
    card: {
        id: number
        title: string
        description: string
    }
}>()

const emit = defineEmits(['delete'])

const openEdit = ref(false)
const editedTitle = ref(props.card.title)
const editedDescription = ref(props.card.description)

const editCard = inject('editCard') as Function
const columnId = inject('columnId') as string

function saveChanges() {
    if (editCard) {
        editCard(columnId, props.card.id, editedTitle.value, editedDescription.value)
        openEdit.value = false
    }
}
</script>

<style scoped>
.card-title {
    font-weight: bold;
    font-size: 1.1rem;
    padding: 8px 12px 4px;
    word-break: break-word;
    white-space: normal;
}

.delete-btn {
    position: absolute;
    top: 4px;
    right: 4px;
    z-index: 1;
}
</style>