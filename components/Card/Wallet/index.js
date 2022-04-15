import React, {useEffect} from 'react'
import Button from '../../Button'

import { toast } from 'react-toastify'
import { updateUserWalletInFirestore } from '../../../lib/user';
import { auth } from '../../../firebase/initFirebase';
import { useAddress, useDisconnect, useMetamask, useWalletConnect } from '@thirdweb-dev/react';

export default function WalletCard() {
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();
  const address = useAddress();

  const handleDisconnect = () => {
    disconnectWallet()
    toast.success('Desconectado com sucesso!', toastParameters)
  }
  const toastParameters = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  }

  // verify if user has metamask, if not show a toast, if yes, connect to the wallet

  const handleConnectWallet = () => {
    if (window.ethereum) {
      connectWithMetamask()
        .then(() => {
          toast.success('Conectado com sucesso!', toastParameters)
        })
        .catch((error) => {
          toast.error('Algo deu errado', toastParameters)
        })
    } else {
      toast.error('Por favor instale a Metamask', toastParameters)
    }
  }
  useEffect(() => {
      updateUserWalletInFirestore(address || null, auth.currentUser?.uid);
  }, [address])

  return (
    <>
      {address ? (
        <div className="rounded-lg bg-white-100 shadow-xl dark:bg-black-200">
          <div className="flex">
            <div className="px-6 py-5">
              <p className="text-base font-medium leading-none text-black-200 dark:text-gray-100">
                ✅ Carteira Conectada
              </p>
              <p className="pt-2 text-xs leading-5 text-gray-500 dark:text-gray-400">
                Endereço da carteira: {address}
              </p>
              <div className="pt-4">
                <a className='cursor-pointer' onClick={() => handleDisconnect()}>Desconectar</a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-lg bg-white-100 shadow-xl dark:bg-black-200">
          <div className="flex">
            <div className="px-6 py-5">
              <p className="text-base font-medium leading-none text-black-200 dark:text-gray-100">
                ❌ Conecte sua carteira ETH
              </p>
              <p className="pt-2 text-xs leading-5 text-gray-500 dark:text-gray-400">
                Você ganhará NFTs por completar tarefas! Além disso, você
                precisará de uma carteira para trabalhar com o material do
                projeto.
              </p>
              <div className="pt-4">
                <Button onClick={() => handleConnectWallet()}>
                  Conectar carteira
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
