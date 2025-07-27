import React, { useEffect, useState } from 'react';
import {
    Table,
    Container,
    Badge,
    Button,
    ButtonGroup,
    Alert,
    Spinner,
} from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Loader';

const MerchantOnboardingTable = () => {
    const [merchants, setMerchants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [authError, setAuthError] = useState('');
    const [redirectHome, setRedirectHome] = useState(false);
    const [actionError, setActionError] = useState('');

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const { data: loginData } = await axios.get('http://localhost:4000/admin/login', {
                    withCredentials: true,
                });

                console.log("🚀 ~ MerchantOnboardingTable ~ loginData:", loginData)
                if (!loginData.data.isAdmin) {
                    setAuthError('Access Denied. Admins only.\n Redirecting to Homepage in 5s');
                    setTimeout(() => setRedirectHome(true), 5000);
                    return;
                }

                const { data: merchantData } = await axios.get(
                    'http://localhost:4000/admin/getMerchantsInfo',
                    { withCredentials: true }
                );

                if (merchantData.success) {
                    setMerchants(merchantData.data);
                } else {
                    setAuthError(merchantData.message || 'Failed to fetch data');
                }
            } catch (err) {
                const msg = err?.response?.data?.message || err.message;
                if (msg.includes('Token Missing')) {
                    setAuthError('Session expired. Redirecting to login...');
                } else {
                    setAuthError(msg);
                }
            } finally {
                setLoading(false);
            }
        })();
    }, []);


    const handleStatusChange = async (username, action) => {
        setLoading(true);
        try {
            const { data: res } = await axios.patch(
                'http://localhost:4000/admin/onboarding-status-update',
                { username, action },
                { withCredentials: true }
            );

            if (res.success) {
                
                setMerchants((prev) =>
                    prev.map((merchant) =>
                        merchant.username === username
                            ? {
                                ...merchant,
                                onboarding: res.data.onboarding,
                            }
                            : merchant
                    )
                );
                setActionError('');
            } else {
                setActionError(res.data.message || 'Update failed');
            }
        } catch (err) {
            setActionError(err?.response?.data?.message || 'Status update error');
        } finally {
            setLoading(false);
        }
    };
    

    if (redirectHome) return <Navigate to="/" replace />;

    return (
        <>
            <Loader isLoading={loading} />
            <Container className="my-4">
                <h3 className="mb-4">Merchant Onboarding Status</h3>
                {authError ? (
                    <Alert variant="danger">{authError}</Alert>
                ) : (
                    <>
                        {actionError && <Alert variant="warning">{actionError}</Alert>}
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Merchant Name</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Status</th>
                                    <th>Last Updated</th>
                                    <th>Updated By</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {merchants.map((merchant, idx) => (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>{merchant.name}</td>
                                        <td>{merchant.username}</td>
                                        <td>{merchant.email}</td>
                                        <td>
                                            <Badge
                                                bg={
                                                    merchant.onboarding.status === 'Approved'
                                                        ? 'success'
                                                        : merchant.onboarding.status === 'Pending'
                                                            ? 'warning'
                                                            : 'danger'
                                                }
                                            >
                                                {merchant.onboarding.status}
                                            </Badge>
                                        </td>
                                        <td>{new Date(merchant.onboarding.lastUpdateDate).toLocaleString()}</td>
                                        <td>{merchant.onboarding.statusUpdatedBy}</td>
                                        <td>
                                            <ButtonGroup size="sm">
                                                <Button
                                                    variant="success"
                                                    onClick={() => handleStatusChange(merchant.username, 'Approved')}
                                                    disabled={merchant.onboarding.status === 'Approved'}
                                                >
                                                    Approve
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    onClick={() => handleStatusChange(merchant.username, 'Rejected')}
                                                    disabled={merchant.onboarding.status === 'Rejected'}
                                                >
                                                    Reject
                                                </Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </>
                )}
            </Container>
        </>
    );
};

export default MerchantOnboardingTable;
