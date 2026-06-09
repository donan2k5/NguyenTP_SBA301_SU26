import React, { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

const emptyForm = {
    fullName: '',
    email: '',
    phone: '',
    role: 'User',
    status: 'active'
};

const UserForm = ({ show, user, onHide, onSubmit, loading, error }) => {
    const [form, setForm] = useState(emptyForm);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (user) {
            setForm({
                fullName: user.fullName, email: user.email,
                phone: user.phone, role: user.role, status: user.status
            });
        } else {
            setForm(emptyForm);
        }
        setErrors({});
    }, [user, show]);

    const validate = () => {
        const e = {};
        if (!form.fullName.trim()) e.fullName = 'Họ tên không được để trống.';
        else if (form.fullName.length < 3) e.fullName = 'Họ tên phải có ít nhất 3 ký tự.';
        
        if (!form.email.trim()) e.email = 'Email không được để trống.';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email không hợp lệ.';
        
        if (!form.phone.trim()) e.phone = 'Số điện thoại không được để trống.';
        else if (!/^0\d{9}$/.test(form.phone)) e.phone = 'Số điện thoại phải 10 chữ số, bắt đầu bằng 0.';
        
        return e;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }
        onSubmit(form);
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{user ? 'Cập nhật Người Dùng' : 'Thêm Người Dùng Mới'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <div className="alert alert-danger">{error}</div>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Họ tên</Form.Label>
                        <Form.Control
                            type="text"
                            value={form.fullName}
                            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                            isInvalid={!!errors.fullName}
                            placeholder="Nhập họ và tên"
                        />
                        <Form.Control.Feedback type="invalid">{errors.fullName}</Form.Control.Feedback>
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            isInvalid={!!errors.email}
                            placeholder="Nhập địa chỉ email"
                        />
                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Số điện thoại</Form.Label>
                        <Form.Control
                            type="text"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            isInvalid={!!errors.phone}
                            placeholder="Ví dụ: 0912345678"
                        />
                        <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Vai trò</Form.Label>
                        <Form.Select
                            value={form.role}
                            onChange={(e) => setForm({ ...form, role: e.target.value })}
                        >
                            <option value="Admin">Admin</option>
                            <option value="Manager">Manager</option>
                            <option value="User">User</option>
                        </Form.Select>
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Trạng thái</Form.Label>
                        <Form.Select
                            value={form.status}
                            onChange={(e) => setForm({ ...form, status: e.target.value })}
                        >
                            <option value="active">Hoạt động</option>
                            <option value="inactive">Tạm khóa</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Hủy
                </Button>
                <Button variant="primary" onClick={handleSubmit} disabled={loading}>
                    {loading ? 'Đang xử lý...' : 'Lưu lại'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UserForm;
