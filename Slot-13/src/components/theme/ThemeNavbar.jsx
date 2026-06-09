import { useTheme } from '../../context/ThemeContext'
import { THEME_MODES } from '../../data/themeConfig'

const buttonLabels = {
  light: 'Sáng',
  dark: 'Tối',
  system: 'Hệ thống',
}

export default function ThemeNavbar() {
  const { mode, resolvedTheme, colors, changeMode } = useTheme()

  return (
    <div
      style={{
        background: colors.surface,
        color: colors.text,
        border: `1px solid ${colors.border}`,
        padding: 16,
        marginBottom: 16,
      }}
    >
      <p>Theme hiện tại: {resolvedTheme}</p>
      <div>
        {THEME_MODES.map((themeMode) => (
          <button
            key={themeMode}
            onClick={() => changeMode(themeMode)}
            style={{
              marginRight: 8,
              background: mode === themeMode ? colors.primary : 'transparent',
              color: mode === themeMode ? colors.primaryText : colors.text,
              border: `1px solid ${colors.primary}`,
            }}
          >
            {buttonLabels[themeMode]}
          </button>
        ))}
      </div>
    </div>
  )
}
