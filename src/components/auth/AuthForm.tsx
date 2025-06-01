
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuth } from '@/contexts/AuthContext';
import { TeapotAnimation } from './animations/TeapotAnimation';
import { LotusAnimation } from './animations/LotusAnimation';
import { SuccessAnimation } from './animations/SuccessAnimation';

interface AuthFormProps {
  isSignUp: boolean;
}

interface FormData {
  email: string;
  password: string;
}

export const AuthForm: React.FC<AuthFormProps> = ({ isSignUp }) => {
  const { signUp, signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const form = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    
    const { error } = isSignUp 
      ? await signUp(data.email, data.password)
      : await signIn(data.email, data.password);

    if (!error && isSignUp) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
    
    setIsLoading(false);
  };

  if (showSuccess) {
    return <SuccessAnimation />;
  }

  return (
    <div className="space-y-6">
      {/* Email Animation */}
      {emailFocused && (
        <div className="mb-4">
          <TeapotAnimation />
        </div>
      )}

      {/* Password Animation */}
      {passwordFocused && (
        <div className="mb-4">
          <LotusAnimation />
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/,
                message: 'Please enter a valid email address'
              }
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-tea-earth">Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="your.email@example.com"
                    className="border-tea-stone/30 focus:border-tea-sage"
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            rules={{
              required: 'Password is required',
              ...(isSignUp && {
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters'
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)/,
                  message: 'Password must contain at least one letter and one number'
                }
              })
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-tea-earth">Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder={isSignUp ? 'Create a secure password' : 'Enter your password'}
                    className="border-tea-stone/30 focus:border-tea-sage"
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                  />
                </FormControl>
                <FormMessage />
                {isSignUp && (
                  <p className="text-xs text-tea-stone mt-1">
                    At least 8 characters with one letter and one number
                  </p>
                )}
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-tea-sage hover:bg-tea-sage/80 text-white py-3 rounded-lg font-light text-lg transition-all duration-300 hover:scale-105"
          >
            {isLoading ? 'Brewing...' : isSignUp ? 'Join Our Community' : 'Welcome Back'}
          </Button>
        </form>
      </Form>
    </div>
  );
};
