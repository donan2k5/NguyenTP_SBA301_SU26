import React, { useState, useEffect, useCallback } from 'react';
import { Container, Button, Table, Badge, Form, Row, Col, Spinner, Toast, ToastContainer, Card, Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../api/userApi';
import UserForm from '../components/UserForm';
import ConfirmDialog from '../components/ConfirmDialog';

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [filterRole, setFilterRole] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    
    // States cho Modal Form
    const [showForm, setShowForm] = useState(false);
    const [editUser, setEditUser] = useState(null);
    const [formLoading, setFormLoading] = useState(false);
    const [formError, setFormError] = useState(null);
    
    // States cho Modal Delete
    const [deleteTarget, setDeleteTarget] = useState(null);
    
    // State cho Toast notification
    const [toast, setToast] = useState(null); 

    const navigate = useNavigate();

    const loggedInUserStr = localStorage.getItem('user');
    const loggedInUser = loggedInUserStr ? JSON.parse(loggedInUserStr) : null;

    useEffect(() => {
        if (!localStorage.getItem('auth_token')) {
            navigate('/login', { replace: true });
        }
    }, [navigate]);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const fetchUsers = useCallback(async () => {
        setLoading(true); 
        setError(null);
        try {
            const params = {
                _page: currentPage,
                _per_page: 5 // Dùng cho json-server v1
            };
            if (filterRole) {
                params.role = filterRole;
                // Khi có filter role, ta có thể reset page về 1 (xử lý ở useEffect nếu muốn)
            }
            const { data, headers } = await userApi.getAll(params);
            
            // Xử lý cả 2 phiên bản json-server (v0 và v1)
            const items = data.data || data; 
            const total = data.items || parseInt(headers['x-total-count'] || items.length, 10);
            
            setUsers(items);
            setTotalPages(Math.ceil(total / 5));
        } catch (err) {
            setError(err.message || 'Lỗi khi tải danh sách người dùng.');
        } finally {
            setLoading(false);
        }
    }, [filterRole, currentPage]);

    useEffect(() => { 
        fetchUsers(); 
    }, [fetchUsers]);

    // Reset về trang 1 khi đổi Role
    useEffect(() => {
        setCurrentPage(1);
    }, [filterRole]);

    const filtered = users.filter(u =>
        u.fullName.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.phone.includes(search)
    );

    const handleSubmit = async (formData) => {
        setFormLoading(true);
        setFormError(null);
        try {
            if (editUser) {
                await userApi.update(editUser.id, { ...editUser, ...formData });
                showToast('Cập nhật người dùng thành công!');
            } else {
                await userApi.create(formData);
                showToast('Thêm người dùng mới thành công!');
            }
            setShowForm(false);
            fetchUsers();
        } catch (err) {
            setFormError(err.message || 'Có lỗi xảy ra khi lưu dữ liệu.');
        } finally {
            setFormLoading(false);
        }
    };

    const handleToggleStatus = async (user) => {
        const newStatus = user.status === 'active' ? 'inactive' : 'active';
        try {
            await userApi.patch(user.id, { status: newStatus });
            setUsers(prev =>
                prev.map(u => u.id === user.id ? { ...u, status: newStatus } : u)
            );
            showToast('Cập nhật trạng thái thành công!');
        } catch (err) {
            showToast('Cập nhật trạng thái thất bại.', 'error');
        }
    };

    const handleDeleteConfirm = async () => {
        try {
            await userApi.remove(deleteTarget.id);
            showToast(`Đã xóa '${deleteTarget.fullName}' thành công.`);
            setDeleteTarget(null);
            fetchUsers();
        } catch (err) {
            showToast('Xóa thất bại.', 'error');
            setDeleteTarget(null);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <Container className="py-5">
            <Card className="shadow-sm border-0">
                <Card.Body className="p-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="fw-bold text-primary mb-0">Quản Lý Người Dùng</h2>
                        <div>
                            <Button variant="success" onClick={() => { setEditUser(null); setShowForm(true); }} className="me-2 fw-semibold">
                                + Thêm Mới
                            </Button>
                            <Button variant="outline-danger" onClick={handleLogout} className="fw-semibold">
                                Đăng xuất
                            </Button>
                        </div>
                    </div>

                    <Row className="mb-4">
                        <Col md={6}>
                            <Form.Control
                                type="text"
                                placeholder="🔍 Tìm kiếm theo tên, email, số điện thoại..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </Col>
                        <Col md={3}>
                            <Form.Select value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
                                <option value="">Tất cả vai trò</option>
                                <option value="Admin">Admin</option>
                                <option value="Manager">Manager</option>
                                <option value="User">User</option>
                            </Form.Select>
                        </Col>
                    </Row>

                    {error && <div className="alert alert-danger">{error}</div>}

                    {loading ? (
                        <div className="text-center py-5"><Spinner animation="border" variant="primary" /></div>
                    ) : (
                        <Table responsive hover className="align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th>Họ tên</th>
                                    <th>Email</th>
                                    <th>Số điện thoại</th>
                                    <th>Vai trò</th>
                                    <th>Trạng thái</th>
                                    <th className="text-end">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.length > 0 ? filtered.map(user => (
                                    <tr key={user.id}>
                                        <td className="fw-medium">{user.fullName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td>
                                            <Badge bg={user.role === 'Admin' ? 'danger' : user.role === 'Manager' ? 'warning' : 'info'}>
                                                {user.role}
                                            </Badge>
                                        </td>
                                        <td>
                                            <Badge bg={user.status === 'active' ? 'success' : 'secondary'}>
                                                {user.status === 'active' ? 'Hoạt động' : 'Tạm khóa'}
                                            </Badge>
                                        </td>
                                        <td className="text-end">
                                            <Button variant="outline-primary" size="sm" className="me-2" onClick={() => { setEditUser(user); setShowForm(true); }}>
                                                Sửa
                                            </Button>
                                            <Button 
                                                variant={user.status === 'active' ? 'outline-warning' : 'outline-success'} 
                                                size="sm" 
                                                className="me-2" 
                                                onClick={() => handleToggleStatus(user)}
                                            >
                                                {user.status === 'active' ? 'Khóa' : 'Mở'}
                                            </Button>
                                            {loggedInUser?.role === 'Admin' && (
                                                <Button variant="outline-danger" size="sm" onClick={() => setDeleteTarget(user)}>
                                                    Xóa
                                                </Button>
                                            )}
                                        </td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan="6" className="text-center py-4 text-muted">Không tìm thấy người dùng nào phù hợp.</td></tr>
                                )}
                            </tbody>
                        </Table>
                    )}

                    {/* Pagination Component */}
                    {totalPages > 1 && (
                        <div className="d-flex justify-content-end mt-3">
                            <Pagination>
                                <Pagination.Prev 
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
                                    disabled={currentPage === 1} 
                                />
                                {[...Array(totalPages)].map((_, i) => (
                                    <Pagination.Item 
                                        key={i + 1} 
                                        active={i + 1 === currentPage} 
                                        onClick={() => setCurrentPage(i + 1)}
                                    >
                                        {i + 1}
                                    </Pagination.Item>
                                ))}
                                <Pagination.Next 
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} 
                                    disabled={currentPage === totalPages} 
                                />
                            </Pagination>
                        </div>
                    )}
                </Card.Body>
            </Card>

            <UserForm
                show={showForm}
                user={editUser}
                onHide={() => { setShowForm(false); setFormError(null); }}
                onSubmit={handleSubmit}
                loading={formLoading}
                error={formError}
            />

            <ConfirmDialog
                show={!!deleteTarget}
                title="Xác nhận xóa"
                message={deleteTarget ? `Bạn có chắc chắn muốn xóa người dùng "${deleteTarget.fullName}" không? Hành động này không thể hoàn tác.` : ''}
                onConfirm={handleDeleteConfirm}
                onCancel={() => setDeleteTarget(null)}
            />

            <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1055 }}>
                <Toast show={!!toast} bg={toast?.type === 'error' ? 'danger' : 'success'} delay={3000} autohide onClose={() => setToast(null)}>
                    <Toast.Body className="text-white fw-medium">{toast?.message}</Toast.Body>
                </Toast>
            </ToastContainer>
        </Container>
    );
};

export default UsersPage;
