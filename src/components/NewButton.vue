<template>
    <Button :label="label" class="new-button" @click="onClick">{{
        label
    }}</Button>
</template>

<script setup>
import Button from 'primevue/button';

const props = defineProps({
    label: {
        type: String,
        default: ' New'
    }
});

const emit = defineEmits(['click']);

function onClick() {
    try {
        emit('click');
    } catch (error) {
        console.error('Error in NewButton onClick:', error);
    }
}
</script>

<style scoped>
.new-button::before {
    content: '+';
    margin-right: 7px;
    font-size: 23px;
    font-weight: normal;
    display: inline-block;
}
</style>
