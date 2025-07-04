
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  Text,
  useClipboard,
  Flex,
  IconButton,
} from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons';

const CongratulationsModal = ({ isOpen, onClose, email, password }) => {
  const { onCopy: copyEmail, hasCopied: emailCopied } = useClipboard(email);
  const { onCopy: copyPassword, hasCopied: passwordCopied } = useClipboard(password);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md" motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent borderRadius="xl" p={6}>
        <ModalHeader textAlign="center" fontSize="2xl" fontWeight="bold" color="teal.500">
          🎉 Registration Successful!
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Text textAlign="center" mb={4}>
            Welcome to <strong>MagicAutoPool</strong>. Here are your login credentials:
          </Text>

          <Box
            bg="gray.50"
            p={4}
            borderRadius="lg"
            border="1px solid"
            borderColor="gray.200"
            mb={4}
          >
            <Flex justify="space-between" align="center" mb={2}>
              <Text fontWeight="medium">📧 Email:</Text>
              <Flex align="center" gap={2}>
                <Text fontSize="sm" color="gray.700">{email}</Text>
                <IconButton
                  size="sm"
                  icon={<CopyIcon />}
                  onClick={copyEmail}
                  aria-label="Copy Email"
                  variant="ghost"
                />
              </Flex>
            </Flex>

            <Flex justify="space-between" align="center">
              <Text fontWeight="medium">🔑 Password:</Text>
              <Flex align="center" gap={2}>
                <Text fontSize="sm" color="gray.700">{password}</Text>
                <IconButton
                  size="sm"
                  icon={<CopyIcon />}
                  onClick={copyPassword}
                  aria-label="Copy Password"
                  variant="ghost"
                />
              </Flex>
            </Flex>
          </Box>

          <Text fontSize="sm" textAlign="center" color="gray.500">
            Please keep this information safe.
          </Text>
        </ModalBody>

        <ModalFooter justifyContent="center">
          <Button colorScheme="teal" onClick={onClose} px={6}>
            Continue
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CongratulationsModal;

