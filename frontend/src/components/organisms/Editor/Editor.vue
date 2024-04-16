<script setup lang="ts">
import {
  LexicalAutoFocusPlugin,
  LexicalClickableLinkPlugin,
  LexicalHistoryPlugin,
  LexicalLinkPlugin,
  LexicalListPlugin,
  LexicalRichTextPlugin,
  LexicalCheckListPlugin,
} from 'lexical-vue'

import ToolbarPlugin from './plugins/ToolbarPlugin/index.vue'
import ListMaxIndentLevelPlugin from './plugins/ListMaxIndentLevelPlugin.vue'
import AutoLinkPlugin from './plugins/AutoLinkPlugin.vue'
import MarkdownShortcutPlugin from './plugins/MarkdownShortcutPlugin.vue'
import ContentEditable from './plugins/ContentEditable.vue'
import OnChangePlugin from '@/components/organisms/Editor/plugins/OnChangePlugin.vue'

const emit = defineEmits(['change'])

function onChange(editorState) {
  emit('change', editorState.toJSON())
}
</script>

<template>
  <ToolbarPlugin />
  <div class="editor-container border border-input">
    <div className="editor-inner">
      <LexicalRichTextPlugin>
        <template #contentEditable>
          <div class="editor-scroller">
            <div class="editor">
              <ContentEditable />
            </div>
          </div>
        </template>
        <template #placeholder>
          <div
            class="editor-placeholder absolute top-2 left-7 text-white text-opacity-70"
          >
            Enter description of your build...
          </div>
        </template>
      </LexicalRichTextPlugin>
      <OnChangePlugin @change="onChange" />
      <LexicalHistoryPlugin />
      <LexicalAutoFocusPlugin />
      <LexicalListPlugin />
      <LexicalCheckListPlugin />
      <LexicalLinkPlugin />
      <AutoLinkPlugin />
      <ListMaxIndentLevelPlugin :max-depth="7" />
      <MarkdownShortcutPlugin />
      <EmojiPickerPlugin />
      <EmojisPlugin />
      <LexicalClickableLinkPlugin />
    </div>
  </div>
</template>
