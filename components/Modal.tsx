"use client";

import Image from "next/image";
import { FormEvent, Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { addUserEmailToProduct } from "@/lib/actions";

type ModalProps = {
  productId: string;
};

function Modal({ productId }: ModalProps) {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [userEmailInput, setUserEmailInput] = useState<string>("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);

    await addUserEmailToProduct(productId, userEmailInput);

    setSubmitting(false);
    setIsOpen(false);
    setUserEmailInput("");
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button type='button' onClick={openModal} className='btn'>
        Track
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='dialog-container' onClose={closeModal}>
          <div className='min-h-screen px-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0' />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className='inline-block h-screen align-middle'
              aria-hidden='true'
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <div className='dialog-content'>
                <div className='flex flex-col'>
                  <div className='flex justify-between'>
                    <div className='p-3 border border-gray-200 rounded-10'>
                      <Image
                        src='/assets/icons/logo.svg'
                        alt='logo'
                        width={28}
                        height={28}
                      />
                    </div>

                    <Image
                      src='/assets/icons/x-close.svg'
                      alt='Close'
                      width={24}
                      height={24}
                      className='cursor-pointer'
                      onClick={closeModal}
                    />
                  </div>

                  <h4 className='dialog-head_text'>
                    Stay updated with product pricing alerts right in your
                    inbox!
                  </h4>

                  <p className='text-sm text-gray-600 mt-2'>
                    Never miss a bargain again with our timely alerts!
                  </p>
                </div>

                <form className='flex flex-col mt-5' onSubmit={handleSubmit}>
                  <label
                    htmlFor='email'
                    className='text-sm font-medium text-gray-700'
                  >
                    Email address
                  </label>
                  <div className='dialog-input_container'>
                    <Image
                      src='/assets/icons/mail.svg'
                      alt='mail'
                      width={18}
                      height={18}
                    />

                    <input
                      required
                      type='email'
                      id='email'
                      value={userEmailInput}
                      onChange={(e) => setUserEmailInput(e.target.value)}
                      placeholder='contact@jsmastery.pro'
                      className='dialog-input'
                    />
                  </div>

                  <button
                    type='submit'
                    className={`dialog-btn ${submitting && "opacity-50"}`}
                  >
                    {submitting ? "...Loading" : "Track Product "}
                  </button>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default Modal;
