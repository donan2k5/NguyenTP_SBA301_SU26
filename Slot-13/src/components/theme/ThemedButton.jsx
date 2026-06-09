import { useTheme } from '../../context/ThemeContext'

export default function ThemedButton({ children, onClick, variant = 'primary' }) {
  const { colors } = useTheme()
  const isPrimary = variant === 'primary'

  return (
    <button
      onClick={onClick}
      style={{
        background: isPrimary ? colors.primary : 'transparent',
        color: isPrimary ? colors.primaryText : colors.primary,
        border: `1px solid ${colors.primary}`,
        padding: '8px 12px',
        borderRadius: 8,
      }}
    >
      {children}
    </button>
  )
}
