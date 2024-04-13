<script setup lang="ts">
import type { CreateEditorArgs } from 'lexical'
import { LexicalComposer } from 'lexical-vue'
import Editor from './Editor.vue'
import PlaygroundEditorTheme from './themes/PlaygroundEditorTheme'
import PlaygroundNodes from './nodes/PlaygroundNodes'

const emit = defineEmits(['change'])

const config: CreateEditorArgs = {
  theme: PlaygroundEditorTheme,
  nodes: [
    ...PlaygroundNodes,
  ],
  editable: true,
}

function onError(error: Error) {
  throw error
}

function onChange(editorState) {
  emit('change', editorState)
}
</script>

<template>
  <LexicalComposer :initial-config="config" @error="onError">
    <div class="editor-shell">
      <Editor @change="onChange" />
    </div>
  </LexicalComposer>
</template>
