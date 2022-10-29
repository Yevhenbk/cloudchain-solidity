import React from 'react'
import { ParagraphOrHeader, Props as ParagraphOrHeaderProps } from './ParagraphOrHeader'
import { cva, VariantProps } from 'class-variance-authority'

const textStyles = cva(
    'text-left',
    {
        variants: {
        intent: {
            headerMain: 'text-white',
            header: 'text-red-900',
            // paragraph: '',

        }
        },
        defaultVariants: {
            intent: 'header'
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