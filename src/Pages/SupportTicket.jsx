import React, { useState, useEffect, useRef } from 'react';
import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    VStack,
    HStack,
    Text,
    Heading,
    useColorModeValue,
    useToast,
    Card,
    CardBody,
    CardHeader,
    Badge,
    Flex,
    IconButton,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormErrorMessage,
    Stack,
    Divider,
    Avatar,
    SimpleGrid,
    Spinner,
    Image,

    useBreakpointValue,
} from '@chakra-ui/react';
import { 
    FiPlus, 
    FiPaperclip, 
    FiSend, 
    FiEye, 
    FiTrash2, 
    FiMessageSquare,
    FiClock,
    FiUser,
    FiMail,
    FiRefreshCw
} from 'react-icons/fi';
import { useOther } from '../Context';

const SupportTicket = () => {
    const {
        supportTickets,
        currentTicket,
        isLoading,
        isSubmitting,
        error,
        getSupportTickets,
        getSupportTicket,
        createSupportTicket,
        clearError
    } = useOther();

    const toast = useToast();
    const fileInputRef = useRef(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isViewOpen, onOpen: onViewOpen, onClose: onViewClose } = useDisclosure();

    // Form states
    const [ticketForm, setTicketForm] = useState({
        subject: '',
        message: '',
        attachment: null
    });
    const [errors, setErrors] = useState({});
    const [attachmentPreview, setAttachmentPreview] = useState(null);
    const [selectedTicket, setSelectedTicket] = useState(null);

    // Responsive values
    const cardMaxWidth = useBreakpointValue({ base: '100%', md: '800px' });
    const columns = useBreakpointValue({ base: 1, md: 2, lg: 3 });
    const spacing = useBreakpointValue({ base: 4, md: 6 });

    // Color mode values
    const bgColor = useColorModeValue('gray.50', 'gray.900');
    const cardBg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.600');
    const textColor = useColorModeValue('gray.700', 'gray.200');
    const brandColor = useColorModeValue('#4c7d4e', '#4c7d4e');
    const mutedColor = useColorModeValue('gray.500', 'gray.400');

    // Load tickets on mount
    useEffect(() => {
        getSupportTickets();
    }, []);

    // Clear errors when they exist
    useEffect(() => {
        if (error) {
            toast({
                title: 'Error',
                description: error,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            clearError();
        }
    }, [error, toast, clearError]);

    // Handle input changes
    const handleInputChange = (field, value) => {
        setTicketForm(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    // Handle file attachment
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Validate file size (5MB limit)
            if (file.size > 5 * 1024 * 1024) {
                toast({
                    title: 'File Too Large',
                    description: 'Please select a file smaller than 5MB',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
                return;
            }

            // Validate file type
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'text/plain'];
            if (!allowedTypes.includes(file.type)) {
                toast({
                    title: 'Invalid File Type',
                    description: 'Please select an image, PDF, or text file',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
                return;
            }

            setTicketForm(prev => ({ ...prev, attachment: file }));

            // Create preview for images
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => setAttachmentPreview(e.target.result);
                reader.readAsDataURL(file);
            } else {
                setAttachmentPreview(null);
            }
        }
    };

    // Remove attachment
    const removeAttachment = () => {
        setTicketForm(prev => ({ ...prev, attachment: null }));
        setAttachmentPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};

        if (!ticketForm.subject.trim()) {
            newErrors.subject = 'Subject is required';
        } else if (ticketForm.subject.trim().length < 5) {
            newErrors.subject = 'Subject must be at least 5 characters';
        }

        if (!ticketForm.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (ticketForm.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        const result = await createSupportTicket(ticketForm);
        
        if (result.success) {
            toast({
                title: 'Support Ticket Created!',
                description: 'Your support ticket has been submitted successfully. We will get back to you soon.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });

            // Reset form
            setTicketForm({
                subject: '',
                message: '',
                attachment: null
            });
            setAttachmentPreview(null);
            setErrors({});
            onClose();
            
            // Refresh tickets list
            getSupportTickets();
        }
    };

    // Handle view ticket
    const handleViewTicket = async (ticket) => {
        setSelectedTicket(ticket);
        onViewOpen();
    };

    // Get status color
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'open':
            case 'pending':
                return 'yellow';
            case 'in_progress':
            case 'processing':
                return 'blue';
            case 'resolved':
            case 'closed':
                return 'green';
            case 'cancelled':
                return 'red';
            default:
                return 'gray';
        }
    };

    // Format date
    const formatDate = (dateString) => {
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch {
            return 'Invalid Date';
        }
    };

    return (
        <Box minH="100vh" bg={bgColor} py={8}>
            <Container maxW="container.xl">
                {/* Header */}
                <Flex justify="space-between" align="center" mb={8}>
                    <VStack align="start" spacing={1}>
                        <Heading size="lg" color={textColor}>
                            Support Tickets
                        </Heading>
                        <Text color={mutedColor}>
                            Get help with any issues you're experiencing
                        </Text>
                    </VStack>
                    <HStack spacing={3}>
                        <IconButton
                            icon={<FiRefreshCw />}
                            onClick={getSupportTickets}
                            isLoading={isLoading}
                            variant="outline"
                            colorScheme="blue"
                            aria-label="Refresh tickets"
                        />
                        <Button
                            leftIcon={<FiPlus />}
                            onClick={onOpen}
                            bg={brandColor}
                            color="white"
                            _hover={{ bg: 'blue.600' }}
                            size="md"
                        >
                            New Ticket
                        </Button>
                    </HStack>
                </Flex>

                {/* Tickets Grid */}
                {isLoading ? (
                    <Flex justify="center" align="center" minH="200px">
                        <VStack spacing={4}>
                            <Spinner size="xl" color={brandColor} thickness="4px" />
                            <Text color={mutedColor}>Loading support tickets...</Text>
                        </VStack>
                    </Flex>
                ) : supportTickets.length === 0 ? (
                    <Card bg={cardBg} borderColor={borderColor}>
                        <CardBody>
                            <VStack spacing={4} py={8}>
                                <FiMessageSquare size={48} color={mutedColor} />
                                <VStack spacing={2}>
                                    <Text fontSize="lg" fontWeight="semibold" color={textColor}>
                                        No Support Tickets Yet
                                    </Text>
                                    <Text color={mutedColor} textAlign="center">
                                        You haven't created any support tickets. Click "New Ticket" to get started.
                                    </Text>
                                </VStack>
                                <Button
                                    leftIcon={<FiPlus />}
                                    onClick={onOpen}
                                    bg={brandColor}
                                    color="white"
                                    _hover={{ bg: 'blue.600' }}
                                >
                                    Create First Ticket
                                </Button>
                            </VStack>
                        </CardBody>
                    </Card>
                ) : (
                    <SimpleGrid columns={columns} spacing={spacing}>
                        {supportTickets.map((ticket) => (
                            <Card 
                                key={ticket.id} 
                                bg={cardBg} 
                                borderColor={borderColor}
                                _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
                                transition="all 0.2s"
                                cursor="pointer"
                                onClick={() => handleViewTicket(ticket)}
                            >
                                <CardHeader pb={2}>
                                    <Flex justify="space-between" align="start">
                                        <VStack align="start" spacing={1} flex={1}>
                                            <Text 
                                                fontWeight="semibold" 
                                                color={textColor}
                                                noOfLines={1}
                                                fontSize="md"
                                            >
                                                {ticket.subject}
                                            </Text>
                                            <HStack spacing={2}>
                                                <Badge 
                                                    colorScheme={getStatusColor(ticket.status)}
                                                    size="sm"
                                                    textTransform="capitalize"
                                                >
                                                    {ticket.status || 'Pending'}
                                                </Badge>
                                                <Box fontSize="xs" color={mutedColor}>
                                                    #{ticket.id}
                                                </Box>
                                            </HStack>
                                        </VStack>
                                    </Flex>
                                </CardHeader>
                                <CardBody pt={0}>
                                    <VStack align="start" spacing={3}>
                                        <Text 
                                            color={mutedColor} 
                                            fontSize="sm" 
                                            noOfLines={3}
                                        >
                                            {ticket.message}
                                        </Text>
                                        
                                        <Divider />
                                        
                                        <HStack justify="space-between" w="full">
                                            <HStack spacing={2}>
                                                <FiClock size={14} color={mutedColor} />
                                                <Box fontSize="xs" color={mutedColor}>
                                                    {formatDate(ticket.created_at)}
                                                </Box>
                                            </HStack>
                                            <IconButton
                                                icon={<FiEye />}
                                                size="sm"
                                                variant="ghost"
                                                colorScheme="blue"
                                                aria-label="View ticket"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleViewTicket(ticket);
                                                }}
                                            />
                                        </HStack>
                                    </VStack>
                                </CardBody>
                            </Card>
                        ))}
                    </SimpleGrid>
                )}

                {/* Create Ticket Modal */}
                <Modal isOpen={isOpen} onClose={onClose} size="lg">
                    <ModalOverlay />
                    <ModalContent mx={4}>
                        <form onSubmit={handleSubmit}>
                            <ModalHeader>
                                <HStack>
                                    <FiMessageSquare />
                                    <Box fontSize={'16px'} fontWeight={600} color={'gray.500'} >Create Support Ticket</Box>
                                </HStack>
                            </ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <VStack spacing={4}>
                                    <FormControl isInvalid={errors.subject}>
                                        <FormLabel>Subject *</FormLabel>
                                        <Input
                                            placeholder="Brief description of your issue"
                                            value={ticketForm.subject}
                                            onChange={(e) => handleInputChange('subject', e.target.value)}
                                            bg={useColorModeValue('gray.50', 'gray.700')}
                                        />
                                        <FormErrorMessage>{errors.subject}</FormErrorMessage>
                                    </FormControl>

                                    <FormControl isInvalid={errors.message}>
                                        <FormLabel>Message *</FormLabel>
                                        <Textarea
                                            placeholder="Provide detailed information about your issue"
                                            value={ticketForm.message}
                                            onChange={(e) => handleInputChange('message', e.target.value)}
                                            rows={6}
                                            bg={useColorModeValue('gray.50', 'gray.700')}
                                            resize="vertical"
                                        />
                                        <FormErrorMessage>{errors.message}</FormErrorMessage>
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>Attachment (Optional)</FormLabel>
                                        <VStack spacing={3} align="stretch">
                                            <HStack>
                                                <Input
                                                    type="file"
                                                    ref={fileInputRef}
                                                    onChange={handleFileChange}
                                                    accept="image/*,.pdf,.txt"
                                                    display="none"
                                                />
                                                <Button
                                                    leftIcon={<FiPaperclip />}
                                                    onClick={() => fileInputRef.current?.click()}
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    Choose File
                                                </Button>
                                                {ticketForm.attachment && (
                                                    <IconButton
                                                        icon={<FiTrash2 />}
                                                        onClick={removeAttachment}
                                                        variant="ghost"
                                                        colorScheme="red"
                                                        size="sm"
                                                        aria-label="Remove attachment"
                                                    />
                                                )}
                                            </HStack>
                                            
                                            {ticketForm.attachment && (
                                                <Box 
                                                    p={3} 
                                                    bg={useColorModeValue('gray.100', 'gray.600')} 
                                                    borderRadius="md"
                                                >
                                                    <HStack>
                                                        <FiPaperclip />
                                                        <VStack align="start" spacing={0}>
                                                            <Text fontSize="sm" fontWeight="medium">
                                                                {ticketForm.attachment.name}
                                                            </Text>
                                                            <Text fontSize="xs" color={mutedColor}>
                                                                {(ticketForm.attachment.size / 1024 / 1024).toFixed(2)} MB
                                                            </Text>
                                                        </VStack>
                                                    </HStack>
                                                    {attachmentPreview && (
                                                        <Image
                                                            src={attachmentPreview}
                                                            maxH="150px"
                                                            mt={2}
                                                            borderRadius="md"
                                                            objectFit="cover"
                                                        />
                                                    )}
                                                </Box>
                                            )}
                                        </VStack>
                                        <Text fontSize="xs" color={mutedColor} mt={1}>
                                            Supported formats: Images, PDF, Text files (Max: 5MB)
                                        </Text>
                                    </FormControl>
                                </VStack>
                            </ModalBody>

                            <ModalFooter>
                                <Button variant="ghost" mr={3} onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    bg={brandColor}
                                    color="white"
                                    _hover={{ bg: 'blue.600' }}
                                    isLoading={isSubmitting}
                                    loadingText="Creating..."
                                    leftIcon={<FiSend />}
                                >
                                    Create Ticket
                                </Button>
                            </ModalFooter>
                        </form>
                    </ModalContent>
                </Modal>

                {/* View Ticket Modal */}
                <Modal isOpen={isViewOpen} onClose={onViewClose} size="lg">
                    <ModalOverlay />
                    <ModalContent mx={4}>
                        <ModalHeader>
                            <HStack>
                                <FiEye />
                                <Box fontSize={'16px'} fontWeight={700} color={'gray.500'}>Ticket Details</Box>
                            </HStack>
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            {selectedTicket && (
                                <VStack spacing={4} align="stretch">
                                    <Flex justify="space-between" align="center">
                                        <Text fontSize="lg" fontWeight="bold">
                                            {selectedTicket.subject}
                                        </Text>
                                        <Badge 
                                            colorScheme={getStatusColor(selectedTicket.status)}
                                            textTransform="capitalize"
                                        >
                                            {selectedTicket.status || 'Pending'}
                                        </Badge>
                                    </Flex>

                                    <HStack spacing={4} color={mutedColor} fontSize="sm">
                                        <HStack>
                                            <Box fontWeight="medium">Ticket ID:</Box>
                                            <Box>#{selectedTicket.id}</Box>
                                        </HStack>
                                        <HStack>
                                            <FiClock />
                                            <Box>{formatDate(selectedTicket.created_at)}</Box>
                                        </HStack>
                                    </HStack>

                                    <Divider />

                                    <Box>
                                        <Text fontWeight="semibold" mb={2}>Message:</Text>
                                        <Textarea 
                                            color={textColor} 
                                            whiteSpace="pre-wrap"
                                            bg={useColorModeValue('gray.50', 'gray.700')}
                                        
                                            borderRadius="md"
                                            value={selectedTicket.description}
                                            readOnly
                                            fontWeight={600}
                                        >
                                            {/* {selectedTicket?.description} */}
                                        </Textarea>
                                    </Box>

                                    {selectedTicket.attachment && (
                                        <Box>
                                            <Text fontWeight="semibold" mb={2}>Attachment:</Text>
                                            <HStack 
                                                p={3} 
                                                bg={useColorModeValue('gray.100', 'gray.600')} 
                                                borderRadius="md"
                                            >
                                                <FiPaperclip />
                                                <Text fontSize="sm">
                                                    {selectedTicket.attachment}
                                                </Text>
                                            </HStack>
                                        </Box>
                                    )}
                                </VStack>
                            )}
                        </ModalBody>

                        <ModalFooter>
                            <Button onClick={onViewClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Container>
        </Box>
    );
};

export default SupportTicket;