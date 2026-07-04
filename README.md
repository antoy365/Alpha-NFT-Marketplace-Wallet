<p align="center">
  <img src="https://github.com/user-attachments/assets/328cd96c-3407-4f5c-9285-6f3dbe7b8d16" alt="Alpha Store Banner" width="100%" style="max-width: 800px; border-radius: 12px;" />
</p>

# 🚀 Alpha Store & Abstract Zone — Multi-Chain NFT Marketplace

A next-generation, high-performance Multi-Chain NFT Marketplace built with **React**, **Vite**, and **Thirdweb SDK v5**. The application delivers a flawless Web2.5 user experience by abstracting blockchain complexities, optimizing RPC network performance, and providing advanced mobile wallet deep linking.

🌐 **Live Demo on Vercel:** https://alpha-nft-marketplace-wallet-ss5z.vercel.app/ 
📊 **Pitch Deck Presentation:** https://gamma.app/docs/Alpha-Store-Abstract-Zone-2b2n03r57qs201s

---

## ✨ Key Features & Innovation

### 1. Seamless Web2.5 Onboarding (Google Sign-In)
*   **The Solution:** Eliminates the classic Web3 barrier to entry. Users can instantly authenticate and create a non-custodial wallet using their **Google account** via Thirdweb Embedded Wallets.
*   **Smart Network Management:** Features an automated network switching engine. The dApp automatically requests network switches upon tab changes without confusing the user or spamming RPC nodes.

### 2. Multi-Chain Architecture (Dual-Zone Layout)
The core ecosystem is split into two independent architectural zones:
*   **Zone 1: Polygon Mainnet & Sepolia Testnet** — For stable, production-ready, and mature smart contract interactions.
*   **Zone 2: Abstract Testnet** — Leveraging the power of ZK-Rollups for lightning-fast, ultra-low-gas minting.
*   *Note:* The UI dynamically morphs its theme colors and native pricing tokens (`POL` / `Sepolia ETH` / `ETH`) based on the active blockchain ecosystem.

### 3. Mobile UX & OKX Wallet Deep Linking
*   Optimized for smartphone screens with adaptive Tailwind CSS.
*   Features native deep linking: When opened via a mobile browser, a dynamic **"Open in OKX Wallet"** button redirects users straight into the secure dApp environment of the OKX Wallet app, eliminating manual URL copying.

### 4. RPC Performance Optimization (Smart Batch Pagination)
*   **The Challenge:** Loading 510 heavy NFTs directly from smart contracts typically overloads RPC nodes and freezes the browser.
*   **Our Fix:** Implemented a dynamic batch fetcher that segments the collection into 3 equal batches of 170 NFTs each. The interface loads data strictly on-demand, reducing bandwidth and server stress.

---

## 🛠 Tech Stack

*   **Frontend:** React, Vite (Lightning-fast development & builds)
*   **Styling:** Tailwind CSS (Modern dark cyberpunk aesthetic)
*   **Web3 Engine:** Thirdweb SDK v5 (`useReadContract`, `TransactionButton`, `MediaRenderer`)
*   **Smart Contracts:** ERC-1155 Multi-Token Standard
*   **Supported Chains:** Polygon Mainnet, Sepolia Testnet, Abstract Testnet
*   **Deployment:** Vercel

---

## 📄 Smart Contracts & Assets
Transparency is fully integrated. Users can copy the contract address with 1 click directly from the header:

*   **Polygon / Sepolia Contract:** `0x8c70A206A5595f7d82B70F552D53BD65463D5891`
*   **Abstract Testnet Contract:** `0x1d23f41509eCDf9B0e4537564833E07deAEE2805`
*   **Featured Collections:** *"Baron Munchausen"* (Interactive Pop-Culture) & *"New York"* (Atmospheric Photography).

---

## 🚀 Local Development Setup

To run this project locally, follow these simple steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/antoy365/Alpha-NFT-Marketplace-Wallet.git
   cd Alpha-NFT-Marketplace-Wallet
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables. Create a `.env` file in the root folder and add your Thirdweb Client ID:
   ```env
   VITE_TEMPLATE_CLIENT_ID=your_thirdweb_client_id_here
   ```

4. Run the local development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

5. Build for production:
   ```bash
   npm run build
   ```

---

## 🔮 Future Roadmap
*   **Native Account Abstraction (AA):** Sponsor user gas fees (Gasless Transactions) on Abstract Chain.
*   **Advanced Social Logins:** Expand onboarding to Apple ID, Passkeys, and Telegram Stars.
*   **Decentralized Marketplace Loops:** Introduce an ERC-1155 secondary market with customized trading royalties and timed auctions.

---

## 👥 Team & Contacts
*   **Developer:** an560 / antoy365
*   **Telegram:** @Genya2902
*   **GitHub:** https://github.com/antoy365

*Developed with ❤️ for the Hackathon.*

