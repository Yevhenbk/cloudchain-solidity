import * as React from 'react'
import { Button } from '@molecules/Button'
import { Text } from '@molecules/Text'
import { Input } from '@molecules/Input'
import { Label } from '@molecules/Label'
import { Context } from '../../store/context'

interface Props {
  onClick: React.MouseEventHandler
}

interface Data {
  address: string,
  amount: string,
  keyword: string,
  message: string
}

export function Modal() {

  const { formData, sendTransaction, setFormData } = React.useContext(Context)

  const handleSubmit = (e: React.MouseEvent<Element, MouseEvent>) => {
    const { address, amount, keyword, message }: Data = formData

    e.preventDefault()

    console.log(formData)

    if(!address || !amount || !keyword || !message) {
      return console.log('missing props')
    } else {
      sendTransaction()
    }
  }

  return (
    <form className='w-[450px] h-[450px] bg-white rounded-2xl shadow-lg shadow-gray-200
    p-8 flex flex-col justify-between'>
      <div className='flex flex-col text-end'>
        <Text id='b-text' isHeader={true} intent='primaryLabel'>Crypto Transfers</Text>
        <div className='relative -top-2'>
          <Text isHeader={true} intent='secondaryLabel'>across the world</Text> 
        </div>
      </div>
      <div className='flex flex-col justify-center gap-4'>
        <div className='flex flex-col justify-start gap-1'>
          <Label for='receiver'>Receiver's Address</Label>
          <Input type='text' id='receiver' name='address' placeholder='Ex.0X2FA7EA67...8F3G394C98'
          onChange={(e: Event & {
            target: HTMLInputElement
          }) => setFormData({...formData, address: e.target.value})} />
        </div>
        <div className='flex flex-row justify-between'>
          <div className='flex flex-col justify-start gap-1'>
            <Label for='amount'>Amount (ETH)</Label>
            <Input intent='secondary' type='number' id='amount' name='amount' placeholder='0.00'
            onChange={(e: Event & {
              target: HTMLInputElement
            }) => setFormData({...formData, amount: e.target.value})} />
          </div>
          <div className='flex flex-col justify-start gap-1 relative -right-[2.5%]'>
            <Label for='keyword'>Keyword</Label>
            <Input intent='secondary' type='text' id='keyword' name='keyword' placeholder='Gif name'
            onChange={(e: Event & {
              target: HTMLInputElement
            }) => setFormData({...formData, keyword: e.target.value})} />
          </div>
        </div>
        <div className='flex flex-col justify-start gap-1'>
          <Label for='message'>Concept (optional)</Label>
          <Input type='text' id='message' name='message' placeholder='Enter a message...'
          onChange={(e: Event & {
            target: HTMLInputElement
          }) => setFormData({...formData, message: e.target.value})} />
        </div>
      </div>
      <div className='flex flex-col items-end'>
        <Button isButton={true} intent='quaternary'
        onClick={handleSubmit}>
          <Text isHeader={false} intent='buttonLabel'>Submit</Text>
        </Button>
      </div>
    </form>
  )
}