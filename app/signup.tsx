import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, TextInput, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useAuth0 } from '@/hooks/useAuth0';
import { router } from 'expo-router';

export default function SignupScreen() {
  const { signup, isLoading, error, debugLogin } = useAuth0();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [formError, setFormError] = useState('');

  const handleSignup = async () => {
    // Validate form
    if (!name.trim()) {
      setFormError('Name is required');
      return;
    }
    
    if (!username.trim()) {
      setFormError('Username is required');
      return;
    }
    
    if (!email.trim()) {
      setFormError('Email is required');
      return;
    }
    
    if (!password.trim()) {
      setFormError('Password is required');
      return;
    }
    
    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }
    
    if (password.length < 8) {
      setFormError('Password must be at least 8 characters');
      return;
    }
    
    // Clear any previous errors
    setFormError('');
    
    // Proceed with Auth0 signup
    await signup(email, password, name, username);
  };

  const navigateToLogin = () => {
    router.replace('/login');
  };
  
  const handleDebugLogin = () => {
    debugLogin();
    // Navigate to main app after debug login
    router.replace('/(tabs)');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <StatusBar style="light" />
        
        <TouchableOpacity 
          style={styles.debugButton}
          onPress={handleDebugLogin}
        >
          <Text style={styles.debugButtonText}>DEBUG: Skip Signup</Text>
        </TouchableOpacity>
        
        <View style={styles.logoContainer}>
          <Text style={styles.appName}>HerdUp</Text>
          <Text style={styles.tagline}>Stay safe with your herd</Text>
        </View>
        
        <Text style={styles.headerText}>Create Account</Text>
        
        {(formError || error) && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{formError || error}</Text>
          </View>
        )}
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#888"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#888"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
          
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
          
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#888"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity 
          style={styles.button} 
          onPress={handleSignup}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Create Account</Text>
          )}
        </TouchableOpacity>
        
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <TouchableOpacity onPress={navigateToLogin}>
            <Text style={styles.loginLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By signing up, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
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
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
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
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  loginText: {
    color: '#fff',
    marginRight: 5,
  },
  loginLink: {
    color: '#3498db',
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 20,
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