import antfu from '@antfu/eslint-config'
import pluginTailwind from 'eslint-plugin-tailwindcss'

export default antfu({
  typescript: {
    filesTypeAware: [
      '**\/*.{ts,tsx}',
      '**\/*.config.{ts,js}',
    ],
  },
  vue: false,
  stylistic: {
    overrides: {
      'style/jsx-self-closing-comp': 'error'
    }
  },
  react: {
    overrides: {
      'react/destructuring-assignment': 'off', // Vscode doesn't support automatically destructuring, it's a pain to add a new variable
      'react/require-default-props': 'off', // Allow non-defined react props as undefined,
      'react-refresh/only-export-components': 'off',
    },
  },
}, {
  name: 'tailwindcss',
  files: ['**/*.ts', '**/*.tsx', '**/*.jsx'],
  plugins: {
    tailwindcss: pluginTailwind,
  },
  rules: {
    ...pluginTailwind.configs.recommended.rules,
    'tailwindcss/classnames-order': [
      'warn',
      {
        officialSorting: true,
      },
    ], // Follow the same ordering as the official plugin `prettier-plugin-tailwindcss`
    'tailwindcss/no-custom-classname': 'off',
  },
})
