import * as React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import store from './store/index';

import MainPage from './pages/MainPage'
import LoginPage from './pages/LoginPage'
import CourseDetailPage from './pages/CourseDetailPage';
import LessonPage from './pages/LessonPage';
import AnalyticsPage from './pages/AnalyticsPage';

function App() {
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <ChakraProvider>
      <Router>
        <Provider store={store}>
          <PersistGate persistor={persistStore(store)}>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/main" element={<MainPage />} />
              <Route path="/courseDetail" element={<CourseDetailPage />} />
              <Route path="/lesson" element={<LessonPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
            </Routes>
          </PersistGate>
        </Provider>
      </Router>
    </ChakraProvider>
  )
}


export default App;
