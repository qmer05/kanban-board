<template>
    <v-col cols="12" md="4" class="pa-10" :style="{
        backgroundColor: '#f9f9f9',
        borderRight: '2px solid #ccc',
        borderLeft: isFirst ? '2px solid #ccc' : undefined
    }">
        <h3 class="text-center text-h6 font-weight-bold mb-6">
            {{ status }}
        </h3>
        <KanbanCard v-for="card in cards" :key="card.id" :card="card" @delete="handleDelete(card.id)" />
    </v-col>
</template>

<script setup lang="ts">
import KanbanCard from './KanbanCard.vue'
import type { Card } from '../types/Card'
import { inject } from 'vue'

const removeCard = inject('removeCard') as Function

function handleDelete(cardId: number) {
    if (removeCard) {
        removeCard(props.id, cardId)
    }
}

const props = defineProps<{
    status: string
    cards: Card[]
    isFirst?: boolean
    id: string
}>()
</script>