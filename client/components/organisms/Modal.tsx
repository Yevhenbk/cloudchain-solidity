import * as React from 'react'
import { Button } from '@molecules/Button'
import { Text } from '@molecules/Text'
import { Input } from '@molecules/Input'
import { Label } from '@molecules/Label'
import { Context } from '../../store/context'

interface Data {
  addressTo: string,
  amount: string,
  keyword: string,
  message: string
}

export function Modal() {

  const { formData, sendTransaction, setFormData } = React.useContext(Context)

  const handleSubmit = (e: React.MouseEvent<Element, MouseEvent>) => {
    const { addressTo, amount, keyword, message }: Data = formData

    e.preventDefault()

    if(!addressTo || !amount || !keyword || !message) {
      return console.log('missing props')
    } else {
      sendTransaction()
    }
  }

  return (
    <form className='w-[500px] h-[500px] bg-white border-grey rounded-2xl
    p-8 flex flex-col justify-between shadow-sm'>
      <div className='flex flex-col text-end'>
        <Text id='b-text' isHeader={true} intent='label' color='gradient' size='big'>
          Crypto Transfers
        </Text>
        <div className='relative -top-2'>
          <Text isHeader={true} intent='teritary' size='medium' color='dark'>
            across the world
          </Text> 
        </div>
      </div>
      <div className='flex flex-col justify-center gap-4'>
        <div className='flex flex-col justify-start gap-1'>
          <Label for='receiver'>Receiver&apos;s Address</Label>
          <Input type='text' id='receiver' placeholder='Ex.0x2FA7EA67...8F3G394C98'
          onChange={(e: Event & {
            target: HTMLInputElement
          }) => setFormData({...formData, addressTo: e.target.value})} />
        </div>
        <div className='flex flex-row justify-between'>
          <div className='flex flex-col justify-start gap-1'>
            <Label for='amount'>Amount (ETH)</Label>
            <Input size='small' type='number' id='amount' placeholder='0.00'
            onChange={(e: Event & {
              target: HTMLInputElement
            }) => setFormData({...formData, amount: e.target.value})} />
          </div>
          <div className='flex flex-col justify-start gap-1 relative -right-[2.5%]'>
            <Label for='keyword'>Keyword</Label>
            <Input size='small' type='text' id='keyword' placeholder='Gif name'
            onChange={(e: Event & {
              target: HTMLInputElement
            }) => setFormData({...formData, keyword: e.target.value})} />
          </div>
        </div>
        <div className='flex flex-col justify-start gap-1'>
          <Label for='message'>Concept (optional)</Label>
          <Input type='text' id='message' placeholder='Enter a message...'
          onChange={(e: Event & {
            target: HTMLInputElement
          }) => setFormData({...formData, message: e.target.value})} />
        </div>
      </div>
      <div className='flex flex-col items-end'>
        <Button isButton={true} intent='quaternary'
        onClick={handleSubmit}>
          <Text isHeader={false} intent='senary' size='large' color='bright'>
            Submit
          </Text>
        </Button>
      </div>
    </form>
  )
}