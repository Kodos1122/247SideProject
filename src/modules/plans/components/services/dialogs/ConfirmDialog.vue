<template>
    <ConfirmDialog />
</template>

<script setup>
import { useConfirm } from 'primevue/useconfirm';

const props = defineProps({
    message: { type: String, default: 'Are you sure you want to proceed?' },
    header: { type: String, default: 'Confirmation' },
    acceptClass: { type: String, default: 'p-button-success' },
    rejectClass: { type: String, default: 'p-button-outlined' }
});

const emit = defineEmits(['confirm', 'cancel']);
const confirm = useConfirm();
let dialogOpen = false;

function openConfirmDialog() {
    if (dialogOpen) return;

    dialogOpen = true;

    confirm.require({
        message: props.message,
        header: props.header,
        icon: 'pi pi-exclamation-triangle',
        acceptClass: props.acceptClass,
        rejectClass: props.rejectClass,
        accept: () => {
            emit('confirm');
            dialogOpen = false;
        },
        reject: () => {
            emit('cancel');
            dialogOpen = false;
        }
    });
}

defineExpose({
    openConfirmDialog
});
</script>

<style scoped></style>
