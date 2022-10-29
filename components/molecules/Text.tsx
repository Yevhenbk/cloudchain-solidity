import { ParagraphOrHeader, Props as ParagraphOrHeaderProps } from '../atoms/ParagraphOrHeader'
import { cva, VariantProps } from 'class-variance-authority'

const textStyles = cva(
    'block',
    {
        variants: {
        intent: {
            h1: 'text-8xl font-extrabold text-headerWhite uppercase bg-gradient-to-r from-[#D17F82] via-[#5A3BF8] to-[#1D1D29] opacity-60',
            h2: 'text-4xl text-transparent font-extrabold',
            p: 'text-center font-semibold text-3xl text-dark',
            primary: 'text-xl text-white font-medium pl-6',
            card: 'text-2xl text-white font-medium'
        }
        },
        defaultVariants: {
            intent: 'p'
        }
    }
)

export interface Props
    extends ParagraphOrHeaderProps,
        VariantProps<typeof textStyles> {}

export function Text({ intent, ...props }: Props) {
  return (
    <ParagraphOrHeader className={textStyles({intent})} {...props} />
  )
}