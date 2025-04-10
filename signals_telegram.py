from telethon import TelegramClient, events
import json
import os
import re
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

api_id = int(os.getenv('API_ID'))
api_hash = os.getenv('API_HASH')
session_file = 'orbital_session'

client = TelegramClient(session_file, api_id, api_hash)

# Function to extract signal data
def extract_signal_data(message_text):
    # Initialize fields
    name = "New MemeCoin"
    contract = ""
    dexscreener = ""
    twitter = ""
    telegram = ""
    marketcap = "N/A"
    network = "Unknown"
    confidence = 80

    # Regex matches
    contract_match = re.search(r'(0x[a-fA-F0-9]{40})', message_text)
    dexscreener_match = re.search(r'(https?://dexscreener\.com[^\s]+)', message_text)
    twitter_match = re.search(r'(https?://twitter\.com[^\s]+)', message_text)
    telegram_match = re.search(r'(https?://t\.me[^\s]+)', message_text)
    marketcap_match = re.search(r'MarketCap[:\-]?\s*\$?([\d\.KMkmbB]+)', message_text, re.IGNORECASE)
    network_match = re.search(r'Network[:\-]?\s*([A-Za-z0-9]+)', message_text, re.IGNORECASE)
    confidence_match = re.search(r'Confidence[:\-]?\s*(\d{1,3})', message_text, re.IGNORECASE)
    name_match = re.search(r'Name[:\-]?\s*([\w\s]+)', message_text, re.IGNORECASE)

    if contract_match:
        contract = contract_match.group(1)
    if dexscreener_match:
        dexscreener = dexscreener_match.group(1)
    if twitter_match:
        twitter = twitter_match.group(1)
    if telegram_match:
        telegram = telegram_match.group(1)
    if marketcap_match:
        marketcap = f"${marketcap_match.group(1)}"
    if network_match:
        network = network_match.group(1).upper()
    if confidence_match:
        confidence = int(confidence_match.group(1))
    if name_match:
        name = name_match.group(1).strip()

    # Only save if Name and Contract exist
    if name and contract:
        return {
            'name': name,
            'contract': contract,
            'links': {
                'dexscreener': dexscreener,
                'twitter': twitter,
                'telegram': telegram
            },
            'marketcap': marketcap,
            'network': network,
            'confidence': confidence
        }
    else:
        return None  # If essential fields missing, don't save

# Save signal to JSON file
async def save_signal(signal_data):
    signals_path = 'signals.json'
    try:
        if os.path.exists(signals_path):
            with open(signals_path, 'r') as f:
                signals = json.load(f)
        else:
            signals = []

        signals.append(signal_data)

        # Keep only last 20 signals
        signals = signals[-20:]

        with open(signals_path, 'w') as f:
            json.dump(signals, f, indent=2, ensure_ascii=False)

        print(f"✅ New Signal Saved: {signal_data['name']}")

    except Exception as e:
        print(f"❌ Error saving signal: {e}")

# Event handler
@client.on(events.NewMessage(chats=[
    'mad_apes_call',
    'mad_apes_gambles',
    'CriptoGemas_Anuncios',
    'ZoroChinese_Calls',
    'CatfishcallsbyPoe'
]))
async def signal_handler(event):
    message_text = event.raw_text
    signal_data = extract_signal_data(message_text)
    if signal_data:
        await save_signal(signal_data)
    else:
        print("⚠️ Signal ignored: Missing Name or Contract.")

# Main function
async def main():
    print("🚀 Starting Telegram Client...")
    await client.start()
    print("✅ Client is running. Listening for new messages...")
    await client.run_until_disconnected()

if __name__ == '__main__':
    import asyncio
    asyncio.run(main())
