import { ParagraphOrHeader, Props as ParagraphOrHeaderProps } from '../atoms/ParagraphOrHeader'
import { cva, VariantProps } from 'class-variance-authority'

const textStyles = cva(
  'relative',
  {variants: {
    intent: {
      primary: '2xl:text-9xl md:text-8xl text-5xl font-extrabold text-headerWhite uppercase bg-gradient-to-r from-[#D17F82] via-[#5A3BF8] to-[#1D1D29] opacity-60',
      primaryLabel: 'text-3xl font-extrabold bg-gradient-to-r from-[#D17F82] via-[#5A3BF8] to-[#1D1D29] uppercase bg-dark',
      secondary: '2xl:text-5xl md:text-4xl text-2xl text-transparent font-extrabold',
      secondaryLabel: 'text-2xl text-dark font-bold h-4',
      teritary: '2xl:text-4xl text-center font-semibold text-3xl text-dark',
      quaternary: 'text-xl text-center font-normal text-secondary',
      quinary: '2xl:text-xl text-center font-normal text-secondary',
      italic: '2xl:text-xl text-center font-normal text-secondary italic',
      button: '2xl:text-2xl text-xl text-white font-medium pl-6 2xl:w-[210.05px] md:w-[179.05px]',
      buttonLabel: 'text-2xl text-white font-small',
      buttonCentered: '2xl:text-2xl text-xl text-white font-medium 2xl:w-[210.05px] md:w-[179.05px]',
      card: 'text-md bg-[#E8D96B] font-mono font-extrabold uppercase w-[25rem] text-center py-2',
      watermark: 'text-md bg-[#E8D96B] font-mono font-extrabold uppercase',
      address: 'text-xl text-white font-medium text-left',
      balance: 'font-semibold font-mono text-3xl text-dark',
      transaction: 'text-dark font-semibold text-sm m-w-[105.4px] overflow-hidden overflow-x-scroll',
      order: 'text-xl font-medium text-dark',
      service: 'text-lg font-semibold text-dark',
      serviceLabel: 'text-md font-semibold text-dark',
      balanceCard: 'font-semibold font-mono text-2xl text-dark',
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

export function Text({ intent='primary', ...props }: Props) {
  return (
    <ParagraphOrHeader className={textStyles({intent})} {...props} />
  )
}