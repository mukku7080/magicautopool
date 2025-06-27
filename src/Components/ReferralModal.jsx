import React, { useState, useEffect } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Input,
    InputGroup,
    InputRightElement,
    VStack,
    HStack,
    Text,
    Badge,
    Divider,
    SimpleGrid,
    Icon,
    useToast,
    Image,
    Box,
    IconButton,
    Tooltip,
} from '@chakra-ui/react';
import {
    FiUsers,
    FiCopy,
    FiShare2,
    FiExternalLink,
} from 'react-icons/fi';
import {
    AiOutlineQrcode,
    AiOutlineWhatsApp,
} from 'react-icons/ai';
import {
    FaTelegram,
    FaTwitter,
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaReddit,
} from 'react-icons/fa';
import { useUser } from '../Context/UserContext';

const ReferralModal = ({ isOpen, onClose }) => {
    const [copied, setCopied] = useState(false);
    const [showQR, setShowQR] = useState(false);
    const toast = useToast();
    const { profile, isProfileLoaded } = useUser();

    // Get referral code from profile
    const referralCode = profile?.USER?.my_code || 'LOADING';
    const referralLink = `${window.location.origin}/login?invitecode=${referralCode}`;

    // QR Code URL (using qr-server.com free service)
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(referralLink)}`;

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(referralLink);
            setCopied(true);
            toast({
                title: 'Link Copied!',
                description: 'Referral link has been copied to your clipboard.',
                status: 'success',
                duration: 2000,
                isClosable: true,
                position: 'top',
            });
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = referralLink;
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);

            setCopied(true);
            toast({
                title: 'Link Copied!',
                description: 'Referral link has been copied to your clipboard.',
                status: 'success',
                duration: 2000,
                isClosable: true,
                position: 'top',
            });
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const shareViaMethod = (method) => {
        const message = `Join NessanForex and start earning! Use my referral link: ${referralLink}`;
        const shortMessage = 'Join NessanForex and start earning!';

        switch (method) {
            case 'whatsapp':
                window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
                break;
            case 'telegram':
                window.open(`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(shortMessage)}`, '_blank');
                break;
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`, '_blank');
                break;
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}&quote=${encodeURIComponent(shortMessage)}`, '_blank');
                break;
            case 'instagram':
                // Instagram doesn't support direct URL sharing, so copy link
                copyToClipboard();
                toast({
                    title: 'Link Copied for Instagram',
                    description: 'Paste the link in your Instagram story or post.',
                    status: 'info',
                    duration: 3000,
                    isClosable: true,
                    position: 'top',
                });
                return;
            case 'linkedin':
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}`, '_blank');
                break;
            case 'reddit':
                window.open(`https://reddit.com/submit?url=${encodeURIComponent(referralLink)}&title=${encodeURIComponent(shortMessage)}`, '_blank');
                break;
            case 'native':
                // Use Web Share API if available
                if (navigator.share) {
                    navigator.share({
                        title: 'Join NessanForex',
                        text: shortMessage,
                        url: referralLink,
                    }).then(() => {
                        toast({
                            title: 'Shared Successfully!',
                            description: 'Your referral link has been shared.',
                            status: 'success',
                            duration: 2000,
                            isClosable: true,
                            position: 'top',
                        });
                    }).catch(err => {
                        if (err.name !== 'AbortError') { // User cancelled sharing
                            console.log('Error sharing:', err);
                            copyToClipboard();
                        }
                    });
                } else {
                    copyToClipboard();
                }
                return;
            default:
                copyToClipboard();
                return;
        }

        toast({
            title: `Opening ${method.charAt(0).toUpperCase() + method.slice(1)}`,
            description: 'Share dialog is opening...',
            status: 'info',
            duration: 2000,
            isClosable: true,
            position: 'top',
        });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
            <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(10px)" />
            <ModalContent mx={4} borderRadius="xl" bg="white" shadow="2xl">
                <ModalHeader>
                    <HStack spacing={3}>
                        <Icon as={FiUsers} color="blue.500" boxSize={6} />
                        <VStack align="start" spacing={0}>
                            <Box fontSize="xl" fontWeight="bold">Share & Earn</Box>
                            <Box fontSize="sm" color="gray.600" fontWeight="normal">
                                Invite friends and earn rewards
                            </Box>
                        </VStack>
                    </HStack>
                </ModalHeader>
                <ModalCloseButton />

                <ModalBody pb={6}>
                    <VStack spacing={6}>
                        {/* Profile Loading Check */}
                        {!isProfileLoaded() && (
                            <Box
                                p={4}
                                bg="orange.50"
                                borderRadius="lg"
                                borderLeft="4px"
                                borderColor="orange.400"
                                w="full"
                            >
                                <Text fontSize="sm" color="orange.700">
                                    <strong>Loading...</strong> Please wait while we generate your referral link.
                                </Text>
                            </Box>
                        )}

                        {/* Referral Code Badge */}
                        <HStack justify="center" w="full">
                            <Badge
                                colorScheme="blue"
                                variant="solid"
                                fontSize="md"
                                px={4}
                                py={2}
                                borderRadius="full"
                            >
                                Your Code: {referralCode}
                            </Badge>
                        </HStack>

                        {/* Referral Link Input */}
                        <VStack spacing={4} w="full">
                            <HStack w="full" spacing={2}>
                                <InputGroup size="lg" flex="1">
                                    <Input
                                        value={referralLink}
                                        isReadOnly
                                        bg="gray.50"
                                        border="2px"
                                        borderColor="blue.200"
                                        _focus={{ borderColor: 'blue.400' }}
                                        fontSize="sm"
                                        fontFamily="mono"
                                        pr="5rem"
                                    />
                                    <InputRightElement width="5rem">
                                        <Button
                                            h="2rem"
                                            size="sm"
                                            colorScheme={copied ? 'green' : 'blue'}
                                            onClick={copyToClipboard}
                                            leftIcon={<FiCopy />}
                                            fontSize="xs"
                                        >
                                            {copied ? 'Copied!' : 'Copy'}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>

                                <Tooltip label="Show QR Code">
                                    <IconButton
                                        size="lg"
                                        colorScheme="purple"
                                        icon={<AiOutlineQrcode />}
                                        onClick={() => setShowQR(!showQR)}
                                        isDisabled={referralCode === 'LOADING'}
                                    />
                                </Tooltip>
                            </HStack>

                            {/* QR Code Display */}
                            {showQR && referralCode !== 'LOADING' && (
                                <Box
                                    p={4}
                                    bg="white"
                                    borderRadius="lg"
                                    border="2px"
                                    borderColor="gray.200"
                                    textAlign="center"
                                >
                                    <Image
                                        src={qrCodeUrl}
                                        alt="QR Code"
                                        mx="auto"
                                        borderRadius="md"
                                        fallback={<Box w="200px" h="200px" bg="gray.100" />}
                                    />
                                    <Text fontSize="xs" color="gray.600" mt={2}>
                                        Scan to open referral link
                                    </Text>
                                </Box>
                            )}
                        </VStack>

                        <Divider />

                        {/* Share Buttons */}
                        <VStack spacing={4} w="full">
                            <Text fontWeight="semibold" color="gray.700">
                                Share via Social Media
                            </Text>

                            {/* Native Share Button (Mobile) */}
                            {navigator.share && (
                                <Button
                                    colorScheme="teal"
                                    leftIcon={<FiShare2 />}
                                    onClick={() => shareViaMethod('native')}
                                    size="md"
                                    w="full"
                                    mb={2}
                                >
                                    Share via Device Apps
                                </Button>
                            )}

                            <SimpleGrid columns={2} spacing={3} w="full">
                                <Button
                                    colorScheme="whatsapp"
                                    leftIcon={<AiOutlineWhatsApp />}
                                    onClick={() => shareViaMethod('whatsapp')}
                                    size="sm"
                                    bg="whatsapp.500"
                                    _hover={{ bg: 'whatsapp.600' }}
                                >
                                    WhatsApp
                                </Button>

                                <Button
                                    colorScheme="telegram"
                                    leftIcon={<FaTelegram />}
                                    onClick={() => shareViaMethod('telegram')}
                                    size="sm"
                                    bg="telegram.500"
                                    _hover={{ bg: 'telegram.600' }}
                                >
                                    Telegram
                                </Button>

                                <Button
                                    colorScheme="twitter"
                                    leftIcon={<FaTwitter />}
                                    onClick={() => shareViaMethod('twitter')}
                                    size="sm"
                                    bg="twitter.500"
                                    _hover={{ bg: 'twitter.600' }}
                                >
                                    Twitter
                                </Button>

                                <Button
                                    colorScheme="facebook"
                                    leftIcon={<FaFacebook />}
                                    onClick={() => shareViaMethod('facebook')}
                                    size="sm"
                                    bg="facebook.500"
                                    _hover={{ bg: 'facebook.600' }}
                                >
                                    Facebook
                                </Button>

                                <Button
                                    colorScheme="pink"
                                    leftIcon={<FaInstagram />}
                                    onClick={() => shareViaMethod('instagram')}
                                    size="sm"
                                    bg="pink.500"
                                    _hover={{ bg: 'pink.600' }}
                                >
                                    Instagram
                                </Button>

                                <Button
                                    colorScheme="linkedin"
                                    leftIcon={<FaLinkedin />}
                                    onClick={() => shareViaMethod('linkedin')}
                                    size="sm"
                                    bg="linkedin.500"
                                    _hover={{ bg: 'linkedin.600' }}
                                >
                                    LinkedIn
                                </Button>
                            </SimpleGrid>

                            <Button
                                variant="outline"
                                leftIcon={<FaReddit />}
                                onClick={() => shareViaMethod('reddit')}
                                size="sm"
                                w="full"
                                colorScheme="orange"
                            >
                                Share on Reddit
                            </Button>
                        </VStack>

                        {/* Reward Info */}
                        <Box
                            p={4}
                            bg="blue.50"
                            borderRadius="lg"
                            w="full"
                            textAlign="center"
                        >
                            <Text fontSize="sm" color="blue.700">
                                💰 <strong>Earn up to $50</strong> for each successful referral!
                            </Text>
                        </Box>
                    </VStack>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="gray" mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button
                        colorScheme="blue"
                        leftIcon={<FiExternalLink />}
                        onClick={() => {
                            window.open('/user/referrals', '_blank');
                            onClose();
                        }}
                    >
                        View Full Stats
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ReferralModal;