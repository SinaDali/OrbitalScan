import requests
import os
from dotenv import load_dotenv
import json

# Load environment variables
load_dotenv()

API_KEY = os.getenv("BIRDEYE_API_KEY")

if not API_KEY:
    raise ValueError("API Key not found. Please check your .env file.")

def fetch_new_solana_tokens():
    url = "https://public-api.birdeye.so/defi/tokenlist"
    headers = {
        "accept": "application/json",
        "X-API-KEY": API_KEY,
        "x-chain": "solana"
    }
    
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        data = response.json()
        tokens = data.get('data', {}).get('tokens', [])  # ✅ گرفتن لیست توکن‌ها
        return tokens
    except Exception as e:
        print(f"⚠️ Error fetching data: {e}")
        return []

def save_signals(tokens):
    if not tokens:
        print("No new tokens found.")
        return
    
    signals = []
    for token in tokens[:10]:  # Limit to first 10 tokens
        signal = {
            "name": token.get("name", "Unknown Token"),
            "contract": token.get("address", "Unknown Address"),
            "marketcap": token.get("market_cap", "Unknown MarketCap"),
            "confidence": 50  # Default confidence
        }
        signals.append(signal)
    
    # ❗ تغییر مسیر ذخیره‌سازی به public/
    with open("public/signals.json", "w") as f:
        json.dump(signals, f, indent=2)
    
    print(f"✅ {len(signals)} new signals saved.")

if __name__ == "__main__":
    print("🚀 Scanning new Solana tokens from Birdeye...")
    tokens = fetch_new_solana_tokens()
    save_signals(tokens)
