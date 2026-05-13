# ScholarChain - Deployment Guide

## 📋 Prerequisites

1. **Node.js** (v18 or higher)
2. **MetaMask** browser extension
3. **Sepolia** configured in MetaMask

## 🛠️ Setup Instructions

### 1. Environment Configuration

Create a `.env.local` file in the `frontend` directory:

```env
NEXT_PUBLIC_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/REPLACE
NEXT_PUBLIC_SCHOLARCHAIN_ADDRESS=0xYourDeployedContractAddress
NEXT_PUBLIC_BACKEND_URL=https://scholarchain-production.up.railway.app
```

### 2. Install Dependencies

```bash
# Install frontend dependencies
cd frontend
npm install

# Install contract dependencies
cd ../contracts
npm install
```

### 3. Run Development Server

```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:3000`

## 🌐 Production Deployment

### Option 1: Vercel (Recommended)

1. **Connect to Vercel:**
   ```bash
   npm install -g vercel
   vercel login
   ```

2. **Deploy:**
   ```bash
   cd frontend
   vercel --prod
   ```

3. **Configure Environment Variables:**
   - Go to Vercel Dashboard
   - Add environment variables:
     - `NEXT_PUBLIC_RPC_URL`
     - `NEXT_PUBLIC_CROWDFUNDING_ADDRESS`

### Option 2: Netlify

1. **Build the project:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Netlify:**
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `out`

### Option 3: Traditional Hosting

1. **Build for production:**
   ```bash
   cd frontend
   npm run build
   npm run export
   ```

2. **Upload the `out` folder to your hosting provider**

## 🔧 Smart Contract Deployment

### Deploy to Sepolia

1. Get Sepolia ETH (any Sepolia faucet)
2. Deploy:

```bash
cd contracts
cp .env.example .env
npm run deploy:sepolia
```

3. Update environment variables:
   - `frontend/.env.local` → `NEXT_PUBLIC_SCHOLARCHAIN_ADDRESS`
   - `backend/.env` → `SCHOLARCHAIN_CONTRACT_ADDRESS`

## 🎯 Features Checklist

### ✅ Core Functionality
- [x] Wallet Connection (MetaMask)
- [x] Network Detection (Sepolia)
- [x] Donations logged on-chain
- [x] Scholarship allocations logged on-chain
- [x] MongoDB persistence for users/students/tx hashes

### ✅ UI/UX Features
- [x] Responsive Design
- [x] Dark Theme
- [x] Smooth Animations
- [x] Professional Components
- [x] Loading States
- [x] Error Handling

### ✅ Professional Features
- [x] Glassmorphism Design
- [x] Gradient Backgrounds
- [x] Interactive Elements
- [x] Mobile Optimization
- [x] SEO Ready
- [x] Performance Optimized

## 🔒 Security Considerations

1. **Environment Variables:** Never commit `.env.local` to version control
2. **Contract Verification:** Verify your smart contract on PolygonScan
3. **HTTPS:** Always use HTTPS in production
4. **MetaMask Security:** Users should verify transactions before signing

## 📱 Mobile Optimization

The platform is fully responsive and optimized for:
- 📱 Mobile phones
- 📱 Tablets
- 💻 Desktop computers
- 🖥️ Large screens

## 🎨 Customization

### Branding
- Update logo in `components/layout/Navbar.jsx`
- Modify colors in `tailwind.config.js`
- Customize gradients in component files

### Features
- Add new campaign categories
- Implement user authentication
- Add email notifications
- Integrate payment gateways

## 🚀 Performance Optimization

- **Image Optimization:** Next.js automatic image optimization
- **Code Splitting:** Automatic code splitting by Next.js
- **Caching:** Built-in caching for static assets
- **Bundle Size:** Optimized bundle size with tree shaking

## 📊 Analytics Integration

Add analytics to track usage:

```javascript
// Add to _app.js or layout.js
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
```

## 🎉 ScholarChain is Ready

Run `backend` + `frontend`, deploy the contract to Sepolia, and you’ll have a full transparency loop:
donation txs + allocation txs + DB records + on-chain audit view.

### Next Steps:
1. Deploy to your preferred platform
2. Configure your smart contract
3. Customize branding and features
4. Launch and promote your platform!

---

**Built with ❤️ using Next.js, React, Tailwind CSS, and Web3.js**
