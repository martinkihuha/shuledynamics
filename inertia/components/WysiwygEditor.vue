<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Heading from '@tiptap/extension-heading'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'
import Link from '@tiptap/extension-link'
import { Icon } from '@iconify/vue'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const props = defineProps<{
  modelValue: String
}>()

const emit = defineEmits(['update:modelValue'])

// Initialize the editor
const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit.configure({ heading: false }),
    Heading.configure({
      levels: [1, 2, 3], // Enable heading levels 1, 2, and 3
    }),
    Underline, // Add underline support
    Placeholder.configure({
      placeholder: 'Enter your text here...',
    }),
    Link.configure({
      openOnClick: true,
      linkOnPaste: true,
      HTMLAttributes: {
        target: '_blank',
        rel: 'noopener noreferrer',
      },
    }),
  ],
  onUpdate: ({ editor }) => {
    const html = editor.getHTML()
    emit('update:modelValue', html)
  },
})

// Dropdown selection for node type
const selectedNode = ref('paragraph')

// Set the node type based on the dropdown selection
const setNodeType = () => {
  if (!editor.value) return

  if (selectedNode.value === 'paragraph') {
    editor.value.chain().focus().setParagraph().run()
  } else if (selectedNode.value === 'heading-1') {
    editor.value.chain().focus().toggleHeading({ level: 1 }).run()
  } else if (selectedNode.value === 'heading-2') {
    editor.value.chain().focus().toggleHeading({ level: 2 }).run()
  } else if (selectedNode.value === 'heading-3') {
    editor.value.chain().focus().toggleHeading({ level: 3 }).run()
  }
}

// Function to handle setting a link
const setLink = () => {
  if (!editor.value) return

  const previousUrl = editor.value.getAttributes('link').href
  const url = window.prompt('URL', previousUrl)

  // cancelled
  if (url === null) {
    return
  }

  // empty
  if (url === '') {
    editor.value.chain().focus().extendMarkRange('link').unsetLink().run()
    return
  }

  // update link
  editor.value.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
}

// Watch for changes in the editor's node type and update the dropdown
watch(
  () => editor.value?.getAttributes('heading')?.level,
  (level) => {
    if (level === 1) {
      selectedNode.value = 'heading-1'
    } else if (level === 2) {
      selectedNode.value = 'heading-2'
    } else if (level === 3) {
      selectedNode.value = 'heading-3'
    } else {
      selectedNode.value = 'paragraph'
    }
  }
)

// Clean up the editor when the component is unmounted
onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy()
  }
})
</script>

<template>
  <Card class="p-0 rounded-none">
    <CardHeader class="px-2 py-1 border-b h-9 bg-muted/50 border-muted-foreground/10">
      <div v-if="editor" class="flex items-center space-x-3">
        <!-- Dropdown for Paragraph and Headings -->
        <select
          v-model="selectedNode"
          @change="setNodeType"
          class="bg-card border border-stone-300 rounded-[2px] text-xs py-1 pr-8"
        >
          <option value="paragraph">Paragraph</option>
          <option value="heading-1">Heading 1</option>
          <option value="heading-2">Heading 2</option>
          <option value="heading-3">Heading 3</option>
        </select>

        <Separator orientation="vertical" class="h-5 mx-2 bg-stone-300" />

        <!-- Bold Button -->

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <button
                type="button"
                @click="editor.chain().focus().toggleBold().run()"
                :class="{ 'is-active': editor.isActive('bold') }"
                class="flex items-center gap-2"
              >
                <span class="px-1 text-lg font-bold">B</span>
                <span class="sr-only">Bold</span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" class="text-xs border bg-card text-stone-300">
              <p>Bolden selected text</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <!-- Italic Button -->
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <button
                type="button"
                @click="editor.chain().focus().toggleItalic().run()"
                :class="{ 'is-active': editor.isActive('italic') }"
                class="flex items-center gap-2"
              >
                <span class="px-1 text-lg font-bold">I</span>
                <span class="sr-only">Italic</span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" class="text-xs border bg-card text-stone-300">
              <p>Italize selected text</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <!-- Underline Button -->
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <button
                type="button"
                @click="editor.chain().focus().toggleUnderline().run()"
                :class="{ 'is-active': editor.isActive('underline') }"
                class="flex items-center gap-2"
              >
                <span class="px-1 text-lg font-bold">U</span>
                <span class="sr-only">Underline</span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" class="text-xs border bg-card text-stone-300">
              <p>Underline selected text</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Separator orientation="vertical" class="h-5 mx-2 bg-stone-300" />

        <!-- Unordered List Button -->
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <button
                type="button"
                @click="editor.chain().focus().toggleBulletList().run()"
                :class="{ 'is-active': editor.isActive('bulletList') }"
                class="flex items-center gap-2"
              >
                <Icon icon="heroicons:list-bullet" class="size-5" />
                <span class="sr-only">Unordered List</span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" class="text-xs border bg-card text-stone-300">
              <p>Convert to a bulleted list</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <!-- Ordered List Button -->
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <button
                type="button"
                @click="editor.chain().focus().toggleOrderedList().run()"
                :class="{ 'is-active': editor.isActive('orderedList') }"
                class="flex items-center gap-2"
              >
                <Icon icon="heroicons:numbered-list" class="size-5" />
                <span class="sr-only">Ordered List</span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" class="text-xs border bg-card text-stone-300">
              <p>Convert to a numbered list</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Separator orientation="vertical" class="h-5 mx-2 bg-stone-300" />

        <!-- Link Button -->
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <button
                type="button"
                @click="setLink"
                :class="{ 'is-active': editor.isActive('link') }"
                class="flex items-center gap-2"
              >
                <Icon icon="heroicons:link" class="size-4" />
                <span class="sr-only">Link</span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" class="text-xs border bg-card text-stone-300">
              <p>Add or edit a link</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <!-- Unlink Button -->
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <button
                type="button"
                @click="editor.chain().focus().unsetLink().run()"
                :disabled="!editor.isActive('link')"
                class="flex items-center gap-2"
              >
                <Icon icon="heroicons:link-slash" class="size-4" />
                <span class="sr-only">Unlink</span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" class="text-xs border bg-card text-stone-300">
              <p>Remove link</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Separator orientation="vertical" class="h-5 mx-2 bg-stone-300" />

        <!-- Add more buttons as needed -->
      </div>
    </CardHeader>

    <CardContent class="gap-0 p-0 prose">
      <editor-content :editor="editor" class="w-full px-3 pt-1 text-xs text-justify min-h-6" />
    </CardContent>
  </Card>
</template>
