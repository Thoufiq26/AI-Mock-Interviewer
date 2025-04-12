import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <SignUp
          appearance={{
            elements: {
              formButtonPrimary:
                'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300',
              card: 'bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg',
              headerTitle: 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600',
              headerSubtitle: 'text-purple-300',
              formFieldLabel: 'text-purple-300',
              formFieldInput: 'bg-white/5 border border-white/20 text-purple-300 rounded-lg',
              footerActionLink: 'text-purple-400 hover:text-pink-400',
            },
          }}
        />
      </div>
    </div>
  );
}