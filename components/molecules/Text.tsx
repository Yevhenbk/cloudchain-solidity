import { ParagraphOrHeader, Props as ParagraphOrHeaderProps } from '../atoms/ParagraphOrHeader'
import { cva, VariantProps } from 'class-variance-authority'

const textStyles = cva(
    'block',
    {
        variants: {
        intent: {
            h1: 'text-6xl font-bold text-headerWhite font-poppins uppercase',
            h2: 'text-4xl text-white font-poppins font-bold',
            p: 'text-left text-2xl text-white font-mono',
            button: 'text-cennter text-xl text-white font-mono font-medium hover:text-backgroundButton px-6 py-2',
            span: 'font-mono text-lg'

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