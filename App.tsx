
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { PromptInput } from './components/PromptInput';
import { ImageDisplay } from './components/ImageDisplay';
import { Footer } from './components/Footer';
import { generateImage as generateImageService } from './services/geminiService';
import { AppState } from './types';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [appState, setAppState] = useState<AppState>({
    status: 'idle',
    imageUrl: null,
    error: null,
  });

  const handleGenerateImage = useCallback(async () => {
    if (!prompt.trim()) {
      setAppState({
        status: 'error',
        imageUrl: null,
        error: 'Please enter a prompt to generate an image.',
      });
      return;
    }

    setAppState({ status: 'loading', imageUrl: null, error: null });

    try {
      const imageUrl = await generateImageService(prompt);
      setAppState({ status: 'success', imageUrl, error: null });
    } catch (error) {
      console.error('Image generation failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred. Please try again.';
      setAppState({ status: 'error', imageUrl: null, error: errorMessage });
    }
  }, [prompt]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 flex flex-col items-center justify-center">
        <div className="w-full max-w-3xl space-y-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Picture Anything
            </h1>
            <p className="mt-4 text-lg text-gray-400">
              Turn your imagination into stunning visuals. Describe what you want to see, and let our AI bring it to life.
            </p>
          </div>
          <PromptInput
            prompt={prompt}
            setPrompt={setPrompt}
            onGenerate={handleGenerateImage}
            isLoading={appState.status === 'loading'}
          />
          <ImageDisplay appState={appState} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
