import { ParagraphOrHeader, Props as ParagraphOrHeaderProps } from '../atoms/ParagraphOrHeader'
import { cva, VariantProps } from 'class-variance-authority'

const textStyles = cva(
  'relative',
  {variants: {
    intent: {
      primary: '2xl:text-9xl md:text-8xl text-5xl font-extrabold text-headerWhite uppercase bg-gradient-to-r from-[#D17F82] via-[#5A3BF8] to-[#1D1D29] opacity-60',
      secondary: '2xl:text-5xl md:text-4xl text-2xl text-transparent font-extrabold',
      teritary: '2xl:text-4xl text-center font-semibold text-3xl text-dark',
      quaternary: '2xl:text-xl text-center font-bold text-dark',
      quinary: '2xl:text-xl text-center font-medium text-dark',
      italic: '2xl:text-xl text-center font-medium text-dark italic',
      button: '2xl:text-2xl text-xl text-white font-medium pl-6 2xl:w-[210.05px] md:w-[179.05px]',
      card: 'text-md bg-gradient-to-r from-goldShadow via-gold to-goldShadow font-mono font-extrabold uppercase w-[25rem] text-center py-2',
      watermark: 'text-md bg-gradient-to-r from-goldShadow via-gold to-goldShadow font-mono font-extrabold uppercase',
      address: 'text-xl text-white font-medium text-left',
      }
    },
    defaultVariants: {
      intent: 'teritary'
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