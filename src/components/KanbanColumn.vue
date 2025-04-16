<template>
    <v-col cols="12" md="3" class="pa-10 wide-column" :style="{
        backgroundColor: '#f9f9f9',
        borderTop: '2px solid #ccc',
        borderBottom: '2px solid #ccc',
        borderRight: '2px solid #ccc',
        borderLeft: isFirst ? '2px solid #ccc' : undefined
    }">
        <!-- Overskrift -->
        <h3 class="text-center text-h6 font-weight-bold mb-2">
            {{ status }}
        </h3>

        <!-- Fuldbredde skillelinje -->
        <div class="full-width-divider" />

        <!-- Kort-liste med drag and drop -->
        <Draggable :list="cards" item-key="id" group="kanban" class="draggable-list" :animation="200" :data-column="id"
            @change="handleChange">
            <template #item="{ element: card }">
                <div>
                    <KanbanCard :card="card" @delete="handleDelete(card.id)" />
                </div>
            </template>
        </Draggable>
    </v-col>
</template>

<script setup lang="ts">
import { inject, provide } from 'vue'
import Draggable from 'vuedraggable'
import KanbanCard from './KanbanCard.vue'
import type { Card } from '../types/Card'

const props = defineProps<{
    status: string
    cards: Card[]
    isFirst?: boolean
    id: string
}>()

provide('columnId', props.id)

const removeCard = inject('removeCard') as Function
const moveCard = inject('moveCard') as Function

function handleDelete(cardId: number) {
    if (removeCard) {
        removeCard(props.id, cardId)
    }
}

function handleChange(event: any) {
    const { moved, added, removed } = event

    if (added && removed) {
        const card = added.element
        const newIndex = added.newIndex
        const fromColumn = removed.from.dataset.column
        const toColumn = props.id

        if (moveCard) {
            moveCard(fromColumn, toColumn, card, newIndex)
        }
    }
}
</script>

<style scoped>
.draggable-list {
    min-height: 20px;
    user-select: none;
}

.draggable-list>* {
    cursor: grab;
}

.full-width-divider {
    height: 2px;
    background-color: #ccc;
    margin: 0 -40px 16px;
    /* negativ margin svarer til pa-10 (padding: 40px) */
}
</style>