"use client"

import type React from "react"

import { useState } from "react"
import { Move } from "lucide-react"

interface DraggableWidgetProps {
  id: string
  title?: string
  children: React.ReactNode
  onDrop: (draggedId: string, targetId: string) => void
}

export function DraggableWidget({ id, title, children, onDrop }: DraggableWidgetProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("widgetId", id)
    setIsDragging(true)

    // This is needed for Firefox
    e.dataTransfer.effectAllowed = "move"

    // Create a ghost image (optional)
    const ghostElement = document.createElement("div")
    ghostElement.classList.add("bg-white", "p-4", "rounded", "shadow-md", "opacity-70")
    ghostElement.textContent = title || id
    document.body.appendChild(ghostElement)
    e.dataTransfer.setDragImage(ghostElement, 20, 20)

    // Remove the ghost element after it's no longer needed
    setTimeout(() => {
      document.body.removeChild(ghostElement)
    }, 0)
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const draggedId = e.dataTransfer.getData("widgetId")
    if (draggedId && draggedId !== id) {
      onDrop(draggedId, id)
    }
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`rounded-lg border ${isDragOver ? "border-green-500 bg-green-50" : "border-gray-200"} 
                 ${isDragging ? "opacity-50" : "opacity-100"} 
                 bg-white p-6 shadow-sm transition-all duration-200`}
    >
      {title && (
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <div className="cursor-move text-gray-400 hover:text-gray-600" title="Drag to move">
            <Move size={16} />
          </div>
        </div>
      )}
      {children}
    </div>
  )
}
