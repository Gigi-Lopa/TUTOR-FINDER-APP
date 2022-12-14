import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native"
import {createStackNavigator} from "@react-navigation/stack"
import WelcomeActivity from "./screens/WelcomeActivity.js"
import SignInActivity from "./screens/SignInActivity.js"
import StudentHomeActivity from "./screens/STUDENT_SCREENS/studentHomeActivity"
import StudentCreateAccountActivity from "./screens/STUDENT_SCREENS/studentCreateAccountActivity"
import TutorCreateAccountActivity from "./screens/TUTOR_SCREENS/tutorCreateAccountActivity"
import TutorInforActivity from  "./screens/TUTOR_SCREENS/tutorInforActivity"
import TutorHomeActivity from './screens/TUTOR_SCREENS/tutorHomeActivity.js';
import ManageChannels from './screens/TUTOR_SCREENS/manageChannels.js';
import ManageStudentChannels from './screens/STUDENT_SCREENS/manageStudentChannels.js';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

let stack = createStackNavigator();

export default function App() {

  return (
    
    <NavigationContainer>
      <StatusBar style="dark" />
      <stack.Navigator
        screenOptions = {{header:()=> null}}>
        <stack.Screen 
        name ="Welcome Activity"
        component = {WelcomeActivity}
        />
        <stack.Screen
        name="Sign In"
        component = {SignInActivity}/>
        <stack.Screen
        name = "Home STUDENT"
        component = {StudentHomeActivity}
      />
      <stack.Screen
        name = "Home TUTOR"
        component={TutorHomeActivity}
      />
      <stack.Screen
        name = "Student Create Account"
        component = {StudentCreateAccountActivity}
      />
      <stack.Screen
        name='Tutor Create Account'
        component={TutorCreateAccountActivity}
      />
      <stack.Screen
        name='More Infor'
        component={TutorInforActivity}
      />
      <stack.Screen
        name = "Tutor Chats"
        component={ManageChannels}
      />
      <stack.Screen
      name = "Student Chats"
      component={ManageStudentChannels}
      />
    </stack.Navigator>
  </NavigationContainer>
  );

}

