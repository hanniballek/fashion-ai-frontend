import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Container, 
  Paper, 
  Alert, 
  Chip,
  Grid,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import { authAPI } from '../../services/api';

const ProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState('');
  const [preferences, setPreferences] = useState<string[]>([]);
  const [newPreference, setNewPreference] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // استرجاع بيانات المستخدم من التخزين المحلي
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setName(parsedUser.name || '');
      setPreferences(parsedUser.preferences || []);
      
      // استرجاع البيانات المحدثة من الخادم
      fetchUserProfile(parsedUser.email);
    }
  }, []);

  const fetchUserProfile = async (email: string) => {
    try {
      const response = await authAPI.getProfile(email);
      if (response.data.success) {
        setUser(response.data.user);
        setName(response.data.user.name || '');
        setPreferences(response.data.user.preferences || []);
        
        // تحديث بيانات المستخدم في التخزين المحلي
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await authAPI.updateProfile({ 
        email: user.email,
        name,
        preferences
      });
      
      if (response.data.success) {
        setSuccess(t('profile.updateSuccess'));
        setUser(response.data.user);
        
        // تحديث بيانات المستخدم في التخزين المحلي
        localStorage.setItem('user', JSON.stringify(response.data.user));
      } else {
        setError(response.data.message || t('profile.genericError'));
      }
    } catch (err) {
      setError(t('profile.genericError'));
      console.error('Update profile error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPreference = () => {
    if (newPreference.trim() && !preferences.includes(newPreference.trim())) {
      setPreferences([...preferences, newPreference.trim()]);
      setNewPreference('');
    }
  };

  const handleDeletePreference = (prefToDelete: string) => {
    setPreferences(preferences.filter(pref => pref !== prefToDelete));
  };

  if (!user) {
    return (
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, mt: 8, mb: 4, textAlign: 'center' }}>
          <Typography variant="h5">{t('profile.notLoggedIn')}</Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 8, mb: 4 }}>
        <Typography component="h1" variant="h4" align="center" gutterBottom>
          {t('profile.title')}
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
              <Avatar 
                sx={{ width: 100, height: 100, mb: 2, bgcolor: 'primary.main' }}
              >
                {name.charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant="h6">{user.email}</Typography>
            </Box>
            
            <List>
              <ListItem>
                <ListItemText 
                  primary={t('profile.memberSince')} 
                  secondary={new Date().toLocaleDateString()} 
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText 
                  primary={t('profile.lastLogin')} 
                  secondary={new Date().toLocaleDateString()} 
                />
              </ListItem>
            </List>
          </Grid>
          
          <Grid item xs={12} md={8}>
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label={t('profile.name')}
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              
              <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
                {t('profile.preferences')}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {t('profile.preferencesHelp')}
              </Typography>
              
              <Box sx={{ display: 'flex', mb: 2 }}>
                <TextField
                  fullWidth
                  label={t('profile.newPreference')}
                  value={newPreference}
                  onChange={(e) => setNewPreference(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddPreference())}
                />
                <Button 
                  variant="contained" 
                  onClick={handleAddPreference}
                  sx={{ ml: 1 }}
                >
                  {t('profile.add')}
                </Button>
              </Box>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                {preferences.map((pref, index) => (
                  <Chip
                    key={index}
                    label={pref}
                    onDelete={() => handleDeletePreference(pref)}
                  />
                ))}
                {preferences.length === 0 && (
                  <Typography variant="body2" color="text.secondary">
                    {t('profile.noPreferences')}
                  </Typography>
                )}
              </Box>
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? t('profile.saving') : t('profile.saveChanges')}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProfilePage;
