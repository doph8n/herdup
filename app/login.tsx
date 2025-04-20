import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, Image, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useAuth0 } from '@/hooks/useAuth0';
import { router } from 'expo-router';

export default function LoginScreen() {
  const { login, isLoading, error, debugLogin } = useAuth0();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');

  const handleLogin = async () => {
    // Validate form
    if (!email.trim()) {
      setFormError('Email is required');
      return;
    }
    
    if (!password.trim()) {
      setFormError('Password is required');
      return;
    }
    
    // Clear any previous errors
    setFormError('');
    
    // Proceed with Auth0 login, passing the email for pre-filling
    await login(email, password);
  };

  const navigateToSignup = () => {
    router.push('/signup');
  };
  
  const handleDebugLogin = () => {
    debugLogin();
    // Navigate to main app after debug login
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <TouchableOpacity 
        style={styles.debugButton}
        onPress={handleDebugLogin}
      >
        <Text style={styles.debugButtonText}>DEBUG: Skip Login</Text>
      </TouchableOpacity>
      
      <View style={styles.logoContainer}>
        <Text style={styles.appName}>HerdUp</Text>
        <Text style={styles.tagline}>Stay safe with your herd</Text>
      </View>
      
      {(formError || error) && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{formError || error}</Text>
        </View>
      )}
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity 
        style={styles.button} 
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Sign In with Auth0</Text>
        )}
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
      
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <TouchableOpacity onPress={navigateToSignup}>
          <Text style={styles.signupLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  appName: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    fontFamily: 'serif',
  },
  tagline: {
    fontSize: 18,
    color: '#fff',
    fontStyle: 'italic',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: '#1E1E1E',
    color: '#fff',
  },
  errorContainer: {
    backgroundColor: 'rgba(220, 53, 69, 0.2)',
    padding: 10,
    borderRadius: 4,
    marginBottom: 20,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(220, 53, 69, 0.4)',
  },
  errorText: {
    color: '#ff6b6b',
    textAlign: 'center',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#3498db',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    flexDirection: 'row',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPassword: {
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#3498db',
    textAlign: 'center',
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  signupText: {
    color: '#fff',
    marginRight: 5,
  },
  signupLink: {
    color: '#3498db',
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  footerText: {
    textAlign: 'center',
    color: '#777',
    fontSize: 12,
  },
  debugButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'rgba(255, 152, 0, 0.8)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    zIndex: 100,
  },
  debugButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 12,
  },
}); 