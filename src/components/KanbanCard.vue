<template>
    <v-card class="mb-3 pa-3" hover>
        <v-btn icon size="x-small" variant="text" @click="emit('delete')" class="delete-btn">
            <v-icon>mdi-delete</v-icon>
        </v-btn>

        <div class="card-title">
            {{ card.title }}
        </div>

        <v-card-text>
            {{ card.description }}
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
defineProps<{
    card: {
        id: number
        title: string
        description: string
    }
}>()

const emit = defineEmits(['delete'])
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