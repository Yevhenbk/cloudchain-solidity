import { ParagraphOrHeader, Props as ParagraphOrHeaderProps } from '../atoms/ParagraphOrHeader'
import { cva, VariantProps } from 'class-variance-authority'

const textStyles = cva(
  'relative',
  {variants: {
    intent: {
      primary: 'font-extrabold uppercase opacity-60',
      secondary: 'font-extrabold',
      teritary: 'font-bold h-4',
      quaternary: '2xl:text-xl text-center font-normal',
      quinary: 'pl-6 2xl:w-[210.05px] md:w-[179.05px] font-medium',
      senary: 'font-small',
      septenary: '2xl:w-[210.05px] md:w-[179.05px] font-medium',
      octonary: 'font-mono font-extrabold uppercase w-[25rem] text-center py-2',
      nonary: 'font-mono font-extrabold uppercase',
      denary: 'font-semibold font-mono',
      doudenary: 'font-semibold m-w-[105.4px] overflow-hidden overflow-x-scroll',
      base: 'font-semibold',
      centered: 'font-semibold text-center',
      label: 'font-extrabold uppercase'
      },
      size: {
        header: ['2xl:text-5xl md:text-4xl text-2xl'],
        extrabig: ['2xl:text-9xl md:text-8xl text-5xl'],
        big: 'text-3xl',
        large: 'text-2xl',
        medium: '2xl:text-2xl text-xl',
        regular: 'text-lg',
        small: 'text-md',
        extrasmall: 'text-sm'
      },
      color: {
        dark: 'text-dark',
        bright: 'text-white',
        yellow: 'bg-yellow text-dark',
        white: 'text-secondary',
        transparent: 'text-transparent',
        gradient: 'bg-gradient-to-r from-peach via-blue to-dark'
      },
      style: {
        regular: 'not-italic',
        italic: 'italic'
      }
    }
  }
)

export interface Props
    extends ParagraphOrHeaderProps,
        VariantProps<typeof textStyles> {}

export function Text({ intent='primary', color='dark', size='medium', style='regular', ...props }: Props) {
  return (
    <ParagraphOrHeader className={textStyles({intent, color, size, style})} {...props} />
  )
}