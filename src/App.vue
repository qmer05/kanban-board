<template>
  <v-container fluid>
    <v-row>
      <KanbanColumn
        v-for="(column, index) in columns"
        :key="column.id"
        :status="column.title"
        :cards="cards[column.id]"
        :isFirst="index === 0"
        :id="column.id"
      />
    </v-row>
    <v-row class="mt-10">
      <AddCardForm :columns="columns" @add="addCard" />
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { provide } from 'vue'
import { useKanban } from './composables/useKanban'
import KanbanColumn from './components/KanbanColumn.vue'
import AddCardForm from './components/AddCardForm.vue'

const { columns, cards, addCard, removeCard } = useKanban()

provide('addCard', addCard)
provide('removeCard', removeCard)

</script>