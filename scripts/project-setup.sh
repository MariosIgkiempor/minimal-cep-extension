#!/bin/sh
set -xe


OS="$(uname -s)"
if [ "$OS" != "Darwin" ]; then
  echo "⚠️  This setup script is designed for macOS."
  echo "   You are running: $OS"
  echo "   Some features like 'defaults write' and CEP symlinks may not work."
  echo "💡 Consider running setup manually or using a Mac machine."
  exit 1
fi


echo "📦 Installing dependencies..."
pnpm install


echo "📝 Setting up appropriate log levels for Illustrator."
defaults write com.adobe.CSXS.12 LogLevel 6

echo  "🔧 PlayerDebugMode allows unsigned extensions to be used on your machine."
defaults write com.adobe.CSXS.12 PlayerDebugMode 1
defaults write com.adobe.ILST.29 PlayerDebugMode 1


echo "🏗️ Building project..."
pnpm run build


echo "✅ Project setup complete!"

