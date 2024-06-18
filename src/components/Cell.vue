<script setup lang="ts">
import {computed, ref} from "vue";
import FlagIcon from '@/assets/flag.svg'

const props = defineProps<{
    onClick:  (i: number, j: number) => void
    value: number
    hidden: boolean
    x: number
    y: number
}>()

const isFlagged = ref(false);
const handleRightClick = (event: Event) => {
    event.preventDefault();
    isFlagged.value = !isFlagged.value;
};

const handleLeftClick = () => {
    if (!isFlagged.value) {
        props.onClick(props.x, props.y);
    }
}

const displayValue = computed(() => {
    if (props.value === 0) {
        return "";
    }
    return props.value;
});

const valueColor = computed(() => {
    switch (props.value) {
        case 1:
            return "blue";
        case 2:
            return "green";
        case 3:
            return "red";
        case 4:
            return "purple";
        case 5:
            return "maroon";
        case 6:
            return "turquoise";
        case 7:
            return "black";
        case 8:
            return "grey";
        default:
            return "black";
    }
});
</script>

<template>
<td class="cell">
    <button v-if="hidden" :class="{flagged: isFlagged}" @click="handleLeftClick" @contextmenu.prevent="handleRightClick($event)">
        <FlagIcon v-if="isFlagged" class="flag" width="20" height="20"></FlagIcon>
    </button>
    <span v-else class="value" :style="{color: valueColor}">{{ displayValue }}</span>
</td>
</template>

<style scoped lang="scss">
.cell {
    width: 35px;
    height: 35px;
    padding: 0;
    border: 1px solid black;
    text-align: center;
    vertical-align: middle;

    button {
        width: 100%;
        height: 100%;
        background-color: grey;
        margin: 0;
        border-radius: 0;
        border: none;
        padding: 0;

        &.flagged {
            background-color: red;
        }
    }
}

.flag {
    vertical-align: middle;
    stroke-width: 1;
    stroke: #0f0f0f;
}

.value {
    font-weight: bold;
    font-size: 18px;
    line-height: 1;
}

</style>