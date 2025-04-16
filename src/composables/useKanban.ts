import { ref } from 'vue'
import type { Card } from '../types/Card'
import type { Column } from '../types/Column'

export function useKanban() {
    const columns: Column[] = [
        { id: 'todo', title: 'To Do' },
        { id: 'inprogress', title: 'In Progress' },
        { id: 'done', title: 'Done' }
    ]

    const cards = ref<Record<string, Card[]>>({
        todo: [
            { id: 1, title: 'Lave kaffe', description: 'Det skal vi først' },
        ],
        inprogress: [
            { id: 2, title: 'Kode Vue app', description: 'Work in progress' },
        ],
        done: [
            { id: 3, title: 'Installere Vuetify', description: '✅ Done' },
        ],
    })

    function addCard(columnId: string, title: string, description: string) {
        const newCard: Card = {
            id: Date.now(), // midlertidigt unikt ID
            title,
            description,
        }

        cards.value[columnId].push(newCard)
    }

    function removeCard(columnId: string, cardId: number) {
        cards.value[columnId] = cards.value[columnId].filter(card => card.id !== cardId)
    }

    return {
        columns,
        cards,
        addCard,
        removeCard,
    }
}


