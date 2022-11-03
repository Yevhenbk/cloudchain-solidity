import * as React from 'react'
import { Button } from '@molecules/Button'
import { Text } from '@molecules/Text'
import { Input } from '@molecules/Input'
import { Label } from '@molecules/Label'

interface Props {
  onClick: React.MouseEventHandler
}

export function Modal() {
  return (
    <form className='w-[450px] h-[450px] bg-white rounded-2xl shadow-lg shadow-gray-200
    p-8 flex flex-col justify-between'>
      <div className='flex flex-col text-end'>
        <Text id='b-text' isHeader={true} intent='primaryLabel'>Crypto Transfers</Text>
        <div className='relative -top-2'>
          <Text isHeader={true} intent='secondaryLabel'>all under one roof</Text> 
        </div>
      </div>
      <div className='flex flex-col justify-center gap-4'>
        <div className='flex flex-col justify-start gap-1'>
          <Label for='receiver'>Receiver's Address</Label>
          <Input type='text' id='receiver' />
        </div>
        <div className='flex flex-row justify-between'>
          <div className='flex flex-col justify-start gap-1'>
            <Label for='amount'>Amount (ETH)</Label>
            <Input intent='secondary' type='number' id='amount' />
          </div>
          <div className='flex flex-col justify-start gap-1 relative -right-[2.5%]'>
            <Label for='keyword'>Keyword</Label>
            <Input intent='secondary' type='text' id='keyword' />
          </div>
        </div>
        <div className='flex flex-col justify-start gap-1'>
          <Label for='message'>Concept (optional)</Label>
          <Input type='text' id='message' />
        </div>
      </div>
      <div className='flex flex-col items-end'>
        <Button isButton={true} intent='quaternary'>
          <Text isHeader={false} intent='buttonLabel'>Submit</Text>
        </Button>
      </div>
    </form>
  )
}