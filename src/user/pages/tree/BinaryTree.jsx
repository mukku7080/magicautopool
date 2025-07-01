import React from "react";
import {
    Box,
    Flex,
    Text,
    Image,
    VStack,
    useBreakpointValue,
    Avatar,
} from "@chakra-ui/react";
import TreeNode from "./TreeNode";

// Dummy image if missing
const fallbackImg = "https://via.placeholder.com/65";

// const TreeNode = ({ user, level = 1 }) => {
//     if (!user) return null;

//     const firstChild = user.children?.[1]; // reverse order: right first
//     const secondChild = user.children?.[0];

//     return (
//         <VStack spacing={8}>
//             <Box textAlign="center" position="relative">
//                 <Flex
//                     direction="column"
//                     align="center"
//                     bg={level === 1 ? "orange.400" : level === 2 ? "purple.600" : "blue.600"}
//                     color="white"
//                     p={4}
//                     borderRadius="md"
//                     boxShadow="lg"
//                     w="200px"
//                 >

//                     <Avatar size="xl" src={user.img || fallbackImg} alt={user.name} />
//                     <Text color={'white'} fontSize="sm" fontWeight="bold">{user.name}</Text>
//                     <Text color={'white'} fontSize="xs">{user.id}</Text>
//                 </Flex>
//             </Box>

//             {/* Children recursively */}
//             {(firstChild || secondChild) && (
//                 <Flex justify="center" gap={8} >
//                     {/* Right */}
//                     <TreeNode user={firstChild} level={level + 1} />
//                     {/* Left */}
//                     <TreeNode user={secondChild} level={level + 1} />
//                 </Flex>
//             )}
//         </VStack>
//     );
// };

// Sample data structure
const binaryTreeData = {
    name: "You",
    id: "RootUser",
    img: "img/logo-80x80.png",
    children: [
        {
            name: "Left Child",
            id: "UserA",
            img: "img/1.png",
            children: [
                { name: "Left.Child.A", id: "UserC", img: "img/2.png" },
                { name: "Right.Child.A", id: "UserD", img: "img/2.png" },
            ],
        },
        {
            name: "Right Child",
            id: "UserB",
            img: "img/3.jpg",
            children: [
                { name: "Left.Child.B", id: "UserE", img: "img/2.png" },
                { name: "Right.Child.B", id: "UserF", img: "img/2.png" },
            ],
        },
    ],
};

const BinaryTree = () => {
    return (
        <Box p={8}>
            <TreeNode user={binaryTreeData} />
        </Box>
    );
};

export default BinaryTree;
