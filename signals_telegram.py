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
    pattern = re.compile(r'(0x[a-fA-F0-9]{40})')
    contract_match = pattern.search(message_text)
    
    links = {
        'dexscreener': '',
        'twitter': '',
        'telegram': ''
    }
    if 'dexscreener.com' in message_text:
        links['dexscreener'] = re.search(r'(https?://dexscreener\.com[^\s]+)', message_text).group(1)
    if 'twitter.com' in message_text:
        links['twitter'] = re.search(r'(https?://twitter\.com[^\s]+)', message_text).group(1)
    if 't.me' in message_text:
        links['telegram'] = re.search(r'(https?://t\.me[^\s]+)', message_text).group(1)

    return {
        'name': 'New MemeCoin',
        'contract': contract_match.group(1) if contract_match else '',
        'links': links,
        'marketcap': 'N/A',
        'network': 'Unknown',
        'confidence': 80
    }

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

        with open(signals_path, 'w') as f:
            json.dump(signals, f, indent=2, ensure_ascii=False)

        print(f"New Signal Saved: {signal_data['name']}")

    except Exception as e:
        print(f"Error saving signal: {e}")

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
    await save_signal(signal_data)

# Main function
async def main():
    print("Starting Telegram Client...")
    await client.start()
    print("Client is running. Listening for new messages...")
    await client.run_until_disconnected()

if __name__ == '__main__':
    import asyncio
    asyncio.run(main())
