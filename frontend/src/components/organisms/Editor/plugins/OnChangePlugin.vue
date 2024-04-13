<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useLexicalComposer } from 'lexical-vue'

const emit = defineEmits(['change'])
const editor = useLexicalComposer()

onMounted(() => {
  const unregister = editor.registerUpdateListener(({ editorState }) => {
    emit('change', editorState)
  })

  onUnmounted(() => {
    unregister()
  })
})
</script>

<template />