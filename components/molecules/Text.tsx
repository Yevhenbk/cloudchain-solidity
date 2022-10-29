import { ParagraphOrHeader, Props as ParagraphOrHeaderProps } from '../atoms/ParagraphOrHeader'
import { cva, VariantProps } from 'class-variance-authority'

const textStyles = cva(
    'block',
    {variants: {
    intent: {
        primary: '2xl:text-9xl text-8xl font-extrabold text-headerWhite uppercase bg-gradient-to-r from-[#D17F82] via-[#5A3BF8] to-[#1D1D29] opacity-60',
        secondary: '2xl:text-5xl text-4xl text-transparent font-extrabold',
        teritary: '2xl:text-4xl text-center font-semibold text-3xl text-dark',
        quaternary: 'text-center font-bold text-dark',
        quinary: 'text-center font-medium text-dark',
        italic: 'text-center font-medium text-dark italic',
        button: 'text-xl text-white font-medium pl-6',
        card: 'text-2xl text-white font-medium'
      }
    },
    defaultVariants: {
        intent: 'teritary'
    }}
)

export interface Props
    extends ParagraphOrHeaderProps,
        VariantProps<typeof textStyles> {}

export function Text({ intent, ...props }: Props) {
  return (
    <ParagraphOrHeader className={textStyles({intent})} {...props} />
  )
}