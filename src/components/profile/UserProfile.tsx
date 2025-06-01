
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ProfileAnimations } from './ProfileAnimations';
import { TeaPreferences } from './TeaPreferences';

interface Profile {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  favorite_tea_types: string[];
  preferred_brewing_methods: string[];
  tea_notes: string | null;
}

export const UserProfile: React.FC = () => {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    display_name: '',
    tea_notes: '',
    favorite_tea_types: [] as string[],
    preferred_brewing_methods: [] as string[]
  });
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      setProfile(data);
      setFormData({
        display_name: data.display_name || '',
        tea_notes: data.tea_notes || '',
        favorite_tea_types: data.favorite_tea_types || [],
        preferred_brewing_methods: data.preferred_brewing_methods || []
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          display_name: formData.display_name,
          tea_notes: formData.tea_notes,
          favorite_tea_types: formData.favorite_tea_types,
          preferred_brewing_methods: formData.preferred_brewing_methods,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;

      await fetchProfile();
      setEditing(false);
      
      toast({
        title: "Profile updated! 🌿",
        description: "Your tea preferences have been saved.",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Update failed",
        description: "Failed to update your profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-tea-cream via-background to-tea-clay flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl animate-spin mb-4">🍃</div>
          <p className="text-tea-stone">Loading your tea profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-tea-cream via-background to-tea-clay relative">
      <ProfileAnimations />
      
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-2xl">
        <Card className="p-8 bg-card/90 backdrop-blur-sm border-tea-stone/30 shadow-2xl">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-tea-sage/20 flex items-center justify-center">
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt="Avatar" className="w-16 h-16 rounded-full" />
                ) : (
                  <span className="text-2xl">🍵</span>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-light text-tea-earth">
                  {profile?.display_name || 'Tea Enthusiast'}
                </h1>
                <p className="text-tea-stone">{user?.email}</p>
              </div>
            </div>
            <Button
              onClick={signOut}
              variant="outline"
              className="border-tea-stone/30 hover:bg-red-50 hover:border-red-300"
            >
              Sign Out
            </Button>
          </div>

          <div className="space-y-6">
            {editing ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-tea-earth mb-2">
                    Display Name
                  </label>
                  <Input
                    value={formData.display_name}
                    onChange={(e) => setFormData({...formData, display_name: e.target.value})}
                    placeholder="Your name"
                    className="border-tea-stone/30 focus:border-tea-sage"
                  />
                </div>

                <TeaPreferences
                  favoriteTeaTypes={formData.favorite_tea_types}
                  preferredBrewingMethods={formData.preferred_brewing_methods}
                  onTeaTypesChange={(types) => setFormData({...formData, favorite_tea_types: types})}
                  onBrewingMethodsChange={(methods) => setFormData({...formData, preferred_brewing_methods: methods})}
                />

                <div>
                  <label className="block text-sm font-medium text-tea-earth mb-2">
                    Tea Notes & Experiences
                  </label>
                  <Textarea
                    value={formData.tea_notes}
                    onChange={(e) => setFormData({...formData, tea_notes: e.target.value})}
                    placeholder="Share your tea journey, favorite moments, or brewing discoveries..."
                    className="border-tea-stone/30 focus:border-tea-sage min-h-[100px]"
                  />
                </div>

                <div className="flex space-x-3">
                  <Button
                    onClick={updateProfile}
                    className="bg-tea-sage hover:bg-tea-sage/80 text-white"
                  >
                    Save Changes
                  </Button>
                  <Button
                    onClick={() => setEditing(false)}
                    variant="outline"
                    className="border-tea-stone/30"
                  >
                    Cancel
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-tea-earth mb-2">Favorite Tea Types</h3>
                    <div className="flex flex-wrap gap-2">
                      {profile?.favorite_tea_types?.length ? (
                        profile.favorite_tea_types.map((type) => (
                          <span
                            key={type}
                            className="px-3 py-1 bg-tea-sage/20 text-tea-earth rounded-full text-sm"
                          >
                            {type}
                          </span>
                        ))
                      ) : (
                        <span className="text-tea-stone italic">No preferences set</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-tea-earth mb-2">Preferred Brewing Methods</h3>
                    <div className="flex flex-wrap gap-2">
                      {profile?.preferred_brewing_methods?.length ? (
                        profile.preferred_brewing_methods.map((method) => (
                          <span
                            key={method}
                            className="px-3 py-1 bg-tea-clay/20 text-tea-earth rounded-full text-sm"
                          >
                            {method}
                          </span>
                        ))
                      ) : (
                        <span className="text-tea-stone italic">No preferences set</span>
                      )}
                    </div>
                  </div>

                  {profile?.tea_notes && (
                    <div>
                      <h3 className="font-medium text-tea-earth mb-2">Tea Notes</h3>
                      <p className="text-tea-stone bg-tea-cream/30 p-4 rounded-lg">
                        {profile.tea_notes}
                      </p>
                    </div>
                  )}
                </div>

                <Button
                  onClick={() => setEditing(true)}
                  className="bg-tea-sage hover:bg-tea-sage/80 text-white"
                >
                  Edit Profile
                </Button>
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
