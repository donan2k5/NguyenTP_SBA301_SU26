import React, { useState } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/userApi';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const { account, user } = await authApi.login(username, password);
            localStorage.setItem('auth_token', `mock_token_${account.id}`);
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/users');
        } catch (err) {
            setError(err.message || 'Tên đăng nhập hoặc mật khẩu không đúng');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }} fluid>
            <Card style={{ width: '100%', maxWidth: '400px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <Card.Body className="p-4">
                    <h2 className="text-center mb-4 fw-bold" style={{ color: '#0d6efd' }}>Đăng Nhập</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    
                    <Form onSubmit={handleLogin}>
                        <Form.Group className="mb-3" controlId="formUsername">
                            <Form.Label>Tên đăng nhập</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Nhập tên đăng nhập" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="formPassword">
                            <Form.Label>Mật khẩu</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Nhập mật khẩu" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100 py-2 fw-semibold" disabled={loading}>
                            {loading ? 'Đang xử lý...' : 'Đăng Nhập'}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default LoginPage;
