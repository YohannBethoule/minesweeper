<script setup lang="ts">
import Cell from "./Cell.vue";
import Grid from "../model/Grid";
import {ref} from "vue";

const props = defineProps<{
    columns: number
    rows: number
    minesCount: number
}>()

const clickCount = ref(0);
const grid = ref(new Grid(props.columns, props.rows, props.minesCount));

const handleCellClick = (x: number, y: number) => {
    if (clickCount.value === 0) {
        grid.value.initGrid(x, y);
    }
    if (!grid.value.revealCell(x, y)) {
        alert("Game Over");
    }
    clickCount.value++;
}
</script>

<template>
<table class="grid">
    <tr v-for="y of props.rows" :key="y">
        <Cell v-for="x of props.columns" :key="x"  :hidden="grid.grid[x-1]?.[y-1]?.hidden" :on-click="handleCellClick" :x="x-1" :y="y-1" :value="grid.grid[x-1]?.[y-1]?.value"/>
    </tr>
</table>
</template>

<style scoped>
.grid {
    border-collapse: collapse;
}
</style>