import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import axios from "axios";

function VerifyEmail() {
    const { token } = useParams();
    const [message, setMessage] = useState("Verifying...");

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                await axios.get(`/api/account/verify-email/${token}`);
                setMessage("Email verified successfully. You can now log in.");
            } catch (error) {
                setMessage("Verification failed. The link may be invalid or expired.");
            }
        };

        verifyEmail();
    }, [token]);

    return (
        <Box textAlign="center" mt={10}>
            <Heading>{message}</Heading>
        </Box>
    );
}

export default VerifyEmail;