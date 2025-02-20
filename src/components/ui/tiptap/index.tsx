"use client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Typography from "@tiptap/extension-typography";
import TextStyle from "@tiptap/extension-text-style";
import Placeholder from "@tiptap/extension-placeholder";
import { Toolbar } from "./toolbar";

export interface TiptapProps {
  description: string;
  onChange: (richText: string) => void;
  placeholder?: string;
}

export function Tiptap({ description, onChange, placeholder }: TiptapProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class:
            "text-primary underline underline-offset-[3px] hover:text-primary/80",
        },
      }),
      Typography,
      TextStyle,
      Placeholder.configure({
        placeholder: placeholder || "Commencez à écrire votre description...",
      }),
    ],
    content: description,
    editorProps: {
      attributes: {
        class:
          "prose prose-stone dark:prose-invert prose-sm sm:prose-base max-w-none focus:outline-none min-h-[150px] px-3 py-2",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    // Fix for SSR hydration mismatch
    enableInputRules: false,
    enablePasteRules: false,
    immediatelyRender: false,
  });

  return (
    <div className="flex flex-col gap-4 w-full">
      <Toolbar editor={editor} />
      <div className="border rounded-lg">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
