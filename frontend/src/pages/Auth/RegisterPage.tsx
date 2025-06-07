import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TextField, Button, Typography, Box, Container, Paper, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../../services/api';

const RegisterPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // التحقق من تطابق كلمات المرور
    if (password !== confirmPassword) {
      setError(t('register.passwordMismatch'));
      return;
    }
    
    setLoading(true);

    try {
      const response = await authAPI.register({ name, email, password });
      
      if (response.data.success) {
        // حفظ بيانات المستخدم في التخزين المحلي
        localStorage.setItem('user', JSON.stringify(response.data.user));
        // الانتقال إلى الصفحة الرئيسية
        navigate('/');
      } else {
        setError(response.data.message || t('register.genericError'));
      }
    } catch (err) {
      setError(t('register.genericError'));
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8, mb: 4 }}>
        <Typography component="h1" variant="h4" align="center" gutterBottom>
          {t('register.title')}
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label={t('register.name')}
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={t('register.email')}
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            dir="ltr"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label={t('register.password')}
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            dir="ltr"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label={t('register.confirmPassword')}
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            dir="ltr"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? t('register.registering') : t('register.submit')}
          </Button>
          <Box textAlign="center" mt={2}>
            <Typography variant="body2">
              {t('register.haveAccount')}{' '}
              <Link to="/login" style={{ textDecoration: 'none' }}>
                {t('register.login')}
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterPage;
