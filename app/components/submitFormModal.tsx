import { Text, Spinner, Center, Image, VStack, Modal, ModalCloseButton, ModalHeader, ModalOverlay, ModalBody, ModalContent, useDisclosure } from '@chakra-ui/react';

interface SubmitFormModalProps {
    isOpen: boolean
    onClose: () => void
}

const SubmitFormModal: React.FC<SubmitFormModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay style={{ backdropFilter: 'blur(5px)' }} />
            <ModalBody>
                <ModalContent>
                    <ModalHeader>
                        <Text> Yo</Text>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <Text>
                            SlutCrusher like it Big
                        </Text>
                    </ModalBody>

                </ModalContent>
            </ModalBody>
        </Modal>
    )
}

export default SubmitFormModal
