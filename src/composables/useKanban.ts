import { ref } from 'vue'
import type { Card } from '../types/Card'
import type { Column } from '../types/Column'

export function useKanban() {
    const columns: Column[] = [
        { id: 'todo', title: 'To Do' },
        { id: 'inprogress', title: 'In Progress' },
        { id: 'testing', title: 'Testing' }, // 👈 Ny kolonne
        { id: 'done', title: 'Done' }
    ]

    const cards = ref<Record<string, Card[]>>({
        todo: [
            { id: 1, title: 'Lave kaffe', description: 'Det skal vi først' },
        ],
        inprogress: [
            { id: 2, title: 'Kode Vue app', description: 'Work in progress' },
        ],
        testing: [
            { id: 4, title: 'Manuel test', description: 'Test af funktioner og UI' },
        ],
        done: [
            { id: 3, title: 'Installere Vuetify', description: 'Done' },
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

    function editCard(columnId: string, cardId: number, newTitle: string, newDescription: string) {
        const cardList = cards.value[columnId]
        const card = cardList.find(c => c.id === cardId)
        if (card) {
            card.title = newTitle
            card.description = newDescription
        }
    }

    function moveCard(fromColumnId: string, toColumnId: string, card: Card, newIndex: number) {
        // Fjern fra gammel kolonne
        cards.value[fromColumnId] = cards.value[fromColumnId].filter(c => c.id !== card.id)

        // Indsæt i ny kolonne på ny position
        cards.value[toColumnId].splice(newIndex, 0, card)
    }

    return {
        columns,
        cards,
        addCard,
        removeCard,
        editCard,
        moveCard,
    }
}


