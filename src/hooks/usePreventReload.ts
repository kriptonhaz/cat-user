import { useEffect } from "react"

/**
 * Hook to prevent page reload through various methods:
 * - Right-click context menu
 * - F5 key
 * - Ctrl+R / Command+R
 * - Browser reload button (beforeunload event)
 *
 * @param isEnabled Boolean to enable/disable the prevention
 * @param warningMessage Optional custom warning message
 */
const usePreventReload = (isEnabled = true, warningMessage = "Changes you made may not be saved.") => {
  useEffect(() => {
    if (!isEnabled) return

    // Prevent context menu (right-click)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      return false
    }

    // Prevent keyboard shortcuts and F5
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent F5
      if (e.key === "F5") {
        e.preventDefault()
        return false
      }

      // Prevent Ctrl+R or Command+R (reload shortcuts)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "r") {
        e.preventDefault()
        return false
      }
    }

    // Prevent browser reload button
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = warningMessage
      return warningMessage
    }

    // Add event listeners
    window.addEventListener("contextmenu", handleContextMenu)
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("beforeunload", handleBeforeUnload)

    // Clean up event listeners on unmount
    return () => {
      window.removeEventListener("contextmenu", handleContextMenu)
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [isEnabled, warningMessage])
}

export default usePreventReload
