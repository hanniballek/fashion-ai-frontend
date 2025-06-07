import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TextField, Button, Typography, Box, Container, Paper, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../../services/api';

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.login({ email, password });
      
      if (response.data.success) {
        // حفظ بيانات المستخدم في التخزين المحلي
        localStorage.setItem('user', JSON.stringify(response.data.user));
        // الانتقال إلى الصفحة الرئيسية
        navigate('/');
      } else {
        setError(response.data.message || t('login.genericError'));
      }
    } catch (err) {
      setError(t('login.genericError'));
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8, mb: 4 }}>
        <Typography component="h1" variant="h4" align="center" gutterBottom>
          {t('login.title')}
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={t('login.email')}
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            dir="ltr"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label={t('login.password')}
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            dir="ltr"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? t('login.loggingIn') : t('login.submit')}
          </Button>
          <Box textAlign="center" mt={2}>
            <Typography variant="body2">
              {t('login.noAccount')}{' '}
              <Link to="/register" style={{ textDecoration: 'none' }}>
                {t('login.register')}
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
