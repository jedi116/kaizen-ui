import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Key, Shield, Bell, Moon, Trash2, Copy, Eye, EyeOff, Plus } from 'lucide-react';
import { Card, Button, Input, Modal, Badge, Avatar } from '../components/ui';
import { useAuthStore } from '../stores';
import { userApi } from '../api';
import type { APIKey } from '../types';
import { formatDate } from '../lib/utils';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

type ProfileForm = z.infer<typeof profileSchema>;

const apiKeySchema = z.object({
  name: z.string().min(1, 'Name is required'),
});

type APIKeyForm = z.infer<typeof apiKeySchema>;

const Settings = () => {
  const { user, updateProfile, isLoading } = useAuthStore();
  const [activeSection, setActiveSection] = useState('profile');
  const [apiKeys, setApiKeys] = useState<APIKey[]>([]);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [newApiKey, setNewApiKey] = useState<string | null>(null);
  const [showApiKeys, setShowApiKeys] = useState<Record<number, boolean>>({});

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
    reset: resetProfile,
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
    },
  });

  const {
    register: registerApiKey,
    handleSubmit: handleApiKeySubmit,
    formState: { errors: apiKeyErrors },
    reset: resetApiKey,
  } = useForm<APIKeyForm>({
    resolver: zodResolver(apiKeySchema),
  });

  useEffect(() => {
    if (user) {
      resetProfile({ name: user.name });
    }
  }, [user, resetProfile]);

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const fetchApiKeys = async () => {
    try {
      const keys = await userApi.getAPIKeys();
      setApiKeys(keys);
    } catch (error) {
      console.error('Failed to fetch API keys:', error);
    }
  };

  const onProfileSubmit = async (data: ProfileForm) => {
    try {
      await updateProfile(data);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const onCreateApiKey = async (data: APIKeyForm) => {
    try {
      const response = await userApi.createAPIKey(data);
      setNewApiKey(response.key);
      await fetchApiKeys();
      resetApiKey();
    } catch (error) {
      console.error('Failed to create API key:', error);
    }
  };

  const handleDeleteApiKey = async (id: number) => {
    if (confirm('Are you sure you want to delete this API key?')) {
      try {
        await userApi.deleteAPIKey(id);
        await fetchApiKeys();
      } catch (error) {
        console.error('Failed to delete API key:', error);
      }
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const sections = [
    { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
    { id: 'api-keys', label: 'API Keys', icon: <Key className="w-4 h-4" /> },
    { id: 'security', label: 'Security', icon: <Shield className="w-4 h-4" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
    { id: 'appearance', label: 'Appearance', icon: <Moon className="w-4 h-4" /> },
  ];

  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <Card className="p-4 lg:col-span-1 h-fit">
          <nav className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-accent-cyan/20 to-accent-violet/20 text-white'
                    : 'text-white/60 hover:text-white hover:bg-glass-white'
                }`}
              >
                {section.icon}
                {section.label}
              </button>
            ))}
          </nav>
        </Card>

        {/* Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Profile Section */}
          {activeSection === 'profile' && (
            <Card>
              <h3 className="font-display font-semibold text-white mb-6">Profile Settings</h3>

              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-glass-border">
                <Avatar name={user?.name || 'User'} size="lg" />
                <div>
                  <p className="font-medium text-white">{user?.name}</p>
                  <p className="text-sm text-white/50">{user?.email}</p>
                </div>
              </div>

              <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="space-y-4">
                <Input
                  {...registerProfile('name')}
                  label="Full Name"
                  error={profileErrors.name?.message}
                />

                <Input value={user?.email || ''} label="Email" disabled className="opacity-60" />

                <div className="flex justify-end pt-4">
                  <Button type="submit" variant="primary" isLoading={isLoading}>
                    Save Changes
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {/* API Keys Section */}
          {activeSection === 'api-keys' && (
            <Card>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-display font-semibold text-white">API Keys</h3>
                  <p className="text-sm text-white/50 mt-1">
                    Manage API keys for external integrations
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<Plus className="w-4 h-4" />}
                  onClick={() => setIsApiKeyModalOpen(true)}
                >
                  Create Key
                </Button>
              </div>

              {apiKeys.length === 0 ? (
                <div className="text-center py-8 text-white/50">
                  <Key className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No API keys yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {apiKeys.map((key) => (
                    <div
                      key={key.id}
                      className="p-4 rounded-xl bg-glass-light border border-glass-border"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-white">{key.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <code className="text-xs text-white/50 font-mono">
                              {showApiKeys[key.id]
                                ? key.key
                                : `${key.key.slice(0, 8)}${'•'.repeat(20)}`}
                            </code>
                            <button
                              onClick={() =>
                                setShowApiKeys((prev) => ({
                                  ...prev,
                                  [key.id]: !prev[key.id],
                                }))
                              }
                              className="p-1 text-white/40 hover:text-white"
                            >
                              {showApiKeys[key.id] ? (
                                <EyeOff className="w-3 h-3" />
                              ) : (
                                <Eye className="w-3 h-3" />
                              )}
                            </button>
                            <button
                              onClick={() => copyToClipboard(key.key)}
                              className="p-1 text-white/40 hover:text-white"
                            >
                              <Copy className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <Badge variant={key.is_active ? 'income' : 'expense'}>
                              {key.is_active ? 'Active' : 'Inactive'}
                            </Badge>
                            <p className="text-xs text-white/40 mt-1">
                              Created {formatDate(key.createdAt)}
                            </p>
                          </div>
                          <button
                            onClick={() => handleDeleteApiKey(key.id)}
                            className="p-2 text-white/40 hover:text-accent-rose transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )}

          {/* Security Section */}
          {activeSection === 'security' && (
            <Card>
              <h3 className="font-display font-semibold text-white mb-6">Security Settings</h3>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-glass-light border border-glass-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-white">Change Password</p>
                      <p className="text-sm text-white/50 mt-1">
                        Update your password regularly for better security
                      </p>
                    </div>
                    <Button variant="secondary" size="sm">
                      Update
                    </Button>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-glass-light border border-glass-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-white">Sign Out All Devices</p>
                      <p className="text-sm text-white/50 mt-1">
                        Sign out from all devices except this one
                      </p>
                    </div>
                    <Button variant="secondary" size="sm">
                      Sign Out All
                    </Button>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-accent-rose/10 border border-accent-rose/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-accent-rose">Delete Account</p>
                      <p className="text-sm text-white/50 mt-1">
                        Permanently delete your account and all data
                      </p>
                    </div>
                    <Button variant="danger" size="sm">
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Notifications Section */}
          {activeSection === 'notifications' && (
            <Card>
              <h3 className="font-display font-semibold text-white mb-6">
                Notification Preferences
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Email notifications', description: 'Receive updates via email' },
                  { label: 'Weekly summary', description: 'Get a weekly progress report' },
                  { label: 'Budget alerts', description: 'Alert when approaching budget limits' },
                  { label: 'Goal reminders', description: 'Reminders for your goals' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between p-4 rounded-xl bg-glass-light border border-glass-border"
                  >
                    <div>
                      <p className="font-medium text-white">{item.label}</p>
                      <p className="text-sm text-white/50 mt-0.5">{item.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-glass-white rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-accent-cyan after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                    </label>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Appearance Section */}
          {activeSection === 'appearance' && (
            <Card>
              <h3 className="font-display font-semibold text-white mb-6">Appearance Settings</h3>
              <div className="space-y-6">
                <div>
                  <p className="font-medium text-white mb-3">Theme</p>
                  <div className="grid grid-cols-3 gap-3">
                    {['Dark', 'Light', 'System'].map((theme) => (
                      <button
                        key={theme}
                        className={`p-4 rounded-xl border transition-all ${
                          theme === 'Dark'
                            ? 'bg-accent-cyan/20 border-accent-cyan text-white'
                            : 'bg-glass-light border-glass-border text-white/60 hover:text-white hover:border-white/30'
                        }`}
                      >
                        {theme}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-white/40 mt-2">Light mode coming soon</p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Create API Key Modal */}
      <Modal
        isOpen={isApiKeyModalOpen}
        onClose={() => {
          setIsApiKeyModalOpen(false);
          setNewApiKey(null);
          resetApiKey();
        }}
        title={newApiKey ? 'API Key Created' : 'Create API Key'}
        description={
          newApiKey
            ? "Make sure to copy your API key now. You won't be able to see it again!"
            : 'Create a new API key for external integrations'
        }
        size="md"
      >
        {newApiKey ? (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-accent-emerald/20 border border-accent-emerald/30">
              <p className="text-xs text-white/50 mb-2">Your API Key</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-sm text-white font-mono break-all">{newApiKey}</code>
                <button
                  onClick={() => copyToClipboard(newApiKey)}
                  className="p-2 text-white/60 hover:text-white"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
            <Button
              variant="primary"
              className="w-full"
              onClick={() => {
                setIsApiKeyModalOpen(false);
                setNewApiKey(null);
              }}
            >
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={handleApiKeySubmit(onCreateApiKey)} className="space-y-4">
            <Input
              {...registerApiKey('name')}
              label="Key Name"
              placeholder="e.g., Mobile App"
              error={apiKeyErrors.name?.message}
            />
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setIsApiKeyModalOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" className="flex-1">
                Create Key
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default Settings;
